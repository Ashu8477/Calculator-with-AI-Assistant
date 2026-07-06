/* ==========================================
   AI Calculator
   Advanced Parser v2
   Part 1
========================================== */

/* ==========================================
   MAIN PARSER
========================================== */

function parseMath(input) {
  if (!input) return null;

  let text = sanitizeInput(input);

  text = normalizeText(text);

  let result = parseSpecialFunctions(text);

  if (result) return result;

  result = parseNaturalLanguage(text);

  if (result) return result;

  result = evaluateExpression(text);

  return result;
}

/* ==========================================
   NORMALIZE
========================================== */

function normalizeText(text) {
  return text

    .replace(/\?/g, '')

    .replace(/,/g, '')

    .replace(/calculate/gi, '')

    .replace(/what is/gi, '')

    .replace(/can you/gi, '')

    .replace(/please/gi, '')

    .replace(/find/gi, '')

    .replace(/solve/gi, '')

    .replace(/equals?/gi, '')

    .replace(/plus/gi, '+')

    .replace(/added to/gi, '+')

    .replace(/add/gi, '+')

    .replace(/minus/gi, '-')

    .replace(/subtract/gi, '-')

    .replace(/times/gi, '*')

    .replace(/into/gi, '*')

    .replace(/multiplied by/gi, '*')

    .replace(/multiply by/gi, '*')

    .replace(/multiply/gi, '*')

    .replace(/divide by/gi, '/')

    .replace(/divided by/gi, '/')

    .replace(/over/gi, '/')

    .replace(/power of/gi, '^')

    .replace(/raised to/gi, '^')

    .replace(/pi/gi, Math.PI)

    .replace(/\be\b/g, Math.E)

    .trim();
}

/* ==========================================
   SPECIAL FUNCTIONS
========================================== */

function parseSpecialFunctions(text) {
  let match;

  /* Percentage */

  match = text.match(/(\d+(\.\d+)?)\s*percent\s*of\s*(\d+(\.\d+)?)/);

  if (match) {
    const a = Number(match[1]);

    const b = Number(match[3]);

    return {
      expression: `${a}% of ${b}`,

      result: (a / 100) * b,
    };
  }

  /* Square Root */

  match = text.match(/(?:square root|sqrt)\s*of?\s*(\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `√${n}`,

      result: Math.sqrt(n),
    };
  }

  /* Square */

  match = text.match(/square\s*of\s*(\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `${n}²`,

      result: n ** 2,
    };
  }

  /* Cube */

  match = text.match(/cube\s*of\s*(\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `${n}³`,

      result: n ** 3,
    };
  }

  /* Factorial */

  match = text.match(/factorial\s*(of)?\s*(\d+)/);

  if (match) {
    const n = Number(match[2]);

    return {
      expression: `${n}!`,

      result: factorial(n),
    };
  }

  /* Sin */

  match = text.match(/sin\s*(\d+(\.\d+)?)/);

  if (match) {
    const angle = Number(match[1]);

    return {
      expression: `sin(${angle})`,

      result: Math.sin((angle * Math.PI) / 180),
    };
  }

  /* Cos */

  match = text.match(/cos\s*(\d+(\.\d+)?)/);

  if (match) {
    const angle = Number(match[1]);

    return {
      expression: `cos(${angle})`,

      result: Math.cos((angle * Math.PI) / 180),
    };
  }

  /* Tan */

  match = text.match(/tan\s*(\d+(\.\d+)?)/);

  if (match) {
    const angle = Number(match[1]);

    return {
      expression: `tan(${angle})`,

      result: Math.tan((angle * Math.PI) / 180),
    };
  }

  return null;
}

/* ==========================================
   NATURAL LANGUAGE
========================================== */

