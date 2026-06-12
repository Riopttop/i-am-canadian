// ==========================================
//  I AM CANADIAN — Suika-style merge game
// ==========================================

// === CONFIG ===
const TIERS = [
  { name: 'Red Ensign',     radius: 22, sprite: 'assets/tier1-red-ensign.svg',   label: '' },
  { name: 'Vimy Ridge',     radius: 32, sprite: 'assets/tier2-vimy.svg',          label: '1917  —  VIMY RIDGE' },
  { name: 'Canada + Korea', radius: 45, sprite: 'assets/tier3-canada-korea.svg',  label: '1950  —  KOREAN WAR' },
  { name: 'Maple Leaf',     radius: 60, sprite: 'assets/tier4-maple-leaf.svg',    label: '1965  —  CANADA' }
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
const bodyTiers = new WeakMap();   // Matter body -> tier index
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

  // Walls
  const wallStyle = { isStatic: true, render: { fillStyle: '#1a2a45' } };
  Composite.add(engine.world, [
    Bodies.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - WALL_THICKNESS / 2, GAME_WIDTH, WALL_THICKNESS, wallStyle),
    Bodies.rectangle(WALL_THICKNESS / 2, GAME_HEIGHT / 2, WALL_THICKNESS, GAME_HEIGHT, wallStyle),
    Bodies.rectangle(GAME_WIDTH - WALL_THICKNESS / 2, GAME_HEIGHT / 2, WALL_THICKNESS, GAME_HEIGHT, wallStyle)
  ]);

  Events.on(engine, 'collisionStart', handleCollision);
  setupInput();
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
    inertia: Infinity,   // lock rotation so flags stay upright
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
    if (tierA >= TIERS.length - 1) continue; // already at max tier

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
//  REVEAL
// ==========================================
function triggerReveal() {
  document.getElementById('reveal-overlay').classList.add('show');
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

  // Track pointer X for spacebar drops
  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    pointerX = e.clientX - rect.left;
  });

  // Spacebar drops at current pointer X (or center if no mouse movement)
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat) {
      e.preventDefault();
      drop(pointerX);
    }
  });

  // Click drops at clicked position
  wrapper.addEventListener('click', (e) => {
    const rect = wrapper.getBoundingClientRect();
    drop(e.clientX - rect.left);
  });

  // Reset buttons
  document.getElementById('reset-btn').addEventListener('click', resetGame);
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
