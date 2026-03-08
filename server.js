import express from "express"
import fetch from "node-fetch"

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static("public"))

/*
--------------------------------
TRENDING SONGS
--------------------------------
*/

app.get("/api/trending", async (req, res) => {

try {

const r = await fetch(
"https://itunes.apple.com/search?term=top&media=music&limit=25"
)

const data = await r.json()

const songs = data.results.map(track => ({
id: track.trackId,
title: track.trackName,
artist: track.artistName,
cover: track.artworkUrl100.replace("100x100","400x400"),
url: track.previewUrl
}))

res.json(songs)

} catch(err) {

console.error(err)
res.status(500).json({error:"Trending failed"})

}

})

/*
--------------------------------
SEARCH SONGS
--------------------------------
*/

app.get("/api/search/tidal", async (req,res)=>{

const q = req.query.q

try{

const r = await fetch(
`https://api.tidal.com/v1/search?query=${encodeURIComponent(q)}&limit=20`,
{
headers:{
Authorization:`Bearer ${process.env.TIDAL_TOKEN}`
}
})

const data = await r.json()

const songs = data.tracks.items.map(t=>({
id:t.id,
title:t.title,
artist:t.artist.name,
cover:`https://resources.tidal.com/images/${t.album.cover.replace(/-/g,"/")}/640x640.jpg`
}))

res.json(songs)

}catch(e){

res.status(500).json({error:"tidal search failed"})

}

})

/*
--------------------------------
STREAM AUDIO
--------------------------------
*/

app.get("/api/stream", (req, res) => {

const url = req.query.url

if(!url){
return res.status(400).json({error:"Missing url"})
}

res.json({ url })

})

/*
--------------------------------
SERVER START
--------------------------------
*/

app.listen(PORT, () => {

console.log("Server running on port", PORT)

})
