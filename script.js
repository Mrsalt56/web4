// PAGE SWITCHING
const navLinks = document.querySelectorAll(".top-nav a");
const pages = document.querySelectorAll(".page");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const pageName = link.dataset.page;

    pages.forEach(page => {
      page.classList.remove("active");
      if (page.id === pageName + "Page") {
        page.classList.add("active");
      }
    });
  });
});

// MOVIE CLICK
document.querySelectorAll(".movie-card").forEach(card => {
  card.addEventListener("click", () => {
    const link = card.dataset.link;
    if (link) window.open(link, "_blank");
  });
});

// GAME DATA
const games = [
 { title: "1v1lol", genre: "Multiplayer", img: "images/1v1-lol_1x1.jpg", link: "games/1v1lol/" },
{ title: "2048", genre: "Puzzle", img: "images/2048_logo.svg.png", link: "games/2048/" },
{ title: "4th and Goal", genre: "Sports", img: "images/4thg.png", link: "games/4thandgoal/" },
{ title: "A Dance of Fire and Ice", genre: "Rhythm", img: "images/icefire.jpg", link: "games/a-dance-of-fire-and-ice/" },
{ title: "A Small World Cup", genre: "Sports", img: "images/smallworldc.jpg", link: "games/a-small-world-cup/" },
{ title: "Agario Minigame", genre: "Multiplayer", img: "images/agar.io.jpg", link: "games/agario-minigame/" },
{ title: "Apple Worm", genre: "Puzzle", img: "images/appleworm.png", link: "games/apple-worms1/" },
{ title: "Bank Robbery 2", genre: "Action", img: "images/bank2.jpg", link: "games/bank2/" },
{ title: "Baseball Bro", genre: "Sports", img: "images/baseball_bros.webp", link: "games/baseballbro/" },
{ title: "Basketball Bros", genre: "Sports", img: "images/basketbro.png", link: "games/basketballbro/" },
{ title: "Basketball Random", genre: "Sports", img: "images/basketr.avif", link: "games/basketrandom/" },
{ title: "Basketball Stars", genre: "Sports", img: "images/basketball.jpg", link: "games/basketball-stars/" },
{ title: "Bike Mania", genre: "Racing", img: "images/bike-mania_1x1.png", link: "games/bike-mania/" },
{ title: "Bitlife", genre: "Simulation", img: "images/bitlife.png.png", link: "games/bitlife/" },
{ title: "Block Blast", genre: "Puzzle", img: "images/blockblast.jpg", link: "games/blockblast/" },
{ title: "Bob the Robber 2", genre: "Action", img: "images/bob-the-robber-2.png", link: "games/bob-the-robber-2/" },
{ title: "Bowmaster", genre: "Action", img: "images/bow.jpg", link: "games/bowmaster/" },
{ title: "Brain Test 2", genre: "Puzzle", img: "images/brain2.png", link: "games/brain2/" },
{ title: "Brainrot Clicker", genre: "Idle", img: "images/italian-brainrot-clicker.jpg", link: "games/brainrot-clicker/" },
{ title: "Breaklock", genre: "Puzzle", img: "images/breaklock.jpg", link: "games/breaklock/" },
{ title: "Burrito Bison", genre: "Action", img: "images/bison.png", link: "games/bison/" },
{ title: "BTD4", genre: "Strategy", img: "images/BTD4.webp", link: "games/btd4/" },
{ title: "BTD5", genre: "Strategy", img: "images/btd5.jpg", link: "games/btd5/" },
{ title: "Casino", genre: "Idle", img: "images/casino.webp", link: "games/casino/" },
{ title: "Chess", genre: "Board", img: "images/chess.png", link: "games/chess/" },
{ title: "Chroma", genre: "Action", img: "images/180911_164021_Proof.PNG.9ecf7a2889c32de0b1abaf96d374900a.png", link: "games/chroma/" },
{ title: "Class of 09", genre: "Adventure", img: "images/class09.jpg", link: "games/class09/" },
{ title: "Cookie Clicker", genre: "Idle", img: "images/Cookie_Clicker.png", link: "games/cookie/" },
{ title: "Core Ball", genre: "Arcade", img: "images/coreball.jpg", link: "games/coreball/" },
{ title: "Crazy Cattle 3D", genre: "Action", img: "games/cattle/CrazyCattle3D.png", link: "games/cattle/" },
{ title: "Crossy Road", genre: "Arcade", img: "images/road.jpg", link: "games/crossyrp/" },
{ title: "Cubefield", genre: "Arcade", img: "images/cubefield.webp", link: "games/cubefield/" },
{ title: "Dinosaur", genre: "Arcade", img: "images/offline dino.webp", link: "games/dinosaur/" },
{ title: "Doodle Jump", genre: "Arcade", img: "games/doodle/doodle.png", link: "games/doodle/" },
{ title: "Drift Boss", genre: "Arcade", img: "games/drift-boss/drift-boss.png", link: "games/drift-boss/" },
{ title: "Drive Mad", genre: "Racing", img: "images/drive-mad.jpg", link: "games/drive-mad/" },
{ title: "Dreadhead Parkour", genre: "Arcade", img: "images/dreadhead.png", link: "games/dreadhead/" },
{ title: "DuckLife", genre: "RPG", img: "images/DuckLife.jpg", link: "games/ducklife/" },
{ title: "DuckLife 3", genre: "RPG", img: "images/duck-life-3.webp", link: "games/ducklife3/" },
{ title: "DuckLife 4", genre: "RPG", img: "images/ducklife4.png", link: "games/ducklife4/" },
{ title: "Dunk Shot", genre: "Sports", img: "images/dunk.jpg", link: "games/dunk/" },
{ title: "Escape Road", genre: "Action", img: "images/escaper.png", link: "games/escaper/" },
{ title: "Escape Road 2", genre: "Action", img: "images/eroad.jpg", link: "games/eroad/" },
{ title: "Fireboy and Watergirl", genre: "Puzzle", img: "images/fireboy.jpg", link: "games/fireboyicegirl/" },
{ title: "Five Nights at Freddies", genre: "Horror", img: "images/fanf1.jpg", link: "games/fnaf1/" },
{ title: "Five Nights at Freddies 2", genre: "Horror", img: "images/fnaf2.png", link: "games/fnaf2/" },
{ title: "Five Nights at Freddies 3", genre: "Horror", img: "images/fnaf 3.webp", link: "games/fnaf3/" },
{ title: "Five Nights at Freddies 4", genre: "Horror", img: "images/fnaf4.webp", link: "games/fnaf4/" },
{ title: "Flappy 2048", genre: "Arcade", img: "images/flappy2048.png", link: "games/flappy-2048/" },
{ title: "Flappy Bird", genre: "Arcade", img: "games/flappy/assets/thumb.png", link: "games/flappy/" },
{ title: "Friendly Fire", genre: "Action", img: "images/friendly.jpg", link: "games/friendlyfire/" },
{ title: "Fruit Ninja", genre: "Arcade", img: "games/ninja/thumb.png", link: "games/fruit-ninja/" },
{ title: "Funny Shooter", genre: "Shooter", img: "images/funnysh.png", link: "games/funny-shooter/" },
{ title: "Game Inside a Game", genre: "Puzzle", img: "images/gameingame.png", link: "games/game-inside-a-game/" },
{ title: "Geometry", genre: "Puzzle", img: "images/geometry.png", link: "games/geometry/" },
{ title: "Getaway Shootout", genre: "Shooter", img: "images/getaway.png", link: "games/getaway/" },
{ title: "Google Snake", genre: "Arcade", img: "images/snakeg.jpg", link: "games/snakeg/" },
{ title: "Google Solitaire", genre: "Card", img: "images/google.jpg", link: "games/google-solitaire/" },
{ title: "Gopher Kart", genre: "Racing", img: "images/gopher-kart.webp", link: "games/gopher-kart/" },
{ title: "Granny", genre: "Horror", img: "images/granny.png", link: "games/granny1/" },
{ title: "Granny 2", genre: "Horror", img: "images/granny2.png", link: "games/granny2/" },
{ title: "HexGL", genre: "Racing", img: "images/hexgl.jpg", link: "games/hexgl/" },
{ title: "Hextris", genre: "Puzzle", img: "images/hextris.jpg", link: "games/hextris/" },
{ title: "Hill Racing", genre: "Racing", img: "images/bike-racing-3.jpg", link: "games/hill-racing/" },
{ title: "Hole.io", genre: "Arcade", img: "images/Hole.io.webp", link: "games/hole.io/" },
{ title: "Icy Head", genre: "Arcade", img: "images/icyhead.jpg", link: "games/icy head/" },
{ title: "Impossible Quiz", genre: "Puzzle", img: "images/quiz.jpg", link: "games/impossiblequiz/" },
{ title: "Level Devil", genre: "Puzzle", img: "images/devil.jpg", link: "games/leveld2/" },
{ title: "Madalin Cars Multiplayer", genre: "Racing", img: "images/madalin.avif", link: "games/madalin-cars-multiplayer/" },
{ title: "Madalin Stunt Cars 2", genre: "Racing", img: "images/madalin2.avif", link: "games/madalin-stunt-cars-2/" },
{ title: "Madness Combat", genre: "Action", img: "images/Madness.webp", link: "games/madness/" },
{ title: "Minecraft", genre: "Simulation", img: "images/mc1.jpg", link: "games/mc/" },
{ title: "Microsoft Flight Simulator", genre: "Simulation", img: "images/Microsoft flight.png", link: "games/microsoft-flight-simulator/" },
{ title: "Minesweeper", genre: "Puzzle", img: "games/minesweeper/img/minesweeper.png", link: "games/minesweeper/" },
{ title: "MonkeyMart", genre: "Simulation", img: "images/monkey.png", link: "games/MonkeyMart/" },
{ title: "Moto X3M", genre: "Racing", img: "images/moto-x3m.jpg", link: "games/moto-x3m/" },
{ title: "Moto X3M Pool Party", genre: "Racing", img: "images/moto-x3m-pool-party.png", link: "games/moto-x3m-pool-party/" },
{ title: "Moto X3M Spooky Land", genre: "Racing", img: "images/MotoX3M-Spookyland.jpg", link: "games/moto-x3m-spooky-land/" },
{ title: "Moto X3M Winter", genre: "Racing", img: "images/moto-x3m-winter.jpg", link: "games/moto-x3m-winter/" },
{ title: "Pacman", genre: "Arcade", img: "images/pacman.webp", link: "games/pacman/" },
{ title: "Papa's Bakeria", genre: "Simulation", img: "images/papas-bakeria.png", link: "games/papas-bakeria.html/" },
{ title: "Papa's Burgeria", genre: "Simulation", img: "images/burger.png", link: "games/papasburgeria/" },
{ title: "Papa's Pizzaria", genre: "Simulation", img: "images/papaspizzaria.jpg", link: "games/papaspizzaria/" },
{ title: "Papa's Sushiria", genre: "Simulation", img: "images/shushi.png", link: "games/papas-sushiria.html/" },
{ title: "Parking Fury", genre: "Racing", img: "games/ParkingFury/assets/game_logo.png", link: "games/ParkingFury/" },
{ title: "Parking Fury 2", genre: "Racing", img: "images/fury2.png", link: "games/parkingfury2/" },
{ title: "Parking Fury 3", genre: "Racing", img: "images/fury3.jpg", link: "games/parkfury3/" },
{ title: "Radius Raid", genre: "Arcade", img: "images/radius raid.jpg", link: "games/radius-raid/" },
{ title: "Retro Bowl", genre: "Sports", img: "images/retro-bowl.jpg", link: "games/retro-bowl/" },
{ title: "Rooftop Sniper", genre: "Shooter", img: "images/rooftop.png", link: "games/rooftop/" },
{ title: "Run 2", genre: "Platformer", img: "images/run-2.jpg", link: "games/Run 2/" },
{ title: "Slope", genre: "Arcade", img: "images/slope.jpg", link: "games/slope/" },
{ title: "Slope 2", genre: "Arcade", img: "images/slope2.jpg", link: "games/slope-2/" },
{ title: "Snowrider 3D", genre: "Racing", img: "images/snowrider.png", link: "games/snowrider3d/" },
{ title: "Sonic", genre: "Arcade", img: "images/sonic.jpg", link: "games/sonic/" },
{ title: "Space Invaders", genre: "Arcade", img: "images/space invaders.avif", link: "games/spaceinvaders/" },
{ title: "Stickman Hook", genre: "Arcade", img: "images/Stickmanh.webp", link: "games/hook/" },
{ title: "Subway Surfer", genre: "Runner", img: "images/subway.webp", link: "games/subwaysurfer/" },
{ title: "Super Mario 64", genre: "Platformer", img: "images/Mario64.webp", link: "games/sm64/" },
{ title: "Superhot", genre: "Shooter", img: "images/superhot.jpg", link: "games/superhot/" },
{ title: "Temple Run 2", genre: "Runner", img: "images/temple.jpg", link: "games/temple/" },
{ title: "Tetris", genre: "Puzzle", img: "images/tetris.png", link: "games/Tetris/" },
{ title: "Tomb of the Mask", genre: "Arcade", img: "images/tomb.png", link: "games/tomb/" },
{ title: "Tunnel Rush", genre: "Arcade", img: "images/tunnel.webp", link: "games/tunnel-rush/" },
{ title: "Vex 3", genre: "Platformer", img: "images/vex3.jpg", link: "games/vex3/" },
{ title: "Vex 4", genre: "Platformer", img: "images/vex4.jpg", link: "games/vex4/" },
{ title: "Vex 5", genre: "Platformer", img: "images/vex5.jpg", link: "games/vex5/" },
{ title: "Vex 6", genre: "Platformer", img: "images/vex6.jpeg", link: "games/vex6/" },
{ title: "Vex 7", genre: "Platformer", img: "images/vex7.jpeg", link: "games/vex7/" },
{ title: "Wordle", genre: "Puzzle", img: "games/wordle/images/wordle_logo_32x32.png", link: "games/wordle/" },
{ title: "World's Hardest Game", genre: "Puzzle", img: "games/worlds-hardest-game/images/splash.jpg", link: "games/worlds-hardest-game/" },
{ title: "Zombotron", genre: "Shooter", img: "images/zombotron.webp", link: "games/zombotron/" },
{ title: "Zombotron 2", genre: "Shooter", img: "images/zombotron 2.jpg", link: "games/zombotron-2/" },
];

