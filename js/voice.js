/* ==========================================
   AI Calculator
   Advanced Voice Assistant
   Part 1
========================================== */

let recognition = null;

let isListening = false;

let finalTranscript = '';

let interimTranscript = '';

const VOICE = {
  language: 'en-US',

  continuous: false,

  interimResults: true,

  maxAlternatives: 1,

  autoSend: true,

  popupDelay: 800,
};

/* ==========================================
   INITIALIZE
========================================== */

function initVoice() {
  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported.');

    if (micBtn) {
      micBtn.disabled = true;

      micBtn.title = 'Speech Recognition not supported';

      micBtn.style.opacity = '.5';
    }

    return;
  }

  recognition = new SpeechRecognition();

  recognition.lang = VOICE.language;

  recognition.continuous = VOICE.continuous;

  recognition.interimResults = VOICE.interimResults;

  recognition.maxAlternatives = VOICE.maxAlternatives;

  bindVoiceEvents();

  micBtn.addEventListener('click', () => {
    if (isListening) stopListening();
    else startListening();
  });
}

/* ==========================================
   BIND EVENTS
========================================== */

function bindVoiceEvents() {
  recognition.onstart = handleVoiceStart;

  recognition.onresult = handleVoiceResult;

  recognition.onerror = handleVoiceError;

  recognition.onend = handleVoiceEnd;

  recognition.onspeechend = handleSpeechEnd;

  recognition.onnomatch = handleNoMatch;
}

/* ==========================================
   START
========================================== */

function startListening() {
  if (!recognition) return;

  if (isListening) return;

  finalTranscript = '';

  interimTranscript = '';

  isListening = true;

  micBtn.classList.add('glow');

  showVoicePopup(
    '🎤 Listening...',

    'Speak your maths question'
  );

  try {
    recognition.start();
  } catch (error) {
    console.error(error);

    resetVoice();
  }
}

/* ==========================================
   STOP
========================================== */

function stopListening() {
  if (!recognition) return;

  recognition.stop();
}

/* ==========================================
   VOICE START
========================================== */

function handleVoiceStart() {
  voicePopup.classList.remove(
    'voice-success',

    'voice-error'
  );

  voicePopup.classList.add('listening');

  voiceText.textContent = 'Listening...';
}

/* ==========================================
   RESULT
========================================== */

function handleVoiceResult(event) {
  interimTranscript = '';

  finalTranscript = '';

  for (let i = event.resultIndex; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;

    if (event.results[i].isFinal) finalTranscript += transcript;
    else interimTranscript += transcript;
  }

  aiInput.value = finalTranscript || interimTranscript;

  voiceText.textContent = finalTranscript || interimTranscript;
}
/* ==========================================
   SPEECH END
========================================== */

function handleSpeechEnd() {
  if (!recognition) return;

  recognition.stop();
}

/* ==========================================
   NO MATCH
========================================== */

function handleNoMatch() {
  voicePopup.classList.remove('voice-success');

  voicePopup.classList.add('voice-error');

  voiceText.textContent = "I couldn't understand. Please try again.";
}

/* ==========================================
   VOICE END
========================================== */

async function handleVoiceEnd() {
  isListening = false;

  micBtn.classList.remove('glow');

  voicePopup.classList.remove('listening');

  if (finalTranscript.trim()) {
    voicePopup.classList.remove('voice-error');

    voicePopup.classList.add('voice-success');

    voiceText.textContent = '✔ Voice Recognized';

    await sleep(VOICE.popupDelay);

    hide(voicePopup);

    if (VOICE.autoSend && typeof sendMessage === 'function') {
      sendMessage();
    }
  } else {
    voicePopup.classList.remove('voice-success');

    voicePopup.classList.add('voice-error');

    voiceText.textContent = 'No speech detected';

    await sleep(1200);

    hide(voicePopup);
  }

  resetVoice();
}

/* ==========================================
   VOICE ERROR
========================================== */

async function handleVoiceError(event) {
  isListening = false;

  micBtn.classList.remove('glow');

  voicePopup.classList.remove(
    'listening',

    'voice-success'
  );

  voicePopup.classList.add('voice-error');

  let message = 'Unknown Error';

  switch (event.error) {
    case 'not-allowed':
      message = '❌ Microphone permission denied.';

      break;

    case 'audio-capture':
      message = '🎤 No microphone detected.';

      break;

    case 'network':
      message = '🌐 Network error.';

      break;

    case 'no-speech':
      message = '🤫 No speech detected.';

      break;

    case 'aborted':
      message = '⛔ Voice cancelled.';

      break;

    case 'service-not-allowed':
      message = 'Speech service unavailable.';

      break;

    default:
      message = event.error;
  }

  voiceText.textContent = message;

  showToast(message);

  await sleep(1500);

  hide(voicePopup);

  resetVoice();
}

/* ==========================================
   SHOW POPUP
========================================== */

function showVoicePopup(
  title,

  subtitle
) {
  show(voicePopup);

  voicePopup.classList.remove(
    'voice-success',

    'voice-error'
  );

  voicePopup.classList.add('listening');

  const heading = voicePopup.querySelector('h3');

  if (heading) heading.textContent = title;

  voiceText.textContent = subtitle;
}

/* ==========================================
   RESET
========================================== */

function resetVoice() {
  isListening = false;

  finalTranscript = '';

  interimTranscript = '';

  micBtn.classList.remove('glow');
}

/* ==========================================
   CHANGE LANGUAGE
========================================== */

function setVoiceLanguage(lang) {
  VOICE.language = lang;

  if (recognition) recognition.lang = lang;
}

/* ==========================================
   ENABLE AUTO SEND
========================================== */

function enableAutoSend() {
  VOICE.autoSend = true;
}

/* ==========================================
   DISABLE AUTO SEND
========================================== */

function disableAutoSend() {
  VOICE.autoSend = false;
}

/* ==========================================
   DESTROY
========================================== */

function destroyVoice() {
  if (!recognition) return;

  recognition.abort();

  recognition.onstart = null;

  recognition.onresult = null;

  recognition.onerror = null;

  recognition.onend = null;

  recognition.onspeechend = null;

  recognition.onnomatch = null;

  recognition = null;
}
