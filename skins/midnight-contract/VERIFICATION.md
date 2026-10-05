# Verification / 验证说明

Version / 版本: 0.1.3. Updated / 更新: 2026-10-06 (Asia/Shanghai).

This revision retains the artwork introduced or reused in 0.1.2 and changes message CSS. It protects the actual assistant body's reading matte from Wallpaper Engine neutralization, frames that body once, and replaces decorative process-summary plaques with a flat theme matte while preserving host padding, border and layout. The final-source Web GUI checks below pass; native desktop verification remains a separate gate.

本版沿用 0.1.2 的图片，仅修改消息 CSS：保护实际助手正文遮罩、移除外层重复装饰框，并将分析摘要的装饰图片改为平面主题底板，保留宿主内边距、边框和布局。最终源码的 Web GUI 检查通过；原生桌面验证另行记录。

## Current source identity / 本版源码标识

| File | SHA-256 |
| --- | --- |
| skin.css | 8169fa47d01022bc487eae532e28142ec802f1e01249791ea719ca267f2e5e37 |
| patches.css | 03e5bac10facd08084bb937df559f78e811ddbe666c72b443d09a5b96a5207f3 |
| assets/scene-approved.png | 57369a1a218c13edee81748ec1450c4200e2a605dfaeb89629ddfdd94cd6ebed |

The background was generated on 2026-10-05 and introduced in 0.1.2. Its pixels, generation record, provenance and pinned digest are unchanged in 0.1.3; no new generation is claimed.

背景于 2026-10-05 生成并在 0.1.2 引入；0.1.3 保留图片像素、生成记录、来源和固定哈希，不重新生成图片。

## Current evidence / 本版证据

| Gate | 0.1.3 status |
| --- | --- |
| Source and background identity | Final CSS and background hashes match across history, streaming and GUI runs; sourceStable is true in each |
| Package checks | JavaScript syntax, 18/18 validator tests, 69 local documentation links and 22 CSS asset references pass |
| Official loader-core gates | Build, committed-lib consistency, hooks registry and typecheck rerun and pass on unchanged core before final skin sync |
| Official final catalog/CSS gates | Final 0.1.3 manifest/CSS validates; catalog/CSS safety passes all 58 skins and the hooks registry; 111 existing suffix warnings retain the disclosed compatibility boundary |
| Actual host previews and interaction | Isolated official DSH 0.1.7-rc.1 Web GUI: light/dark at 1440x900 and 390x844, 40/40 interaction checks and 2/2 restoration checks pass; no page errors or failed requests |
| Long-reply reading matte | 8/8 history cases at 1440/1920 widths in light/dark, with skin-image and WE video; short and long bodies retain own alpha 0.93, including all four marked WE long bodies |
| Loaded style identity | Served styles match the expected official safety transform; CSSOM retains the important body-background rule |
| Streaming and completed message states | 2/2 local deterministic theme cases pass; the full 630-character output has the same SHA-256 before/after reload, with identical body x/y/width/height |
| Single assistant-body frame | Live and completed bodies retain alpha 0.93; the semantic outer wrapper has no padding, border or border image |
| Process summaries | Closed/open interaction passes in both themes; summary is visible when open, headers have no image/frame and retain their native padding with alpha 0.93 |
| Restoration | Preserved original skin/theme/background state restored; two fixture sessions archived, temporary provider and dummy key removed, stock models restored |
| Native Windows desktop | Not rerun for 0.1.3; 0.1.2 native results remain historical |
| Human visual acceptance | Pending; automation cannot establish acceptance |
| Workshop acceptance | Subject to current upstream review and published catalog state |

Fresh previews: [light](preview/light.jpg), [dark](preview/dark.jpg), [narrow](preview/mobile-root.png). Current receipt: [gui-verification.json](gui-verification.json). Source identity: [asset-provenance.json](asset-provenance.json). Layout mapping: [VISUAL-CONTRACT.md](VISUAL-CONTRACT.md).

Previews were captured against final 0.1.3 CSS on 2026-10-06. Their bytes match 0.1.2 because the changed message/process selectors are absent in an empty session. The receipt's startedAt/finishedAt window covers GUI interaction and capture only; history and streaming have separate source-stability proofs, not a shared 35-second duration.

The streaming checks use a real DSH Agent with a localhost deterministic SSE fixture and no external model inference. Process-header padding observed in Web GUI 0.1.7 was 0px closed and 0px 0px 16px expanded; that measured value is not a desktop 0.2 requirement. The CSS preserves the host's own contract.

