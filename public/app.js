
let player;
let currentList = [];
let currentIndex = 0;
let isPlaying = false;

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
  render(data);
}

async function search(){
  const q=document.getElementById("query").value;
  if(!q) return;
  document.getElementById("sectionTitle").innerText=`Results for "${q}"`;
  const res=await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  const data=await res.json();
  currentList=data;
  render(data);
}

function render(list){
  const grid=document.getElementById("grid");
  grid.innerHTML="";
  list.forEach((track,i)=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <img src="${track.thumb}">
      <div class="title">${track.title}</div>
      <div class="artist">${track.channel}</div>`;
    div.onclick=()=>{ currentIndex=i; playCurrent(); };
    grid.appendChild(div);
  });
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
