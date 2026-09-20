(() => {
  const REVEAL_THRESHOLD = 0.2;

  const revealTargets = document.querySelectorAll(".reveal");
  if (!revealTargets.length) return;

  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  };

  const observer = new IntersectionObserver(handleIntersect, {
    threshold: REVEAL_THRESHOLD,
  });

  revealTargets.forEach((target) => observer.observe(target));
})();
