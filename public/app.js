
let currentList = [];
let currentIndex = 0;
const audio = document.getElementById("audio");

async function search() {
  const q = document.getElementById("query").value;
  if (!q) return;
  const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data = await res.json();
  currentList = data;
  render(data);
}

function render(list) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  list.forEach((t,i) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${t.artwork}">
      <div>${t.title}</div>
      <div style="color:#aaa">${t.artist}</div>`;
    div.onclick = () => { currentIndex=i; play(); };
    grid.appendChild(div);
  });
}

function play() {
  const t = currentList[currentIndex];
  document.getElementById("title").innerText = t.title;
  document.getElementById("artist").innerText = t.artist;
  document.getElementById("cover").src = t.artwork;
  audio.src = `/api/stream?url=${encodeURIComponent(t.stream_url)}`;
  audio.play();
}

function toggle() {
  audio.paused ? audio.play() : audio.pause();
}

function next() {
  if (!currentList.length) return;
  currentIndex = (currentIndex+1)%currentList.length;
  play();
}

function prev() {
  if (!currentList.length) return;
  currentIndex = (currentIndex-1+currentList.length)%currentList.length;
  play();
}

audio.addEventListener("timeupdate", ()=>{
  document.getElementById("progress").value = (audio.currentTime / audio.duration) * 100 || 0;
});

document.getElementById("progress").addEventListener("input",(e)=>{
  audio.currentTime = (e.target.value/100)*audio.duration;
});
