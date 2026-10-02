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

Catalog/CSS safety (55 entries), hooks, typecheck, build and generated-lib drift checks pass. Script tests pass 27/27. The untouched dsh-web baseline passes typecheck and docs:check; dsh-skins has no docs:check command.

The contribution's earlier [Ubuntu CI](https://github.com/zhu1090093659/dsh-skins/actions/runs/36917452138) passed all 776 tests and repository gates. Current branch checks and review status are on [PR #33](https://github.com/zhu1090093659/dsh-skins/pull/33/checks).

Complete local tests remain environment-limited: Windows passes 775/776 with an existing file-symlink EPERM. Genuine Linux on task-only NTFS passes that symlink test and the previous mtime/cache assertions, but passes 775/776 with the original LRU scan's unchanged 30-second timeout. The dsh-web baseline retains two Windows symlink permission failures. No application source, assertion, timeout, clock or global setting was changed to conceal these failures. CI and local results are separate evidence.

External model inference, arbitrary provider streaming behavior and optional plugins absent from the minimal profile remain untested. Protocol-fixture captures establish actual UI rendering and tool execution, not model intelligence or provider compatibility. Automation does not imply user acceptance or perfect artistic equivalence.

## 中文说明

两版真实宿主覆盖亮暗、桌面／手机、设置、模型、菜单、开关、草稿、侧栏与详情，并验证默认／无皮肤恢复。另有 8 组真实消息、代码、表格与只读工具回执检查，确认生图材质生效、长内容可滚动且页面不横溢出。对话明确标注本地协议 Fixture，经过官方 Agent 与真实工具，不代表真实模型推理；临时路由及虚拟测试凭据已清理。原背景哈希一致。

本地全套测试保留平台权限和文件扫描超时，未通过改测试掩盖。Ubuntu CI 全套通过与本地未全绿分别记录。外部推理、未安装插件及用户视觉验收属于剩余验证边界。

## 0.1.1 alignment revision

The latest 80-check GUI run additionally measures the exact Deepseek Harness wordmark fit, a portrait-free 64px brand row, workspace heading clearance from the folio spine and engraved rule, label/action vertical centers, and the Settings text clearance from the generated raven. The duplicate gear is hidden in the expanded sidebar and restored in the native compact rail. Checks wait for the actual collapsed state before inspecting the rail. All assertions pass in both skins, both themes and both viewport sizes. Direct component captures: [workspace](preview/workspace-dark.png), [Settings entry](preview/settings-entry-dark.png).

The focused upstream CSS safety/class coverage/builtin tests pass 126/126 after these changes. Independent repository syntax, validator tests, docs and asset-integrity checks are distinct from the upstream host full-suite and CI history described above.
