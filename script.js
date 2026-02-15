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
  { title: "1v1LOL", genre: "Multiplayer", img: "images/1v1-lol_1x1.jpg", link: "games/1v1lol/" },
  { title: "2048", genre: "Puzzle", img: "images/2048_logo.svg.png", link: "games/2048/" },
  { title: "Basketball Stars", genre: "Sports", img: "images/basketball.jpg", link: "games/basketball-stars/" },
  { title: "Temple Run 2", genre: "Arcade", img: "images/temple.jpg", link: "games/temple/" }
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
