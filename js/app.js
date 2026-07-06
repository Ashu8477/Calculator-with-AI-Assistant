/* ==========================================
   AI Calculator
   App Entry
========================================== */

document.addEventListener('DOMContentLoaded', () => {
  console.log(`${APP.name} v${APP.version}`);

  /* Initialize Modules */

  initTheme();

  initSpeech();

  initCalculator();

  initAssistant();

  initVoice();

  initKeyboard();

  /* Restore Previous Chat */

  restoreChatHistory();

  /* Welcome */

  if (getChatHistory().length === 0) {
    showWelcome();
  }

  /* History Buttons */

  historyBtn?.addEventListener('click', () => {
    console.table(getCalculatorHistory());

    showToast('📜 History printed in console');
  });

  clearHistoryBtn?.addEventListener('click', () => {
    clearCalculatorHistory();

    clearChatHistory();
  });

  /* Close Assistant */

  document
    .getElementById('closeAssistant')
    ?.addEventListener('click', closeAssistant);

  /* Auto Focus */

  display.focus();

  console.log('✅ AI Calculator Ready');
});
