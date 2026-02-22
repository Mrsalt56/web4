(function () {
  const THEME_KEY = "current_theme";
  const FONT_KEY = "current_font";
  const DEFAULT_THEME = "vapor";

  window.applyVtheme = () => {
    return new Promise((resolve) => {
      const theme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;

      const isAlt = localStorage.getItem("is_alt_theme") === "true";
      const folder = isAlt ? "alt-theme" : "theme";
      const themePath = `../style/${folder}/${theme}.css`;

      document.documentElement.setAttribute("data-theme", theme);

      let themeLink = document.getElementById("theme-link");
      if (!themeLink) {
        themeLink = document.createElement("link");
        themeLink.id = "theme-link";
        themeLink.rel = "stylesheet";
        document.head.appendChild(themeLink);
      }

      const timeout = setTimeout(resolve, 1500);
      themeLink.onload = () => {
        clearTimeout(timeout);
        resolve();
      };
      themeLink.onerror = () => {
        clearTimeout(timeout);
        resolve();
      };

      themeLink.href = themePath; //+ "?v=" + Date.now();
    });
  };

  window.applyVfont = () => {
    const fontName = localStorage.getItem(FONT_KEY);
    let styleEl = document.getElementById("dynamic-font-style");
    if (
      !fontName ||
      fontName.trim() === "" ||
      fontName.toLowerCase() === "default"
    ) {
      if (styleEl) styleEl.remove();
      return;
    }
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      / /g,
      "+"
    )}:wght@400;700&display=swap`;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "dynamic-font-style";
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `@import url('${fontUrl}'); * { font-family: '${fontName}', sans-serif !important; }`;
  };

  applyVtheme();
  applyVfont();

  window.addEventListener("storage", (e) => {
    if (e.key === THEME_KEY) applyVtheme();
    if (e.key === FONT_KEY) applyVfont();
  });
})();
