# Contributing

Keep each `skins/<id>` directory self-contained. Preserve the approved scene,
its recorded SHA-256, material provenance and per-skin license. Functional labels
and native controls remain DOM content; decorative artwork must not intercept
pointer events. No executable hooks or remote assets are included in these skins.

Run `pnpm typecheck`, `pnpm test`, `pnpm docs:check` and `pnpm check`.
The first command checks JavaScript syntax; this repository has no TypeScript
application. For CSS changes also run the official dsh-skins catalog/CSS safety
pipeline and capture the actual compatible DSH host in both themes at desktop
and narrow widths. Check workspace title/controls, Settings glyph/text separation,
collapsed rail, menus, dialogs and conversation scrolling. Package checks do
not replace real-host visual verification.

Use Conventional Commits such as `fix(skins): align workspace heading`.
Do not use emoji in code, documentation or commit messages. Keep Chinese and
English documentation consistent, and attach real verification screenshots to
user-interface changes. Official Workshop submission and acceptance are separate
from publishing this independent source repository.
