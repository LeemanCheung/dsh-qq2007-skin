# Security Policy

## Supported versions

Security fixes are applied to the latest tagged release.

## Reporting

Please report a suspected vulnerability through GitHub's **Report a vulnerability** flow for this repository when available. If private reporting is unavailable, open a minimal issue that contains no exploit details or secrets and ask the maintainer for a private channel.

Do not include prompts, replies, credentials, local paths, screenshots with private session names, or other personal data in a public report.

## Scope

This plugin is browser-only. It does not open ports, execute commands, access the filesystem, call network APIs, or read DSH conversation/session data. It stores only its enabled flag and previous built-in theme preference in browser `localStorage`.
