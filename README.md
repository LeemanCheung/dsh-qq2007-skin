<p align="center">
  <img src="docs/screenshot.png" alt="DSH 0.1.0-rc.6 中运行的 QQ 2007 复古皮肤" width="100%">
</p>

<div align="center">

# dsh-qq2007-skin

**把 DSH Web GUI 变成 2007 年蓝色即时通讯窗口，同时保留全部原生交互。**

[English](README.en.md) · [架构](docs/ARCHITECTURE.md) · [美术方向](assets/ART_DIRECTION.md) · [兼容性](docs/COMPATIBILITY.md)

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re) [![awesome · DSH plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com) [![CI](https://github.com/LeemanCheung/dsh-qq2007-skin/actions/workflows/ci.yml/badge.svg)](https://github.com/LeemanCheung/dsh-qq2007-skin/actions/workflows/ci.yml)
![license](https://img.shields.io/github/license/LeemanCheung/dsh-qq2007-skin)
![dsh](https://img.shields.io/badge/DSH-0.1.0--rc.6-1269bb)

</div>

> [!IMPORTANT]
> 这是独立、非官方的怀旧视觉项目，与腾讯、QQ、DeepSeek 均无隶属、授权或背书关系。仓库不包含 QQ Logo、企鹅形象、历史图标、历史音效或主题文件；机器人、窗框、工具栏、壁纸和可选合成双音均为本项目原创。详见 [NOTICE](NOTICE.md)。

## 特性

- **真正的 2007 桌面客户端质感**：常驻蓝色应用标题栏、XP 高光与 1px 压边、全宽联系人分组、扁平消息区、矩形输入框、经典凹槽滚动条和底部状态栏。
- **复古账号资料卡**：把 DSH 原生 Logo 行装饰成机器人头像、产品字标和事实性“本地用户 · 皮肤启用”状态，不替换原有新会话与侧栏开关。
- **联系人与消息层级**：压缩会话行，强化原生状态槽与时间信息；消息区常显原生时间元数据，以昵称标题、细分隔线和助手侧边线代替现代大气泡。
- **经典文字发送按钮**：保留 DSH 原生提交按钮、处理器、禁用状态和无障碍名称，只把外观改成 2007 风格高光矩形控件，不伪造下拉菜单。
- **可选原创双音**：默认关闭并在开启时试听一次；之后在点击原生发送按钮或 Enter 令输入框进入提交流程时，用 Web Audio 合成约 0.18 秒的操作提示。它不是送达成功反馈，也不包含历史录音或音频文件。
- **Codex 原创生图资产**：使用原生 `gpt-image-2` 生成机器人与 CRT、蓝色玻璃窗框、八枚复古工具图标和房间/天空壁纸；prompt 与调用记录全部提交，可追溯且运行时离线。
- **三栏语义映射**：DSH 原生 sidebar / conversation / details 分别呈现为联系人列表、消息窗口和伙伴资料区，不复制业务数据。
- **72 个原生主题 token**：通过官方 `ctx.theme.register()` 接入，不修改 DSH 安装包，也不开 CDP 调试端口。
- **原生交互保留**：会话、模型、附件、发送、工具卡、设置和详情面板仍由 DSH 自己处理。
- **可切换、可撤销**：首次安装自动启用；在 **设置 → 通用 → QQ 2007 复古皮肤** 一键恢复切换前的系统外观。
- **真实本地状态**：状态栏只显示本地视觉层、可选提示音和浏览器时钟，不伪造模型、额度、连接或 Agent 状态。
- **可访问与响应式**：支持 `prefers-reduced-motion`、高对比色模式；窄屏自动撤掉额外窗框和装饰工具栏。
- **隐私安全**：只在浏览器 `localStorage` 保存皮肤开关、提示音开关与切换前的系统主题偏好；不复制、留存或传输提示词、回复、会话、文件或凭据。提示音仅检查原生输入框在 Enter 前后是否由非空变为空。

## 兼容性与恢复

- 基线为 DSH `0.1.0-rc.6`、Node.js 20+ 和支持 CSS 自定义属性的现代 Chromium、Firefox 或 WebKit；可选提示音还需要可用的 Web Audio。浏览器不支持或阻止音频时，皮肤保持静音而不会影响聊天。
- `dsh.bundle`、主题 token、`theme/change` 和通用设置 Slot 是稳定扩展点；用于细节装饰的 CSS-module 后缀选择器，以及完整窗框所用的 `:has()`/WebKit 滚动条样式属于 best-effort。DSH Shell 改版时，原生主题和设置开关仍会保留，但部分装饰可能需要更新。
- 窄于 1180 px 时隐藏装饰标题图标；不超过 800 px 时移除额外窗框、边距、输入框装饰与状态条。`prefers-reduced-motion` 会停用伙伴动效并缩短过渡，`forced-colors` 则恢复系统边框。
- 没有 YAML 配置项。外观、提示音和此前内置主题只存于当前浏览器的 `localStorage`：`dsh-qq2007-skin:enabled`、`dsh-qq2007-skin:sound` 和 `dsh-qq2007-skin:previous-theme`。清除站点数据会恢复首次安装默认值（外观开、声音关）；第三方自定义主题不会作为可恢复主题保存，恢复时仅回到此前的内置 `light`、`dark` 或 `system`。
- 皮肤自有设置项和状态栏目前固定为中文。点击发送提示音只识别原生中文 `发送消息` 与英文 `Send message` 无障碍标签；其他界面语言下，Enter 提交仍会在 DSH 清空非空草稿后触发提示音，但按钮点击可能保持静音。
- 首选 **设置 → 通用 → QQ 2007 复古皮肤 → 系统外观** 恢复；设置页不可用时，卸载插件并重启 `dsh web` 即会移除全部主题注册、CSS、DOM 装饰、监听器、计时器和可选 AudioContext。

上图为隔离 DSH `0.1.0-rc.6` profile 的真实 Chromium 截图。四份 Codex 生图资产的运行时版本：

<table><tr><td width="36%"><img src="assets/runtime/retro-buddy-stage.webp" alt="原创蓝色机器人与 CRT"></td><td><img src="assets/runtime/blue-glass-chrome.webp" alt="原创蓝色玻璃窗框材质"><br><img src="assets/runtime/retro-toolbar-icons.webp" alt="八枚原创复古工具图标"><br><img src="assets/runtime/buddy-room-wallpaper.webp" alt="原创复古房间天空壁纸"></td></tr></table>

## 安装

```sh
dsh plugin --profile web add github:LeemanCheung/dsh-qq2007-skin
```

重启 Web 服务并刷新页面：

```sh
dsh web
```

首次加载默认启用皮肤，原创双音保持关闭。可在 **设置 → 通用 → QQ 2007 复古皮肤** 独立切换外观和提示音，恢复系统外观后仍可单独保留提示音；状态栏右侧的“退出皮肤”也可立即恢复系统外观。

### 固定版本

```sh
dsh plugin --profile web add github:LeemanCheung/dsh-qq2007-skin#v0.3.0
```

### 从源码安装

```sh
git clone https://github.com/LeemanCheung/dsh-qq2007-skin.git
cd dsh-qq2007-skin
npm test
dsh plugin --profile web add ./
```

## 更新与卸载

```sh
# 更新 GitHub 安装
dsh plugin --profile web update dsh-qq2007-skin

# 卸载
dsh plugin --profile web remove dsh-qq2007-skin
```

随后重启 `dsh web`。插件停止或卸载时，Cordis 生命周期会移除主题注册、CSS、应用标题栏、状态条、计时器、发送监听器、可选 AudioContext 和设置项。

## 工作原理

```text
package.json dsh.bundle
        │
        └─ cordis.patch.yml ── host no-op loader entry
                                      │
package.json dsh.client               ▼
        ├─ ThemeRuntime.register(72 tokens)
        ├─ scoped CSS[data-dsh-qq2007-active]
        ├─ 4 embedded Codex-generated WebP artworks
        ├─ decorative app/account/status chrome
        ├─ optional procedural Web Audio send chime
        └─ settings.general.item appearance + sound toggles
```

与参考项目 [Codex-QQ2007-Skin](https://github.com/LeemanCheung/Codex-QQ2007-Skin) 的 CDP 本机注入不同，本项目直接使用 DSH 官方 Cordis 客户端插件、ThemeRuntime 和设置 Slot。具体生命周期与边界见 [架构文档](docs/ARCHITECTURE.md)。

## 开发与验证

```sh
npm test           # 确定性构建 + VM 生命周期测试
npm run pack:check # 检查发布包内容
```

自动测试覆盖：客户端模块注册、72 个 token、首次启用、双设置开关、原生发送按钮/进入提交流程的 Enter 双音触发、Shift+Enter 静音、4 个内嵌 WebP、localStorage、主题同步、监听器和 AudioContext 清理。发布前另以真实 Chromium 手工回归资料卡、64×27 文字发送按钮、提示音开关、800/801 px 响应式阈值及外观关闭/重启用往返。

维护者可通过 `python scripts/process-art.py`（需要 Pillow 10+）由仓库专用的高分辨率源图重新生成已提交的运行时 WebP 衍生素材。发布包会有意省略这些源图和辅助脚本；普通安装及 `npm test` 都不需要 Python 或网络。

本地 profile 组合验证：

```sh
dsh plugin --profile web add ./
dsh --profile web --dump-config
```

## 兼容性

当前基线为 DSH `0.1.0-rc.6`。主题 token 和设置 Slot 属于官方扩展点；部分用于强化窗框细节的 CSS module 后缀选择器是 best-effort，DSH 大版本升级后可能需要跟随调整，但不会替换或破坏原生控件。详见 [兼容性说明](docs/COMPATIBILITY.md)。

## 许可

代码与原创素材采用 [MIT License](LICENSE)。商标与独立项目声明见 [NOTICE.md](NOTICE.md)。
