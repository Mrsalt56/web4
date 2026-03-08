
const audio=document.getElementById("audio")
const results=document.getElementById("results")

let songs=[]
let index=0
let page=0
let query=""

function saveRecent(song){
let r=JSON.parse(localStorage.getItem("recent")||"[]")
r.unshift(song)
localStorage.setItem("recent",JSON.stringify(r.slice(0,30)))
}

function savePlaylist(song){
let p=JSON.parse(localStorage.getItem("playlist")||"[]")
p.push(song)
localStorage.setItem("playlist",JSON.stringify(p))
}

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

async function search(){

query=document.getElementById("search").value
page=0

const res=await fetch(`/api/search?q=${encodeURIComponent(query)}`)
const data=await res.json()

songs=data
render(songs)

}

async function showTrending(){

const res=await fetch("/api/trending")
songs=await res.json()
render(songs)

}

function showRecent(){

let r=JSON.parse(localStorage.getItem("recent")||"[]")
songs=r
render(r)

}

function showPlaylist(){

let p=JSON.parse(localStorage.getItem("playlist")||"[]")
songs=p
render(p)

}

async function play(song){

document.getElementById("player").classList.add("active")

document.getElementById("cover").src=song.cover
document.getElementById("title").innerText=song.title
document.getElementById("artist").innerText=song.artist

const res=await fetch(`/api/stream?id=${song.id}`)
const data=await res.json()

audio.src=data.url
audio.play()

saveRecent(song)

}

function toggle(){

if(audio.paused) audio.play()
else audio.pause()

}

function next(){

index=(index+1)%songs.length
play(songs[index])

}

function prev(){

index=(index-1+songs.length)%songs.length
play(songs[index])

}

showTrending()
