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
{ title: "4th and Goal", genre: "Sports", img: "images/4thandgoal.jpg", link: "games/4th-and-goal/" },
{ title: "A Dance of Fire and Ice", genre: "Rhythm", img: "images/adofai.jpg", link: "games/adofai/" },
{ title: "A Small World Cup", genre: "Sports", img: "images/smallworldcup.jpg", link: "games/a-small-world-cup/" },
{ title: "Agario Minigame", genre: "Multiplayer", img: "images/agario.jpg", link: "games/agario/" },
{ title: "Apple Worm", genre: "Puzzle", img: "images/appleworm.png", link: "games/apple-worms1/" },
{ title: "Bank Robbery 2", genre: "Action", img: "images/bank2.jpg", link: "games/bank2/" },
{ title: "Baseball Bro", genre: "Sports", img: "images/baseballbro.png", link: "games/baseballbro/" },
{ title: "Basketball Bros", genre: "Sports", img: "images/basketbro.png", link: "games/basketballbro/" },
{ title: "Basketball Random", genre: "Sports", img: "images/basketr.avif", link: "games/basketrandom/" },
{ title: "Basketball Stars", genre: "Sports", img: "images/basketball.jpg", link: "games/basketball-stars/" },
{ title: "Bike Mania", genre: "Racing", img: "images/bike-mania_1x1.png", link: "games/bike-mania/" },
{ title: "Bitlife", genre: "Simulation", img: "images/bitlife.png.png", link: "games/bitlife/" },
{ title: "Block Blast", genre: "Puzzle", img: "images/blockblast.jpg", link: "games/blockblast/" },
{ title: "Bob the Robber 2", genre: "Action", img: "images/bob-the-robber-2.png", link: "games/bob-the-robber-2/" },
{ title: "Bowmaster", genre: "Action", img: "images/bowmaster.jpg", link: "games/bowmaster/" },
{ title: "Brain Test 2", genre: "Puzzle", img: "images/braintest2.jpg", link: "games/braintest2/" },
{ title: "Brainrot Clicker", genre: "Idle", img: "images/italian-brainrot-clicker.jpg", link: "games/brainrot-clicker/" },
{ title: "Breaklock", genre: "Puzzle", img: "images/breaklock.jpg", link: "games/breaklock/" },
{ title: "Burrito Bison", genre: "Action", img: "images/burritobison.jpg", link: "games/burrito-bison/" },
{ title: "BTD4", genre: "Strategy", img: "images/BTD4.webp", link: "games/btd4/" },
{ title: "BTD5", genre: "Strategy", img: "images/btd5.jpg", link: "games/btd5/" },
{ title: "Casino", genre: "Idle", img: "images/casino.webp", link: "games/casino/" },
{ title: "Chess", genre: "Board", img: "images/chess.jpg", link: "games/chess/" },
{ title: "Chroma", genre: "Action", img: "images/chroma.png", link: "games/chroma/" },
{ title: "Class of 09", genre: "Adventure", img: "images/classof09.jpg", link: "games/classof09/" },
{ title: "Cookie Clicker", genre: "Idle", img: "images/Cookie_Clicker.png", link: "games/cookie/" },
{ title: "Core Ball", genre: "Arcade", img: "images/coreball.jpg", link: "games/coreball/" },
{ title: "Crazy Cattle 3D", genre: "Action", img: "games/cattle/CrazyCattle3D.png", link: "games/cattle/" },
{ title: "Crossy Road", genre: "Arcade", img: "images/road.jpg", link: "games/crossyrp/" },
{ title: "Cubefield", genre: "Arcade", img: "images/cubefield.webp", link: "games/cubefield/" },
{ title: "Dinosaur", genre: "Arcade", img: "images/offline dino.webp", link: "games/dinosaur/" },
{ title: "Doodle Jump", genre: "Arcade", img: "games/doodle/doodle.png", link: "games/doodle/" },
{ title: "Drift Boss", genre: "Arcade", img: "games/drift-boss/drift-boss.png", link: "games/drift-boss/" },
{ title: "Drive Mad", genre: "Racing", img: "images/drivemad.jpg", link: "games/drivemad/" },
{ title: "Dreadhead Parkour", genre: "Arcade", img: "images/dreadhead.png", link: "games/dreadhead/" },
{ title: "DuckLife", genre: "RPG", img: "images/DuckLife.jpg", link: "games/ducklife/" },
{ title: "DuckLife 3", genre: "RPG", img: "images/duck-life-3.webp", link: "games/ducklife3/" },
{ title: "DuckLife 4", genre: "RPG", img: "images/ducklife4.png", link: "games/ducklife4/" },
{ title: "Dunk Shot", genre: "Sports", img: "images/dunkshot.jpg", link: "games/dunkshot/" },
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
{ title: "Google Snake", genre: "Arcade", img: "images/googlesnake.png", link: "games/google-snake/" },
{ title: "Google Solitaire", genre: "Card", img: "images/google.jpg", link: "games/google-solitaire/" },
{ title: "Gopher Kart", genre: "Racing", img: "images/gopher-kart.webp", link: "games/gopher-kart/" },
{ title: "Granny", genre: "Horror", img: "images/granny.png", link: "games/granny1/" },
{ title: "Granny 2", genre: "Horror", img: "images/granny2.png", link: "games/granny2/" },
{ title: "HexGL", genre: "Racing", img: "images/hexgl.jpg", link: "games/hexgl/" },
{ title: "Hextris", genre: "Puzzle", img: "images/hextris.jpg", link: "games/hextris/" },
{ title: "Hill Racing", genre: "Racing", img: "images/bike-racing-3.jpg", link: "games/hill-racing/" },
{ title: "Hole.io", genre: "Arcade", img: "images/Hole.io.webp", link: "games/hole.io/" },
{ title: "Hook", genre: "Arcade", img: "images/Stickmanh.webp", link: "games/hook/" },
{ title: "Icy Head", genre: "Arcade", img: "images/icyhead.jpg", link: "games/icyhead/" },
{ title: "Impossible Quiz", genre: "Puzzle", img: "images/quiz.jpg", link: "games/impossiblequiz/" },
{ title: "Italian Brainrot Clicker", genre: "Idle", img: "images/italian-brainrot-clicker.jpg", link: "games/brainrot-clicker/" },
{ title: "Level Devil", genre: "Puzzle", img: "images/devil.jpg", link: "games/leveld2/" },
{ title: "Madalin Cars Multiplayer", genre: "Racing", img: "images/madalin.avif", link: "games/madalin-cars-multiplayer/" },
{ title: "Madalin Stunt Cars 2", genre: "Racing", img: "images/madalin2.avif", link: "games/madalin-stunt-cars-2/" },
{ title: "Madness Combat", genre: "Action", img: "images/Madness.webp", link: "games/madness/" },
{ title: "Minecraft", genre: "Simulation", img: "images/mc1.jpg", link: "games/mc/" },
{ title: "Microsoft Flight Simulator", genre: "Simulation", img: "images/Microsoft flight.png", link: "games/microsoft-flight-simulator/" },
{ title: "Minesweeper", genre: "Puzzle", img: "images/minesweeper.jpg", link: "games/minesweeper/" },
{ title: "MonkeyMart", genre: "Simulation", img: "images/monkeymart.jpg", link: "games/monkeymart/" },
{ title: "Moto X3M", genre: "Racing", img: "images/moto-x3m.jpg", link: "games/moto-x3m/" },
{ title: "Moto X3M Pool Party", genre: "Racing", img: "images/motopool.jpg", link: "games/moto-x3m-pool-party/" },
{ title: "Moto X3M Spooky Land", genre: "Racing", img: "images/motospooky.jpg", link: "games/moto-x3m-spooky-land/" },
{ title: "Moto X3M Winter", genre: "Racing", img: "images/motowinter.jpg", link: "games/moto-x3m-winter/" },
{ title: "Pacman", genre: "Arcade", img: "images/pacman.jpg", link: "games/pacman/" },
{ title: "Papa's Bakeria", genre: "Simulation", img: "images/papasbakeria.jpg", link: "games/papas-bakeria/" },
{ title: "Papa's Burgeria", genre: "Simulation", img: "images/papasburgeria.jpg", link: "games/papas-burgeria/" },
{ title: "Papa's Pizzaria", genre: "Simulation", img: "images/papaspizzaria.jpg", link: "games/papas-pizzaria/" },
{ title: "Papa's Sushiria", genre: "Simulation", img: "images/papassushiria.jpg", link: "games/papas-sushiria/" },
{ title: "Parking Fury", genre: "Racing", img: "games/ParkingFury/assets/game_logo.png", link: "games/ParkingFury/" },
{ title: "Parking Fury 2", genre: "Racing", img: "images/fury2.png", link: "games/parkingfury2/" },
{ title: "Parking Fury 3", genre: "Racing", img: "images/fury3.jpg", link: "games/parkfury3/" },
{ title: "Radius Raid", genre: "Arcade", img: "images/radiusraid.jpg", link: "games/radiusraid/" },
{ title: "Retro Bowl", genre: "Sports", img: "images/retrobowl.jpg", link: "games/retrobowl/" },
{ title: "Rooftop Sniper", genre: "Shooter", img: "images/rooftop.png", link: "games/rooftop/" },
{ title: "Run 2", genre: "Platformer", img: "images/run2.jpg", link: "games/run2/" },
{ title: "Slope", genre: "Arcade", img: "images/slope.jpg", link: "games/slope/" },
{ title: "Slope 2", genre: "Arcade", img: "images/slope2.jpg", link: "games/slope2/" },
{ title: "Snake", genre: "Arcade", img: "images/snake.jpg", link: "games/snake/" },
{ title: "Snowrider 3D", genre: "Sports", img: "images/snowrider3d.jpg", link: "games/snowrider3d/" },
{ title: "Sonic", genre: "Arcade", img: "images/sonic.jpg", link: "games/sonic/" },
{ title: "Space Invaders", genre: "Arcade", img: "images/spaceinvaders.jpg", link: "games/space-invaders/" },
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
{ title: "Vex 6", genre: "Platformer", img: "images/vex6.jpg", link: "games/vex6/" },
{ title: "Vex 7", genre: "Platformer", img: "images/vex7.jpeg", link: "games/vex7/" },
{ title: "Wordle", genre: "Puzzle", img: "games/wordle/images/wordle_logo_32x32.png", link: "games/wordle/" },
{ title: "World's Hardest Game", genre: "Puzzle", img: "games/worlds-hardest-game/images/splash.jpg", link: "games/worlds-hardest-game/" },
{ title: "Zombotron", genre: "Shooter", img: "images/zombotron.webp", link: "games/zombotron/" },
{ title: "Zombotron 2", genre: "Shooter", img: "images/zombotron 2.jpg", link: "games/zombotron-2/" },
{ title: "Getaway Shootout 2", genre: "Shooter", img: "images/getaway2.jpg", link: "games/getaway2/" },
{ title: "Drive Mad 2", genre: "Racing", img: "images/drivemad2.jpg", link: "games/drivemad2/" },
{ title: "Fireboy and Watergirl 2", genre: "Puzzle", img: "images/fireboy2.jpg", link: "games/fireboy2/" },
{ title: "Fireboy and Watergirl 3", genre: "Puzzle", img: "images/fireboy3.jpg", link: "games/fireboy3/" },
{ title: "Hill Climb Racing", genre: "Racing", img: "images/hillclimb.jpg", link: "games/hill-climb-racing/" },
{ title: "Idle Breakout", genre: "Idle", img: "images/idlebreakout.jpg", link: "games/idle-breakout/" },
{ title: "Jetpack Joyride", genre: "Runner", img: "images/jetpack.jpg", link: "games/jetpack-joyride/" },
{ title: "Johnny Trigger", genre: "Action", img: "images/johnnytrigger.jpg", link: "games/johnny-trigger/" },
{ title: "Just Fall", genre: "Multiplayer", img: "images/justfall.jpg", link: "games/justfall/" },
{ title: "Krunker", genre: "Shooter", img: "images/krunker.jpg", link: "games/krunker/" },
{ title: "Line Rider", genre: "Puzzle", img: "images/linerider.jpg", link: "games/linerider/" },
{ title: "Minecraft Classic", genre: "Simulation", img: "images/minecraftclassic.jpg", link: "games/minecraft-classic/" },
{ title: "Moto Trials", genre: "Racing", img: "images/mototrials.jpg", link: "games/mototrials/" },
{ title: "Neon Biker", genre: "Racing", img: "images/neonbiker.jpg", link: "games/neon-biker/" },
{ title: "OvO", genre: "Platformer", img: "images/ovo.jpg", link: "games/ovo/" },
{ title: "Paper.io", genre: "Multiplayer", img: "images/paperio.jpg", link: "games/paperio/" },
{ title: "Penalty Shooters 2", genre: "Sports", img: "images/penalty2.jpg", link: "games/penalty-shooters-2/" },
{ title: "Pixel Gun Survival", genre: "Shooter", img: "images/pixelgun.jpg", link: "games/pixel-gun-survival/" },
{ title: "Raft Wars", genre: "Strategy", img: "images/raftwars.jpg", link: "games/raft-wars/" },
{ title: "Ragdoll Archers", genre: "Action", img: "images/ragdollarchers.jpg", link: "games/ragdoll-archers/" },
{ title: "Shell Shockers", genre: "Shooter", img: "images/shellshockers.jpg", link: "games/shellshockers/" },
{ title: "Sky Riders", genre: "Racing", img: "images/skyriders.jpg", link: "games/skyriders/" },
{ title: "Smash Karts", genre: "Multiplayer", img: "images/smashkarts.jpg", link: "games/smashkarts/" },
{ title: "Stick Duel", genre: "Action", img: "images/stickduel.jpg", link: "games/stick-duel/" },
{ title: "Stick War", genre: "Strategy", img: "images/stickwar.jpg", link: "games/stick-war/" },
{ title: "Tanuki Sunset", genre: "Racing", img: "images/tanukisunset.jpg", link: "games/tanuki-sunset/" },
{ title: "Tiny Fishing", genre: "Idle", img: "images/tinyfishing.jpg", link: "games/tiny-fishing/" },
{ title: "Townscaper", genre: "Simulation", img: "images/townscaper.jpg", link: "games/townscaper/" },
{ title: "Traffic Mania", genre: "Puzzle", img: "images/trafficmania.jpg", link: "games/traffic-mania/" },
{ title: "Ultimate Flash Sonic", genre: "Arcade", img: "images/ultimateflashsonic.jpg", link: "games/ultimate-flash-sonic/" },
{ title: "Volley Random", genre: "Sports", img: "images/volleyrandom.jpg", link: "games/volleyrandom/" },
{ title: "War Brokers", genre: "Shooter", img: "images/warbrokers.jpg", link: "games/warbrokers/" },
{ title: "Water Color Sort", genre: "Puzzle", img: "images/watercolorsort.jpg", link: "games/water-color-sort/" },
{ title: "Wheely 2", genre: "Puzzle", img: "images/wheely2.jpg", link: "games/wheely2/" },
{ title: "Wheely 3", genre: "Puzzle", img: "images/wheely3.jpg", link: "games/wheely3/" },
{ title: "Wheely 4", genre: "Puzzle", img: "images/wheely4.jpg", link: "games/wheely4/" },
{ title: "Wheely 5", genre: "Puzzle", img: "images/wheely5.jpg", link: "games/wheely5/" },
{ title: "Wheely 6", genre: "Puzzle", img: "images/wheely6.jpg", link: "games/wheely6/" },
{ title: "Wheely 7", genre: "Puzzle", img: "images/wheely7.jpg", link: "games/wheely7/" },
{ title: "Wheely 8", genre: "Puzzle", img: "images/wheely8.jpg", link: "games/wheely8/" },
{ title: "X Trench Run", genre: "Arcade", img: "images/xtrenchrun.jpg", link: "games/x-trench-run/" },
{ title: "YoHoHo.io", genre: "Multiplayer", img: "images/yohoho.jpg", link: "games/yohoho/" },
{ title: "Zombs Royale", genre: "Shooter", img: "images/zombsroyale.jpg", link: "games/zombs-royale/" },
{ title: "Zuma Deluxe", genre: "Puzzle", img: "images/zuma.jpg", link: "games/zuma/" },
{ title: "2048 Multiplayer", genre: "Puzzle", img: "images/2048multi.jpg", link: "games/2048-multiplayer/" },
{ title: "8 Ball Pool", genre: "Sports", img: "images/8ballpool.jpg", link: "games/8ballpool/" },
{ title: "99 Balls", genre: "Arcade", img: "images/99balls.jpg", link: "games/99balls/" },
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
