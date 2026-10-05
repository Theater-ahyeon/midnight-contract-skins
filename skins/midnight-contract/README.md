# Midnight Contract

English | [中文](README.zh.md)

A black-and-gold contract skin for the Deepseek Harness Web GUI. Version 0.1.2 pairs an original character-free night landscape with a compact Deepseek Harness wordmark and existing AI-generated interface materials.

## Preview

| Light | Dark |
| --- | --- |
| ![Light GUI](preview/light.jpg) | ![Dark GUI](preview/dark.jpg) |

See the [narrow layout](preview/mobile-root.png). Capture origin, host version and current validation are recorded in [VERIFICATION.md](VERIFICATION.md).

## Interface

- Embossed leather sidebar, metal contract insignia, compact Deepseek Harness brand row and burgundy invitation plaque.
- Existing generated workspace folio, metal spine, feather corner and folder/session glyphs; the frame follows the native scroll-region height as workspaces expand.
- Sapphire envelope composer and red wax send seal; native attachment, permission and model controls.
- Dossier frames, dark engraved input beds, action plaques and sapphire toggle thumbs on the host's real controls.
- Ivory settings surfaces in light mode and navy surfaces in dark mode, retaining the dark sidebar and composer.
- New sessions use the host's native composer layout. Collapsed rails and narrow dialogs retain their layouts; settings navigation becomes horizontal below 600px.

## Install and remove

Copy the complete directory to `$DSH_HOME/skins/midnight-contract/`, then select it in the real GUI's Settings. `DSH_SKINS_HOME` and `DSH_SKINS_DIR` can override the location. This asset package requires the DSH Web host and skin-center v2 loader.

Choose another skin or no skin to restore host styling. The host retains Wallpaper Engine > manual background > skin background priority.

## Integration

The controller scopes styles to `html[data-dsh-skin="midnight-contract"]`. `skin.css` provides L1 tokens and L2 semantic parts; `patches.css` is the disclosed L3 layer for actual sidebar, composer, settings, provider editor, toggles and menus. Selectors use semantic attributes and class suffixes.

Optional plugin rows are decorated only when their actual plugins are available. Functional text remains DOM content, and decorative artwork does not intercept pointer events. The skin adds no conversation masthead or narrative prompts. Message surfaces provide a readable matte over dynamic backgrounds. The controller owns the composer's frost layer and tooltip positioning. The skin contains no executable hooks or remote assets.

## Artwork and license

The replacement background was generated on 2026-10-05 through Codex's built-in image_gen for this project. UI images reuse the existing OpenAI image_gen material set; editing its descriptions does not constitute a new generation. Public UI prompts are generalized, edited summaries and not verbatim historical request evidence.

The [Apache-2.0 LICENSE](LICENSE) applies to independently authored CSS and code. Backgrounds, UI images and previews use `LicenseRef-Personal-NonCommercial-Artwork`, for personal non-commercial use only. No third-party rights are granted. The project is not officially affiliated with or endorsed by dsh-skins, its maintainers or Deepseek Harness. A rights-holder objection will result in removal of affected assets and cooperation with takedown.

See [NOTICE](NOTICE.md), [source declaration](SOURCE-DECLARATION.md), [asset provenance](asset-provenance.json) and [prompt records](generation-prompts.json). Exact model names and request identifiers are not inferred.

## Development and verification

The directory originated from the upstream dsh-skins scaffold. The [independent repository](https://github.com/Theater-ahyeon/midnight-contract-skins) provides these package checks:

```sh
pnpm typecheck
pnpm test
pnpm docs:check
pnpm check
```

`typecheck` checks JavaScript syntax. Package checks, official catalog/CSS-safety gates and real-host verification have separate scopes. Current 0.1.2 status and remaining checks are in [VERIFICATION.md](VERIFICATION.md). Official Workshop listing requires maintainer acceptance.
