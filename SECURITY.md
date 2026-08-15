# Security Policy

## Supported versions

Security fixes are applied to the latest tagged release.

## Reporting

Please report a suspected vulnerability through GitHub's **Report a vulnerability** flow for this repository when available. If private reporting is unavailable, open a minimal issue that contains no exploit details or secrets and ask the maintainer for a private channel.

Do not include prompts, replies, credentials, local paths, screenshots with private session names, or other personal data in a public report.

## Scope

This plugin is browser-only. It does not open ports, execute commands, access the filesystem, call network APIs, or read DSH conversation/session data. It stores only its appearance flag, optional-sound flag, and previous built-in theme preference in browser `localStorage`. When optional sound is enabled, an Enter listener checks only whether the native composer changed from non-empty to empty after DSH handled the key; it does not copy, retain, log, or transmit draft text.
