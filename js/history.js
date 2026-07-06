/* ==========================================
   AI Calculator
   History Manager
========================================== */

let calculatorHistory = load(STORAGE.HISTORY, []);

let chatHistory = load(STORAGE.CHAT, []);

/* ==========================================
   CALCULATOR HISTORY
========================================== */

function addCalculation(expressionText, result) {
  const item = {
    id: uid(),

    expression: expressionText,

    result: result,

    time: getCurrentTime(),
  };

  calculatorHistory.unshift(item);

  if (calculatorHistory.length > LIMIT.history) {
    calculatorHistory.pop();
  }

  save(STORAGE.HISTORY, calculatorHistory);
}

/* ==========================================
   GET HISTORY
========================================== */

function getCalculatorHistory() {
  return calculatorHistory;
}

/* ==========================================
   CLEAR CALCULATOR HISTORY
========================================== */

function clearCalculatorHistory() {
  calculatorHistory = [];

  save(STORAGE.HISTORY, []);

  showToast('🗑 Calculator History Cleared');
}

/* ==========================================
   CHAT HISTORY
========================================== */

function addChatMessage(type, message) {
  const item = {
    id: uid(),

    type,

    message,

    time: getCurrentTime(),
  };

  chatHistory.push(item);

  if (chatHistory.length > LIMIT.chat) {
    chatHistory.shift();
  }

  save(STORAGE.CHAT, chatHistory);
}

/* ==========================================
   GET CHAT HISTORY
========================================== */

function getChatHistory() {
  return chatHistory;
}

/* ==========================================
   CLEAR CHAT
========================================== */

function clearChatHistory() {
  chatHistory = [];

  save(STORAGE.CHAT, []);

  if (chat) {
    chat.innerHTML = '';
  }

  showToast('💬 Chat Cleared');
}

/* ==========================================
   RESTORE CHAT
========================================== */

function restoreChatHistory() {
  if (!chat) return;

  chat.innerHTML = '';

  if (chatHistory.length === 0) return;

  chatHistory.forEach((item) => {
    if (typeof addMessage === 'function') {
      addMessage(
        item.message,

        item.type,

        false
      );
    }
  });
}

/* ==========================================
   EXPORT HISTORY
========================================== */

function exportHistory() {
  const data = {
    app: APP.name,

    version: APP.version,

    exportedAt: new Date().toLocaleString(),

    calculations: calculatorHistory,

    chats: chatHistory,
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],

    {
      type: 'application/json',
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');

  a.href = url;

  a.download = 'AI-Calculator-History.json';

  a.click();

  URL.revokeObjectURL(url);
}

/* ==========================================
   SEARCH HISTORY
========================================== */

function searchHistory(keyword) {
  keyword = keyword.toLowerCase();

  return calculatorHistory.filter(
    (item) =>
      item.expression

        .toLowerCase()

        .includes(keyword) || String(item.result).includes(keyword)
  );
}

/* ==========================================
   LAST CALCULATION
========================================== */

function lastCalculation() {
  return calculatorHistory[0] || null;
}
