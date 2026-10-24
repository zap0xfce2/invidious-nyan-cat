import assert from "node:assert/strict";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const EXTENSION_DIR = fileURLToPath(new URL("..", import.meta.url));
const SCREENSHOT_DIR = fileURLToPath(new URL("screenshots/", import.meta.url));
const CHROMIUM_PATH = process.env.CHROMIUM_PATH ?? "/usr/bin/chromium";
const INVIDIOUS_URL = process.env.INVIDIOUS_URL;
const VIDEO_ID = process.env.VIDEO_ID;
const NON_INVIDIOUS_URL = "https://example.com";
const PROGRESS_FRACTION = 0.4;
const FRACTION_TOLERANCE = 0.01;
const TIMEOUT_MS = 30000;

async function seekTo(page, fraction) {
  await page.waitForFunction(() => document.querySelector("video")?.duration > 0, null, { timeout: TIMEOUT_MS });
  await page.evaluate(() => {
    const video = document.querySelector("video");
    video.muted = true;
    video.play().catch(() => {});
  });
  // video.js blendet die Steuerleiste erst nach dem ersten Start ein.
  await page.waitForSelector(".video-js.vjs-has-started", { timeout: TIMEOUT_MS });
  await page.evaluate((f) => {
    const video = document.querySelector("video");
    video.currentTime = video.duration * f;
    video.pause();
  }, fraction);
  await page.waitForTimeout(1500);
  await page.hover(".video-js");
}

function readProgressBar() {
  const holder = document.querySelector(".vjs-progress-holder").getBoundingClientRect();
  const played = document.querySelector(".vjs-play-progress");
  return {
    isMarked: document.documentElement.classList.contains("nyan-invidious"),
    playedFraction: played.getBoundingClientRect().width / holder.width,
    rainbow: getComputedStyle(played).backgroundImage,
    cat: getComputedStyle(played, "::before").backgroundImage,
  };
}

async function checkPlayer(page, name, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await seekTo(page, PROGRESS_FRACTION);
  const bar = await page.evaluate(readProgressBar);

  assert.ok(bar.isMarked, `${name}: Invidious nicht erkannt`);
  assert.ok(Math.abs(bar.playedFraction - PROGRESS_FRACTION) < FRACTION_TOLERANCE, `${name}: Regenbogen-Breite ${bar.playedFraction}`);
  assert.match(bar.rainbow, /linear-gradient/, `${name}: kein Regenbogen`);
  assert.match(bar.cat, /nyan\.gif/, `${name}: keine Katze`);

  await page.screenshot({ path: `${SCREENSHOT_DIR}${name}.png` });
  console.log(`✅ ${name}`);
}

async function checkUntouched(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const isMarked = await page.evaluate(() => document.documentElement.classList.contains("nyan-invidious"));
  assert.equal(isMarked, false, `${url}: fälschlich als Invidious erkannt`);
  console.log(`✅ ${url} unberührt`);
}

assert.ok(INVIDIOUS_URL && VIDEO_ID, "INVIDIOUS_URL und VIDEO_ID müssen gesetzt sein");
mkdirSync(SCREENSHOT_DIR, { recursive: true });

const context = await chromium.launchPersistentContext("", {
  executablePath: CHROMIUM_PATH,
  headless: true,
  viewport: { width: 1280, height: 800 },
  args: ["--no-sandbox", `--disable-extensions-except=${EXTENSION_DIR}`, `--load-extension=${EXTENSION_DIR}`],
});

try {
  const page = await context.newPage();
  await checkPlayer(page, "invidious-style", `${INVIDIOUS_URL}/watch?v=${VIDEO_ID}&player_style=invidious`);
  await checkPlayer(page, "youtube-style", `${INVIDIOUS_URL}/watch?v=${VIDEO_ID}&player_style=youtube`);
  await checkPlayer(page, "embed", `${INVIDIOUS_URL}/embed/${VIDEO_ID}`);
  await checkUntouched(page, NON_INVIDIOUS_URL);
} finally {
  await context.close();
}
