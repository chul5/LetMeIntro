(() => {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const form = document.querySelector("#contactForm");
  if (!form) return;

  const successMessage = document.querySelector("#formSuccess");

  const fieldConfig = [
    { input: document.querySelector("#name"), key: "name", errorSelector: "#nameError" },
    { input: document.querySelector("#email"), key: "email", errorSelector: "#emailError" },
    { input: document.querySelector("#message"), key: "message", errorSelector: "#messageError" },
  ];

  const state = {
    errors: { name: "", email: "", message: "" },
  };

  const validateField = (key, value) => {
    const trimmed = value.trim();

    if (!trimmed) return "필수 입력 항목입니다.";
    if (key === "email" && !EMAIL_PATTERN.test(trimmed)) return "올바른 이메일 형식이 아닙니다.";

    return "";
  };

  const renderErrors = () => {
    fieldConfig.forEach(({ input, key, errorSelector }) => {
      const errorEl = document.querySelector(errorSelector);
      const message = state.errors[key];

      if (errorEl) errorEl.textContent = message;
      input?.closest(".form-group")?.classList.toggle("invalid", Boolean(message));
    });
  };

  const validateForm = () => {
    fieldConfig.forEach(({ input, key }) => {
      state.errors[key] = validateField(key, input?.value ?? "");
    });

    renderErrors();
    return Object.values(state.errors).every((message) => !message);
  };

  fieldConfig.forEach(({ input, key }) => {
    input?.addEventListener("input", () => {
      state.errors[key] = validateField(key, input.value);
      renderErrors();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    successMessage?.classList.add("hidden");

    if (!validateForm()) return;

    if (successMessage) {
      successMessage.textContent = "메시지가 성공적으로 전송되었습니다. 감사합니다!";
      successMessage.classList.remove("hidden");
    }

    form.reset();
    state.errors = { name: "", email: "", message: "" };
    renderErrors();
  });
})();
