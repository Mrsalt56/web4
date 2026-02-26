
import express from "express";
import fetch from "node-fetch";

const app = express();
const YT_KEY = process.env.YT_KEY;

app.use(express.static("public"));

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
    if(!data.items) return res.json([]);

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

app.get("/api/trending", async (req, res) => {
  try {
    const url =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet&chart=mostPopular` +
      `&regionCode=US&videoCategoryId=10` +
      `&maxResults=20` +
      `&key=${YT_KEY}`;

    const r = await fetch(url);
    const data = await r.json();
    if(!data.items) return res.json([]);

    const results = data.items.map(v => ({
      id: v.id,
      title: v.snippet.title,
      channel: v.snippet.channelTitle,
      thumb: v.snippet.thumbnails.medium.url
    }));

    res.json(results);
  } catch {
    res.status(500).json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running on port", PORT);
});
