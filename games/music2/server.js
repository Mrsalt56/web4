
import express from "express";
import fetch from "node-fetch";

const app = express();

const YT_KEY = "YOUR_YOUTUBE_API_KEY";

app.use(express.static("public"));

// Search YouTube (multiple results)
app.get("/api/search", async (req, res) => {

  const q = req.query.q;

  try {

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&type=video&maxResults=20` +
      `&q=${encodeURIComponent(q)}` +
      `&key=${YT_KEY}`;

    const r = await fetch(url);
    const data = await r.json();

    if(!data.items){
      return res.json([]);
    }

    const results = data.items.map(v => ({
      id: v.id.videoId,
      title: v.snippet.title,
      channel: v.snippet.channelTitle,
      thumb: v.snippet.thumbnails.medium.url
    }));

    res.json(results);

  } catch {
    res.status(500).json([]);
  }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
