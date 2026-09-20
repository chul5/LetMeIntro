(() => {
  const TYPING_SPEED_MS = 80;

  const target = document.querySelector("#heroTitle");
  if (!target) return;

  const fullText = target.textContent.trim();
  target.textContent = "";

  let index = 0;

  const typeNextChar = () => {
    target.textContent += fullText.charAt(index);
    index += 1;

    if (index < fullText.length) {
      setTimeout(typeNextChar, TYPING_SPEED_MS);
    }
  };

  typeNextChar();
})();
