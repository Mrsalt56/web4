
import express from "express";
import fetch from "node-fetch";

const app = express();
const SC_CLIENT_ID = process.env.SC_CLIENT_ID;

app.use(express.static("public"));

app.get("/api/search", async (req, res) => {
  const q = req.query.q;

  try {
    const url =
      `https://api-v2.soundcloud.com/search/tracks` +
      `?q=${encodeURIComponent(q)}` +
      `&client_id=${process.env.SC_CLIENT_ID}` +
      `&limit=20`;

    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const data = await r.json();

    if (!data.collection) return res.json([]);

    const results = data.collection
      .filter(t => t.media && t.media.transcodings)
      .map(t => {
        const hls = t.media.transcodings.find(
          tr => tr.format.protocol === "hls"
        );

        if (!hls) return null;

        return {
          id: t.id,
          title: t.title,
          artist: t.user.username,
          artwork: t.artwork_url
            ? t.artwork_url.replace("-large", "-t500x500")
            : "",
          stream_url: hls.url
        };
      })
      .filter(Boolean);

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

app.get("/api/stream", async (req, res) => {
  try {
    const hlsUrl = `${req.query.url}&client_id=${process.env.SC_CLIENT_ID}`;

    const r = await fetch(hlsUrl);
    const data = await r.json();

    res.json({ url: data.url });

  } catch (err) {
    console.error("HLS stream error:", err);
    res.status(500).json({});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
