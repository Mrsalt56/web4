
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

    const randomKeywords = [
      "hip hop 2026",
      "rap music",
      "pop hits",
      "r&b music",
      "afrobeats",
      "trap music",
      "new music",
      "underground rap",
      "latin music",
      "indie music"
    ];

    // Pick 3 random keywords
    const shuffledKeywords = randomKeywords
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // 🔥 1. Fetch Trending
    const trendingURL =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?part=snippet&chart=mostPopular` +
      `&regionCode=US&videoCategoryId=10` +
      `&maxResults=20` +
      `&key=${YT_KEY}`;

    const trendingRes = await fetch(trendingURL);
    const trendingData = await trendingRes.json();

    let combined = [];

    if (trendingData.items) {
      combined = trendingData.items.map(v => ({
        id: v.id,
        title: v.snippet.title,
        channel: v.snippet.channelTitle,
        thumb: v.snippet.thumbnails.medium.url
      }));
    }

    // 🔥 2. Fetch Random Search Results
    for (const keyword of shuffledKeywords) {
      const searchURL =
        `https://www.googleapis.com/youtube/v3/search` +
        `?part=snippet&type=video&maxResults=8` +
        `&q=${encodeURIComponent(keyword)}` +
        `&key=${YT_KEY}`;

      const searchRes = await fetch(searchURL);
      const searchData = await searchRes.json();

      if (searchData.items) {
        const results = searchData.items.map(v => ({
          id: v.id.videoId,
          title: v.snippet.title,
          channel: v.snippet.channelTitle,
          thumb: v.snippet.thumbnails.medium.url
        }));

        combined.push(...results);
      }
    }

    // Remove duplicates
    const unique = [];
    const ids = new Set();

    for (const video of combined) {
      if (!ids.has(video.id)) {
        ids.add(video.id);
        unique.push(video);
      }
    }

    // Shuffle final results
    const finalFeed = unique
      .sort(() => Math.random() - 0.5)
      .slice(0, 25);

    res.json(finalFeed);

  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Running on port", PORT);
});
