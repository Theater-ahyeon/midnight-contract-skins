# Verification / 验证说明

Actual captures from the official DSH 0.1.7-rc.1 Web GUI in an isolated profile on 2026-10-02. They are browser screenshots, not generated mockups. Both themes were exercised at 1440×900 and 390×844.

## GUI evidence

- The two-skin interaction matrix passed 80 checks and two restoration checks: settings/models, opaque menus, actual sapphire switch toggle/restore, drafts, sidebar collapse/reopen, details expansion and persisted activation.
- A separate eight-case conversation matrix exercised real session messages, Markdown, code, tables and actual readonly read-tool receipts. Long conversations reach the tail; long code scrolls inside its code block without page overflow.
- The conversation content is clearly labeled a deterministic local OpenAI SSE protocol fixture, not model inference. It went through the official Agent, tool execution, session journal and renderer; no DOM injection or external model call was used. The temporary provider and dummy test credential were removed.
- Computed styles and assertions confirm the generated dossier material on actual assistant/tool/code nodes and field-bed material on code banners. Zero browser page errors, zero failed asset requests in the interaction matrix and zero conversation page overflow.
- Default/no-skin switching removes Midnight Contract styles. Both test helpers restore the original QA skin/theme. Standard previews are direct browser JPEGs; state evidence is native PNG output.

Machine-readable evidence: [gui-verification.json](gui-verification.json). Screens: [preview/](preview/). Design mapping: [VISUAL-CONTRACT.md](VISUAL-CONTRACT.md).

## Automated gates and boundaries

Catalog/CSS safety (55 entries), hooks, typecheck, build and generated-lib drift checks pass. Script tests pass 27/27. The untouched dsh-web baseline passes local typecheck, its complete test suite and docs:check; dsh-skins has no docs:check command.

The contribution's earlier [Ubuntu CI](https://github.com/zhu1090093659/dsh-skins/actions/runs/36917452138) passed all 776 tests and repository gates. Current branch checks and review status are on [PR #33](https://github.com/zhu1090093659/dsh-skins/pull/35/checks).

Complete local gates passed on 2026-10-02 in an isolated Debian 12 / Node 22.23.3 / pnpm 11.24.0 environment on native ext4, launched by WSL 3.0.1 with kernel 6.18.40.1. `pnpm test --maxWorkers=1` passed all 776 tests across 53 files in 22.16 seconds; all 27 script tests and the catalog, hooks, typecheck and build gates also passed. Before/after SHA-256 checks found zero changes in 249 contribution source, test, script, generated-library, lockfile and skin files at `451544867635db545cf3fc098df0b024fd05c6e0`.

The unchanged dsh-web baseline at `c42e3d249ad150a4202355b5dd8be72d390602c5` passed typecheck in all 18 workspace projects, complete tests (3244 passed, 14 pre-existing skips) and docs:check in the same local environment. Its test command was `pnpm --workspace-concurrency=1 -r --no-bail test --maxWorkers=1`; worker counts were bounded, with original assertions and timeouts intact. Before/after SHA-256 checks found zero changes in 891 baseline source, test, script and dependency-contract files. Git, ssh-keygen, real device bindings and a read-only proc mount provide the tools and process metadata required by the original suites.

Earlier local attempts are historical failures: Windows reported symlink EPERM, the older Linux environment reported immediate directory-mtime/cache failures, and Linux fixtures on NTFS exceeded the original 30-second LRU scan timeout. The repaired environment clears task-owned residue from a backed-up full WSL distribution, uses separate task-owned ext4 images and upgrades WSL through the official installer with the contributor's explicit approval. Source, assertions, timeouts and the clock were not changed, and no tests were manually skipped. Native Windows symlink policy remains unchanged. These local results are separate from Ubuntu CI evidence.

External model inference, arbitrary provider streaming behavior and optional plugins absent from the minimal profile remain untested. Protocol-fixture captures establish actual UI rendering and tool execution, not model intelligence or provider compatibility. Automation does not imply user acceptance or perfect artistic equivalence.

## 中文说明

两版真实宿主覆盖亮暗、桌面／手机、设置、模型、菜单、开关、草稿、侧栏与详情，并验证默认／无皮肤恢复。另有 8 组真实消息、代码、表格与只读工具回执检查，确认生图材质生效、长内容可滚动且页面不横溢出。对话明确标注本地协议 Fixture，经过官方 Agent 与真实工具，不代表真实模型推理；临时路由及虚拟测试凭据已清理。原背景哈希一致。

2026-10-02 修复运行环境后，本地原生 ext4 / Node 22 全套皮肤测试 776/776、脚本测试 27/27 通过；未修改的 dsh-web 基线完成全部 18 个工作区的类型检查、完整测试（3244 通过，14 项上游原有跳过）和文档检查。测试前后分别核验 249 与 891 个文件，源码、断言、超时及素材哈希一致。旧的 Windows 权限、目录时间戳和 NTFS 扫描失败保留为历史记录；没有改测试或时钟掩盖问题，也没有改变 Windows 原生符号链接策略。经授权升级 WSL 并使用隔离 ext4 环境后，本地门禁已完成，CI 仍单独记录。外部推理、未安装插件及用户视觉验收属于剩余验证边界。

## 0.1.1 alignment revision

The latest 80-check GUI run additionally measures the exact Deepseek Harness wordmark fit, a portrait-free 64px brand row, workspace heading clearance from the folio spine and engraved rule, label/action vertical centers, and the Settings text clearance from the generated raven. The duplicate gear is hidden in the expanded sidebar and restored in the native compact rail. Checks wait for the actual collapsed state before inspecting the rail. All assertions pass in both skins, both themes and both viewport sizes. Direct component captures: [workspace](preview/workspace-dark.png), [Settings entry](preview/settings-entry-dark.png).

The focused upstream CSS safety/class coverage/builtin tests pass 126/126 after these changes. Independent repository syntax, validator tests, docs and asset-integrity checks are distinct from the upstream host full-suite and CI history described above.

## Fresh upstream resubmission / 最新基线重新提交

On 2026-10-03 the unchanged visual packages were submitted from upstream main 13deb94. Fresh local native-ext4 gates pass: 788/788 tests across 54 files, 51/51 script tests, 57-entry catalog, typecheck, hooks and build. Before/after hashes cover 1051 source, skin and evidence files with zero drift. Four packaged light/dark screenshots are copied byte-for-byte under evidence in the submission. Both AI-origin declarations and personal non-commercial character-art notices are included. The new Workshop submission is PR 35; the earlier PR 33 was closed, not merged.

2026-10-03 基于上游最新 main 13deb94 重新提交，本地完整测试 788/788、脚本测试 51/51、57 套目录、类型、hooks 和构建通过，1051 文件测试前后无漂移。两套来源与非商业声明已补齐，四张真实亮暗截图原样提交到 evidence。新提交为 PR 35，原 PR 33 已关闭而未合并；图片和样式未改变。
