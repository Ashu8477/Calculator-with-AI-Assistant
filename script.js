/* ---------- CALCULATOR LOGIC ---------- */
const d = document.getElementById('display');

function append(v) {
  d.value += v;
}
function clearAll() {
  d.value = '';
}
function backspace() {
  d.value = d.value.slice(0, -1);
}
function square() {
  d.value = Math.pow(d.value, 2);
}
function sqrt() {
  d.value = Math.sqrt(d.value);
}

function calculate() {
  try {
    d.value = Function('return ' + d.value.replace(/%/g, '/100'))();
  } catch {
    d.value = 'Error';
  }
}

function toggleTheme() {
  document.body.classList.toggle('light');
}

/* ---------- AI ---------- */
const ai = document.getElementById('ai');
const chat = document.getElementById('chat');
const aiInput = document.getElementById('aiInput');

function toggleAI() {
  ai.style.display = ai.style.display === 'flex' ? 'none' : 'flex';
}

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  localStorage.setItem('aiHistory', chat.innerHTML);
}

function send() {
  const q = aiInput.value.trim();
  if (!q) return;
  addMsg(q, 'user');
  aiInput.value = '';
  setTimeout(() => reply(q), 400);
}

function reply(q) {
  let res = '';
  try {
    if (q.includes('=')) {
      res = `Steps:
1) Move all terms to one side
2) Simplify equation
3) Solve for x (approx)`;
    } else {
      let exp = q.replace(/[^0-9+\-*/().]/g, '');
      res = 'Answer = ' + Function('return ' + exp)();
    }
  } catch {
    res = 'Invalid expression';
  }
  addMsg(res, 'ai-msg');
  speak(res);
}

function voice() {
  const rec = new webkitSpeechRecognition();
  rec.lang = 'en-US';
  rec.onresult = (e) => {
    aiInput.value = e.results[0][0].transcript;
    send();
  };
  rec.start();
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(u);
}

function clearHistory() {
  chat.innerHTML = '';
  localStorage.removeItem('aiHistory');
}

chat.innerHTML = localStorage.getItem('aiHistory') || '';
