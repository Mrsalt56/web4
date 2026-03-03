
import express from "express";
import fetch from "node-fetch";

const app = express();
const SC_CLIENT_ID = process.env.SC_CLIENT_ID;

app.use(express.static("public"));

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  try {
    const url = `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(q)}&client_id=${SC_CLIENT_ID}&limit=20`;
    const r = await fetch(url);
    const data = await r.json();

    if (!data.collection) return res.json([]);

    const results = data.collection
      .filter(t => t.media && t.media.transcodings)
      .map(t => ({
        id: t.id,
        title: t.title,
        artist: t.user.username,
        artwork: t.artwork_url ? t.artwork_url.replace('-large', '-t500x500') : "",
        stream_url: t.media.transcodings.find(tr => tr.format.protocol === "progressive")?.url
      }))
      .filter(t => t.stream_url);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

app.get("/api/stream", async (req, res) => {
  try {
    const streamUrl = `${req.query.url}&client_id=${SC_CLIENT_ID}`;
    const r = await fetch(streamUrl);
    const data = await r.json();

    const audioRes = await fetch(data.url);
    res.setHeader("Content-Type", "audio/mpeg");
    audioRes.body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