// AUTO SORT GAMES BY GENRE
const container = document.getElementById("gamesContainer");
const genres = {};

games.forEach(game => {
  if (!genres[game.genre]) genres[game.genre] = [];
  genres[game.genre].push(game);
});

for (let genre in genres) {
  const section = document.createElement("div");
  section.className = "genre-section";

  const title = document.createElement("h3");
  title.className = "genre-title";
  title.textContent = genre;

  const grid = document.createElement("div");
  grid.className = "games-grid";

  genres[genre].forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.img}">
      <h3>${game.title}</h3>
    `;
    card.addEventListener("click", () => {
      window.open(game.link, "_blank");
    });
    grid.appendChild(card);
  });

  section.appendChild(title);
  section.appendChild(grid);
  container.appendChild(section);
}

// Shoutout Queue (Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyDyk5FAyCRyAn6ll5_nfSV5e16mvi1l-n4",
  authDomain: "mrsalt56-e6066.firebaseapp.com",
  databaseURL: "https://mrsalt56-e6066-default-rtdb.firebaseio.com",
  projectId: "mrsalt56-e6066",
  storageBucket: "mrsalt56-e6066.appspot.com",
  messagingSenderId: "716178119141",
  appId: "1:716178119141:web:2c39c7f79213699a38b70c"
};

// Firebase Init
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const submitBtn = document.getElementById("submitBtn");
const userNameInput = document.getElementById("userName");
const queueList = document.getElementById("queueList");
const cooldownMsg = document.getElementById("cooldownMsg");

const COOLDOWN = 60 * 1000;


// Submit Shoutout
if (submitBtn) {
  submitBtn.addEventListener("click", () => {

    const name = userNameInput.value.trim();
    if (!name) return alert("Enter a name");

    const last = localStorage.getItem("lastShoutout") || 0;

    if (Date.now() - last < COOLDOWN) {
      cooldownMsg.textContent = "Wait before submitting again.";
      return;
    }

    localStorage.setItem("lastShoutout", Date.now());
    cooldownMsg.textContent = "";

    db.ref("shoutouts").push({
      name,
      timestamp: Date.now()
    });

    userNameInput.value = "";
  });
}



// ==========================
// ACTIVITIES DROPDOWNS
// ==========================

document.querySelectorAll(".activity-drop").forEach(drop => {

  const head = drop.querySelector(".activity-head");

  head.addEventListener("click", e => {

  // Prevent interfering with inner buttons
  e.stopPropagation();

  const open = drop.dataset.open === "true";
  drop.dataset.open = open ? "false" : "true";
  });

});

// ==========================
// SESSION TIMER
// ==========================

(() => {

  const start = Date.now();

  function tick() {

    const s = Math.floor((Date.now() - start) / 1000);

    const hh = String(Math.floor(s / 3600)).padStart(2, "0");
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");

    const el = document.getElementById("sessionTimer");

    if (el) el.textContent = `${hh}:${mm}:${ss}`;
  }

  tick();
  setInterval(tick, 1000);

})();


// ==========================
// SHOUTOUT QUEUE (MAX 10)
// ==========================


// Submit
if (submitBtn) {

  submitBtn.addEventListener("click", () => {

    const name = userNameInput.value.trim();

    if (!name) return alert("Enter a name");

    const last = localStorage.getItem("lastShoutout") || 0;

    if (Date.now() - last < COOLDOWN) {

      cooldownMsg.textContent = "Wait before submitting again.";
      return;
    }

    localStorage.setItem("lastShoutout", Date.now());
    cooldownMsg.textContent = "";

    db.ref("shoutouts").push({
      name,
      timestamp: Date.now()
    });

    userNameInput.value = "";
  });
}


// Display First 10 Only
db.ref("shoutouts")
  .orderByChild("timestamp")
  .on("value", snap => {

    if (!queueList) return;

    const list = [];

    snap.forEach(child => {
      list.push(child.val());
    });

    // Oldest first
    list.sort((a, b) => a.timestamp - b.timestamp);

    // First 10 only
    const visible = list.slice(0, 10);

    queueList.innerHTML = "";

    visible.forEach(item => {

      const li = document.createElement("li");
      li.textContent = item.name;

      queueList.appendChild(li);
    });

  });

// =====================
// WEBHOOKS (FROM OLD)
// =====================

const webhookURL = "https://discord.com/api/webhooks/1442643918356480091/UUR5lCKDC2OUBI5xQWeWMO_vwRiCXgFswnbWOoC2OWX2iCzSintVVQFCu1xFzuCj8ljq";
const reportWebhookURL = "https://discord.com/api/webhooks/1442642641576525854/VinflwdNekq4_nVAPn7R4XyQwHrUtqbobeu2HMSuzDEvOHInYxIjnqyi4hH8pKuE6lxU";

const sendBtn = document.getElementById("sendSuggestion");
const sendReportBtn = document.getElementById("sendReport");

const closeBtns = document.querySelectorAll(".modal .close");


// Close modals
closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});


// Suggest Send
if (sendBtn) {
  sendBtn.addEventListener("click", () => {

    const name = document.getElementById("gameName").value.trim();
    const details = document.getElementById("gameDetails").value.trim();

    if (!name) return alert("Enter a game name");

    fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🎮 New Suggestion\nGame: ${name}\nDetails: ${details || "None"}`
      })
    });

    alert("Sent!");
    document.getElementById("suggestionForm").style.display = "none";
  });
}


