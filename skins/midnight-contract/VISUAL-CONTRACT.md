# Visual contract / 视觉契约

Version 0.1.3 retains the character-free night landscape introduced in 0.1.2 and the existing black-and-gold UI artwork. This revision changes message CSS: the actual assistant body receives one dossier frame and a protected reading matte; the semantic message wrapper is no longer decorated again. Artwork pixels, generation dates and recorded background SHA-256 are unchanged. Process summaries use a flat theme matte and native padding/border, with no decorative plaque. Final-source Web GUI checks pass: eight history cases, two streaming cases and 40 interactions.

| Requirement | Implementation |
| --- | --- |
| Landscape background | assets/scene-approved.png retained from 0.1.2; packaged SHA-256 in asset-provenance.json; both themes use the same file |
| Brand row | Deepseek Harness wordmark, native collapse action and existing 64px layout |
| Contract sidebar | Embossed leather folio, burgundy invitation plate, geometric metal insignia and independent icons |
| Workspace archive | Nine-slice folio follows the actual scroll-region height; the host owns scrolling |
| Sapphire composer | Envelope frame paints behind native controls; wax send seal retains native size and host layout determines its position |
| Settings | Dossier frame, engraved input beds, action plaques and sapphire thumb around native sections |
| Assistant reply | One frame on the actual body inside assistant-step; the semantic message wrapper is not framed again |
| Reading matte | Theme-specific approximately 93% opaque body color protected from Wallpaper Engine surface neutralization; verify the body's own alpha rather than an ancestor color |
| Process summaries | Flat theme matte and no image/frame; host padding, border and layout are retained |
| Tool and code surfaces | Decorative frames remain on the actual host tool and code surfaces |
| Responsive layout | Existing desktop, collapsed and narrow styles; current validation in VERIFICATION.md |
| Background ownership | Host controller retains Wallpaper Engine/manual/skin priority |

Workspace and model names, messages, plugin availability, permissions and settings order come from the host. Conversation mastheads and narrative prompts are not injected. Decorations do not create functions or replace live controls. The controller owns frost layers and playback; the skin does not change core background detection.

0.1.3 保留 0.1.2 引入的无人夜景和既有黑金 UI 图片，不改变图片像素、生成日期或记录中的背景 SHA-256。本次仅修改消息 CSS：实际助手正文使用一层契约框及阅读遮罩，语义消息外层不再重复套框；亮暗主题约 93% 不透明的正文底色增加 Wallpaper Engine 清除保护。分析摘要使用平面主题底板，移除装饰图片和边框，保留宿主内边距及布局。可读性检查读取正文自身遮罩，不能用祖先底色代替动态媒体。

宿主实际文案、功能和交互保持原有来源。图片哈希、自动检查、真实宿主截图和用户视觉验收分别记录；最终 0.1.3 Web GUI 的 8 项历史会话、2 项流式和 40 项交互检查通过；原生复测及剩余门禁状态见 [VERIFICATION.md](VERIFICATION.md)。
