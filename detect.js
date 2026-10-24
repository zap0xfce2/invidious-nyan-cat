// Invidious-Seiten erkennt man an den JSON-Blöcken des Players, nicht an der Domain (jede Instanz hat eine eigene).
const isInvidious =
  document.getElementById("player_data") && document.getElementById("video_data");

if (isInvidious) {
  const root = document.documentElement;
  root.classList.add("nyan-invidious");
  root.style.setProperty("--nyan-cat", `url("${chrome.runtime.getURL("nyan.gif")}")`);
}
