/* ==========================================
   AI Calculator
   Text To Speech
========================================== */

let speechEnabled = true;

let currentVoice = null;

/* ==========================================
   INITIALIZE
========================================== */

function initSpeech() {
  if (!('speechSynthesis' in window)) {
    speechEnabled = false;

    console.warn('Speech Synthesis not supported.');

    return;
  }

  loadVoices();

  speechSynthesis.onvoiceschanged = loadVoices;
}

/* ==========================================
   LOAD VOICES
========================================== */

function loadVoices() {
  const voices = speechSynthesis.getVoices();

  currentVoice =
    voices.find(
      (v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
    ) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0];
}

/* ==========================================
   SPEAK
========================================== */

function speak(text) {
  if (!speechEnabled) return;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.voice = currentVoice;

  utterance.rate = 1;

  utterance.pitch = 1;

  utterance.volume = 1;

  speechSynthesis.speak(utterance);
}

/* ==========================================
   STOP
========================================== */

function stopSpeech() {
  speechSynthesis.cancel();
}

/* ==========================================
   PAUSE
========================================== */

function pauseSpeech() {
  speechSynthesis.pause();
}

/* ==========================================
   RESUME
========================================== */

function resumeSpeech() {
  speechSynthesis.resume();
}

/* ==========================================
   ENABLE
========================================== */

function enableSpeech() {
  speechEnabled = true;

  showToast('🔊 Voice Enabled');
}

/* ==========================================
   DISABLE
========================================== */

function disableSpeech() {
  speechEnabled = false;

  stopSpeech();

  showToast('🔇 Voice Disabled');
}

/* ==========================================
   TOGGLE
========================================== */

function toggleSpeech() {
  speechEnabled = !speechEnabled;

  if (speechEnabled) {
    showToast('🔊 Voice Enabled');
  } else {
    stopSpeech();

    showToast('🔇 Voice Disabled');
  }
}
