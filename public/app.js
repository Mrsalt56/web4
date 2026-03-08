
const results=document.getElementById("results")
const searchInput=document.getElementById("search")

const player=document.getElementById("ytplayer")

let queue=[]
let index=0

searchInput.addEventListener("keydown", async e=>{

if(e.key==="Enter"){

const q=searchInput.value

const r=await fetch(`/api/search?q=${encodeURIComponent(q)}`)
const songs=await r.json()

queue=songs
render(songs)

}

})

function render(list){

results.innerHTML=""

list.forEach(song=>{

const div=document.createElement("div")
div.className="card"

div.innerHTML=`<img src="${song.cover}">`

div.onclick=()=>play(song)

results.appendChild(div)

})

}

async function play(song){

index=queue.findIndex(x=>x.title===song.title)

const query=`${song.title} ${song.artist} official audio`

const r=await fetch(`/api/youtube?q=${encodeURIComponent(query)}`)
const data=await r.json()

player.src=`https://www.youtube.com/embed/${data.videoId}?autoplay=1`

document.getElementById("title").innerText=song.title
document.getElementById("artist").innerText=song.artist

}

function next(){

index=(index+1)%queue.length
play(queue[index])

}

function prev(){

index=(index-1+queue.length)%queue.length
play(queue[index])

}
