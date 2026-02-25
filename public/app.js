
let player;
let searchResults = [];
let playlist = [];
let recent = [];
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
  const btn = document.getElementById("playBtn");
  if(e.data===YT.PlayerState.PLAYING){
    isPlaying=true; btn.innerText="||";
  }
  if(e.data===YT.PlayerState.PAUSED){
    isPlaying=false; btn.innerText="▶";
  }
  if(e.data===YT.PlayerState.ENDED) next();
}

async function search(){
  showSearch();
  const q=document.getElementById("query").value;
  if(!q) return;

  const res=await fetch(`/api/search?q=${encodeURIComponent(q)}`);
  searchResults=await res.json();
  currentList=searchResults;
  render(searchResults,"grid",true);
}

function render(list,id,canAdd=false){
  const grid=document.getElementById(id);
  grid.innerHTML="";
  list.forEach((track,i)=>{
    const div=document.createElement("div");
    div.className="card";

    let btn="";
    if(canAdd) btn=`<button class="add-btn" onclick="addToPlaylist(${i})">+</button>`;
    if(id==="playlistGrid") btn=`<button class="remove-btn" onclick="removeFromPlaylist(${i})">-</button>`;

    div.innerHTML=`${btn}
      <img src="${track.thumb}">
      <div class="title">${track.title}</div>
      <div class="artist">${track.channel}</div>`;

    div.onclick=(e)=>{
      if(e.target.classList.contains("add-btn")||e.target.classList.contains("remove-btn")) return;
      currentList=list;
      currentIndex=i;
      playCurrent();
    };

    grid.appendChild(div);
  });
}

function addToPlaylist(i){
  const t=searchResults[i];
  if(!playlist.find(x=>x.id===t.id)) playlist.push(t);
  alert("Added to playlist");
}

function removeFromPlaylist(i){
  playlist.splice(i,1);
  render(playlist,"playlistGrid");
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
  if(!recent.find(x=>x.id===t.id)) recent.unshift(t);
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

function showPlaylist(){ hideAll(); document.getElementById("playlistSection").style.display="block"; render(playlist,"playlistGrid"); currentList=playlist; }

function showRecently(){ hideAll(); document.getElementById("recentSection").style.display="block"; render(recent,"recentGrid"); currentList=recent; }

function showSearch(){ hideAll(); document.getElementById("searchSection").style.display="block"; }

function hideAll(){
  document.getElementById("searchSection").style.display="none";
  document.getElementById("recentSection").style.display="none";
  document.getElementById("playlistSection").style.display="none";
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
