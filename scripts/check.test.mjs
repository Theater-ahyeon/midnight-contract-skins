import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { checkDocumentation, checkSkin } from './check.mjs';

function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'midnight-skin-check-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const skin = path.join(root, 'fixture-skin');
  mkdirSync(path.join(skin, 'assets'), { recursive: true });
  mkdirSync(path.join(skin, 'preview'));
  const background = Buffer.from('fixed original background fixture');
  const hash = createHash('sha256').update(background).digest('hex');
  writeFileSync(path.join(skin, 'assets', 'scene.png'), background);
  writeFileSync(path.join(skin, 'assets', 'ornament.webp'), 'ornament fixture');
  writeFileSync(path.join(skin, 'preview', 'light.jpg'), 'light screenshot fixture');
  writeFileSync(path.join(skin, 'preview', 'dark.jpg'), 'dark screenshot fixture');
  writeFileSync(path.join(skin, 'skin.css'), ":root { --ornament: url('assets/ornament.webp'); }");
  const manifest = {
    skinManifestVersion: 2,
    id: 'fixture-skin',
    name: '测试皮肤',
    nameEn: 'Fixture Skin',
    version: '0.1.0',
    author: 'Fixture Author',
    license: 'LicenseRef-Personal-NonCommercial-Artwork',
    preview: { light: 'preview/light.jpg', dark: 'preview/dark.jpg' },
    contributes: {
      stylesheet: 'skin.css',
      backgroundMedia: {
        light: { type: 'image', src: 'assets/scene.png' },
        dark: { type: 'image', src: 'assets/scene.png' },
      },
    },
  };
  const provenance = {
    background: {
      file: 'assets/scene.png',
      sha256: hash,
      source: 'Test contributor',
      authorization: 'Test authorization record',
      processing: 'Original fixture bytes',
    },
    materials: { service: 'Test generator', files: ['ornament.webp'], description: 'Test material record' },
  };
  const save = () => {
    writeFileSync(path.join(skin, 'skin.json'), JSON.stringify(manifest));
    writeFileSync(path.join(skin, 'asset-provenance.json'), JSON.stringify(provenance));
  };
  save();
  for (const name of ['LICENSE', 'NOTICE.md', 'README.md', 'README.zh.md', 'generation-prompts.json', 'gui-verification.json', 'VERIFICATION.md']) {
    writeFileSync(path.join(skin, name), name.endsWith('.json') ? '{}' : 'Fixture document');
  }
  const verify = () => checkSkin(skin, { expectedId: 'fixture-skin', expectedBackgroundHash: hash });
  return { root, skin, manifest, provenance, hash, save, verify };
}

test('accepts a self-contained asset fixture with unchanged original artwork', (t) => {
  const pack = fixture(t);
  const result = pack.verify();
  assert.equal(result.backgroundSha256, pack.hash);
  assert.equal(result.cssAssets, 1);
});

test('rejects a blanket commercial code license on the artwork package', (t) => {
  const pack = fixture(t);
  pack.manifest.license = 'Apache-2.0';
  pack.save();
  assert.throws(pack.verify, /Artwork license must declare personal non-commercial/);
});

test('rejects a manifest trying to load an existing stylesheet outside its skin', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.root, 'outside.css'), 'body {}');
  pack.manifest.contributes.stylesheet = '../outside.css';
  pack.save();
  assert.throws(pack.verify, /Path traversal/);
});

test('percent-encoded traversal cannot load an existing file outside the package', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.root, 'outside.css'), 'body {}');
  pack.manifest.contributes.stylesheet = '%2e%2e/outside.css';
  pack.save();
  assert.throws(pack.verify, /Path traversal/);
});

test('fails when a stylesheet references a missing UI material', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.skin, 'skin.css'), "body { background-image: url('assets/missing.webp'); }");
  assert.throws(pack.verify, /Missing resource: assets\/missing.webp/);
});

