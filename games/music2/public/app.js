
let player;
let playlist = [];
let currentIndex = 0;

const playlistDiv = document.getElementById("playlist");
const nowPlaying = document.getElementById("nowPlaying");

function onYouTubeIframeAPIReady(){

  player = new YT.Player("player",{
    height:"0",
    width:"0",
    playerVars:{
      autoplay:1,
      controls:0
    },
    events:{
      onStateChange:onPlayerStateChange
    }
  });

}

function onPlayerStateChange(e){

  if(e.data === YT.PlayerState.ENDED){
    next();
  }

}

function addToPlaylist(){

  const q = document.getElementById("query").value;
  if(!q) return;

  playlist.push(q);
  document.getElementById("query").value = "";

  renderPlaylist();

  if(playlist.length === 1){
    playCurrent();
  }

}

function renderPlaylist(){

  playlistDiv.innerHTML = "";

  playlist.forEach((track,i)=>{

    const div = document.createElement("div");
    div.className = "track";

    div.innerText =
      (i===currentIndex ? "▶ " : "") + track;

    div.onclick = ()=>{
      currentIndex = i;
      playCurrent();
    };

    playlistDiv.appendChild(div);

  });

}

async function playCurrent(){

  if(!playlist.length) return;

  const query =
    playlist[currentIndex] + " official audio";

  const res = await fetch(
    `/api/ytsearch?q=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  if(!data.videoId){
    alert("No video found");
    return;
  }

  player.loadVideoById(data.videoId);

  nowPlaying.innerText = playlist[currentIndex];

  renderPlaylist();

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
