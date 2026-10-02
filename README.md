# 零点契约 · Deepseek Harness 皮肤

[English](README.en.md)

两套独立的纯素材皮肤，为 Deepseek Harness Web GUI 定制黑金龙纹契约簿、金属徽记、绯红邀约底板、蓝宝石信封输入框和羊皮纸入口。月下古堡与夜城共享组件语言，分别保留各自经授权的原始背景。

版头品牌为 **Deepseek Harness**，左上角不放人物头像；64px 品牌行、工作区标题与操作按钮、金属书脊各自保留清晰空间。背景、纹理、导航徽记与封蜡素材由 CSS 和皮肤中心加载，按钮仍是宿主的真实交互控件。

| 皮肤 | ID | 详细说明 |
| --- | --- | --- |
| 月下古堡 | `midnight-contract` | [皮肤说明](skins/midnight-contract/README.zh.md) |
| 夜城 | `midnight-contract-city` | [皮肤说明](skins/midnight-contract-city/README.zh.md) |

## 真实界面

以下是 DSH 0.1.7-rc.1 官方 Web GUI 的真实截图，包含亮暗主题和实际组件；不是生图设计稿。

| 月下古堡 · 暗色 | 夜城 · 暗色 |
| --- | --- |
| ![月下古堡暗色界面](skins/midnight-contract/preview/dark.jpg) | ![夜城暗色界面](skins/midnight-contract-city/preview/dark.jpg) |

| 月下古堡 · 亮色 | 夜城 · 亮色 |
| --- | --- |
| ![月下古堡亮色界面](skins/midnight-contract/preview/light.jpg) | ![夜城亮色界面](skins/midnight-contract-city/preview/light.jpg) |

[会话与代码块截图](skins/midnight-contract/preview/conversation-code-dark.png)、[模型配置截图](skins/midnight-contract/preview/models-dark.png)与[窄屏截图](skins/midnight-contract/preview/mobile-root.png)也随包保留。会话内容经真实 Agent 与只读工具处理，使用明确标记的本地协议 fixture，没有外部模型推理，也没有注入 DOM 伪造回复。

真实 GUI 回归留存 80 项通过记录，覆盖 1440×900 桌面与 390×844 窄屏、亮暗主题、品牌宽度、无头像品牌行、工作区动作、输入框、菜单、模型设置、折叠侧栏和恢复默认样式。详见两版的 [月下古堡验证记录](skins/midnight-contract/VERIFICATION.md)与[夜城验证记录](skins/midnight-contract-city/VERIFICATION.md)。这不代表所有模型供应商、所有 DSH 版本或用户的最终视觉验收。

## 安装两套皮肤

需要 Deepseek Harness 的 Web GUI 和 skin-center v2 加载器。本次真实宿主验证版本为 DSH 0.1.7-rc.1。这个仓库没有独立 HTML 应用、后端、执行 hook 或宿主插件安装器。

1. 下载或克隆本仓库。
2. 将 `skins/midnight-contract` 和 `skins/midnight-contract-city` 两个完整目录复制到宿主的用户皮肤目录，通常是 `$DSH_HOME/skins/`。
3. 在真实 GUI 中打开 **设置 > 皮肤**，选择“月下古堡”或“夜城”。目录结构应为 `skins/<id>/skin.json`，不要多套一层仓库目录。

皮肤目录优先级为 `DSH_SKINS_HOME`、`DSH_SKINS_DIR`、宿主解析的 `DSH_HOME/skins`。普通安装默认通常在用户目录的 `.dsh/skins`；自定义安装/profile 请以宿主实际目录为准。

Windows 示例：先把 `$skinHome` 设置为真实宿主目录，再复制。从仓库根目录执行：

```powershell
$skinHome = Join-Path $env:USERPROFILE '.dsh\skins'
New-Item -ItemType Directory -Force -Path $skinHome | Out-Null
Copy-Item -LiteralPath '.\skins\midnight-contract' -Destination $skinHome -Recurse
Copy-Item -LiteralPath '.\skins\midnight-contract-city' -Destination $skinHome -Recurse
```

Linux/macOS 普通默认安装示例；自定义 `DSH_HOME` 或皮肤目录时相应调整目标：

```sh
mkdir -p "$HOME/.dsh/skins"
cp -R skins/midnight-contract skins/midnight-contract-city "$HOME/.dsh/skins/"
```

先切换到另一套皮肤或默认样式，再删除不需要的皮肤目录。皮肤不会改写模型配置、凭据或宿主启动配置。Wallpaper Engine、手动背景和皮肤背景的优先级仍由宿主皮肤中心决定。本仓库独立分发，不代表已进入官方创意工坊。

## 素材与许可

独立样式、仓库脚本及经贡献者确认授权的供图/生成素材使用 [Apache-2.0](LICENSE)。两套皮肤保留各自的 [月下古堡 NOTICE](skins/midnight-contract/NOTICE.md)、[夜城 NOTICE](skins/midnight-contract-city/NOTICE.md)、素材来源记录和生成提示词。旧 Steam Workshop 壁纸不在分发包中。

上游 dsh-skins 的契约与脚手架归属、BSD-3-Clause 全文及版权保留在 [第三方声明](THIRD-PARTY-NOTICES.md)。项目不主张龙族系列或人物权利，也不暗示官方背书。来源记录是贡献者的授权声明，检查器不能替代法律权利核验。

## 本仓库的质量检查

需要 Node.js 24 或更新版本，以及 pnpm 11.24.0。检查器只使用 Node 内建模块，没有运行时或开发依赖。

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
pnpm test
pnpm docs:check
pnpm check
```

| 命令 | 实际检查 |
| --- | --- |
| `typecheck` | 使用 `node --check` 检查两个 JavaScript 文件的语法；不是 TypeScript 类型检查 |
| `test` | 验证器失败回归：路径越界、编码/转义绕过、外链、缺失素材、链接越界和原图篡改 |
| `docs:check` | 本仓库 Markdown 本地链接与截图文件存在且不越界；不联网核验外链 |
| `check` | 两版 v2 必填字段、纯素材约束、CSS 资源、原图固定 SHA-256、来源记录与本地文档 |

校验同时比对背景文件、`asset-provenance.json` 和检查器固定记录的原图哈希；一起替换图片与来源记录也会失败。目录跳转与符号链接不能将资源指向皮肤外部。这是本包的验收检查器，不是 DSH 完整 schema/CSS 安全解析器，也不会重新执行浏览器验收。

GitHub 工作流为本仓库运行同样的命令。旧上游 CI 结果不代表这个仓库已通过；实际运行状态以本仓库 Actions 为准。
