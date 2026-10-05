# Verification / 验证说明

Version / 版本: 0.1.2. Updated / 更新: 2026-10-06 (Asia/Shanghai).

This revision replaces the previous background with a new landscape without characters and updates the package descriptions and artwork license name. UI ornament files are retained. CSS restores the host composer layout, removes injected narrative text, fixes message readability, fits the workspace frame to its scroll region, removes closed-panel residual corners and separates the Windows brand icon and text. The Windows titlebar shell now allows the skin background to show. Previous screenshots are excluded from the new preview set.

本版换用新生成的无人风景，并更新包描述与图片许可名称。UI 装饰沿用；CSS 恢复默认输入区布局，移除注入的叙事文案，修复消息可读性、工作区书框范围、闭合详情残角和 Windows 标志重叠，并让桌面壳正确显示皮肤背景。新预览不包含旧版截图。

## Current evidence / 本版证据

| Gate | 0.1.2 status |
| --- | --- |
| Background identity | SHA-256 matches the packaged image, asset-provenance.json, generation record and validator's pinned digest |
| Package checks | JavaScript syntax, 18/18 validator tests, 69 local documentation links and 22 CSS asset references pass |
| Official build and regression gates | Build, committed-lib consistency, hooks registry and typecheck pass; Node script tests 51/51 and Vitest 656/656 (60 files) pass |
| Official catalog/CSS gates | Final synchronized midnight-contract v0.1.2 validates; catalog/CSS safety pipeline passes for all 58 repository skins; hooks registry passes (2026-10-06) |
| Actual host previews | Official DSH 0.1.7-rc.1 isolated GUI: light/dark at 1440x900 and 390x844, 40/40 interaction checks and 2/2 restoration checks pass; no browser errors or failed asset requests |
| Composer position | Light/dark composer and stack x/y/width/height match blue-fantasy exactly; against no skin only y differs by 0.5px, all other bounds match |
| Workspace overflow | 20 real workspace groups scroll inside the frame at 1440 and 1920 widths; list/frame remain above settings; temporary registrations removed |
| Brand and panel corners | Icon/text gap is 6px; closed right panels have no border image at 1440, 1920 and 390 widths; open-panel frame remains |
| Native Windows desktop | Actual 0.2.0-rc.2 / skin center 0.4.4: normal 1280x820 and maximized 1920x1032 inspected with the skin background; installed CSS and computed styles verified |
| Native workspace overflow | Six existing groups expanded, list 458px / content 1269px, reaches scrollTop 811; list bottom 846px remains above footer 876px; original group state restored |
| Dynamic video background | Original local Wallpaper Engine video continues decoding and playing after skin switch in both themes; no duplicate video, mute retained, original preferences restored; composer text contrast 12.98:1 |
| Human visual acceptance | Pending; automation cannot establish acceptance |
| Workshop acceptance | Subject to upstream review and published catalog state |

Preview targets: [light](preview/light.jpg), [dark](preview/dark.jpg), [narrow](preview/mobile-root.png). Current host receipt: [gui-verification.json](gui-verification.json). Source identity: [asset-provenance.json](asset-provenance.json). Layout mapping: [VISUAL-CONTRACT.md](VISUAL-CONTRACT.md).

Fresh real-browser captures were taken on 2026-10-06. JPEG previews use quality 85 at device scale 1. Capture receipts pin the CSS and background hashes before and after each run. The original QA skin/theme was restored. Conversation checks reuse a real Agent journal created through a localhost deterministic SSE fixture and one read-only tool call; temporary dummy provider credentials were removed. No external provider credentials or model inference calls were used.

本次真实浏览器截图拍摄于 2026-10-06；亮暗桌面与手机四组共 40 项交互、两项恢复检查通过，原验证皮肤与主题已恢复。回执核对运行前后的 CSS 与背景哈希，未放宽断言。会话测试复用 localhost 确定性 SSE 与真实只读工具产生的 Agent 日志；临时假 provider／凭据已清除，未使用外部供应商凭据或模型推理。

Native Windows screenshots were inspected separately in the actual desktop application. Its cached stylesheets required a build-query refresh; final computed styles match the installed revision. The user's requested skin background remains active, workspace expansion/scroll state was restored, and the agent-opened DevTools was closed. Private native screenshots contain user workspace information and are not redistributed.

另在实际 Windows 桌面应用查看普通窗、最大化及六工作区滚动截图。缓存样式通过构建查询参数刷新后，计算样式与最终安装版本一致。按用户要求保留皮肤自带背景，恢复工作区展开及滚动状态，并关闭本次打开的开发工具。原生截图含用户工作区信息，仅作私有验证。

## Historical evidence / 历史证据

Earlier checks and screenshots from 2026-10-02 and 2026-10-03 apply to prior visuals and package revisions. They are historical records outside this 0.1.2 package's current evidence and cannot validate the new background, current preview set or fresh Workshop submission. Current results must be recorded after the replacement assets are installed.

2026-10-02 与 2026-10-03 的旧测试及截图属于此前视觉和包版本，作为本版当前证据之外的历史记录；不能证明新背景、当前截图或重新提交已经通过。本版结果需在新素材安装后记录。

## Limits / 验证边界

Local upstream gates ran on Windows with Node 24.13.0 and pnpm 10.32.1; upstream CI uses Ubuntu and Node 22. Class-suffix L3 selectors pass the safety pipeline with its compatibility warnings. Original Wallpaper Engine artwork is used only for local private QA and is excluded from all previews and submission files.

F11 did not change the viewport in this run; the native evidence covers normal and maximized windows, while native full screen is unverified. Two renderer crashes occurred earlier in the session; logs give no faulting module and the cause remains undetermined. No further crash was observed during the final native run. This is not evidence that the earlier crash cause was repaired.

本次 F11 未改变视口；原生证据覆盖普通窗和最大化，原生全屏尚未验证。会话前段发生过两次渲染进程崩溃，日志未给出故障模块，原因尚未确定；最终原生测试未出现新增崩溃，不能据此声称已修复此前崩溃原因。

Static package checks establish resource presence, path safety, licensing labels and file identity. They do not establish legal ownership, all host-version compatibility, external model inference, provider streaming behavior, absent plugin behavior or human visual acceptance. Official catalog/build gates, real-host captures and maintainer review are separate checks.

静态包检查验证资源、路径安全、许可标记与文件一致；不证明法律权属、全部宿主版本兼容、外部模型推理、供应商流式行为、未安装插件行为或用户视觉验收。官方目录／构建、真实宿主截图和维护者审核分别记录。
