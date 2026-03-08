let currentList = [];
let currentIndex = 0;

const audio = document.getElementById("audio");
const grid = document.getElementById("grid");

/* SEARCH */

async function search() {

  const query = document.getElementById("query").value;

  if (!query) return;

  try {

    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

    const data = await res.json();

    currentList = data;

    renderResults(data);

  } catch (err) {

    console.error("Search failed:", err);

  }

}


/* RENDER RESULTS */

function renderResults(list) {

  grid.innerHTML = "";

  list.forEach((track, index) => {

    const card = document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <img src="${track.artwork || ""}">
      <div>${track.title}</div>
      <div style="color:#aaa">${track.artist}</div>
    `;

    card.onclick = () => {

      currentIndex = index;

      playTrack();

    };

    grid.appendChild(card);

  });

}


/* PLAY TRACK */

async function playTrack() {

  const track = currentList[currentIndex];

  document.getElementById("title").innerText = track.title;
  document.getElementById("artist").innerText = track.artist;
  document.getElementById("cover").src = track.artwork || "";

  if (track.source === "soundcloud") {

    const res = await fetch(`/api/stream?url=${encodeURIComponent(track.stream_url)}`);

    const data = await res.json();

    if (Hls.isSupported()) {

      const hls = new Hls();

      hls.loadSource(data.url);

      hls.attachMedia(audio);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play();
      });

    }

  } else {

    audio.src = track.stream_url;

    audio.play();

  }

}


/* CONTROLS */

function toggle() {

  if (audio.paused) audio.play();
  else audio.pause();

}

function next() {

  if (!currentList.length) return;

  currentIndex = (currentIndex + 1) % currentList.length;

  playTrack();

}

function prev() {

  if (!currentList.length) return;

  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;

  playTrack();

}
