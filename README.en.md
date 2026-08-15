<p align="center">
  <img src="docs/screenshot.png" alt="QQ 2007 retro skin running in DSH 0.1.0-rc.6" width="100%">
</p>

<div align="center">

# dsh-qq2007-skin

**Turn the DSH Web GUI into a blue 2007-era messenger window while preserving every native interaction.**

[中文](README.md) · [Architecture](docs/ARCHITECTURE.md) · [Compatibility](docs/COMPATIBILITY.md)

[![CI](https://github.com/LeemanCheung/dsh-qq2007-skin/actions/workflows/ci.yml/badge.svg)](https://github.com/LeemanCheung/dsh-qq2007-skin/actions/workflows/ci.yml)
![license](https://img.shields.io/github/license/LeemanCheung/dsh-qq2007-skin)
![dsh](https://img.shields.io/badge/DSH-0.1.0--rc.6-1269bb)

</div>

> [!IMPORTANT]
> This is an independent, unofficial nostalgia project. It is not affiliated with, authorized by, or endorsed by Tencent, QQ, or DeepSeek. It ships no QQ logos, mascot art, historical icons, sounds, or theme files. The pixel buddy and preview are original project assets. See [NOTICE](NOTICE.md).

## Features

- Glossy blue title chrome, contact-style sidebar, chat window, details pane, compact bevels, retro scrollbars, and a bottom status strip.
- Native three-pane mapping: DSH sidebar / conversation / details become contacts / messages / buddy details without duplicating business data.
- 72 native `--dsw-*` tokens registered through the official `ctx.theme.register()` API.
- Native sessions, model picker, attachments, send controls, tool cards, settings, and details behavior remain untouched.
- Enabled on first install, with a reversible **Settings → General** switch and status-strip exit button.
- Original offline SVG buddy and a truthful local clock; no invented model, quota, connection, or agent state.
- Responsive layout plus reduced-motion and forced-colors fallbacks.
- Stores only browser-local `on|off` and the previous built-in theme preference; reads no prompts, replies, sessions, files, or credentials.

The hero image is a real browser capture from an isolated DSH `0.1.0-rc.6` profile. The intended fully expanded three-pane composition is shown below:

<p align="center"><img src="docs/preview.svg" alt="Expanded contacts, conversation, and buddy-details design preview" width="92%"></p>

## Install

```sh
dsh plugin --profile web add github:LeemanCheung/dsh-qq2007-skin
dsh web
```

Pin the first release:

```sh
dsh plugin --profile web add github:LeemanCheung/dsh-qq2007-skin#v0.1.0
```

From source:

```sh
git clone https://github.com/LeemanCheung/dsh-qq2007-skin.git
cd dsh-qq2007-skin
npm test
dsh plugin --profile web add ./
```

## Update / remove

```sh
dsh plugin --profile web update dsh-qq2007-skin
dsh plugin --profile web remove dsh-qq2007-skin
```

Restart `dsh web` after changing profile plugins. Stopping or removing the plugin disposes its theme registration, CSS, status DOM, timer, and settings entry.

## How it works

Unlike the CDP-based reference project [Codex-QQ2007-Skin](https://github.com/LeemanCheung/Codex-QQ2007-Skin), this plugin uses DSH's native Cordis browser-plugin, ThemeRuntime, and Settings Slot APIs. The host half is a no-op bundle entry; the browser half registers the palette, installs strictly scoped CSS, embeds the original SVG, tracks `theme/change`, and exposes a reversible settings switch.

See [Architecture](docs/ARCHITECTURE.md) and [Compatibility](docs/COMPATIBILITY.md).

## Develop and verify

```sh
npm test
npm run pack:check
```

The deterministic VM gate covers module registration, all 72 tokens, first-run activation, settings/status switches, local persistence, theme synchronization, embedded assets, and lifecycle cleanup.

## License

Code and original assets are [MIT licensed](LICENSE). Product-name and independence notices are in [NOTICE.md](NOTICE.md).
