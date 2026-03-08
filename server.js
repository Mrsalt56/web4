
import express from "express"
import fetch from "node-fetch"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static("public"))
app.use(express.json())

/*
Search songs using iTunes metadata
*/

app.get("/api/search", async (req,res)=>{

try{

const q=req.query.q
if(!q) return res.json([])

const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&limit=25`)
const data = await r.json()

const songs=data.results.map(t=>({
title:t.trackName,
artist:t.artistName,
cover:t.artworkUrl100.replace("100x100","400x400")
}))

res.json(songs)

}catch(e){
console.error(e)
res.status(500).json({error:"search failed"})
}

})

/*
Trending songs
*/

app.get("/api/trending", async (req,res)=>{

const r = await fetch("https://itunes.apple.com/search?term=top&media=music&limit=25")
const data = await r.json()

const songs=data.results.map(t=>({
title:t.trackName,
artist:t.artistName,
cover:t.artworkUrl100.replace("100x100","400x400")
}))

res.json(songs)

})

/*
YouTube search
Requires API key
*/

app.get("/api/youtube", async (req,res)=>{

try{

const q=req.query.q

const r = await fetch(
`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(q)}&key=${process.env.YT_KEY}`
)

const data = await r.json()

const videoId=data.items[0].id.videoId

res.json({videoId})

}catch(e){

res.status(500).json({error:"youtube search failed"})

}

})

app.listen(PORT,()=>{
console.log("Server running on port",PORT)
})
