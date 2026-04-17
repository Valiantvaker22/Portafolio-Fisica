// ─────────────────────────────────────────────────────────────────
//  calculator.js  —  Puerto fiel de Calculadora_Final_v2.cpp
//  Toda la lógica matemática es idéntica al original en C++
// ─────────────────────────────────────────────────────────────────

const C = {
  G:   6.67430e-11,
  g:   9.81,
  k_e: 8.98755e9,
  R:   8.314,
  PI:  3.14159265359,
};

// ── Utilidades numéricas ──────────────────────────────────────────
const fmt = (n) => {
  if (!isFinite(n)) return 'Error matemático';
  const abs = Math.abs(n);
  if (abs === 0) return '0';
  if (abs >= 1e6 || (abs < 0.001 && abs > 0)) return n.toExponential(4);
  return parseFloat(n.toPrecision(6)).toString();
};

const parseNum = (s) => {
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
};

// ── Definición completa de módulos ───────────────────────────────
// Cada ecuación describe: título, variables despejables, inputs y cálculo.

const MODULES = {
  main: {
    title: '   CALCULADORA MULTIDISCIPLINARIA DE FÍSICA\n   Supervisado por JHOSTIN NOH',
    options: [
      { label: 'Física Clásica (Mecánica)',  key: 'clasica' },
      { label: 'Oscilaciones y Ondas',       key: 'ondas'   },
      { label: 'Electromagnetismo',          key: 'electro' },
      { label: 'Termodinámica',              key: 'termo'   },
      { label: 'Convertidor de Unidades',    key: 'conv'    },
    ],
  },

  clasica: {
    title: 'FÍSICA CLÁSICA',
    ecuaciones: [
      {
        label: '2da Ley de Newton  (F = m·a)',
        vars: ['Fuerza (N)', 'Masa (kg)', 'Aceleración (m/s²)'],
        inputs: [
          ['m (kg)', 'a (m/s²)'],
          ['F (N)',  'a (m/s²)'],
          ['F (N)',  'm (kg)'],
        ],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `F = ${fmt(a * b)} N`;
          if (idx === 1) return b !== 0 ? `m = ${fmt(a / b)} kg` : 'Error: div/0';
          if (idx === 2) return b !== 0 ? `a = ${fmt(a / b)} m/s²` : 'Error: div/0';
        },
      },
      {
        label: 'Energía Cinética  (Ec = ½·m·v²)',
        vars: ['Energía (J)', 'Masa (kg)', 'Velocidad (m/s)'],
        inputs: [
          ['m (kg)', 'v (m/s)'],
          ['Ec (J)', 'v (m/s)'],
          ['Ec (J)', 'm (kg)'],
        ],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `Ec = ${fmt(0.5 * a * b * b)} J`;
          if (idx === 1) return b !== 0 ? `m = ${fmt((2 * a) / (b * b))} kg` : 'Error: div/0';
          if (idx === 2) return (b > 0 && a >= 0) ? `v = ${fmt(Math.sqrt((2 * a) / b))} m/s` : 'Error: raíz negativa o div/0';
        },
      },
      {
        label: 'Trabajo Mecánico  (W = F·d)',
        vars: ['Trabajo (J)', 'Fuerza (N)', 'Distancia (m)'],
        inputs: [
          ['F (N)', 'd (m)'],
          ['W (J)', 'd (m)'],
          ['W (J)', 'F (N)'],
        ],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `W = ${fmt(a * b)} J`;
          if (idx === 1) return b !== 0 ? `F = ${fmt(a / b)} N` : 'Error: div/0';
          if (idx === 2) return b !== 0 ? `d = ${fmt(a / b)} m` : 'Error: div/0';
        },
      },
      {
        label: 'MRUA Velocidad Final  (vf = vi + a·t)',
        vars: ['V_final (m/s)', 'V_inicial (m/s)', 'Aceleración (m/s²)', 'Tiempo (s)'],
        inputs: [
          ['vi (m/s)', 'a (m/s²)', 't (s)'],
          ['vf (m/s)', 'a (m/s²)', 't (s)'],
          ['vf (m/s)', 'vi (m/s)', 't (s)'],
          ['vf (m/s)', 'vi (m/s)', 'a (m/s²)'],
        ],
        calc: (v, idx) => {
          const [a, b, c] = v;
          if (idx === 0) return `vf = ${fmt(a + b * c)} m/s`;
          if (idx === 1) return `vi = ${fmt(a - b * c)} m/s`;
          if (idx === 2) return c !== 0 ? `a = ${fmt((a - b) / c)} m/s²` : 'Error: div/0';
          if (idx === 3) return c !== 0 ? `t = ${fmt((a - b) / c)} s` : 'Error: div/0';
        },
      },
      {
        label: 'Peso  (P = m·g)',
        vars: ['Peso (N)', 'Masa (kg)'],
        inputs: [['m (kg)'], ['P (N)']],
        calc: (v, idx) => {
          const [a] = v;
          if (idx === 0) return `P = ${fmt(a * C.g)} N`;
          if (idx === 1) return `m = ${fmt(a / C.g)} kg`;
        },
      },
      {
        label: 'Velocidad Media  (v = d/t)',
        vars: ['Velocidad (m/s)', 'Distancia (m)', 'Tiempo (s)'],
        inputs: [['d (m)', 't (s)'], ['v (m/s)', 't (s)'], ['d (m)', 'v (m/s)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return b !== 0 ? `v = ${fmt(a / b)} m/s` : 'Error: div/0';
          if (idx === 1) return `d = ${fmt(a * b)} m`;
          if (idx === 2) return b !== 0 ? `t = ${fmt(a / b)} s` : 'Error: div/0';
        },
      },
      {
        label: '3ra Ley de Newton  (Acción-Reacción)',
        vars: ['— (solo magnitud)'],
        inputs: [['F acción (N)']],
        calc: (v) => `F reacción = ${fmt(-v[0])} N  (misma magnitud, sentido opuesto)`,
      },
      {
        label: 'MRUA sin tiempo  (vf² = vi² + 2·a·d)',
        vars: ['V_final (m/s)', 'V_inicial (m/s)', 'Aceleración (m/s²)', 'Distancia (m)'],
        inputs: [
          ['vi (m/s)', 'a (m/s²)', 'd (m)'],
          ['vf (m/s)', 'a (m/s²)', 'd (m)'],
          ['vf (m/s)', 'vi (m/s)', 'd (m)'],
          ['vf (m/s)', 'vi (m/s)', 'a (m/s²)'],
        ],
        calc: (v, idx) => {
          const [a, b, c] = v;
          if (idx === 0) { const x = a*a + 2*b*c; return x >= 0 ? `vf = ${fmt(Math.sqrt(x))} m/s` : 'Error: raíz negativa'; }
          if (idx === 1) { const x = a*a - 2*b*c; return x >= 0 ? `vi = ${fmt(Math.sqrt(x))} m/s` : 'Error: raíz negativa'; }
          if (idx === 2) return c !== 0 ? `a = ${fmt((a*a - b*b) / (2*c))} m/s²` : 'Error: div/0';
          if (idx === 3) return c !== 0 ? `d = ${fmt((a*a - b*b) / (2*c))} m` : 'Error: div/0';
        },
      },
      {
        label: 'Energía Potencial Gravitatoria  (Ep = m·g·h)',
        vars: ['E_Potencial (J)', 'Masa (kg)', 'Altura (m)'],
        inputs: [['m (kg)', 'h (m)'], ['Ep (J)', 'h (m)'], ['Ep (J)', 'm (kg)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `Ep = ${fmt(a * C.g * b)} J`;
          if (idx === 1) return b !== 0 ? `m = ${fmt(a / (C.g * b))} kg` : 'Error: div/0';
          if (idx === 2) return b !== 0 ? `h = ${fmt(a / (b * C.g))} m` : 'Error: div/0';
        },
      },
      {
        label: 'Trabajo con ángulo  (W = F·d·cos θ)',
        vars: ['Trabajo (J)', 'Fuerza (N)', 'Distancia (m)'],
        inputs: [
          ['F (N)', 'd (m)', 'θ (grados)'],
          ['W (J)', 'd (m)', 'θ (grados)'],
          ['W (J)', 'F (N)', 'θ (grados)'],
        ],
        calc: (v, idx) => {
          const [a, b, ang] = v;
          const rad = ang * C.PI / 180;
          const cosA = Math.cos(rad);
          if (idx === 0) return `W = ${fmt(a * b * cosA)} J`;
          if (idx === 1) return (b !== 0 && cosA !== 0) ? `F = ${fmt(a / (b * cosA))} N` : 'Error mat.';
          if (idx === 2) return (b !== 0 && cosA !== 0) ? `d = ${fmt(a / (b * cosA))} m` : 'Error mat.';
        },
      },
    ],
  },

  ondas: {
    title: 'OSCILACIONES Y ONDAS',
    ecuaciones: [
      {
        label: 'Ley de Hooke  (F = k·x)',
        vars: ['Fuerza (N)', 'Constante (N/m)', 'Deformación (m)'],
        inputs: [['k (N/m)', 'x (m)'], ['F (N)', 'x (m)'], ['F (N)', 'k (N/m)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `F = ${fmt(a * b)} N`;
          if (idx === 1) return b !== 0 ? `k = ${fmt(a / b)} N/m` : 'Error: div/0';
          if (idx === 2) return b !== 0 ? `x = ${fmt(a / b)} m` : 'Error: div/0';
        },
      },
      {
        label: 'Período Péndulo Simple  (T = 2π√(L/g))',
        vars: ['Período (s)', 'Longitud (m)'],
        inputs: [['L (m)'], ['T (s)']],
        calc: (v, idx) => {
          const [a] = v;
          if (idx === 0) return a >= 0 ? `T = ${fmt(2 * C.PI * Math.sqrt(a / C.g))} s` : 'Error: raíz negativa';
          if (idx === 1) return a >= 0 ? `L = ${fmt(Math.pow(a / (2 * C.PI), 2) * C.g)} m` : 'Error: raíz negativa';
        },
      },
      {
        label: 'Frecuencia-Período  (f = 1/T)',
        vars: ['Frecuencia (Hz)', 'Período (s)'],
        inputs: [['T (s)'], ['f (Hz)']],
        calc: (v, idx) => {
          const [a] = v;
          if (idx === 0) return a !== 0 ? `f = ${fmt(1 / a)} Hz` : 'Error: div/0';
          if (idx === 1) return a !== 0 ? `T = ${fmt(1 / a)} s` : 'Error: div/0';
        },
      },
      {
        label: 'Velocidad de Onda  (v = λ·f)',
        vars: ['Velocidad (m/s)', 'Long. de onda λ (m)', 'Frecuencia (Hz)'],
        inputs: [['λ (m)', 'f (Hz)'], ['v (m/s)', 'f (Hz)'], ['v (m/s)', 'λ (m)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `v = ${fmt(a * b)} m/s`;
          if (idx === 1) return b !== 0 ? `λ = ${fmt(a / b)} m` : 'Error: div/0';
          if (idx === 2) return b !== 0 ? `f = ${fmt(a / b)} Hz` : 'Error: div/0';
        },
      },
      {
        label: 'Energía Potencial Elástica  (Ep = ½·k·x²)',
        vars: ['Energía (J)', 'Constante k (N/m)', 'Deformación x (m)'],
        inputs: [['k (N/m)', 'x (m)'], ['Ep (J)', 'x (m)'], ['Ep (J)', 'k (N/m)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `Ep = ${fmt(0.5 * a * b * b)} J`;
          if (idx === 1) return b !== 0 ? `k = ${fmt((2 * a) / (b * b))} N/m` : 'Error: div/0';
          if (idx === 2) return (a > 0 && b > 0) ? `x = ${fmt(Math.sqrt((2 * a) / b))} m` : 'Error: raíz negativa';
        },
      },
    ],
  },

  electro: {
    title: 'ELECTROMAGNETISMO',
    ecuaciones: [
      {
        label: 'Ley de Ohm  (V = I·R)',
        vars: ['Voltaje (V)', 'Corriente (A)', 'Resistencia (Ω)'],
        inputs: [['I (A)', 'R (Ω)'], ['V (V)', 'R (Ω)'], ['V (V)', 'I (A)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `V = ${fmt(a * b)} V`;
          if (idx === 1) return b !== 0 ? `I = ${fmt(a / b)} A` : 'Error: div/0';
          if (idx === 2) return b !== 0 ? `R = ${fmt(a / b)} Ω` : 'Error: div/0';
        },
      },
      {
        label: 'Ley de Coulomb  (F = ke·q1·q2/r²)',
        vars: ['Fuerza (N)', 'Carga q1 (C)', 'Distancia r (m)'],
        inputs: [['q1 (C)', 'q2 (C)', 'r (m)'], ['F (N)', 'q2 (C)', 'r (m)'], ['F (N)', 'q1 (C)', 'q2 (C)']],
        calc: (v, idx) => {
          const [a, b, c] = v;
          if (idx === 0) return c !== 0 ? `F = ${fmt((C.k_e * Math.abs(a * b)) / (c * c))} N` : 'Error: div/0';
          if (idx === 1) return b !== 0 ? `q1 = ${fmt((a * c * c) / (C.k_e * b))} C` : 'Error: div/0';
          if (idx === 2) return a !== 0 ? `r = ${fmt(Math.sqrt((C.k_e * Math.abs(a * b)) / a))} m` : 'Error: div/0';
        },
      },
      {
        label: 'Potencia Eléctrica  (P = V·I)',
        vars: ['Potencia (W)', 'Voltaje (V)', 'Corriente (A)'],
        inputs: [['V (V)', 'I (A)'], ['P (W)', 'I (A)'], ['P (W)', 'V (V)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return `P = ${fmt(a * b)} W`;
          if (idx === 1) return b !== 0 ? `V = ${fmt(a / b)} V` : 'Error: div/0';
          if (idx === 2) return b !== 0 ? `I = ${fmt(a / b)} A` : 'Error: div/0';
        },
      },
      {
        label: 'Capacitancia  (C = Q/V)',
        vars: ['Capacitancia (F)', 'Carga Q (C)', 'Voltaje (V)'],
        inputs: [['Q (C)', 'V (V)'], ['C (F)', 'V (V)'], ['Q (C)', 'C (F)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return b !== 0 ? `C = ${fmt(a / b)} F` : 'Error: div/0';
          if (idx === 1) return `Q = ${fmt(a * b)} C`;
          if (idx === 2) return b !== 0 ? `V = ${fmt(a / b)} V` : 'Error: div/0';
        },
      },
      {
        label: 'Campo Eléctrico  (E = ke·q/r²)',
        vars: ['Campo (N/C)', 'Carga q (C)', 'Distancia r (m)'],
        inputs: [['q (C)', 'r (m)'], ['E (N/C)', 'r (m)'], ['E (N/C)', 'q (C)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return b !== 0 ? `E = ${fmt((C.k_e * a) / (b * b))} N/C` : 'Error: div/0';
          if (idx === 1) return `q = ${fmt((a * b * b) / C.k_e)} C`;
          if (idx === 2) return (a !== 0 && b > 0) ? `r = ${fmt(Math.sqrt((C.k_e * b) / a))} m` : 'Error: div/0';
        },
      },
    ],
  },

  termo: {
    title: 'TERMODINÁMICA',
    ecuaciones: [
      {
        label: 'Gas Ideal  (P·V = n·R·T)',
        vars: ['Presión (Pa)', 'Volumen (m³)', 'Moles (n)', 'Temperatura (K)'],
        inputs: [
          ['V (m³)', 'n (mol)', 'T (K)'],
          ['P (Pa)', 'n (mol)', 'T (K)'],
          ['P (Pa)', 'V (m³)', 'T (K)'],
          ['P (Pa)', 'V (m³)', 'n (mol)'],
        ],
        calc: (v, idx) => {
          const [a, b, c] = v;
          if (idx === 0) return a !== 0 ? `P = ${fmt((b * C.R * c) / a)} Pa` : 'Error: div/0';
          if (idx === 1) return a !== 0 ? `V = ${fmt((b * C.R * c) / a)} m³` : 'Error: div/0';
          if (idx === 2) return c !== 0 ? `n = ${fmt((a * b) / (C.R * c))} mol` : 'Error: div/0';
          if (idx === 3) return b !== 0 ? `T = ${fmt((a * b) / (b * C.R))} K` : 'Error: div/0';
        },
      },
      {
        label: 'Densidad  (ρ = m/V)',
        vars: ['Densidad (kg/m³)', 'Masa (kg)', 'Volumen (m³)'],
        inputs: [['m (kg)', 'V (m³)'], ['ρ (kg/m³)', 'V (m³)'], ['ρ (kg/m³)', 'm (kg)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return b !== 0 ? `ρ = ${fmt(a / b)} kg/m³` : 'Error: div/0';
          if (idx === 1) return `m = ${fmt(a * b)} kg`;
          if (idx === 2) return a !== 0 ? `V = ${fmt(b / a)} m³` : 'Error: div/0';
        },
      },
      {
        label: 'Presión  (P = F/A)',
        vars: ['Presión (Pa)', 'Fuerza (N)', 'Área (m²)'],
        inputs: [['F (N)', 'A (m²)'], ['P (Pa)', 'A (m²)'], ['P (Pa)', 'F (N)']],
        calc: (v, idx) => {
          const [a, b] = v;
          if (idx === 0) return b !== 0 ? `P = ${fmt(a / b)} Pa` : 'Error: div/0';
          if (idx === 1) return `F = ${fmt(a * b)} N`;
          if (idx === 2) return a !== 0 ? `A = ${fmt(b / a)} m²` : 'Error: div/0';
        },
      },
      {
        label: 'Calor Específico  (Q = m·c·ΔT)',
        vars: ['Calor (J)', 'Masa (kg)', 'Calor esp. (J/kg·K)', 'ΔT (K)'],
        inputs: [
          ['m (kg)', 'c (J/kg·K)', 'ΔT (K)'],
          ['Q (J)',  'c (J/kg·K)', 'ΔT (K)'],
        ],
        calc: (v, idx) => {
          const [a, b, c] = v;
          if (idx === 0) return `Q = ${fmt(a * b * c)} J`;
          if (idx === 1) return (b * c) !== 0 ? `m = ${fmt(a / (b * c))} kg` : 'Error: div/0';
        },
      },
      {
        label: 'Conversión °C ↔ K',
        vars: ['°C → K', 'K → °C'],
        inputs: [['Temp en °C'], ['Temp en K']],
        calc: (v, idx) => {
          const [a] = v;
          if (idx === 0) return `K = ${fmt(a + 273.15)} K`;
          if (idx === 1) return `°C = ${fmt(a - 273.15)} °C`;
        },
      },
    ],
  },

  conv: {
    title: 'CONVERTIDOR UNIVERSAL',
    categorias: [
      {
        label: 'Longitud',
        opciones: [
          { label: 'Metros → Pies',         calc: (v) => `${v} m = ${fmt(v * 3.28084)} ft` },
          { label: 'Pies → Metros',          calc: (v) => `${v} ft = ${fmt(v / 3.28084)} m` },
          { label: 'Metros → Pulgadas',      calc: (v) => `${v} m = ${fmt(v * 39.3701)} in` },
          { label: 'Kilómetros → Millas',    calc: (v) => `${v} km = ${fmt(v * 0.621371)} mi` },
        ],
      },
      {
        label: 'Masa',
        opciones: [
          { label: 'Kilogramos → Libras',    calc: (v) => `${v} kg = ${fmt(v * 2.20462)} lb` },
          { label: 'Libras → Kilogramos',    calc: (v) => `${v} lb = ${fmt(v / 2.20462)} kg` },
          { label: 'Kilogramos → Onzas',     calc: (v) => `${v} kg = ${fmt(v * 35.274)} oz` },
          { label: 'Gramos → Onzas',         calc: (v) => `${v} g = ${fmt(v * 0.035274)} oz` },
        ],
      },
      {
        label: 'Velocidad',
        opciones: [
          { label: 'm/s → km/h',             calc: (v) => `${v} m/s = ${fmt(v * 3.6)} km/h` },
          { label: 'km/h → m/s',             calc: (v) => `${v} km/h = ${fmt(v / 3.6)} m/s` },
          { label: 'm/s → mph',              calc: (v) => `${v} m/s = ${fmt(v * 2.23694)} mph` },
          { label: 'km/h → mph',             calc: (v) => `${v} km/h = ${fmt(v * 0.621371)} mph` },
        ],
      },
      {
        label: 'Energía',
        opciones: [
          { label: 'Joules → Calorías',      calc: (v) => `${v} J = ${fmt(v * 0.239006)} cal` },
          { label: 'Calorías → Joules',      calc: (v) => `${v} cal = ${fmt(v / 0.239006)} J` },
          { label: 'Joules → BTU',           calc: (v) => `${v} J = ${fmt(v * 0.000947817)} BTU` },
          { label: 'Joules → kWh',           calc: (v) => `${v} J = ${fmt(v / 3.6e6)} kWh` },
        ],
      },
      {
        label: 'Temperatura',
        opciones: [
          { label: '°C → °F',                calc: (v) => `${v} °C = ${fmt(v * 9/5 + 32)} °F` },
          { label: '°F → °C',                calc: (v) => `${v} °F = ${fmt((v - 32) * 5/9)} °C` },
          { label: '°C → K',                 calc: (v) => `${v} °C = ${fmt(v + 273.15)} K` },
          { label: 'K → °C',                 calc: (v) => `${v} K = ${fmt(v - 273.15)} °C` },
        ],
      },
      {
        label: 'Presión',
        opciones: [
          { label: 'Pascales → atm',         calc: (v) => `${v} Pa = ${fmt(v / 101325)} atm` },
          { label: 'atm → Pascales',         calc: (v) => `${v} atm = ${fmt(v * 101325)} Pa` },
          { label: 'Pascales → PSI',         calc: (v) => `${v} Pa = ${fmt(v * 0.000145038)} PSI` },
          { label: 'atm → mmHg',             calc: (v) => `${v} atm = ${fmt(v * 760)} mmHg` },
        ],
      },
      {
        label: 'Potencia',
        opciones: [
          { label: 'Watts → HP',             calc: (v) => `${v} W = ${fmt(v * 0.00134102)} HP` },
          { label: 'HP → Watts',             calc: (v) => `${v} HP = ${fmt(v / 0.00134102)} W` },
        ],
      },
      {
        label: 'Volumen',
        opciones: [
          { label: 'Litros → Galones (US)',   calc: (v) => `${v} L = ${fmt(v * 0.264172)} gal` },
          { label: 'Galones → Litros',        calc: (v) => `${v} gal = ${fmt(v / 0.264172)} L` },
          { label: 'Metros³ → Litros',        calc: (v) => `${v} m³ = ${fmt(v * 1000)} L` },
        ],
      },
      {
        label: 'Ángulos',
        opciones: [
          { label: 'Grados → Radianes',      calc: (v) => `${v}° = ${fmt(v * C.PI / 180)} rad` },
          { label: 'Radianes → Grados',      calc: (v) => `${v} rad = ${fmt(v * 180 / C.PI)}°` },
        ],
      },
      {
        label: 'Fuerza',
        opciones: [
          { label: 'Newtons → lbf',          calc: (v) => `${v} N = ${fmt(v * 0.224809)} lbf` },
          { label: 'lbf → Newtons',          calc: (v) => `${v} lbf = ${fmt(v / 0.224809)} N` },
          { label: 'Newtons → Dinas',        calc: (v) => `${v} N = ${fmt(v * 100000)} dinas` },
        ],
      },
    ],
  },
};

// ── Motor de la terminal ──────────────────────────────────────────

class PhysicsTerminal {
  constructor() {
    this.body = document.getElementById('terminalBody');
    this.input = document.getElementById('terminalInput');
    this.history = [];
    this.state = { screen: 'main' };
    this.pendingInputs = [];
    this.collectedValues = [];
    this.inputIndex = 0;

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleInput(this.input.value.trim());
    });

    this.showMain();
    this.input.focus();
    document.getElementById('terminalBody').addEventListener('click', () => this.input.focus());
  }

  // ── Renderizado ────────────────────────────────────────────────

  print(text, cls = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    this.body.appendChild(line);
    this.body.scrollTop = this.body.scrollHeight;
  }

  printHTML(html, cls = '') {
    const line = document.createElement('div');
    line.className = 'terminal-line' + (cls ? ' ' + cls : '');
    line.innerHTML = html;
    this.body.appendChild(line);
    this.body.scrollTop = this.body.scrollHeight;
  }

  printBlank() { this.print(''); }

  echo(val) {
    // Muestra lo que el usuario escribió en el cuerpo de la terminal
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="t-prompt-inline">›</span> <span class="t-input">${val}</span>`;
    this.body.appendChild(line);
    this.input.value = '';
    this.body.scrollTop = this.body.scrollHeight;
  }

  clear() { this.body.innerHTML = ''; }

  // ── Pantallas ──────────────────────────────────────────────────

  showMain() {
    this.clear();
    this.state = { screen: 'main' };
    this.print('══════════════════════════════════════════', 't-border');
    this.print('   CALCULADORA MULTIDISCIPLINARIA DE FÍSICA', 't-banner');
    this.print('   Supervisado por JHOSTIN NOH', 't-banner');
    this.print('══════════════════════════════════════════', 't-border');
    this.printBlank();
    MODULES.main.options.forEach((o, i) => {
      this.print(`  [ ${i + 1} ]  ${o.label}`, 't-option');
    });
    this.print(`  [ 0 ]  Salir`, 't-dim');
    this.printBlank();
    this.print('  Seleccione un área:', 't-label');
  }

  showModule(key) {
    this.clear();
    const mod = MODULES[key];
    this.state = { screen: 'module', key };
    this.print('──────────────────────────────────────────', 't-border');
    this.print(`  ${mod.title}`, 't-header');
    this.print('──────────────────────────────────────────', 't-border');
    this.printBlank();

    if (key === 'conv') {
      mod.categorias.forEach((c, i) => {
        this.print(`  [ ${i + 1} ]  ${c.label}`, 't-option');
      });
    } else {
      mod.ecuaciones.forEach((eq, i) => {
        this.print(`  [ ${i + 1} ]  ${eq.label}`, 't-option');
      });
    }
    this.print(`  [ 0 ]  ← Volver`, 't-dim');
    this.printBlank();
    this.print('  Seleccione ecuación:', 't-label');
  }

  showVarSelection(moduleKey, eqIndex) {
    const eq = MODULES[moduleKey].ecuaciones[eqIndex];
    this.clear();
    this.state = { screen: 'varsel', moduleKey, eqIndex };
    this.print(`  ${eq.label}`, 't-header');
    this.print('──────────────────────────────────────────', 't-border');
    this.printBlank();
    this.print('  Despejar:', 't-label');
    eq.vars.forEach((v, i) => {
      this.print(`  [ ${i + 1} ]  ${v}`, 't-option');
    });
    this.print(`  [ 0 ]  ← Volver`, 't-dim');
    this.printBlank();
  }

  showConvSubMenu(catIndex) {
    const cat = MODULES.conv.categorias[catIndex];
    this.clear();
    this.state = { screen: 'convsub', catIndex };
    this.print(`  CONVERSIÓN: ${cat.label.toUpperCase()}`, 't-header');
    this.print('──────────────────────────────────────────', 't-border');
    this.printBlank();
    cat.opciones.forEach((o, i) => {
      this.print(`  [ ${i + 1} ]  ${o.label}`, 't-option');
    });
    this.print(`  [ 0 ]  ← Volver`, 't-dim');
    this.printBlank();
  }

  collectInputs(labels, onComplete) {
    this.pendingInputs = labels;
    this.collectedValues = [];
    this.inputIndex = 0;
    this.state.screen = 'collecting';
    this.state.onComplete = onComplete;
    this.printBlank();
    this.print(`  Ingrese los datos en S.I.`, 't-dim');
    this.printBlank();
    this.print(`  ${labels[0]}:`, 't-label');
  }

  // ── Manejo de input ────────────────────────────────────────────

  handleInput(raw) {
    if (raw === '') return;
    this.echo(raw);
    const val = raw.replace(',', '.');

    const { screen } = this.state;

    if (screen === 'main') {
      const n = parseInt(val);
      if (n === 0) { this.print('\n  Cerrando sistema...', 't-dim'); this.input.disabled = true; return; }
      const opt = MODULES.main.options[n - 1];
      if (opt) { this.showModule(opt.key); }
      else { this.print('  Opción no válida.', 't-error'); }
    }

    else if (screen === 'module') {
      const { key } = this.state;
      const n = parseInt(val);
      if (n === 0) { this.showMain(); return; }
      if (key === 'conv') {
        const cat = MODULES.conv.categorias[n - 1];
        if (cat) { this.showConvSubMenu(n - 1); }
        else { this.print('  Opción no válida.', 't-error'); }
      } else {
        const mod = MODULES[key];
        const eq = mod.ecuaciones[n - 1];
        if (eq) {
          if (eq.vars.length === 1) {
            // Sin selección de variable, ir directo a inputs
            this.state = { screen: 'varsel', moduleKey: key, eqIndex: n - 1 };
            this.startCollecting(key, n - 1, 0);
          } else {
            this.showVarSelection(key, n - 1);
          }
        } else { this.print('  Opción no válida.', 't-error'); }
      }
    }

    else if (screen === 'varsel') {
      const { moduleKey, eqIndex } = this.state;
      const n = parseInt(val);
      if (n === 0) { this.showModule(moduleKey); return; }
      const eq = MODULES[moduleKey].ecuaciones[eqIndex];
      if (n >= 1 && n <= eq.vars.length) {
        this.startCollecting(moduleKey, eqIndex, n - 1);
      } else { this.print('  Opción no válida.', 't-error'); }
    }

    else if (screen === 'convsub') {
      const { catIndex } = this.state;
      const n = parseInt(val);
      if (n === 0) { this.showModule('conv'); return; }
      const cat = MODULES.conv.categorias[catIndex];
      const op = cat.opciones[n - 1];
      if (op) {
        this.state = { screen: 'convval', catIndex, opIndex: n - 1 };
        this.printBlank();
        this.print('  Ingrese el valor:', 't-label');
      } else { this.print('  Opción no válida.', 't-error'); }
    }

    else if (screen === 'convval') {
      const { catIndex, opIndex } = this.state;
      const num = parseNum(val);
      if (num === null) { this.print('  Número inválido.', 't-error'); return; }
      const result = MODULES.conv.categorias[catIndex].opciones[opIndex].calc(num);
      this.printBlank();
      this.print('  ── RESULTADO ───────────────────────────', 't-result-header');
      this.print(`  ${result}`, 't-result-value');
      this.printBlank();
      this.print('  [ Enter ] Nuevo cálculo   [ 0 ] Menú principal', 't-dim');
      this.state.screen = 'afterresult';
    }

    else if (screen === 'collecting') {
      const num = parseNum(val);
      if (num === null) { this.print('  Número inválido, intenta de nuevo:', 't-error'); return; }
      this.collectedValues.push(num);
      this.inputIndex++;
      if (this.inputIndex < this.pendingInputs.length) {
        this.print(`  ${this.pendingInputs[this.inputIndex]}:`, 't-label');
      } else {
        this.state.onComplete(this.collectedValues);
      }
    }

    else if (screen === 'afterresult') {
      if (val === '0') { this.showMain(); }
      else { this.showMain(); }
    }
  }

  startCollecting(moduleKey, eqIndex, varIndex) {
    const eq = MODULES[moduleKey].ecuaciones[eqIndex];
    const inputs = eq.inputs[varIndex];
    this.collectInputs(inputs, (values) => {
      const result = eq.calc(values, varIndex);
      this.printBlank();
      this.print('  ── RESULTADO ───────────────────────────', 't-result-header');
      this.print(`  ${eq.label}`, 't-result');
      this.print(`  ${result}`, 't-result-value');
      this.printBlank();
      this.print('  [ Enter ] Nuevo cálculo   [ 0 ] Menú principal', 't-dim');
      this.state = { screen: 'afterresult' };
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PhysicsTerminal();
});