# Changelog

All notable changes to this project are documented here.

## [0.3.1] - 2026-09-05

### Fixed

- Migrated the Client injection graph from the removed Runtime package to the DSH 0.1.2 UI renderer.
- Restored readable tooltips by pairing their fixed white text with a dark blue background.

### Changed

- Updated the declared DSH and Cordis compatibility baseline to `0.1.2-rc.1` and `4.0.2`.

## [0.3.0] - 2026-08-15

### Added

- Compact account-card treatment for the native sidebar logo row with the original robot avatar and factual local visual-state copy.
- Optional original two-note send chime synthesized with Web Audio; it defaults off and carries no recorded sound asset.
- Separate persisted sound toggle in Settings and a factual status-strip indicator while enabled.

### Changed

- Compressed project/session rows and emphasized native status slots, titles, and relative times.
- Added compact local-user headings, always-visible native message clocks, transcript separators, and assistant-side rules.
- Restyled the native submit control as a 64×27 glossy text-send button without replacing its behavior, disabled state, or accessible name.
- Extended deterministic lifecycle coverage to send-action audio triggers, silent Shift+Enter, listener disposal, and AudioContext closure.
- Manual Chromium release verification now includes the account card, text-send geometry, sound round trip, and 800/801 px responsive threshold.

## [0.2.0] - 2026-08-15

### Added

- Four original raster assets generated through native Codex `gpt-image-2`: robot/CRT buddy stage, blue-glass chrome, eight-icon toolbar sprite, and room/sky wallpaper.
- Committed generation prompts, call provenance, visual-research sources, and compact offline WebP derivatives.
- Always-visible DSH Messenger 2007 title strip with a decorative period toolbar.

### Changed

- Reworked the interface around denser 2006–08 desktop-IM geometry: tighter radii, shorter title bars, full-width beveled contact groups, flatter transcript rows, rectangular composer, and recessed scrollbars.
- The chat surface and details pane now use the generated wallpaper and buddy art while preserving readable native content.
- Release verification now includes a manual real-Chromium pass for all four embedded WebP assets, application strip, shell geometry, Settings row, and disable/re-enable cycle.

## [0.1.0] - 2026-08-15

### Added

- QQ 2007-inspired light palette with 72 native DSH theme tokens.
- Scoped three-pane chrome, retro controls, message/composer styling, scrollbars, and responsive status strip.
- Original offline SVG pixel buddy and design preview.
- Reversible Settings → General switch with previous built-in theme restoration.
- Startup synchronization for the Host-backed appearance preference.
- Reduced-motion and forced-colors fallbacks.
- Deterministic client build, VM lifecycle regression gate, isolated DSH profile verification, and real Chromium integration capture.
