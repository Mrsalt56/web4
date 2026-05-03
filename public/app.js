import React, { useEffect, useRef, useState } from "react";

export default function MusicApp() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const playerRef = useRef(null);

  // Load YouTube API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId: "",
        playerVars: { autoplay: 1, controls: 0 },
      });
    };
  }, []);

  const search = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${query}&key=AIzaSyCKq37tikxAUcWYr_c_iLcXCGw5HRf3sPc`
    );
    const data = await res.json();
    setResults(data.items);
  };

  const play = (video) => {
    setCurrent(video);
    playerRef.current.loadVideoById(video.id.videoId);
  };

  const addToQueue = (video) => {
    setQueue((q) => [...q, video]);
  };

  const next = () => {
    if (queue.length === 0) return;
    const nextTrack = queue[0];
    setQueue((q) => q.slice(1));
    play(nextTrack);
  };

  return (
    <div className="h-screen bg-black text-white flex p-6 gap-6">
      {/* Hidden YouTube Player */}
      <div id="yt-player"></div>

      {/* LEFT PANEL */}
      <div className="flex-1 bg-zinc-900 rounded-2xl p-6">
        <div className="flex gap-3 mb-4">
          <button className="px-4 py-2 bg-purple-600 rounded-lg">All</button>
          <button className="px-4 py-2 bg-zinc-800 rounded-lg">Monochrome</button>
          <button className="px-4 py-2 bg-zinc-800 rounded-lg">SoundCloud</button>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs..."
          className="w-full p-3 rounded-lg bg-zinc-800 mb-4"
        />

        <button
          onClick={search}
          className="mb-4 px-4 py-2 bg-purple-500 rounded-lg"
        >
          Search
        </button>

        <div className="space-y-3 overflow-y-auto h-[60vh]">
          {results.map((r) => (
            <div
              key={r.id.videoId}
              className="flex items-center gap-3 bg-zinc-800 p-3 rounded-lg"
            >
              <img
                src={r.snippet.thumbnails.default.url}
                alt=""
                className="w-12 h-12 rounded"
              />
              <div className="flex-1">
                <p className="text-sm">{r.snippet.title}</p>
              </div>
              <button
                onClick={() => play(r)}
                className="px-2 py-1 bg-green-600 rounded"
              >
                ▶
              </button>
              <button
                onClick={() => addToQueue(r)}
                className="px-2 py-1 bg-blue-600 rounded"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PLAYER */}
      <div className="w-80 bg-zinc-900 rounded-2xl p-6 flex flex-col items-center">
        {current ? (
          <>
            <img
              src={current.snippet.thumbnails.high.url}
              alt=""
              className="w-40 h-40 rounded-xl mb-4"
            />
            <p className="text-center text-sm mb-2">
              {current.snippet.title}
            </p>
          </>
        ) : (
          <p>No track playing</p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => playerRef.current.pauseVideo()}
            className="bg-zinc-800 p-3 rounded-full"
          >
            ⏸
          </button>
          <button
            onClick={() => playerRef.current.playVideo()}
            className="bg-white text-black p-3 rounded-full"
          >
            ▶
          </button>
          <button
            onClick={next}
            className="bg-zinc-800 p-3 rounded-full"
          >
            ⏭
          </button>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          defaultValue="50"
          onChange={(e) => playerRef.current.setVolume(e.target.value)}
          className="mt-6 w-full"
        />

        <div className="mt-6 text-sm w-full">
          <p>Queue: {queue.length} tracks</p>
        </div>
      </div>
    </div>
  );
}
