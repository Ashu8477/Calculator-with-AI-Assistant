/* ==========================================
   AI CALCULATOR
   CONSTANTS
========================================== */

const APP = {
  name: 'AI Calculator',

  version: '2.0.0',

  author: 'Ashu Kumar',
};

/* ==========================================
   DOM ELEMENTS
========================================== */

const display = document.getElementById('display');

const expression = document.getElementById('expression');

const chat = document.getElementById('chat');

const aiInput = document.getElementById('aiInput');

const typing = document.getElementById('typing');

const assistant = document.getElementById('assistant');

const voicePopup = document.getElementById('voicePopup');

const voiceText = document.getElementById('voiceText');

const micBtn = document.getElementById('micBtn');

const sendBtn = document.getElementById('sendBtn');

const themeBtn = document.getElementById('themeBtn');

const historyBtn = document.getElementById('historyBtn');

const clearHistoryBtn = document.getElementById('clearHistoryBtn');

/* ==========================================
   STORAGE KEYS
========================================== */

const STORAGE = {
  HISTORY: 'calculator_history',

  CHAT: 'ai_chat',

  THEME: 'theme',
};

/* ==========================================
   VOICE
========================================== */

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

/* ==========================================
   SUPPORTED FUNCTIONS
========================================== */

const FUNCTIONS = [
  'sqrt',

  'square',

  'cube',

  'sin',

  'cos',

  'tan',

  'log',

  'ln',

  'factorial',

  'abs',

  'random',
];

/* ==========================================
   AI COMMANDS
========================================== */

const COMMANDS = {
  plus: '+',

  add: '+',

  minus: '-',

  subtract: '-',

  into: '*',

  times: '*',

  multiply: '*',

  multiplied: '*',

  x: '*',

  divide: '/',

  divided: '/',

  over: '/',
};

/* ==========================================
   MESSAGES
========================================== */

const MESSAGE = {
  welcome: '👋 Hi! Ask me any math question.',

  thinking: '🤖 Thinking...',

  invalid: '❌ Invalid Expression',

  listening: '🎤 Listening...',

  unsupported: "Sorry, I don't understand that yet.",
};

/* ==========================================
   LIMITS
========================================== */

const LIMIT = {
  history: 100,

  chat: 100,

  maxInput: 250,
};
