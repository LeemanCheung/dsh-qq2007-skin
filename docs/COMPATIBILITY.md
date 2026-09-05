# Compatibility

## Supported baseline

- DeepSeek Harness `0.1.2-rc.1`
- Node.js 20 or 22 for build/installation tooling
- Modern Chromium, Firefox, or WebKit with CSS custom properties
- Optional send audio requires Web Audio (`AudioContext`); unsupported or policy-blocked browsers remain silent without affecting the skin
- The full chrome uses `:has()` and WebKit scrollbar selectors where supported; token colors and core layout remain usable without those enhancements

## Stable and best-effort layers

- **Stable:** `dsh.bundle`, `dsh.client`, `ctx.theme.register`, `ctx.theme.setTheme`, `theme/change`, `settings.general.item`, the UI renderer slot registry, and documented `--dsw-*` tokens.
- **Best effort:** hashed CSS-module suffix selectors such as `[class$="_sidebarCol"]` and `[class*="_sessionRow"]`. A DSH UI refactor can reduce decorative fidelity, but the native token palette and settings switch continue to work.

## Responsive and accessibility behavior

- Below 1180 px, the decorative title-bar icon sprite is hidden; at widths up to 800 px, the extra title bar, window margin, composer ornament, and bottom strip are removed so the mobile layout keeps the full viewport.
- `prefers-reduced-motion: reduce` disables the buddy motion and shortens decorative transitions.
- `forced-colors: active` removes cosmetic shadows and restores system-colored borders.
- The injected application strip is `aria-hidden` and non-interactive. All injected visual DOM is outside the conversation control path; the only injected control is the labeled “退出皮肤” button.
- Generated raster assets are embedded in `lib/client.js`; the skin makes no runtime image or network request.
- The synthesized chime defaults off, has no audio asset, and closes its AudioContext when the plugin stops. Shift+Enter and drafts that remain in the composer stay silent; the cue marks a local send action, not delivery success.

## Recovery

Use **Settings → General → QQ 2007 复古皮肤 → 系统外观**. If the settings UI cannot be opened, removing the plugin and restarting DSH removes every effect:

```sh
dsh plugin --profile web remove dsh-qq2007-skin
dsh web
```
