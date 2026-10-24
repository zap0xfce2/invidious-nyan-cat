# Chrome Web Store listing

Copy-paste texts for the Chrome Web Store Developer Dashboard.
Name and summary come from `_locales/*/messages.json` automatically.

## Store listing

**Category:** Fun

**Images**

| Field              | File                        |
| ------------------ | --------------------------- |
| Store icon         | `icon-128.png` (repo root)  |
| Screenshot 1       | `screenshot-1-1280x800.png` |
| Screenshot 2       | `screenshot-2-1280x800.png` |
| Small promo tile   | `promo-440x280.png`         |

### Description (English)

```
Nyan Cat now flies across your Invidious progress bar.

This extension turns the video progress bar on any Invidious instance into a rainbow, with Nyan Cat marking your current position.

• Works on every Invidious instance, public or self-hosted. Pages are recognized by the Invidious player, not by a fixed list of domains.
• Supports both Invidious player styles and embedded videos.
• Does nothing on any other website.
• No tracking, no data collection, no external requests. The cat image ships with the extension.

Open source: https://github.com/zap0xfce2/invidious-nyan-cat

Not affiliated with Invidious or YouTube. Nyan Cat © Christopher Torres.
Screenshot video: Big Buck Bunny © Blender Foundation, CC BY 3.0.
```

### Description (German)

```
Nyan Cat fliegt jetzt über deinen Invidious-Fortschrittsbalken.

Diese Erweiterung verwandelt den Fortschrittsbalken jeder Invidious-Instanz in einen Regenbogen, und Nyan Cat zeigt dir, wo du im Video gerade bist.

• Funktioniert auf jeder Invidious-Instanz, öffentlich oder selbst gehostet. Erkannt wird der Invidious-Player, nicht eine feste Liste von Domains.
• Unterstützt beide Invidious-Player-Stile und eingebettete Videos.
• Macht auf allen anderen Webseiten nichts.
• Kein Tracking, keine Datenerhebung, keine externen Anfragen. Das Katzenbild ist in der Erweiterung enthalten.

Open Source: https://github.com/zap0xfce2/invidious-nyan-cat

Kein offizielles Projekt von Invidious oder YouTube. Nyan Cat © Christopher Torres.
Video im Screenshot: Big Buck Bunny © Blender Foundation, CC BY 3.0.
```

## Privacy practices

### Single purpose

```
Replaces the video progress bar on Invidious pages with a rainbow and an animated Nyan Cat.
```

### Host permission justification

```
Invidious is self-hosted software that runs on thousands of different domains, so the content script cannot be limited to a fixed list of hosts. On every page it only checks whether the page contains the Invidious player (the elements #player_data and #video_data). If not, it does nothing. If yes, it adds a CSS class to style the progress bar. It does not read, collect or transmit any page content or user data.
```

### Remote code

No, I am not using remote code.

### Data usage

Tick **none** of the data categories. Then confirm all three statements:

- I do not sell or transfer user data to third parties, outside of the approved use cases.
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose.
- I do not use or transfer user data to determine creditworthiness or for lending purposes.

### Privacy policy URL

Not required, since no user data is collected. Leave empty or use the repo URL.

## Distribution

- Visibility: Public
- Regions: All regions
