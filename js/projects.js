(() => {
  const GITHUB_USERNAME = "chul5";
  const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

  const container = document.querySelector("#projectsContainer");
  const filtersContainer = document.querySelector("#projectFilters");

  if (!container) return;

  const state = {
    status: "loading",
    repos: [],
    filter: "all",
  };

  const escapeHtml = (text) =>
    text.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));

  const renderLoading = () => {
    container.innerHTML = `
      <div class="state-message">
        <div class="spinner" aria-hidden="true"></div>
        <p>프로젝트를 불러오는 중입니다...</p>
      </div>
    `;
  };

  const renderError = () => {
    container.innerHTML = `
      <div class="state-message">
        <p>프로젝트를 불러올 수 없습니다.</p>
        <button type="button" class="btn btn-primary retry-btn" id="retryBtn">다시 시도</button>
      </div>
    `;
    document.querySelector("#retryBtn")?.addEventListener("click", fetchRepos);
  };

  const renderEmpty = () => {
    container.innerHTML = `
      <div class="state-message">
        <p>표시할 프로젝트가 없습니다.</p>
      </div>
    `;
  };

  const renderFilters = () => {
    if (!filtersContainer) return;

    const languages = [...new Set(state.repos.map((repo) => repo.language).filter(Boolean))];

    if (languages.length < 2) {
      filtersContainer.innerHTML = "";
      return;
    }

    const buttons = ["all", ...languages]
      .map((lang) => {
        const label = lang === "all" ? "전체" : lang;
        const activeClass = state.filter === lang ? "active" : "";
        return `<button type="button" class="filter-btn ${activeClass}" data-lang="${escapeHtml(lang)}">${escapeHtml(label)}</button>`;
      })
      .join("");

    filtersContainer.innerHTML = buttons;

    filtersContainer.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.filter = btn.dataset.lang;
        renderFilters();
        renderProjectList();
      });
    });
  };

  const renderProjectList = () => {
    const filteredRepos =
      state.filter === "all" ? state.repos : state.repos.filter((repo) => repo.language === state.filter);

    if (!filteredRepos.length) {
      renderEmpty();
      return;
    }

    const cards = filteredRepos
      .map(({ name, description, html_url: htmlUrl, stargazers_count: stars, language }) => `
        <article class="project-card">
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(description || "설명이 없는 프로젝트입니다.")}</p>
          <div class="project-meta">
            <span>⭐ ${stars}</span>
            ${language ? `<span>${escapeHtml(language)}</span>` : ""}
          </div>
          <a class="project-link" href="${htmlUrl}" target="_blank" rel="noopener noreferrer">GitHub에서 보기 →</a>
        </article>
      `)
      .join("");

    container.innerHTML = cards;
  };

  const render = () => {
    if (state.status === "loading") {
      renderLoading();
      return;
    }

    if (state.status === "error") {
      renderError();
      return;
    }

    if (state.status === "empty") {
      renderEmpty();
      return;
    }

    renderFilters();
    renderProjectList();
  };

  async function fetchRepos() {
    state.status = "loading";
    render();

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`GitHub API 요청 실패: ${response.status}`);
      }

      const data = await response.json();
      state.repos = data.filter((repo) => !repo.fork);
      state.status = state.repos.length ? "success" : "empty";
    } catch (error) {
      console.error(error);
      state.status = "error";
    }

    render();
  }

  fetchRepos();
})();