test('rejects a network asset even though local artwork is otherwise valid', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.skin, 'skin.css'), "body { background: url('https://example.invalid/material.png'); }");
  assert.throws(pack.verify, /Remote or absolute/);
});

test('CSS escapes cannot conceal a traversal asset reference', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.root, 'outside.webp'), 'external asset fixture');
  writeFileSync(path.join(pack.skin, 'skin.css'), "body { background: url('\\2e\\2e/outside.webp'); }");
  assert.throws(pack.verify, /Path traversal/);
});

test('a directory junction or symlink cannot expose an outside asset', (t) => {
  const pack = fixture(t);
  const outside = path.join(pack.root, 'outside');
  mkdirSync(outside);
  writeFileSync(path.join(outside, 'external.webp'), 'external fixture');
  symlinkSync(outside, path.join(pack.skin, 'assets', 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  writeFileSync(path.join(pack.skin, 'skin.css'), "body { background: url('assets/linked/external.webp'); }");
  assert.throws(pack.verify, /Symlink resource escapes/);
});

test('modifying approved background bytes invalidates the package', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.skin, 'assets', 'scene.png'), 'changed background');
  assert.throws(pack.verify, /Background bytes differ/);
});

test('changing both the image and its provenance digest cannot bypass the original pin', (t) => {
  const pack = fixture(t);
  const replacement = Buffer.from('replacement scene');
  writeFileSync(path.join(pack.skin, 'assets', 'scene.png'), replacement);
  pack.provenance.background.sha256 = createHash('sha256').update(replacement).digest('hex');
  pack.save();
  assert.throws(pack.verify, /provenance differs from the pinned original/);
});

test('missing English display name rejects an incomplete v2 manifest', (t) => {
  const pack = fixture(t);
  delete pack.manifest.nameEn;
  pack.save();
  assert.throws(pack.verify, /manifest.nameEn/);
});

test('requires the source authorization record as well as the image hash', (t) => {
  const pack = fixture(t);
  delete pack.provenance.background.authorization;
  pack.save();
  assert.throws(pack.verify, /background.authorization/);
});

test('rejects executable client facets in a declarative skin', (t) => {
  const pack = fixture(t);
  pack.manifest.facets = { client: { entry: 'hooks.mjs' } };
  pack.save();
  assert.throws(pack.verify, /Executable client facets/);
});

test('requires material attribution entries to point to existing files', (t) => {
  const pack = fixture(t);
  pack.provenance.materials.files.push('lost-seal.png');
  pack.save();
  assert.throws(pack.verify, /Missing resource: assets\/lost-seal.png/);
});

test('validates local image links and ignores external URLs without a network call', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.root, 'README.md'), '[Skin](fixture-skin/README.md)\n![Actual screenshot](fixture-skin/preview/dark.jpg)\n[External](https://example.invalid/)');
  assert.equal(checkDocumentation(pack.root), 2);
});

test('missing screenshot links fail the documentation gate', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.root, 'README.md'), '![Missing screenshot](missing.png)');
  assert.throws(() => checkDocumentation(pack.root), /Missing resource: missing.png/);
});

test('documentation links cannot escape the repository boundary', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.root, 'outside.md'), 'External document fixture');
  writeFileSync(path.join(pack.skin, 'README.md'), '[Outside](../outside.md)');
  assert.throws(() => checkDocumentation(pack.skin), /Documentation link escapes/);
});

test('bilingual documents may link to a shared license within the repository', (t) => {
  const pack = fixture(t);
  writeFileSync(path.join(pack.root, 'LICENSE'), 'Project license fixture');
  writeFileSync(path.join(pack.skin, 'README.md'), '[Project license](../LICENSE)');
  assert.equal(checkDocumentation(pack.root), 1);
  assert.equal(readFileSync(path.join(pack.root, 'LICENSE'), 'utf8'), 'Project license fixture');
});
