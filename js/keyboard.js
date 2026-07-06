/* ==========================================
   AI Calculator
   Keyboard Shortcuts
========================================== */

function initKeyboard() {
  document.addEventListener('keydown', handleKeyboard);
}

/* ==========================================
   KEY HANDLER
========================================== */

function handleKeyboard(event) {
  const key = event.key;

  /* Don't interfere while typing in AI input */
  if (document.activeElement === aiInput) {
    if (key === 'Escape') {
      aiInput.blur();
    }

    return;
  }

  /* ===============================
       NUMBERS
    =============================== */

  if (/^[0-9]$/.test(key)) {
    append(key);

    return;
  }

  /* ===============================
       OPERATORS
    =============================== */

  if (['+', '-', '*', '/', '.', '(', ')', '%'].includes(key)) {
    append(key);

    return;
  }

  /* ===============================
       ENTER
    =============================== */

  if (key === 'Enter') {
    event.preventDefault();

    calculate();

    return;
  }

  /* ===============================
       BACKSPACE
    =============================== */

  if (key === 'Backspace') {
    event.preventDefault();

    backspace();

    return;
  }

  /* ===============================
       DELETE
    =============================== */

  if (key === 'Delete') {
    clearDisplay();

    return;
  }

  /* ===============================
       ESCAPE
    =============================== */

  if (key === 'Escape') {
    clearDisplay();

    closeAssistant();

    return;
  }

  /* ===============================
       SHORTCUTS
    =============================== */

  if (event.ctrlKey || event.metaKey) {
    switch (key.toLowerCase()) {
      case 'c':
        event.preventDefault();

        copyResult();

        break;

      case 'k':
        event.preventDefault();

        aiInput.focus();

        break;

      case 'm':
        event.preventDefault();

        startListening();

        break;

      case 'h':
        event.preventDefault();

        exportHistory();

        break;

      case 'l':
        event.preventDefault();

        clearCalculatorHistory();

        clearChatHistory();

        break;

      case 't':
        event.preventDefault();

        toggleTheme();

        break;
    }
  }
}
