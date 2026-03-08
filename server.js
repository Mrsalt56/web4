
import express from "express"
import fetch from "node-fetch"

const app=express()

app.use(express.static("public"))

const TIDAL_TOKEN="fKuLqPm7IEQaH5wC"

app.get("/api/search",async(req,res)=>{

const q=req.query.q

const r=await fetch(`https://api.tidal.com/v1/search?query=${q}&types=TRACKS&limit=20`,{
headers:{Authorization:`Bearer ${TIDAL_TOKEN}`}
})

const data=await r.json()

const songs=data.tracks.items.map(t=>({
id:t.id,
title:t.title,
artist:t.artist.name,
cover:`https://resources.tidal.com/images/${t.album.cover.replace(/-/g,"/")}/640x640.jpg`
}))

res.json(songs)

})

app.get("/api/stream",async(req,res)=>{

const id=req.query.id

const r=await fetch(`https://api.tidal.com/v1/tracks/${id}/streamUrl`,{
headers:{Authorization:`Bearer ${TIDAL_TOKEN}`}
})

const data=await r.json()

res.json({url:data.url})

})

app.get("/api/trending",async(req,res)=>{

const r=await fetch("https://itunes.apple.com/search?term=top&media=music&limit=20")
const data=await r.json()

const songs=data.results.map(t=>({
id:t.trackId,
title:t.trackName,
artist:t.artistName,
cover:t.artworkUrl100.replace("100x100","300x300"),
preview:t.previewUrl
}))

res.json(songs)

})

app.listen(3000,()=>console.log("Server running"))
