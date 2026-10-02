import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, realpathSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ORIGINAL_BACKGROUND_SHA256 = Object.freeze({
  'midnight-contract': 'bd359f0d98a2d3ac20ce246010a160492883dd21d3c494ebd765f85e3fbd9622',
  'midnight-contract-city': '0c38d55d1e296f38cea3207a1bfe502aa40aff695b42f5639f13b553cbe9fac3',
});

function record(value, label) {
  assert(value !== null && typeof value === 'object' && !Array.isArray(value), label + ' must be an object');
  return value;
}

function text(value, label) {
  assert(typeof value === 'string' && value.trim() !== '', label + ' must be a nonempty string');
  return value;
}

function inside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === '' || (!relative.startsWith('..' + path.sep) && relative !== '..' && !path.isAbsolute(relative));
}

function decodedPath(value) {
  text(value, 'resource path');
  let decoded;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    throw new Error('Malformed encoded resource path: ' + value);
  }
  assert(!/[\x00-\x1f\\]/u.test(decoded), 'Unsafe resource path: ' + value);
  assert(!/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(decoded), 'Remote or absolute resource path: ' + value);
  return decoded;
}

export function resolveLocalResource(rootDirectory, relativePath, { allowParent = false, allowDirectory = false } = {}) {
  const root = realpathSync(rootDirectory);
  const decoded = decodedPath(relativePath);
  if (!allowParent) assert(!decoded.split('/').includes('..'), 'Path traversal in resource: ' + relativePath);
  const resolved = path.resolve(root, decoded);
  assert(inside(root, resolved), 'Resource escapes package directory: ' + relativePath);
  let real;
  try {
    real = realpathSync(resolved);
  } catch {
    throw new Error('Missing resource: ' + relativePath);
  }
  assert(inside(root, real), 'Symlink resource escapes package directory: ' + relativePath);
  const stats = statSync(real);
  assert(stats.isFile() || (allowDirectory && stats.isDirectory()), 'Resource must be a file: ' + relativePath);
  return real;
}

function jsonFile(root, relativePath) {
  const absolute = resolveLocalResource(root, relativePath);
  try {
    return record(JSON.parse(readFileSync(absolute, 'utf8')), relativePath);
  } catch (error) {
    throw new Error('Invalid JSON in ' + relativePath + ': ' + error.message);
  }
}

function filesUnder(directory) {
  const result = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules', '.pnpm-store', '.cache'].includes(entry.name)) continue;
    const filename = path.join(directory, entry.name);
    assert(!entry.isSymbolicLink(), 'Symbolic links are not packaged: ' + filename);
    if (entry.isDirectory()) result.push(...filesUnder(filename));
    else if (entry.isFile()) result.push(filename);
  }
  return result;
}

function decodeCssEscapes(css) {
  return css.replace(/\\([0-9a-f]{1,6})(?:\r\n|[ \t\r\n\f])?|\\([^\r\n])/gi, (_, hexadecimal, literal) => {
    if (hexadecimal) {
      const codepoint = Number.parseInt(hexadecimal, 16);
      assert(codepoint > 0 && codepoint <= 0x10ffff, 'Invalid CSS escape');
      return String.fromCodePoint(codepoint);
    }
    return literal;
  });
}

