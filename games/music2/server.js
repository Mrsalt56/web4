
import express from "express";
import fetch from "node-fetch";

const app = express();

const YT_KEY = "YOUR_YOUTUBE_API_KEY";

app.use(express.static("public"));

app.get("/api/ytsearch", async (req, res) => {

  const q = req.query.q;

  try {

    const url =
      `https://www.googleapis.com/youtube/v3/search` +
      `?part=snippet&type=video&maxResults=1` +
      `&q=${encodeURIComponent(q)}` +
      `&key=${YT_KEY}`;

    const r = await fetch(url);
    const data = await r.json();

    if (!data.items || !data.items.length) {
      return res.json({ videoId: null });
    }

    res.json({
      videoId: data.items[0].id.videoId
    });

  } catch (err) {
    res.status(500).json({ error: "YouTube search failed" });
  }

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