// Report Send
if (sendReportBtn) {
  sendReportBtn.addEventListener("click", () => {

    const title = document.getElementById("problemTitle").value.trim();
    const details = document.getElementById("problemDetails").value.trim();

    if (!title) return alert("Enter a title");

    fetch(reportWebhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🚨 Report\nTitle: ${title}\nDetails: ${details || "None"}`
      })
    });

    alert("Sent!");
    document.getElementById("reportForm").style.display = "none";
  });
}

// =====================
// QUICK ACTIONS (FINAL - CLEAN)
// =====================

document.addEventListener("click", function (e) {

  // Open Suggest
  if (e.target.closest("#actSuggest")) {
    document.getElementById("suggestionForm").style.display = "flex";
  }

  // Open Report
  if (e.target.closest("#actReport")) {
    document.getElementById("reportForm").style.display = "flex";
  }

  // Close when clicking background
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
  }

});

// ==========================
// IMPROVED APPEARANCE SYSTEM
// ==========================

const floatingBG = document.querySelector(".floating-bg");

const bgPicker = document.getElementById("bgColorPicker");
const bubblePicker = document.getElementById("bubbleColorPicker");
const bubbleCount = document.getElementById("bubbleCount");
const bubbleSize = document.getElementById("bubbleSize");
const bubbleSpeed = document.getElementById("bubbleSpeed");
const bubbleShape = document.getElementById("bubbleShape");

const countValue = document.getElementById("countValue");
const speedValue = document.getElementById("speedValue");

// Show slider numbers
function updateSliderLabels() {
  countValue.textContent = bubbleCount.value;
  speedValue.textContent = bubbleSpeed.value;
}

// Generate non-overlapping positions
function generateBubbles(count) {

  floatingBG.innerHTML = "";

  const positions = [];
  const minDistance = bubbleSize.value * 1.5;

  for (let i = 0; i < count; i++) {

    let left;
    let tries = 0;

    do {
      left = Math.random() * 100;
      tries++;
    } 
    while (
      positions.some(pos => Math.abs(pos - left) < (minDistance / window.innerWidth) * 100)
      && tries < 50
    );

    positions.push(left);

    const bubble = document.createElement("span");
    bubble.style.left = left + "%";

    applyBubbleStyle(bubble);

    floatingBG.appendChild(bubble);
  }
}

// Apply shape + size + speed + color
function applyBubbleStyle(bubble) {

  const size = bubbleSize.value + "px";

  bubble.style.width = size;
  bubble.style.height = size;
  bubble.style.animationDuration = bubbleSpeed.value + "s";
  bubble.style.background = bubblePicker.value + "33";
  bubble.style.border = "none";
  bubble.style.transform = "none";

  const shape = bubbleShape.value;

  switch (shape) {

    case "circle":
      bubble.style.borderRadius = "50%";
      break;

    case "square":
      bubble.style.borderRadius = "0%";
      break;

    case "rounded":
      bubble.style.borderRadius = "20%";
      break;

    case "triangle":
      bubble.style.width = "0";
      bubble.style.height = "0";
      bubble.style.borderLeft = size + " solid transparent";
      bubble.style.borderRight = size + " solid transparent";
      bubble.style.borderBottom = size + " solid " + bubblePicker.value + "66";
      bubble.style.background = "transparent";
      break;

    case "diamond":
      bubble.style.borderRadius = "0";
      bubble.style.transform = "rotate(45deg)";
      break;

    case "random":
      const shapes = ["circle","square","rounded","diamond"];
      const randomShape = shapes[Math.floor(Math.random()*shapes.length)];
      bubble.style.borderRadius =
        randomShape === "circle" ? "50%" :
        randomShape === "rounded" ? "20%" : "0%";
      break;
  }
}

// Update everything
function updateAppearance() {

  updateSliderLabels();

  document.body.style.background = bgPicker.value;

  generateBubbles(parseInt(bubbleCount.value));

  saveAppearance();
}

// Save
function saveAppearance() {

  const settings = {
    bg: bgPicker.value,
    bubble: bubblePicker.value,
    count: bubbleCount.value,
    size: bubbleSize.value,
    speed: bubbleSpeed.value,
    shape: bubbleShape.value
  };

  localStorage.setItem("appearanceSettings", JSON.stringify(settings));
}

// Load
function loadAppearance() {

  const saved = localStorage.getItem("appearanceSettings");
  if (!saved) return;

  const settings = JSON.parse(saved);

  bgPicker.value = settings.bg;
  bubblePicker.value = settings.bubble;
  bubbleCount.value = settings.count;
  bubbleSize.value = settings.size;
  bubbleSpeed.value = settings.speed;
  bubbleShape.value = settings.shape;

  document.body.style.background = settings.bg;
}

// Event listeners
[bgPicker, bubblePicker, bubbleCount, bubbleSize, bubbleSpeed, bubbleShape]
.forEach(el => {
  el.addEventListener("input", updateAppearance);
  el.addEventListener("change", updateAppearance);
});

// Init
loadAppearance();
updateSliderLabels();
generateBubbles(parseInt(bubbleCount.value));
// Init
loadAppearance();
generateBubbles(bubbleCount.value);