function parseNaturalLanguage(text) {
  let match;

  /* Multiply */

  match = text.match(/(\d+(\.\d+)?)\s*\*\s*(\d+(\.\d+)?)/);

  if (match) {
    return {
      expression: `${match[1]} × ${match[3]}`,

      result: Number(match[1]) * Number(match[3]),
    };
  }

  /* Divide */

  match = text.match(/(\d+(\.\d+)?)\s*\/\s*(\d+(\.\d+)?)/);

  if (match) {
    return {
      expression: `${match[1]} ÷ ${match[3]}`,

      result: Number(match[1]) / Number(match[3]),
    };
  }

  /* Addition */

  match = text.match(/(\d+(\.\d+)?)\s*\+\s*(\d+(\.\d+)?)/);

  if (match) {
    return {
      expression: `${match[1]} + ${match[3]}`,

      result: Number(match[1]) + Number(match[3]),
    };
  }

  /* Subtraction */

  match = text.match(/(\d+(\.\d+)?)\s*-\s*(\d+(\.\d+)?)/);

  if (match) {
    return {
      expression: `${match[1]} - ${match[3]}`,

      result: Number(match[1]) - Number(match[3]),
    };
  }

  return null;
}
/* ==========================================
   AI Calculator
   Advanced Parser v2
   Part 2
========================================== */

/* ==========================================
   ADVANCED FUNCTIONS
========================================== */

function evaluateExpression(text) {
  let match;

  /* Power */

  match = text.match(/(-?\d+(\.\d+)?)\s*\^\s*(-?\d+(\.\d+)?)/);

  if (match) {
    const base = Number(match[1]);

    const exponent = Number(match[3]);

    return {
      expression: `${base} ^ ${exponent}`,

      result: Math.pow(base, exponent),
    };
  }

  /* Modulus */

  match = text.match(/(-?\d+(\.\d+)?)\s*(mod|%)\s*(-?\d+(\.\d+)?)/i);

  if (match && match[3].toLowerCase() === 'mod') {
    const a = Number(match[1]);

    const b = Number(match[4]);

    return {
      expression: `${a} mod ${b}`,

      result: a % b,
    };
  }

  /* Log */

  match = text.match(/log\s*(-?\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `log(${n})`,

      result: Math.log10(n),
    };
  }

  /* Natural Log */

  match = text.match(/ln\s*(-?\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `ln(${n})`,

      result: Math.log(n),
    };
  }

  /* Absolute */

  match = text.match(/abs\s*(-?\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `abs(${n})`,

      result: Math.abs(n),
    };
  }

  /* Round */

  match = text.match(/round\s*(-?\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `round(${n})`,

      result: Math.round(n),
    };
  }

  /* Floor */

  match = text.match(/floor\s*(-?\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `floor(${n})`,

      result: Math.floor(n),
    };
  }

  /* Ceil */

  match = text.match(/ceil\s*(-?\d+(\.\d+)?)/);

  if (match) {
    const n = Number(match[1]);

    return {
      expression: `ceil(${n})`,

      result: Math.ceil(n),
    };
  }

  /* Random */

  if (text.includes('random')) {
    return {
      expression: 'Random Number',

      result: random(1, 100),
    };
  }

  /* Safe Expression */

  try {
    const safeExpression = text.replace(/[^0-9+\-*/().]/g, '');

    if (!safeExpression) return null;

    const result = Function(`"use strict"; return (${safeExpression})`)();

    if (Number.isNaN(result)) return null;

    return {
      expression: safeExpression,

      result,
    };
  } catch {
    return null;
  }
}

/* ==========================================
   FACTORIAL
========================================== */

function factorial(n) {
  n = Math.floor(Number(n));

  if (n < 0) return NaN;

  if (n === 0 || n === 1) return 1;

  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

/* ==========================================
   VALIDATOR
========================================== */

function isMathExpression(text) {
  return /^[0-9+\-*/().^\s]+$/.test(text);
}

/* ==========================================
   FORMAT RESULT
========================================== */

function formatMathResult(value) {
  if (typeof value !== 'number') return value;

  if (Number.isInteger(value)) return value;

  return Number(value.toFixed(8));
}

/* ==========================================
   PARSER INFO
========================================== */

function parserInfo() {
  return {
    version: '2.0',

    supported: [
      'Addition',

      'Subtraction',

      'Multiplication',

      'Division',

      'Percentage',

      'Square',

      'Square Root',

      'Cube',

      'Factorial',

      'Power',

      'Modulus',

      'Trigonometry',

      'Log',

      'Ln',

      'Absolute',

      'Round',

      'Floor',

      'Ceil',

      'Random',
    ],
  };
}
