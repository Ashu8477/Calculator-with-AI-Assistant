/* ==========================================
   AI Calculator
   Calculator Logic
========================================== */

let currentExpression = '';

/* ==========================================
   INITIALIZE
========================================== */

function initCalculator() {
  const buttons = document.querySelectorAll('.buttons button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const value = button.dataset.value;

      handleButton(value);
    });
  });
}

/* ==========================================
   HANDLE BUTTON
========================================== */

function handleButton(value) {
  pop(display);

  switch (value) {
    case 'clear':
      clearDisplay();

      break;

    case 'back':
      backspace();

      break;

    case '=':
      calculate();

      break;

    case 'square':
      square();

      break;

    case 'sqrt':
      squareRoot();

      break;

    default:
      append(value);
  }
}

/* ==========================================
   APPEND
========================================== */

function append(value) {
  if (display.value === '0') display.value = '';

  display.value += value;

  expression.textContent = display.value;
}

/* ==========================================
   CLEAR
========================================== */

function clearDisplay() {
  display.value = '';

  expression.textContent = '';
}

/* ==========================================
   BACKSPACE
========================================== */

function backspace() {
  display.value = display.value.slice(0, -1);

  expression.textContent = display.value;
}

/* ==========================================
   SQUARE
========================================== */

function square() {
  if (!display.value) return;

  const number = Number(display.value);

  const result = number * number;

  expression.textContent = `${number}²`;

  display.value = result;

  addCalculation(`${number}²`, result);
}

/* ==========================================
   SQUARE ROOT
========================================== */

function squareRoot() {
  if (!display.value) return;

  const number = Number(display.value);

  if (number < 0) {
    showError();

    return;
  }

  const result = Math.sqrt(number);

  expression.textContent = `√${number}`;

  display.value = result;

  addCalculation(`√${number}`, result);
}

/* ==========================================
   CALCULATE
========================================== */

function calculate() {
  if (!display.value) return;

  try {
    currentExpression = display.value;

    let exp = currentExpression

      .replace(/÷/g, '/')

      .replace(/×/g, '*')

      .replace(/%/g, '/100');

    const result = Function(`"use strict"; return (${exp})`)();

    if (!isFinite(result)) throw 'Invalid';

    expression.textContent = currentExpression;

    display.value = result;

    addCalculation(currentExpression, result);

    pop(display);
  } catch {
    showError();
  }
}

/* ==========================================
   ERROR
========================================== */

function showError() {
  display.value = 'Error';

  shake(display);

  showToast('❌ Invalid Expression');
}

/* ==========================================
   COPY RESULT
========================================== */

function copyResult() {
  if (!display.value) return;

  copyText(display.value);
}

/* ==========================================
   KEYBOARD INPUT
========================================== */

function keyboardInput(key) {
  if ('0123456789.+-*/()%'.includes(key)) {
    append(key);

    return;
  }

  switch (key) {
    case 'Enter':
      calculate();

      break;

    case '=':
      calculate();

      break;

    case 'Backspace':
      backspace();

      break;

    case 'Escape':
      clearDisplay();

      break;
  }
}
