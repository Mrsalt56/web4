
import express from "express"
import fetch from "node-fetch"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static("public"))
app.use(express.json())

app.get("/api/search", async (req,res)=>{

try{

const q = req.query.q
if(!q) return res.json([])

const r = await fetch(
`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${encodeURIComponent(q)}&key=${process.env.YT_KEY}`
)

const data = await r.json()

const results = data.items.map(v=>({
videoId: v.id.videoId,
title: v.snippet.title,
channel: v.snippet.channelTitle,
thumbnail: v.snippet.thumbnails.high.url
}))

res.json(results)

}catch(e){

console.error(e)
res.status(500).json({error:"youtube search failed"})

}

})

app.listen(PORT,()=>{
console.log("Server running on port",PORT)
})
