import express from "express";
import fetch from "node-fetch";

const app = express();

const SC_CLIENT_ID = process.env.SC_CLIENT_ID;

const app=express()

/* SEARCH MULTIPLE SOURCES */

app.get("/api/search", async (req, res) => {

  const q = req.query.q;

  if (!q) {
    return res.json([]);
  }

  const results = [];

  try {

    /* ---------- SOUND CLOUD ---------- */

    try {

      const sc = await fetch(
        `https://api-v2.soundcloud.com/search/tracks?q=${encodeURIComponent(q)}&client_id=${SC_CLIENT_ID}&limit=10`,
        { headers: { "User-Agent": "Mozilla/5.0" } }
      );

      const scData = await sc.json();

      if (scData.collection) {

        scData.collection.forEach(track => {

          const hls = track.media?.transcodings?.find(
            t => t.format.protocol === "hls"
          );

          if (!hls) return;

          results.push({
            title: track.title,
            artist: track.user.username,
            artwork: track.artwork_url
              ? track.artwork_url.replace("-large", "-t500x500")
              : "",
            stream_url: hls.url,
            source: "soundcloud"
          });

        });

      }

    } catch {
      console.log("SoundCloud failed");
    }

    /* ---------- JAMENDO ---------- */

    try {

      const jam = await fetch(
        `https://api.jamendo.com/v3.0/tracks/?client_id=440d4f5e&format=json&limit=10&namesearch=${encodeURIComponent(q)}`
      );

      const jamData = await jam.json();

      if (jamData.results) {

        jamData.results.forEach(track => {

          results.push({
            title: track.name,
            artist: track.artist_name,
            artwork: track.album_image,
            stream_url: track.audio,
            source: "jamendo"
          });

        });

      }

    } catch {
      console.log("Jamendo failed");
    }

    /* ---------- INTERNET ARCHIVE ---------- */

    try {

      const archive = await fetch(
        `https://archive.org/advancedsearch.php?q=${encodeURIComponent(q)}&output=json&rows=10`
      );

      const archData = await archive.json();

      if (archData.response?.docs) {

        archData.response.docs.forEach(track => {

          if (!track.identifier) return;

          results.push({
            title: track.title || "Unknown",
            artist: track.creator || "Unknown",
            artwork: "",
            stream_url: `https://archive.org/download/${track.identifier}/${track.identifier}.mp3`,
            source: "archive"
          });

        });

      }

    } catch {
      console.log("Archive failed");
    }

res.json(songs)

  } catch (err) {

    console.error("Search error:", err);
    res.status(500).json([]);

  }

});


/* STREAM SOUNDCLOUD HLS */

app.get("/api/stream", async (req, res) => {

  try {

    const url = req.query.url;

    if (!url) {
      return res.status(400).json({});
    }

    const stream = await fetch(`${url}&client_id=${SC_CLIENT_ID}`);
    const data = await stream.json();

    res.json({ url: data.url });

  } catch (err) {

    console.error("Stream error:", err);
    res.status(500).json({});

  }

});


/* START SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
