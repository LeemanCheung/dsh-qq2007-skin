# Windows DSH 0.1.2 acceptance

Validated on 2026-09-05 in the isolated `QA3081` Web profile running DeepSeek
Harness `0.1.2-rc.1` on Windows.

- Plugin Inventory reported `dsh-qq2007-skin` enabled.
- The QQ 2007 appearance could be enabled and disabled from its settings item.
- The default System appearance option remained readable and selectable.

This acceptance covers the installed settings and appearance interface. The
repository regression gate separately checks the tooltip contrast token and
plugin lifecycle. No external model call was part of this check.