export function checkCssResources(root, relativeFile) {
  const filename = resolveLocalResource(root, relativeFile);
  const css = decodeCssEscapes(readFileSync(filename, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ''));
  assert(!/@import\b/i.test(css), 'CSS imports are not allowed in this self-contained pack: ' + relativeFile);
  let checked = 0;
  const urls = /\burl\s*\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*?))\s*\)/gi;
  for (const match of css.matchAll(urls)) {
    const reference = (match[1] ?? match[2] ?? match[3]).trim();
    assert(reference !== '' && !reference.startsWith('#'), 'CSS URLs must reference packaged files: ' + relativeFile);
    assert(!/[?#]/u.test(reference), 'CSS asset URLs must not use query or fragment suffixes: ' + reference);
    const assetPath = path.posix.join(path.posix.dirname(relativeFile), reference);
    // Check the raw reference first so normalization cannot hide traversal.
    decodedPath(reference);
    assert(!decodeURIComponent(reference).split('/').includes('..'), 'Path traversal in CSS URL: ' + reference);
    resolveLocalResource(root, assetPath);
    checked++;
  }
  assert((css.match(/\burl\s*\(/gi) ?? []).length === checked, 'Malformed CSS asset URL in ' + relativeFile);
  return checked;
}

export function checkSkin(root, {
  expectedId = path.basename(root),
  expectedBackgroundHash = ORIGINAL_BACKGROUND_SHA256[expectedId],
} = {}) {
  const manifest = jsonFile(root, 'skin.json');
  assert.equal(manifest.skinManifestVersion, 2, 'skinManifestVersion must be 2');
  for (const key of ['id', 'name', 'nameEn', 'version', 'author']) text(manifest[key], 'manifest.' + key);
  assert(/^[a-z][a-z0-9-]{0,31}$/.test(manifest.id), 'Invalid v2 skin id');
  assert.equal(manifest.id, expectedId, 'Manifest id must match the skin directory');
  assert(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(manifest.version), 'Invalid semantic version');
  assert.equal(manifest.license, 'Apache-2.0', 'Skin license must retain its Apache-2.0 declaration');
  const contributes = record(manifest.contributes, 'manifest.contributes');
  for (const key of Object.keys(contributes)) {
    assert(['stylesheet', 'patches', 'backgroundMedia'].includes(key), 'Unsupported or executable contribution in pure asset pack: ' + key);
  }
  assert(manifest.facets === undefined, 'Executable client facets are not allowed in this pure asset pack');
  const stylesheet = text(contributes.stylesheet, 'contributes.stylesheet');
  assert(stylesheet.endsWith('.css'), 'Stylesheet must be CSS');
  let cssAssets = checkCssResources(root, stylesheet);
  if (contributes.patches !== undefined) {
    text(contributes.patches, 'contributes.patches');
    assert(contributes.patches.endsWith('.css'), 'Patches must be CSS');
    cssAssets += checkCssResources(root, contributes.patches);
  }
  const preview = record(manifest.preview, 'manifest.preview');
  for (const theme of ['light', 'dark']) resolveLocalResource(root, text(preview[theme], 'preview.' + theme));
  const provenance = jsonFile(root, 'asset-provenance.json');
  const background = record(provenance.background, 'provenance.background');
  for (const key of ['file', 'sha256', 'source', 'authorization', 'processing']) text(background[key], 'provenance.background.' + key);
  assert(/^[0-9a-f]{64}$/.test(background.sha256), 'Background provenance must declare lowercase SHA-256');
  assert(typeof expectedBackgroundHash === 'string' && /^[0-9a-f]{64}$/.test(expectedBackgroundHash), 'No pinned original hash for skin ' + expectedId);
  assert.equal(background.sha256, expectedBackgroundHash, 'Background provenance differs from the pinned original');
  const backgroundFile = resolveLocalResource(root, background.file);
  const digest = createHash('sha256').update(readFileSync(backgroundFile)).digest('hex');
  assert.equal(digest, expectedBackgroundHash, 'Background bytes differ from the approved original');
  const media = record(contributes.backgroundMedia, 'contributes.backgroundMedia');
  for (const theme of ['light', 'dark']) {
    const declaration = record(media[theme], 'backgroundMedia.' + theme);
    assert.equal(declaration.type, 'image', 'The approved background is an image');
    assert.equal(declaration.src, background.file, 'Both themes must reference the original background');
    resolveLocalResource(root, declaration.src);
  }
  const materials = record(provenance.materials, 'provenance.materials');
  text(materials.service, 'provenance.materials.service');
  text(materials.description, 'provenance.materials.description');
  assert(Array.isArray(materials.files) && materials.files.length > 0, 'Generated material files must be recorded');
  for (const material of materials.files) {
    const value = decodedPath(material);
    assert(!value.includes('/'), 'Material records must use filenames within assets/');
    resolveLocalResource(root, 'assets/' + value);
  }
  for (const file of ['LICENSE', 'NOTICE.md', 'README.md', 'README.zh.md', 'generation-prompts.json', 'gui-verification.json', 'VERIFICATION.md']) {
    resolveLocalResource(root, file);
  }
  for (const filename of filesUnder(root)) {
    assert(!/\.(?:m?[cj]s|[ct]s|[ct]sx|html?|wasm)$/i.test(filename), 'Executable file is not allowed in a pure skin: ' + path.relative(root, filename));
  }
  return { id: manifest.id, cssAssets, backgroundSha256: digest };
}

export function checkDocumentation(root) {
  let checked = 0;
  for (const filename of filesUnder(root).filter((file) => file.toLowerCase().endsWith('.md'))) {
    const markdown = readFileSync(filename, 'utf8').replace(/```[\s\S]*?```/g, '');
    const links = [
      ...markdown.matchAll(/!?\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\s*\)/g),
      ...markdown.matchAll(/^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|([^\s]+))/gm),
    ];
    for (const match of links) {
      const url = match[1] ?? match[2];
      if (/^(?:https?:|mailto:)/i.test(url) || url.startsWith('#')) continue;
      const local = url.split(/[?#]/u)[0];
      const decoded = decodedPath(local);
      const target = path.resolve(path.dirname(filename), decoded);
      assert(inside(realpathSync(root), target), 'Documentation link escapes repository: ' + url);
      const relative = path.relative(root, target).split(path.sep).join('/');
      resolveLocalResource(root, relative || '.', { allowParent: true, allowDirectory: true });
      checked++;
    }
  }
  return checked;
}

export function checkRepository(root, { docsOnly = false } = {}) {
  for (const filename of ['README.md', 'README.en.md', 'LICENSE', 'THIRD-PARTY-NOTICES.md']) {
    resolveLocalResource(root, filename);
  }
  const results = [];
  if (!docsOnly) {
    const skinsRoot = resolveLocalResource(root, 'skins', { allowDirectory: true });
    const ids = readdirSync(skinsRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
    assert.deepEqual(ids.sort(), Object.keys(ORIGINAL_BACKGROUND_SHA256).sort(), 'Repository must contain the two declared skin directories');
    for (const id of ids) results.push(checkSkin(path.join(skinsRoot, id)));
  }
  const localLinks = checkDocumentation(root);
  return { skins: results, localLinks };
}

const scriptFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === scriptFile) {
  try {
    const flags = process.argv.slice(2);
    assert(flags.every((flag) => flag === '--docs'), 'Only --docs is supported');
    const root = path.dirname(path.dirname(scriptFile));
    const result = checkRepository(root, { docsOnly: flags.includes('--docs') });
    for (const skin of result.skins) console.log(skin.id + ': background hash and ' + skin.cssAssets + ' CSS asset references passed');
    console.log('Local documentation links passed: ' + result.localLinks);
  } catch (error) {
    console.error('Package check failed: ' + error.message);
    process.exitCode = 1;
  }
}
