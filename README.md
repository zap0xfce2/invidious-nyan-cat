# Invidious Nyan Cat

A tiny browser extension that turns the progress bar on any [Invidious](https://invidious.io) instance into a rainbow with Nyan Cat flying along.

![Screenshot](screenshot.png)

Inspired by the Chrome extension "Nyan Cat Progress Bar for YouTube™". Rebuilt from scratch for Invidious.

## AI-Assisted Development
> [!IMPORTANT]
> This project was created with significant AI assistance, and that is intentional and transparent.
>
> Parts of the codebase were generated with AI, but the application was not shipped as unchecked output. The generated code was reviewed, corrected, and validated by a human developer before being kept in the project.

## Features

- Works on **every Invidious instance**. Pages are detected by their player data, not by domain.
- Supports both player styles (`invidious` and `youtube`) and embedded players.
- Leaves every other site alone.
- No tracking, no external requests. The cat GIF ships with the extension.

## Installation

### Chrome / Chromium

1. Download `invidious-nyan-cat.zip` from the [releases](https://github.com/zap0xfce2/invidious-nyan-cat/releases).
2. Open `chrome://extensions` and enable **Developer mode**.
3. Drag the ZIP onto the page.

### Firefox

Open `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on…** → select `manifest.json`.
Temporary add-ons are removed when Firefox restarts.

## Development

Requires [Task](https://taskfile.dev).

| Command        | Description                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| `task zip`     | Builds `dist/invidious-nyan-cat.zip`                                            |
| `task test`    | Loads the extension in Chromium and checks it against a live Invidious instance |
| `task release` | Creates GitHub release `v<version>` from `manifest.json` with the ZIP attached  |

To publish a new version, bump `version` in `manifest.json`, commit, push and run `task release`.

Test against another instance or video:

    task test INVIDIOUS_URL=https://your.instance VIDEO_ID=dQw4w9WgXcQ

## Credits

Nyan Cat © Christopher Torres ([prguitarman](https://www.prguitarman.com)). GIF from [nyan.cat](https://www.nyan.cat).
This project is not affiliated with Invidious or YouTube.

## License

The code is licensed under the [MIT License](LICENSE). The Nyan Cat artwork (`nyan.gif`, `icon-128.png`) is excluded and remains © Christopher Torres.
