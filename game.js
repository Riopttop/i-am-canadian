// ==========================================
//  I AM CANADIAN — Suika-style merge game
// ==========================================

// === INLINE SVG ASSETS ===
const TIER_SVGS = [
  // Tier 1: Red Ensign with Union Jack
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs><clipPath id="c1"><circle cx="50" cy="50" r="49"/></clipPath></defs>
    <g clip-path="url(#c1)">
      <rect width="100" height="100" fill="#C8102E"/>
      <rect width="50" height="50" fill="#012169"/>
      <line x1="0" y1="0" x2="50" y2="50" stroke="#FFFFFF" stroke-width="9"/>
      <line x1="50" y1="0" x2="0" y2="50" stroke="#FFFFFF" stroke-width="9"/>
      <line x1="0" y1="0" x2="50" y2="50" stroke="#C8102E" stroke-width="3"/>
      <line x1="50" y1="0" x2="0" y2="50" stroke="#C8102E" stroke-width="3"/>
      <rect y="19" width="50" height="12" fill="#FFFFFF"/>
      <rect x="19" width="12" height="50" fill="#FFFFFF"/>
      <rect y="22" width="50" height="6" fill="#C8102E"/>
      <rect x="22" width="6" height="50" fill="#C8102E"/>
    </g>
    <circle cx="50" cy="50" r="49" fill="none" stroke="#5C0810" stroke-width="2"/>
  </svg>`,

  // Tier 2: Vimy Ridge Memorial
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs>
      <clipPath id="c2"><circle cx="50" cy="50" r="49"/></clipPath>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1d2940"/>
        <stop offset="60%" stop-color="#3d5278"/>
        <stop offset="100%" stop-color="#5d7298"/>
      </linearGradient>
    </defs>
    <g clip-path="url(#c2)">
      <rect width="100" height="100" fill="url(#sky)"/>
      <rect y="75" width="100" height="25" fill="#3a3528"/>
      <rect x="22" y="73" width="56" height="5" fill="#e8e0cc"/>
      <rect x="18" y="78" width="64" height="4" fill="#d4cdb8"/>
      <rect x="38" y="18" width="8" height="55" fill="#f0e8d0"/>
      <rect x="54" y="18" width="8" height="55" fill="#f0e8d0"/>
      <polygon points="38,18 46,18 44,14 40,14" fill="#f0e8d0"/>
      <polygon points="54,18 62,18 60,14 56,14" fill="#f0e8d0"/>
      <rect x="36" y="68" width="12" height="5" fill="#c8bfa3"/>
      <rect x="52" y="68" width="12" height="5" fill="#c8bfa3"/>
    </g>
    <circle cx="50" cy="50" r="49" fill="none" stroke="#0a1428" stroke-width="2"/>
  </svg>`,

  // Tier 3: Canada + Korea
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs><clipPath id="c3"><circle cx="50" cy="50" r="49"/></clipPath></defs>
    <g clip-path="url(#c3)">
      <rect width="50" height="100" fill="#D52B1E"/>
      <rect x="50" width="50" height="100" fill="#FFFFFF"/>
      <g transform="translate(25, 50) scale(0.32)">
        <path d="M 0,-50 L 8,-25 L 30,-30 L 22,-15 L 50,-10 L 32,5 L 45,18 L 22,18 L 28,38 L 8,28 L 5,50 L 0,40 L -5,50 L -8,28 L -28,38 L -22,18 L -45,18 L -32,5 L -50,-10 L -22,-15 L -30,-30 L -8,-25 Z" fill="#FFFFFF"/>
      </g>
      <g transform="translate(75, 50)">
        <path d="M -18,0 A 18,18 0 0,1 18,0 A 9,9 0 0,0 0,0 A 9,9 0 0,1 -18,0 Z" fill="#CD2E3A"/>
        <path d="M 18,0 A 18,18 0 0,1 -18,0 A 9,9 0 0,0 0,0 A 9,9 0 0,1 18,0 Z" fill="#0047A0"/>
      </g>
      <line x1="50" y1="0" x2="50" y2="100" stroke="#888888" stroke-width="0.5" opacity="0.4"/>
    </g>
    <circle cx="50" cy="50" r="49" fill="none" stroke="#333333" stroke-width="2"/>
  </svg>`,

  // Tier 4: Canadian Maple Leaf Flag
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
    <defs><clipPath id="c4"><circle cx="50" cy="50" r="49"/></clipPath></defs>
    <g clip-path="url(#c4)">
      <rect width="100" height="100" fill="#FFFFFF"/>
      <rect width="25" height="100" fill="#D52B1E"/>
      <rect x="75" width="25" height="100" fill="#D52B1E"/>
      <g transform="translate(50, 50) scale(0.45)">
        <path d="M 0,-50 L 8,-25 L 30,-30 L 22,-15 L 50,-10 L 32,5 L 45,18 L 22,18 L 28,38 L 8,28 L 5,50 L 0,40 L -5,50 L -8,28 L -28,38 L -22,18 L -45,18 L -32,5 L -50,-10 L -22,-15 L -30,-30 L -8,-25 Z" fill="#D52B1E"/>
      </g>
    </g>
    <circle cx="50" cy="50" r="49" fill="none" stroke="#8B0000" stroke-width="2"/>
  </svg>`
];

