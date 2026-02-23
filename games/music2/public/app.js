
let player;
let playlist = [];
let currentIndex = 0;
let isPlaying = false;
let timer = null;

function onYouTubeIframeAPIReady(){

  player = new YT.Player("ytplayer",{
    height:"0",
    width:"0",
    playerVars:{
      playsinline:1,
      origin:window.location.origin
    },
    events:{
      onReady:onReady,
      onStateChange:onStateChange
    }
  });

}

function onReady(){
  console.log("Player Ready");
}

function onStateChange(e){

  if(e.data === YT.PlayerState.PLAYING){
    isPlaying = true;
    startTimer();
  }

  if(e.data === YT.PlayerState.PAUSED){
    isPlaying = false;
    stopTimer();
  }

  if(e.data === YT.PlayerState.ENDED){
    next();
  }

}

async function search(){

  const q = document.getElementById("query").value;
  if(!q) return;

  document.getElementById("resultsTitle").innerText =
    `Results for "${q}"`;

  const res = await fetch(
    `/api/search?q=${encodeURIComponent(q)}`
  );

  const data = await res.json();

  playlist = data;
  currentIndex = 0;

  render(data);

}

function render(list){

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  list.forEach((track,i)=>{

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${track.thumb}">
      <div class="title">${track.title}</div>
      <div class="artist">${track.channel}</div>
    `;

    div.onclick = ()=>{
      currentIndex = i;
      playCurrent();
    };

    grid.appendChild(div);

  });

}

function playCurrent(){

  if(!playlist.length) return;

  const track = playlist[currentIndex];

  player.loadVideoById(track.id);

  document.getElementById("cover").src = track.thumb;
  document.getElementById("song").innerText = track.title;
  document.getElementById("artist").innerText = track.channel;

  isPlaying = true;

}

function toggle(){

  if(!player) return;

  if(isPlaying){
    player.pauseVideo();
  }else{
    player.playVideo();
  }

}

function next(){

  if(!playlist.length) return;

  currentIndex++;

  if(currentIndex >= playlist.length){
    currentIndex = 0;
  }

  playCurrent();
}

function prev(){

  if(!playlist.length) return;

  currentIndex--;

  if(currentIndex < 0){
    currentIndex = playlist.length - 1;
  }

  playCurrent();
}

function startTimer(){

  stopTimer();

  timer = setInterval(updateProgress, 500);
}

function stopTimer(){

  if(timer){
    clearInterval(timer);
    timer = null;
  }

}

function updateProgress(){

  if(!player || !isPlaying) return;

  const current = player.getCurrentTime();
  const total = player.getDuration();

  if(!total) return;

  const percent = (current / total) * 100;

  const seek = document.getElementById("seek");

  seek.value = percent;

  document.getElementById("current").innerText =
    format(current);

  document.getElementById("duration").innerText =
    format(total);

}

document.addEventListener("DOMContentLoaded",()=>{

  const seek = document.getElementById("seek");

  seek.addEventListener("input",()=>{

    if(!player) return;

    const total = player.getDuration();

    const time = (seek.value / 100) * total;

    player.seekTo(time,true);

  });

});

function format(sec){

  sec = Math.floor(sec);

  const m = Math.floor(sec / 60);
  const s = sec % 60;

  return m + ":" + (s<10?"0":"") + s;
}
