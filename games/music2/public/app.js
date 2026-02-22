
let player;
let currentVideo = null;
let isPlaying = false;

// YouTube
function onYouTubeIframeAPIReady(){

  player = new YT.Player("ytplayer",{
    height:"0",
    width:"0",
    playerVars:{
      playsinline:1,
      origin:window.location.origin
    },
    events:{
      onStateChange:onStateChange
    }
  });

}

function onStateChange(e){

  if(e.data === YT.PlayerState.PLAYING){
    isPlaying = true;
  }

  if(e.data === YT.PlayerState.PAUSED){
    isPlaying = false;
  }

}

// Search
async function search(){

  const q = document.getElementById("query").value;
  if(!q) return;

  document.getElementById("resultsTitle").innerText =
    `Results for "${q}"`;

  const res = await fetch(
    `/api/search?q=${encodeURIComponent(q)}`
  );

  const data = await res.json();

  render(data);

}

// Render grid
function render(list){

  const grid = document.getElementById("grid");

  grid.innerHTML = "";

  list.forEach(track=>{

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${track.thumb}">
      <div class="title">${track.title}</div>
      <div class="artist">${track.channel}</div>
    `;

    div.onclick = ()=>{
      play(track);
    };

    grid.appendChild(div);

  });

}

// Play
function play(track){

  currentVideo = track.id;

  player.loadVideoById(track.id);

  document.getElementById("cover").src = track.thumb;
  document.getElementById("song").innerText = track.title;
  document.getElementById("artist").innerText = track.channel;

  isPlaying = true;
}

// Toggle
function toggle(){

  if(!currentVideo) return;

  if(isPlaying){
    player.pauseVideo();
  }else{
    player.playVideo();
  }

}
