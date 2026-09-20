(() => {
  const NAV_SCROLL_THRESHOLD = 60;
  const SCROLL_TOP_THRESHOLD = 300;

  const header = document.querySelector("#header");
  const hamburgerBtn = document.querySelector("#hamburgerBtn");
  const navMenu = document.querySelector("#navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const scrollTopBtn = document.querySelector("#scrollTopBtn");

  const state = {
    menuOpen: false,
  };

  const closeMenu = () => {
    state.menuOpen = false;
    navMenu?.classList.remove("active");
    hamburgerBtn?.classList.remove("active");
    hamburgerBtn?.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    state.menuOpen = !state.menuOpen;
    navMenu?.classList.toggle("active", state.menuOpen);
    hamburgerBtn?.classList.toggle("active", state.menuOpen);
    hamburgerBtn?.setAttribute("aria-expanded", String(state.menuOpen));
  };

  hamburgerBtn?.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    });
  });

  const handleScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > NAV_SCROLL_THRESHOLD);
    scrollTopBtn?.classList.toggle("show", window.scrollY > SCROLL_TOP_THRESHOLD);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