function svgToDataUri(svg) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// === CONFIG ===
const TIERS = [
  { name: 'Red Ensign',     radius: 22, sprite: svgToDataUri(TIER_SVGS[0]), label: '' },
  { name: 'Vimy Ridge',     radius: 32, sprite: svgToDataUri(TIER_SVGS[1]), label: '1917  —  VIMY RIDGE' },
  { name: 'Canada + Korea', radius: 45, sprite: svgToDataUri(TIER_SVGS[2]), label: '1950  —  KOREAN WAR' },
  { name: 'Maple Leaf',     radius: 60, sprite: svgToDataUri(TIER_SVGS[3]), label: '1965  —  CANADA' }
];

const GAME_WIDTH = 440;
const GAME_HEIGHT = 600;
const WALL_THICKNESS = 16;
const SPAWN_Y = 40;
const DROP_COOLDOWN_MS = 350;

// === MATTER.JS ALIASES ===
const { Engine, Render, World, Bodies, Body, Events, Composite, Runner } = Matter;

// === STATE ===
let engine, render, runner;
const bodyTiers = new WeakMap();
let gameWon = false;
let lastDropTime = 0;
let pointerX = GAME_WIDTH / 2;

// ==========================================
//  SETUP
// ==========================================
function init() {
  engine = Engine.create();
  engine.gravity.y = 1;

  render = Render.create({
    element: document.getElementById('game-canvas-wrapper'),
    engine,
    options: {
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      wireframes: false,
      background: 'transparent',
      pixelRatio: window.devicePixelRatio || 1
    }
  });
  Render.run(render);

  runner = Runner.create();
  Runner.run(runner, engine);

  const wallStyle = { isStatic: true, render: { fillStyle: '#1a2a45' } };
  Composite.add(engine.world, [
    Bodies.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - WALL_THICKNESS / 2, GAME_WIDTH, WALL_THICKNESS, wallStyle),
    Bodies.rectangle(WALL_THICKNESS / 2, GAME_HEIGHT / 2, WALL_THICKNESS, GAME_HEIGHT, wallStyle),
    Bodies.rectangle(GAME_WIDTH - WALL_THICKNESS / 2, GAME_HEIGHT / 2, WALL_THICKNESS, GAME_HEIGHT, wallStyle)
  ]);

  Events.on(engine, 'collisionStart', handleCollision);
  setupInput();
  fixRevealImage();
}

function fixRevealImage() {
  const img = document.getElementById('reveal-flag');
  if (img) img.src = TIERS[3].sprite;
}

