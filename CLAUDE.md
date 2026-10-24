# CLAUDE.md

Manifest V3 browser extension (Chrome + Firefox ≥ 109): replaces the video.js progress bar on Invidious instances with a rainbow and Nyan Cat. No build step, no framework.

## Layout

- `manifest.json` – content script on `<all_urls>`, because Invidious instances live on arbitrary domains. Name/description via `__MSG_…__` placeholders.
- `_locales/{en,de}/messages.json` – `extName`, `extDescription`; `default_locale` is `en`.
- `detect.js` – detects Invidious by `script#player_data` **and** `script#video_data`, then sets `html.nyan-invidious` and the CSS variable `--nyan-cat` (GIF URL via `chrome.runtime.getURL`).
- `nyan.css` – every rule scoped to `html.nyan-invidious` so other video.js sites stay untouched.
- `nyan.gif` – shipped locally (`web_accessible_resources`); deliberately no hotlink, otherwise a third party would see every playback.
- `tests/check.mjs` – Playwright smoke test against a live instance (own `package.json` in `tests/`).
- `store/` – Chrome Web Store assets and copy-paste texts (`listing.md`). Not part of the ZIP.

## Commands

- `task zip` → `dist/invidious-nyan-cat.zip`. Keep `EXTENSION_FILES` in the Taskfile in sync when adding files.
- `task test` → loads the extension via `--load-extension` in Chromium, checks both player styles, `/embed/` and a non-Invidious page. Override instance/video with `INVIDIOUS_URL` / `VIDEO_ID`.
- `task release` → GitHub release `v<manifest version>` with the ZIP attached. Requires a clean, pushed tree and an unused tag. New version = bump `version` in `manifest.json`, commit, push, `task release`, then upload the same ZIP in the Chrome Web Store dashboard.

## Gotchas

- `og:site_name` is configurable per instance → never use it for detection.
- Invidious' `player.css` hides the handle (`.vjs-play-progress::before`) and colours it red with `player-style-youtube` → overrides need `!important`.
- video.js only shows the control bar after the first play (`.vjs-has-started`); tests must start the video.
- Chrome refuses self-packed `.crx` files (`CRX_REQUIRED_PROOF_MISSING`) → distribute the ZIP, which can be dragged onto `chrome://extensions` in developer mode.
- Alpine: no `zip` binary → `python3 -m zipfile`. Playwright only as `playwright-core` + system Chromium `/usr/bin/chromium` with `--no-sandbox`.
- Alpine's Chromium only ships `en-US.pak`, so the German locale cannot be verified in a browser here; check `_locales/de` statically.
- Top-level names starting with `_` are reserved in extensions; `_locales` is the allowed exception.
- Chrome Web Store images must be 24-bit PNG without alpha (`magick … -alpha off PNG24:out.png`).

## Conventions

- Everything in the repo is English (code comments, test messages, Taskfile, docs). Only `_locales/de` is German.
- `dist/` (including the `.pem` signing key) is git-ignored; never commit the `.pem`.
