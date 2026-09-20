(() => {
  const THEME_STORAGE_KEY = "portfolio-theme";

  const root = document.documentElement;
  const themeToggleBtn = document.querySelector("#themeToggle");
  const themeIcon = themeToggleBtn?.querySelector(".theme-icon");

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  const state = {
    theme: savedTheme || (prefersDark ? "dark" : "light"),
  };

  const applyTheme = () => {
    root.setAttribute("data-theme", state.theme);

    if (themeIcon) {
      themeIcon.textContent = state.theme === "dark" ? "☀️" : "🌙";
    }

    themeToggleBtn?.setAttribute(
      "aria-label",
      state.theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
    );
  };

  const toggleTheme = () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, state.theme);
    applyTheme();
  };

  applyTheme();
  themeToggleBtn?.addEventListener("click", toggleTheme);
})();
