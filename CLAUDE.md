# CLAUDE.md

Manifest-V3-Browser-Extension (Chrome + Firefox ≥ 109): ersetzt den video.js-Fortschrittsbalken auf Invidious-Instanzen durch Regenbogen + Nyan Cat. Kein Build-Schritt, kein Framework.

## Aufbau

- `manifest.json` – Content-Script auf `<all_urls>`, weil Invidious-Instanzen beliebige Domains haben.
- `detect.js` – erkennt Invidious an `script#player_data` **und** `script#video_data`, setzt dann `html.nyan-invidious` und die CSS-Variable `--nyan-cat` (GIF-URL via `chrome.runtime.getURL`).
- `nyan.css` – alle Regeln unter `html.nyan-invidious`, damit andere video.js-Seiten unberührt bleiben.
- `nyan.gif` – lokal mitgeliefert (`web_accessible_resources`); bewusst kein Hotlink, sonst sähe ein Dritter jede Wiedergabe.
- `tests/check.mjs` – Playwright-Smoke-Test gegen eine echte Instanz (eigene `package.json` in `tests/`).

## Befehle

- `task zip` → `dist/invidious-nyan-cat.zip` (Dateiliste in `EXTENSION_FILES` im Taskfile pflegen, wenn Dateien dazukommen)
- `task test` → lädt die Extension per `--load-extension` in Chromium, prüft beide Player-Stile, `/embed/` und eine Nicht-Invidious-Seite. Instanz/Video über `INVIDIOUS_URL` / `VIDEO_ID` überschreibbar.

## Gotchas

- `og:site_name` ist pro Instanz konfigurierbar → nicht zur Erkennung nutzen.
- Invidious' `player.css` blendet bei `player-style-youtube` den Griff (`.vjs-play-progress::before`) aus und färbt rot → Overrides brauchen `!important`.
- video.js zeigt die Steuerleiste erst nach dem ersten Abspielen (`.vjs-has-started`); Tests müssen das Video starten.
- Selbst gepackte `.crx` installiert Chrome nicht (`CRX_REQUIRED_PROOF_MISSING`) → ZIP verteilen, die lässt sich im Entwicklermodus auf `chrome://extensions` ziehen.
- Alpine: kein `zip`-Binary → `python3 -m zipfile`. Playwright nur als `playwright-core` + System-Chromium `/usr/bin/chromium` mit `--no-sandbox`.
- Ein Extension-Ordner darf auf oberster Ebene keine Datei/kein Verzeichnis mit `_` am Anfang enthalten, sonst lädt Chrome ihn nicht.

## Konventionen

- Code-Kommentare und Test-Meldungen auf Deutsch, README auf Englisch.
- `dist/` (inkl. `.pem`-Signierschlüssel) ist nicht im Repo; die `.pem` nie committen.
