/* ==========================================
   AI Calculator
   Advanced Assistant v2
   Part 1
========================================== */

let assistantBusy = false;

let lastResponse = '';

let welcomeRemoved = false;

/* ==========================================
   INITIALIZE
========================================== */

function initAssistant() {
  restoreChatHistory();

  sendBtn.addEventListener('click', sendMessage);

  aiInput.addEventListener('keydown', handleAssistantKey);

  showWelcome();
}

/* ==========================================
   KEYBOARD
========================================== */

function handleAssistantKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    sendMessage();
  }
}

/* ==========================================
   SEND MESSAGE
========================================== */

async function sendMessage() {
  if (assistantBusy) return;

  const text = aiInput.value.trim();

  if (!text) return;

  if (text.length > LIMIT.maxInput) {
    showToast('Message is too long');

    return;
  }

  removeWelcome();

  assistantBusy = true;

  aiInput.value = '';

  addMessage(text, 'user');

  showTyping(true);

  await sleep(700);

  const reply = await generateReply(text);

  showTyping(false);

  addMessage(reply, 'ai');

  lastResponse = reply;

  speak(reply);

  assistantBusy = false;
}

/* ==========================================
   GENERATE REPLY
========================================== */

async function generateReply(question) {
  const parsed = parseMath(question);

  if (parsed) {
    addCalculation(
      parsed.expression,

      parsed.result
    );

    return formatAIAnswer(parsed);
  }

  return smartReply(question);
}

/* ==========================================
   FORMAT ANSWER
========================================== */

function formatAIAnswer(data) {
  return `🧠 I understood

${data.expression}

━━━━━━━━━━━━━━━━

✅ Result

${formatMathResult(data.result)}

━━━━━━━━━━━━━━━━

⏱ Solved Successfully`;
}

/* ==========================================
   SMART CHAT
========================================== */

function smartReply(text) {
  text = sanitizeInput(text);

  if (text.includes('hello') || text.includes('hi')) {
    return "👋 Hello! I'm your AI Math Assistant.";
  }

  if (text.includes('how are you')) {
    return "😊 I'm doing great! Ready to solve your maths problems.";
  }

  if (text.includes('who are you')) {
    return "🤖 I'm an AI powered calculator built using HTML, CSS and JavaScript.";
  }

  if (text.includes('thanks') || text.includes('thank')) {
    return '❤️ Happy to help.';
  }

  if (text.includes('help')) {
    return `Examples

• 25 + 20

• 25 percent of 400

• square root of 81

• cube of 7

• factorial 6

• sin 90`;
  }

  return "❌ Sorry, I couldn't understand your request.";
}

/* ==========================================
   REMOVE WELCOME
========================================== */

function removeWelcome() {
  if (welcomeRemoved) return;

  const card = document.querySelector('.welcome-card');

  if (card) {
    card.remove();
  }

  welcomeRemoved = true;
}
/* ==========================================
   ADD MESSAGE
========================================== */

function addMessage(text, sender, save = true) {
  const wrapper = document.createElement('div');
  wrapper.className = `message ${sender}`;

  /* Avatar */

  const avatar = document.createElement('div');
  avatar.className = `avatar ${sender}`;
  avatar.innerHTML = sender === 'user' ? '🙂' : '🤖';

  /* Bubble */

  const bubble = document.createElement('div');
  bubble.className =
    sender === 'user' ? 'bubble user-message' : 'bubble ai-message';

  bubble.innerText = text;

  /* Footer */

  const footer = document.createElement('div');
  footer.className = 'message-footer';

  const time = document.createElement('span');
  time.className = 'message-time';
  time.innerText = getCurrentTime();

  footer.appendChild(time);

  /* Copy Button */

  if (sender === 'ai') {
    const copy = document.createElement('button');

    copy.className = 'copy-btn';

    copy.innerHTML = '📋';

    copy.title = 'Copy';

    copy.onclick = () => {
      copyText(text);
    };

    footer.appendChild(copy);
  }

  bubble.appendChild(footer);

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);

  chat.appendChild(wrapper);

  requestAnimationFrame(() => {
    chat.scrollTo({
      top: chat.scrollHeight,

      behavior: 'smooth',
    });
  });

  if (save) {
    addChatMessage(sender, text);
  }
}

/* ==========================================
   SHOW / HIDE TYPING
========================================== */

function showTyping(show = true) {
  if (!typing) return;

  typing.classList.toggle('active', show);
}

/* ==========================================
   CLEAR CHAT
========================================== */

function clearAssistantChat() {
  if (!confirm('Clear all chat history?')) return;

  chat.innerHTML = '';

  clearChatHistory();

  welcomeRemoved = false;

  showWelcome();

  showToast('🗑 Chat cleared');
}

/* ==========================================
   COPY LAST REPLY
========================================== */

function copyLastReply() {
  if (!lastResponse) return;

  copyText(lastResponse);
}

/* ==========================================
   EXPORT CHAT
========================================== */

function exportChat() {
  const data = getChatHistory();

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],

    {
      type: 'application/json',
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;

  link.download = 'chat-history.json';

  link.click();

  URL.revokeObjectURL(url);
}

/* ==========================================
   OPEN
========================================== */

function openAssistant() {
  assistant.classList.remove('hidden');

  aiInput.focus();
}

/* ==========================================
   CLOSE
========================================== */

function closeAssistant() {
  assistant.classList.add('hidden');
}

/* ==========================================
   TOGGLE
========================================== */

function toggleAssistant() {
  assistant.classList.toggle('hidden');

  if (!assistant.classList.contains('hidden')) {
    aiInput.focus();
  }
}

/* ==========================================
   WELCOME
========================================== */

function showWelcome() {
  if (chat.children.length || welcomeRemoved) return;

  const card = document.createElement('div');

  card.className = 'welcome-card';

  card.innerHTML = `

<h3>👋 Welcome</h3>

<p>I can solve:</p>

<ul>

<li>Basic Maths</li>

<li>Percentage</li>

<li>Square Root</li>

<li>Factorial</li>

<li>Scientific Maths</li>

<li>Natural Language Questions</li>

</ul>

<p><strong>Try:</strong></p>

<code>25 percent of 400</code>

`;

  chat.appendChild(card);
}

/* ==========================================
   RETRY
========================================== */

function retryLastQuestion() {
  const history = getChatHistory();

  const lastUser = [...history]

    .reverse()

    .find((item) => item.type === 'user');

  if (!lastUser) return;

  aiInput.value = lastUser.message;

  sendMessage();
}
