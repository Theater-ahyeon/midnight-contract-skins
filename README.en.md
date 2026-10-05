# Midnight Contract · Deepseek Harness skin

[中文](README.md)

A self-contained asset skin for the Deepseek Harness Web GUI, with black-and-gold leather panels, metal contract emblems, burgundy invitation plaques, a sapphire-envelope composer, wax seals and parchment navigation. Version 0.1.2 consolidates the package into one skin with a newly generated landscape without characters, restores native composer positioning and improves message readability over dynamic wallpapers.

The skin ID is `midnight-contract`, displayed as **零点契约 / Midnight Contract**. See the [skin documentation](skins/midnight-contract/README.md) for components and integration scope.

## Previews and verification

| Light | Dark |
| --- | --- |
| ![Light GUI](skins/midnight-contract/preview/light.jpg) | ![Dark GUI](skins/midnight-contract/preview/dark.jpg) |

See the [narrow layout](skins/midnight-contract/preview/mobile-root.png). Capture origin, host version and current 0.1.2 checks are in [VERIFICATION.md](skins/midnight-contract/VERIFICATION.md). Historical tests and captures do not validate the replacement background.

## Install and restore

Use the Deepseek Harness Web GUI with the skin-center v2 loader.

1. Download or clone this repository.
2. Copy the complete `skins/midnight-contract` directory into the host's user skin directory, usually `$DSH_HOME/skins/`.
3. Open **Settings > Skins** in the GUI and select Midnight Contract. The layout must be `skins/midnight-contract/skin.json`.

Directory precedence is `DSH_SKINS_HOME`, `DSH_SKINS_DIR`, then the host-resolved `DSH_HOME/skins`. A default installation usually uses `.dsh/skins` under your home directory; use the actual location for custom profiles.

Windows example from this repository's root; adjust `$skinHome` to the actual host directory:

```powershell
$skinHome = Join-Path $env:USERPROFILE '.dsh\skins'
New-Item -ItemType Directory -Force -Path $skinHome | Out-Null
Copy-Item -LiteralPath '.\skins\midnight-contract' -Destination $skinHome -Recurse
```

Linux/macOS default installation example:

```sh
mkdir -p "$HOME/.dsh/skins"
cp -R skins/midnight-contract "$HOME/.dsh/skins/"
```

Switch to another skin or the default appearance before deleting its directory. The host owns background priority: Wallpaper Engine > manual background > skin background. Official Workshop availability depends on maintainer review and the published catalog.

## Artwork and licenses

Independent CSS and repository code use [Apache-2.0](LICENSE). Backgrounds, UI images and related previews are for personal non-commercial use under `LicenseRef-Personal-NonCommercial-Artwork`. The code license grants no commercial artwork use or third-party rights. The project is not officially affiliated with or endorsed by dsh-skins, its maintainers or Deepseek Harness. A rights-holder objection will result in removal of affected assets and cooperation with takedown.

The replacement landscape was generated on 2026-10-05 through Codex's built-in image_gen. The user-selected Steam Workshop wallpaper provides visual reference only; its assets are not copied into this package, and no ownership of it is claimed. Existing AI-generated UI ornaments are reused. Public UI prompts are edited summaries rather than verbatim historical requests. See [NOTICE](skins/midnight-contract/NOTICE.md), [source declaration](skins/midnight-contract/SOURCE-DECLARATION.md), [file hashes](skins/midnight-contract/asset-provenance.json) and [prompt records](skins/midnight-contract/generation-prompts.json). Exact model names and request identifiers are not inferred.

[Third-party notices](THIRD-PARTY-NOTICES.md) preserve upstream contract/scaffold attribution, BSD-3-Clause text and copyright. Source declarations and automated checks cannot establish legal ownership.

## Quality gates

Use Node.js 24 or newer and pnpm 11.24.0. The validator uses only Node built-ins, without additional dependencies.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
pnpm test
pnpm docs:check
pnpm check
```

| Command | Scope |
| --- | --- |
| `typecheck` | Syntax of both JavaScript files |
| `test` | Regressions for path escapes, encoded/escaped bypasses, remote URLs, missing assets, artwork licensing and pinned backgrounds |
| `docs:check` | Existing repository-local Markdown/image targets within the repository |
| `check` | v2 manifest, pure-asset constraints, CSS resources, pinned SHA-256, provenance and documentation |

Background bytes, provenance and fixed validator hashes must agree; an authorized replacement updates all three. Traversal and symlinks cannot make resources leave the package. Package checks, official catalog/CSS gates, real-browser verification, maintainer review and human visual acceptance are separate evidence. The repository's Actions runs the same checks; consult its workflow results for actual status.
