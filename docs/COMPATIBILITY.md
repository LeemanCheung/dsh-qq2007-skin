# Compatibility

## Supported baseline

- DeepSeek Harness `0.1.0-rc.6`
- Node.js 20 or 22 for build/installation tooling
- Modern Chromium, Firefox, or WebKit with CSS custom properties
- The full chrome uses `:has()` and WebKit scrollbar selectors where supported; token colors and core layout remain usable without those enhancements

## Stable and best-effort layers

- **Stable:** `dsh.bundle`, `dsh.client`, `ctx.theme.register`, `ctx.theme.setTheme`, `theme/change`, `settings.general.item`, and documented `--dsw-*` tokens.
- **Best effort:** hashed CSS-module suffix selectors such as `[class$="_sidebarCol"]` and `[class*="_sessionRow"]`. A DSH UI refactor can reduce decorative fidelity, but the native token palette and settings switch continue to work.

## Responsive and accessibility behavior

- At widths up to 800 px, the window margin and bottom strip are removed so the mobile layout keeps the full viewport.
- `prefers-reduced-motion: reduce` disables the buddy motion and shortens decorative transitions.
- `forced-colors: active` removes cosmetic shadows and restores system-colored borders.
- All injected visual DOM is outside the conversation control path; the only injected control is the labeled “退出皮肤” button.

## Recovery

Use **Settings → General → QQ 2007 复古皮肤 → 系统外观**. If the settings UI cannot be opened, removing the plugin and restarting DSH removes every effect:

```sh
dsh plugin --profile web remove dsh-qq2007-skin
dsh web
```