// ==========================================
//  SPAWN
// ==========================================
function spawn(tierIndex, x, y) {
  const t = TIERS[tierIndex];
  const body = Bodies.circle(x, y, t.radius, {
    restitution: 0.15,
    friction: 0.6,
    frictionAir: 0.005,
    density: 0.0012 + tierIndex * 0.0003,
    inertia: Infinity,
    render: {
      sprite: {
        texture: t.sprite,
        xScale: (t.radius * 2) / 100,
        yScale: (t.radius * 2) / 100
      }
    }
  });
  bodyTiers.set(body, tierIndex);
  Composite.add(engine.world, body);
  return body;
}

// ==========================================
//  MERGE
// ==========================================
function handleCollision(event) {
  const consumed = new Set();

  for (const pair of event.pairs) {
    const { bodyA, bodyB } = pair;
    if (consumed.has(bodyA) || consumed.has(bodyB)) continue;

    const tierA = bodyTiers.get(bodyA);
    const tierB = bodyTiers.get(bodyB);
    if (tierA === undefined || tierB === undefined) continue;
    if (tierA !== tierB) continue;
    if (tierA >= TIERS.length - 1) continue;

    consumed.add(bodyA);
    consumed.add(bodyB);

    const mx = (bodyA.position.x + bodyB.position.x) / 2;
    const my = (bodyA.position.y + bodyB.position.y) / 2;
    const nextTier = tierA + 1;

    Composite.remove(engine.world, bodyA);
    Composite.remove(engine.world, bodyB);

    spawn(nextTier, mx, my);
    showEraLabel(TIERS[nextTier].label);

    if (nextTier === TIERS.length - 1) {
      gameWon = true;
      setTimeout(triggerReveal, 1800);
    }
  }
}

// ==========================================
//  ERA LABEL
// ==========================================
let labelTimer = null;
function showEraLabel(text) {
  if (!text) return;
  const el = document.getElementById('era-label');
  el.textContent = text;
  el.classList.add('show');
  clearTimeout(labelTimer);
  labelTimer = setTimeout(() => el.classList.remove('show'), 3500);
}

// ==========================================
//  REVEAL + THANK YOU
// ==========================================
function triggerReveal() {
  document.getElementById('reveal-overlay').classList.add('show');
}

function showThankYou() {
  document.getElementById('reveal-overlay').classList.remove('show');
  document.getElementById('thankyou-overlay').classList.add('show');
}

// ==========================================
//  INPUT
// ==========================================
function setupInput() {
  const wrapper = document.getElementById('game-canvas-wrapper');

  function drop(x) {
    if (gameWon) return;
    const now = Date.now();
    if (now - lastDropTime < DROP_COOLDOWN_MS) return;
    lastDropTime = now;
    const clampedX = Math.max(TIERS[0].radius + WALL_THICKNESS,
                              Math.min(GAME_WIDTH - TIERS[0].radius - WALL_THICKNESS, x));
    spawn(0, clampedX, SPAWN_Y);
  }

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    pointerX = e.clientX - rect.left;
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat) {
      e.preventDefault();
      drop(pointerX);
    }
  });

  wrapper.addEventListener('click', (e) => {
    const rect = wrapper.getBoundingClientRect();
    drop(e.clientX - rect.left);
  });

  document.getElementById('next-btn').addEventListener('click', showThankYou);
  document.getElementById('play-again-btn').addEventListener('click', resetGame);
  document.getElementById('corner-reset').addEventListener('click', resetGame);
}

// ==========================================
//  RESET
// ==========================================
function resetGame() {
  const bodies = Composite.allBodies(engine.world);
  for (const b of bodies) {
    if (!b.isStatic) Composite.remove(engine.world, b);
  }
  gameWon = false;
  document.getElementById('reveal-overlay').classList.remove('show');
  document.getElementById('thankyou-overlay').classList.remove('show');
  document.getElementById('era-label').classList.remove('show');
}

// ==========================================
//  PRELOAD & START
// ==========================================
function preload(callback) {
  let loaded = 0;
  for (const t of TIERS) {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === TIERS.length) callback();
    };
    img.src = t.sprite;
  }
}

preload(init);
