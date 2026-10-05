# 零点契约 · Deepseek Harness 皮肤

[English](README.en.md)

一套独立的纯素材皮肤，为 Deepseek Harness Web GUI 提供黑金皮革侧栏、金属契约徽记、绯红邀约底板、蓝宝石信封输入框和羊皮纸入口。0.1.2 合并为单一皮肤，使用新生成的无人风景，恢复默认输入区位置，并改善动态壁纸上的消息可读性。

皮肤 ID 为 `midnight-contract`，显示名为 **零点契约 / Midnight Contract**。[详细说明](skins/midnight-contract/README.zh.md)记录界面组件及接入范围。

## 预览与验证

| 亮色 | 暗色 |
| --- | --- |
| ![亮色界面](skins/midnight-contract/preview/light.jpg) | ![暗色界面](skins/midnight-contract/preview/dark.jpg) |

另见[窄屏界面](skins/midnight-contract/preview/mobile-root.png)。截图来源、宿主版本与 0.1.2 当前检查状态见[验证说明](skins/midnight-contract/VERIFICATION.md)。旧版测试和截图不证明新背景已通过验收。

## 安装与恢复

需要 Deepseek Harness Web GUI 和 skin-center v2 加载器。

1. 下载或克隆本仓库。
2. 将完整的 `skins/midnight-contract` 复制到宿主用户皮肤目录，通常为 `$DSH_HOME/skins/`。
3. 在 GUI 中打开 **设置 > 皮肤**，选择“零点契约”。目录结构为 `skins/midnight-contract/skin.json`。

皮肤路径优先级为 `DSH_SKINS_HOME`、`DSH_SKINS_DIR`、宿主解析的 `DSH_HOME/skins`。默认通常在用户目录的 `.dsh/skins`；自定义 profile 以实际宿主目录为准。

Windows 示例，从仓库根目录执行；按实际安装调整 `$skinHome`：

```powershell
$skinHome = Join-Path $env:USERPROFILE '.dsh\skins'
New-Item -ItemType Directory -Force -Path $skinHome | Out-Null
Copy-Item -LiteralPath '.\skins\midnight-contract' -Destination $skinHome -Recurse
```

Linux/macOS 默认安装示例：

```sh
mkdir -p "$HOME/.dsh/skins"
cp -R skins/midnight-contract "$HOME/.dsh/skins/"
```

删除皮肤目录前先切回其他皮肤或默认样式。背景优先级由宿主控制器管理：Wallpaper Engine > 用户手动背景 > 皮肤背景。创意工坊收录以维护者审核及实际目录结果为准。

## 素材与许可

独立 CSS 与仓库代码使用 [Apache-2.0](LICENSE)。背景、UI 图片及相关预览按 `LicenseRef-Personal-NonCommercial-Artwork` 仅供个人非商业使用。代码许可不授予图片商业使用权或第三方权益。项目与 dsh-skins、维护者及 Deepseek Harness 无官方关联或背书；权利人提出异议时移除相关素材并配合下架。

无人背景于 2026-10-05 通过 Codex 内置 image_gen 新生成，用户指定的 Steam 创意工坊壁纸仅作为视觉参考，不复制其素材进入分发包，也不主张其所有权。UI 图片沿用已有 AI 生成素材；公开 UI 提示词是明确标记的编辑摘要，而非历史请求逐字回执。详见[NOTICE](skins/midnight-contract/NOTICE.md)、[来源声明](skins/midnight-contract/SOURCE-DECLARATION.md)、[文件哈希](skins/midnight-contract/asset-provenance.json)及[提示词记录](skins/midnight-contract/generation-prompts.json)。确切模型名和请求编号不作推测。

上游 dsh-skins 的契约与脚手架归属、BSD-3-Clause 全文及版权保留在[第三方声明](THIRD-PARTY-NOTICES.md)。来源声明与自动检查不能代替法律权利核验。

## 质量检查

使用 Node.js 24 或更新版本，以及 pnpm 11.24.0。检查器仅使用 Node 内建模块，无额外依赖。

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
pnpm test
pnpm docs:check
pnpm check
```

| 命令 | 检查范围 |
| --- | --- |
| `typecheck` | 两个 JavaScript 文件的语法 |
| `test` | 路径越界、编码及转义绕过、外链、缺失素材、许可和背景校验的失败回归 |
| `docs:check` | Markdown 本地链接与截图文件存在且不越界 |
| `check` | v2 字段、纯素材约束、CSS 资源、固定 SHA-256、来源与文档 |

背景文件、来源记录和检查器固定哈希必须一致；背景替换需要明确同步三者。资源不得通过路径跳转或符号链接越出皮肤目录。包检查、官方目录／CSS 安全门禁、真实浏览器验证、维护者审核和用户视觉验收分别记录。本仓库 Actions 运行同样检查，实际状态以工作流结果为准。
