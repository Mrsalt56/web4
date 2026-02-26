
let player;
let currentList = [];
let currentIndex = 0;
let isPlaying = false;

let playlist = JSON.parse(localStorage.getItem("playlist") || "[]");
let recent = JSON.parse(localStorage.getItem("recent") || "[]");
let searchResults = [];

function saveData(){
  localStorage.setItem("playlist", JSON.stringify(playlist));
  localStorage.setItem("recent", JSON.stringify(recent));
}

function onYouTubeIframeAPIReady(){
  player = new YT.Player("ytplayer",{
    height:"360",
    width:"640",
    playerVars:{ playsinline:1, origin:window.location.origin },
    events:{ onStateChange:onStateChange }
  });
}

function onStateChange(e){
  const btn=document.getElementById("playBtn");
  if(e.data===YT.PlayerState.PLAYING){ isPlaying=true; btn.innerText="||"; }
  if(e.data===YT.PlayerState.PAUSED){ isPlaying=false; btn.innerText="▶"; }
  if(e.data===YT.PlayerState.ENDED) next();
}

window.onload = loadTrending;

async function loadTrending(){
  document.getElementById("sectionTitle").innerText="Trending Music (US)";
  const res=await fetch("/api/trending");
  const data=await res.json();
  currentList=data;
  render(data,true);
}

async function search(){
  const q=document.getElementById("query").value;
  if(!q) return;
  document.getElementById("sectionTitle").innerText=`Results for "${q}"`;
  const res=await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  searchResults=await res.json();
  currentList=searchResults;
  render(searchResults,true);
}

function render(list,allowAdd=false){
  const grid=document.getElementById("grid");
  grid.innerHTML="";
  list.forEach((track,i)=>{
    const div=document.createElement("div");
    div.className="card";

    let btn="";
    if(allowAdd && currentList===searchResults){
      btn=`<button class="add-btn" onclick="addToPlaylist(${i})">+</button>`;
    }
    if(currentList===playlist){
      btn=`<button class="remove-btn" onclick="removeFromPlaylist(${i})">-</button>`;
    }

    div.innerHTML=`${btn}
      <img src="${track.thumb}">
      <div class="title">${track.title}</div>
      <div class="artist">${track.channel}</div>`;

    div.onclick=(e)=>{
      if(e.target.classList.contains("add-btn")||e.target.classList.contains("remove-btn")) return;
      currentIndex=i;
      playCurrent();
    };

    grid.appendChild(div);
  });
}

function addToPlaylist(i){
  const t=searchResults[i];
  if(!playlist.find(x=>x.id===t.id)){
    playlist.push(t);
    saveData();
  }
}

function removeFromPlaylist(i){
  playlist.splice(i,1);
  saveData();
  render(playlist);
}

function showPlaylist(){
  document.getElementById("sectionTitle").innerText="My Playlist";
  currentList=playlist;
  render(playlist);
}

function showRecent(){
  document.getElementById("sectionTitle").innerText="Recently Played";
  currentList=recent;
  render(recent);
}

function playCurrent(){
  if(!currentList.length) return;
  const t=currentList[currentIndex];
  player.loadVideoById(t.id);
  document.getElementById("cover").src=t.thumb;
  document.getElementById("song").innerText=t.title;
  document.getElementById("artist").innerText=t.channel;
  document.getElementById("videoDrawer").classList.remove("hidden");
  document.getElementById("openVideoBtn").classList.add("hidden");

  if(!recent.find(x=>x.id===t.id)){
    recent.unshift(t);
    if(recent.length>20) recent.pop();
    saveData();
  }
}

function toggle(){ isPlaying?player.pauseVideo():player.playVideo(); }

function next(){
  if(!currentList.length) return;
  currentIndex=(currentIndex+1)%currentList.length;
  playCurrent();
}

function prev(){
  if(!currentList.length) return;
  currentIndex=(currentIndex-1+currentList.length)%currentList.length;
  playCurrent();
}

function closeVideo(){
  document.getElementById("videoDrawer").classList.add("hidden");
  document.getElementById("openVideoBtn").classList.remove("hidden");
}

function openVideo(){
  document.getElementById("videoDrawer").classList.remove("hidden");
  document.getElementById("openVideoBtn").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("query").addEventListener("keydown",(e)=>{
    if(e.key==="Enter") search();
  });
});