预览于 2026-10-06 使用最终 0.1.3 CSS 重拍；空会话不含本次修改的消息／摘要选择器，因此图片字节与 0.1.2 相同。回执起止时间仅对应 GUI 交互及截图窗口，不表示历史会话和流式测试也在同一 35 秒内完成。流式测试通过实际 DSH Agent 接入本地确定性 SSE，不调用外部模型。所测 Web GUI 0.1.7 摘要行闭合内边距为 0、展开底部为 16px，不将该数值强加为桌面 0.2 标准。

## Historical evidence and contrast correction / 历史证据与对比度更正

The 0.1.2 results recorded on 2026-10-06 used skin.css d42c27d173689b86f42d5934268a9a17c3bf5fe1a21f8e3aa65d2d06170c5c85 and patches.css 024631c6a503c66174b29c88f0195ed1e4d0867841b4eacdec8d184930c0ff6c. The background digest was the same as above. Dates and hashes are retained in the receipt's compact historical object.

- The prior official baseline passed 51/51 Node script tests and 656/656 Vitest tests across 60 files, with 58 catalog skins. The local full suite was not rerun for 0.1.3; fresh final-head CI remains a separate check.
- The earlier GUI measured composer geometry against blue-fantasy/no skin and scrolled 20 fixture workspace groups. Its playback and restoration observations remain within the old revision's scope.
- Actual Windows desktop 0.2.0-rc.2 / skin center 0.4.4 was inspected with the skin image and WE disabled at normal 1280x820 and maximized 1920x1032. Six existing groups reached scrollTop 811px in a 458px list with 1269px content, above the footer. Group state was restored and agent-opened DevTools closed. Native screenshots contain workspace information and are private.

The earlier contrast checker walked to the first painted ancestor. A black ancestor is not the visible background of a transparent message over a separate video layer. Its ancestor-derived scores, including 16.172:1, did not prove that message's contrast. Direct 0.1.2 checks confirmed transparent long WE replies in both themes, so the old conversation contrast assurance is withdrawn. The separate old 12.98:1 composer value is not proof of long-reply readability.

Current checks require the reply body's own matte and calculate foreground contrast against that matte color. Current target screenshots were inspected. These are not pixel-by-pixel dynamic-video contrast measurements or sustained performance evidence.

旧官方 51/51 与 656/656 测试数量属于 0.1.2 基线，本轮没有本地重跑完整上游测试。旧原生测试使用皮肤图片且关闭 WE，其日期、哈希及范围保留为历史，不能证明 0.1.3 原生长回复或视频背景通过。旧算法沿祖先取底色，误把透明正文背后的独立视频当作祖先黑色；包括 16.172:1 在内的数字不能证明该正文可读，旧会话对比度保证已撤回。12.98:1 是旧输入框测量，不代表长回复。本版读取正文自身遮罩和前景色，并查看实际目标截图，不声称逐像素动态视频对比度或持续性能已测。

Checks and screenshots from 2026-10-02 and 2026-10-03 concern earlier visuals outside the current package and cannot validate 0.1.3.

## Limits and next gate / 验证边界与下一步

No new application launch, restart or native desktop test was performed for 0.1.3. The next native gate is inspection of the exact installed files on the user's next normal launch, including message readability and layout. Web GUI evidence cannot replace that gate.

本版未启动、重启或重新测试原生程序。下一原生门禁是在用户下次正常启动后核验实际安装的 0.1.3 布局与消息可读性；Web GUI 通过不能替代原生测试。

Native fullscreen remains unverified. Two earlier renderer crashes have an undetermined cause; available logs give no faulting module. No further crash in the historical final native run does not prove a cause was fixed.

原生全屏仍未验证；此前两次渲染进程崩溃原因尚未确定，日志未给出故障模块。本次 CSS 修复不宣称修复崩溃原因。

Scene/WebGL/webpage backgrounds, manual background-priority branches and sustained performance remain unverified. The reference Wallpaper Engine artwork is private QA material and is excluded from public previews and submission files. Local upstream checks use Windows / Node 24.13.0 / pnpm 10.32.1; upstream CI uses Ubuntu / Node 22 and must be read separately. L3 suffix selectors retain their compatibility boundary.

Static package checks establish resource presence, path safety, licensing labels and identity. They do not establish legal ownership, external model inference, provider-specific streaming, absent plugins or human acceptance. Source/static checks, real-host captures, installed-file verification, maintainer review and Workshop listing are separate gates.
