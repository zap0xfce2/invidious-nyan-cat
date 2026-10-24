// Detect Invidious by its player JSON blocks, not by domain (every instance has its own).
const isInvidious =
  document.getElementById("player_data") && document.getElementById("video_data");

if (isInvidious) {
  const root = document.documentElement;
  root.classList.add("nyan-invidious");
  root.style.setProperty("--nyan-cat", `url("${chrome.runtime.getURL("nyan.gif")}")`);
}
