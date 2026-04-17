// ─────────────────────────────────────────────────────
//  led-simulator.js
//  Replica exacta de la lógica map() del Arduino .ino
// ─────────────────────────────────────────────────────

const NUM_LEDS = 20; // visual (el .ino usa 50, reducimos para la web)

// Replica de la función map() de Arduino
function arduinoMap(value, inMin, inMax, outMin, outMax) {
  return Math.round((value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
}

// Lógica idéntica al loop() del .ino
function getTempColor(temp) {
  const t = Math.round(temp);
  let r = 0, g = 0, b = 0;

  if (t <= 25) {
    r = 0; g = 0; b = 255;
  } else if (t <= 30) {
    g = arduinoMap(t, 25, 30, 0, 255);
    b = arduinoMap(t, 25, 30, 255, 0);
  } else if (t <= 35) {
    r = arduinoMap(t, 30, 35, 0, 255);
    g = arduinoMap(t, 30, 35, 255, 0);
  } else {
    r = 255; g = 0; b = 0;
  }

  return { r, g, b };
}

function getColorName(temp) {
  const t = Math.round(temp);
  if (t <= 25) return 'Azul · Frío';
  if (t <= 30) return 'Azul → Verde · Transición';
  if (t <= 35) return 'Verde → Rojo · Transición';
  return 'Rojo · Caliente';
}

function getFormulaText(temp) {
  const t = Math.round(temp);
  if (t <= 25) {
    return `r=0,  g=0,  b=255  (Azul puro)`;
  } else if (t <= 30) {
    const g = arduinoMap(t, 25, 30, 0, 255);
    const b = arduinoMap(t, 25, 30, 255, 0);
    return `map(${t}, 25,30, 0,255)→g=${g}   map(${t}, 25,30, 255,0)→b=${b}`;
  } else if (t <= 35) {
    const r = arduinoMap(t, 30, 35, 0, 255);
    const g = arduinoMap(t, 30, 35, 255, 0);
    return `map(${t}, 30,35, 0,255)→r=${r}   map(${t}, 30,35, 255,0)→g=${g}`;
  } else {
    return `r=255,  g=0,  b=0  (Rojo puro)`;
  }
}

function buildLEDStrip() {
  const strip = document.getElementById('ledStrip');
  if (!strip) return;
  strip.innerHTML = '';
  for (let i = 0; i < NUM_LEDS; i++) {
    const led = document.createElement('div');
    led.className = 'led-bulb';
    led.id = `led-${i}`;
    strip.appendChild(led);
  }
}

function updateLEDs(r, g, b) {
  const alpha = 0.92;
  const glowColor = `rgba(${r},${g},${b},${alpha})`;
  const glowShadow = `0 0 8px rgba(${r},${g},${b},0.9), 0 0 20px rgba(${r},${g},${b},0.5)`;
  for (let i = 0; i < NUM_LEDS; i++) {
    const led = document.getElementById(`led-${i}`);
    if (led) {
      led.style.background = glowColor;
      led.style.boxShadow = glowShadow;
    }
  }
}

function initSimulator() {
  buildLEDStrip();

  const slider = document.getElementById('tempSlider');
  const tempVal = document.getElementById('tempValue');
  const colorName = document.getElementById('colorName');
  const formulaDisplay = document.getElementById('formulaDisplay');

  if (!slider) return;

  function update() {
    const temp = parseFloat(slider.value);
    const { r, g, b } = getTempColor(temp);

    tempVal.textContent = `${temp}°C`;
    colorName.textContent = getColorName(temp);
    formulaDisplay.textContent = getFormulaText(temp);

    updateLEDs(r, g, b);

    // Colorear el valor mostrado
    const hex = `rgb(${r},${g},${b})`;
    tempVal.style.color = hex;
    colorName.style.color = hex;
  }

  slider.addEventListener('input', update);
  update(); // estado inicial
}

document.addEventListener('DOMContentLoaded', initSimulator);