
const searchInput=document.getElementById("search")
const resultsDiv=document.getElementById("results")
const player=document.getElementById("player")

let queue=[]
let index=0

searchInput.addEventListener("keydown", async e=>{

if(e.key==="Enter"){

const q=searchInput.value

const r=await fetch(`/api/search?q=${encodeURIComponent(q)}`)
const data=await r.json()

queue=data

render(data)

}

})

function render(list){

resultsDiv.innerHTML=""

list.forEach(v=>{

const div=document.createElement("div")
div.className="card"

div.innerHTML=`
<img src="${v.thumbnail}">
<p>${v.title}</p>
`

div.onclick=()=>play(v)

resultsDiv.appendChild(div)

})

}

function play(video){

index=queue.findIndex(x=>x.videoId===video.videoId)

player.src=`https://www.youtube.com/embed/${video.videoId}?autoplay=1`

document.getElementById("title").innerText=video.title
document.getElementById("artist").innerText=video.channel

}

function next(){

index=(index+1)%queue.length
play(queue[index])

}

function prev(){

index=(index-1+queue.length)%queue.length
play(queue[index])

}
