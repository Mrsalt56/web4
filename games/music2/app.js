// PUT YOUR SOUNDCLOUD CLIENT ID HERE
const CLIENT_ID = "XulOmp1zs81f2G3b8I6En4nBssu7mmGO";

const audio = document.getElementById("audio");
const resultsDiv = document.getElementById("results");
const nowPlaying = document.getElementById("nowPlaying");

async function search() {

  const q = document.getElementById("query").value;
  if (!q) return;

  resultsDiv.innerHTML = "Searching...";

  const url = `https://api-v2.soundcloud.com/search/tracks?q=${q}&client_id=${CLIENT_ID}`;

  const res = await fetch(url);
  const data = await res.json();

  resultsDiv.innerHTML = "";

  data.collection.forEach(track => {

    if (!track.media) return;

    const div = document.createElement("div");
    div.className = "result";

    div.innerText = `${track.title} — ${track.user.username}`;

    div.onclick = () => playTrack(track);

    resultsDiv.appendChild(div);
  });
}

async function playTrack(track) {

  const transcode = track.media.transcodings.find(t => t.format.protocol === "progressive");

  if (!transcode) return alert("No stream available");

  const res = await fetch(`${transcode.url}?client_id=${CLIENT_ID}`);
  const data = await res.json();

  audio.src = data.url;
  audio.play();

  nowPlaying.innerText = track.title;
}
