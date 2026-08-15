# Architecture

## Goal

Add a reversible QQ 2007-era messenger appearance to the DSH Web GUI without replacing native controls, editing DSH files, opening a debug port, or maintaining a parallel data model.

## Package shape

```text
dsh-qq2007-skin
├─ dsh.bundle → cordis.patch.yml → host no-op loader entry
└─ dsh.client → lib/client.js → browser ThemeRuntime/CSS/settings effects
```

The host half exists only so `dsh plugin --profile web add ...` can compose the package as a standard profile bundle. All behavior is visual and runs in the browser.

## Runtime flow

1. Register `dsh-qq2007-retro` with `ctx.theme.register()` using 72 `--dsw-*` tokens.
2. Restore the per-browser enabled flag from `localStorage`; first install defaults to enabled.
3. Switch through `ctx.theme.setTheme()` and follow `theme/change` as the single active-state signal; a bounded 2.5 s startup stabilization window survives the Host settings scope's late built-in-theme adoption, then yields to user changes.
4. Install one stylesheet scoped under `body[data-dsh-qq2007-active="true"]`; four compact offline WebP assets are embedded once as CSS custom-property URLs.
5. Add a decorative, non-interactive `DSH Messenger 2007` application strip and a factual local visual-state strip with an original SVG buddy and local clock.
6. Register a General-settings row that switches between the retro theme and the previously selected built-in `light`, `dark`, or `system` preference.
7. Dispose theme registration, CSS, both DOM strips, interval, listeners, and state markers with the owning Cordis fiber.

## Native interaction boundary

The plugin does not create replacement chat, model, attachment, send, settings, session, or details controls. Selectors only decorate existing shell surfaces. The status strip states only that the local visual layer is enabled and displays the browser clock; it does not invent model, quota, connection, or agent status.

## Persistence

Only `dsh-qq2007-skin:enabled=on|off` and the previous built-in theme id (`light`, `dark`, or `system`) are stored in browser `localStorage`. No prompts, replies, session identifiers, file paths, credentials, or usage data are read or retained.

## Build

`src/client.js`, `src/skin.css`, `assets/retro-buddy.svg`, and the committed files in `assets/runtime/` are deterministic bundle inputs. `npm run build` embeds CSS, SVG, and four WebP assets into the standard `window.__ModuleLoader__.load(...)` client bundle at `lib/client.js`.

The high-resolution files in `assets/generated-source/` were produced by four native Codex `gpt-image-2` calls. Exact prompts, call IDs, web-research links, and originality boundaries are recorded in `assets/prompts/` and `assets/ART_DIRECTION.md`. In a source checkout, `python scripts/process-art.py` uses Pillow to recreate compact runtime derivatives. The published package intentionally omits high-resolution sources and this repository-only helper; normal package builds require neither Python nor network access because runtime derivatives are committed.
