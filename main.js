const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let cw, ch;
function resize() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Load the base image that you provided
const baseImage = new Image();
baseImage.src = './base.png';

// Load the player image
const playerImageRaw = new Image();
playerImageRaw.src = './player.png';
let playerImage = null; // Will hold the 'cleaned' version

playerImageRaw.onload = () => {
  // Create a temporary canvas to strip the white background
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = playerImageRaw.width;
  tempCanvas.height = playerImageRaw.height;
  tempCtx.drawImage(playerImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  // Background removal logic (targets white surroundings)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Target pure white and very light grey backgrounds
    const isWhiteBackground = r > 245 && g > 245 && b > 245;

    if (isWhiteBackground) {
      data[i + 3] = 0; // Set alpha to 0 (transparent)
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  playerImage = new Image();
  playerImage.src = tempCanvas.toDataURL();
};

// Load the building image
const buildingImageRaw = new Image();
buildingImageRaw.src = './building.png';
let buildingImage = null;

buildingImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = buildingImageRaw.width;
  tempCanvas.height = buildingImageRaw.height;
  tempCtx.drawImage(buildingImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  buildingImage = new Image();
  buildingImage.src = tempCanvas.toDataURL();
};

// Load the unicorn image
const unicornImageRaw = new Image();
unicornImageRaw.src = './unicorn.png';
let unicornImage = null;

unicornImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = unicornImageRaw.width;
  tempCanvas.height = unicornImageRaw.height;
  tempCtx.drawImage(unicornImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  unicornImage = new Image();
  unicornImage.src = tempCanvas.toDataURL();
};

// Load the alien plant image
const plantImageRaw = new Image();
plantImageRaw.src = './alien_plant.png';
let plantImage = null;

plantImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = plantImageRaw.width;
  tempCanvas.height = plantImageRaw.height;
  tempCtx.drawImage(plantImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  // Background removal (targets very light pixels)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  plantImage = new Image();
  plantImage.src = tempCanvas.toDataURL();
};

// Load the shop image
const shopImageRaw = new Image();
shopImageRaw.src = './shop.png';
let shopImage = null;

shopImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = shopImageRaw.width;
  tempCanvas.height = shopImageRaw.height;
  tempCtx.drawImage(shopImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  const processed = new Image();
  processed.onload = () => { shopImage = processed; };
  processed.src = tempCanvas.toDataURL();
};

// Constants
const TILE_SIZE = 32; // Made smaller for a more cozy, "miniature" feel
const MAP_COLS = 16;
const MAP_ROWS = 16;

// The rock dimensions based on the tile size
const ROCK_WIDTH = MAP_COLS * TILE_SIZE;
const ROCK_HEIGHT = MAP_ROWS * TILE_SIZE;

// Input state
const keys = { w: false, a: false, s: false, d: false, Space: false };
window.addEventListener('keydown', (e) => {
  if (e.key === 'w' || e.key === 'ArrowUp') keys.w = true;
  if (e.key === 'a' || e.key === 'ArrowLeft') keys.a = true;
  if (e.key === 's' || e.key === 'ArrowDown') keys.s = true;
  if (e.key === 'd' || e.key === 'ArrowRight') keys.d = true;
  if (e.code === 'Space') keys.Space = true;
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'w' || e.key === 'ArrowUp') keys.w = false;
  if (e.key === 'a' || e.key === 'ArrowLeft') keys.a = false;
  if (e.key === 's' || e.key === 'ArrowDown') keys.s = false;
  if (e.key === 'd' || e.key === 'ArrowRight') keys.d = false;
  if (e.code === 'Space') keys.Space = false;

  // Slot Selection
  if (e.key >= '1' && e.key <= '9') {
    selectSlot(parseInt(e.key) - 1);
  }
});

// Seed Configuration
const SEED_TYPES = [
  { name: 'Moon Seed', color: '#58a6ff', bloomColor: '#f0883e', growthRate: 0.1, cropName: 'Moon Melon' },
  { name: 'Nebula Seed', color: '#d946ef', bloomColor: '#ff00ff', growthRate: 0.08, cropName: 'Nebula Bloom' },
  { name: 'Void Seed', color: '#c084fc', bloomColor: '#7c3aed', growthRate: 0.15, cropName: 'Void Root' }
];

let selectedSlotIndex = 0;

function selectSlot(index) {
  selectedSlotIndex = index;
  updateUI();
}

// Click listener for hotbar slots will be handled by dynamic generation

// Game state
let currentMap = 'farm'; // 'farm' or 'town'

const player = {
  x: ROCK_WIDTH / 2,
  y: ROCK_HEIGHT / 2,
  size: 32,
  speed: 250,
  color: '#58a6ff',
  dirX: 0,
  dirY: 1,
};

const inventory = {
  slots: [
    { type: 'seed', id: 0, count: 10 },
    { type: 'seed', id: 1, count: 5 },
    { type: 'seed', id: 2, count: 5 },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' }
  ]
};

// Player currency
let playerGold = 100;

// Shop catalogue
const SHOP_SEEDS = [
  { id: 0, name: 'Moon Seed', desc: 'Grows into a Moon Melon. Classic and reliable.', price: 10, color: '#58a6ff', growthRate: 0.1 },
  { id: 1, name: 'Nebula Seed', desc: 'Blooms into a star-shaped Nebula Bloom. Slow, but magnificent.', price: 15, color: '#d946ef', growthRate: 0.08 },
  { id: 2, name: 'Void Seed', desc: 'Produces fast-growing Void Roots. Mysterious.', price: 12, color: '#c084fc', growthRate: 0.15 },
];

const CROP_SELL_PRICES = [25, 35, 30]; // Sell price per crop type (index = seed id)

const SHOPKEEPER_MESSAGES = [
  '✨ Welcome, Stellar Farmer! What\'ll it be today?',
  '🌙 Fresh moon seeds just arrived!',
  '💫 The Nebula seeds are especially potent this cycle!',
  '🛸 First time? Everything\'s grown under the stars!',
];

let shopOpen = false;
let shopTab = 'buy';

function openShop() {
  shopOpen = true;
  const overlay = document.getElementById('shop-overlay');
  overlay.classList.remove('hidden');
  // Random shopkeeper greeting
  document.getElementById('shopkeeper-msg').textContent =
    SHOPKEEPER_MESSAGES[Math.floor(Math.random() * SHOPKEEPER_MESSAGES.length)];
  renderShopBuyTab();
  renderShopSellTab();
  document.getElementById('player-gold').textContent = playerGold + ' Stardust';
  switchTab('buy');
}

function closeShop() {
  shopOpen = false;
  document.getElementById('shop-overlay').classList.add('hidden');
}

function switchTab(tab) {
  shopTab = tab;
  document.getElementById('tab-buy-content').classList.toggle('hidden', tab !== 'buy');
  document.getElementById('tab-sell-content').classList.toggle('hidden', tab !== 'sell');
  document.getElementById('tab-buy').classList.toggle('active', tab === 'buy');
  document.getElementById('tab-sell').classList.toggle('active', tab === 'sell');
  if (tab === 'sell') renderShopSellTab();
  if (tab === 'buy') renderShopBuyTab();
}

function renderShopBuyTab() {
  const container = document.getElementById('buy-items');
  container.innerHTML = '';
  SHOP_SEEDS.forEach(seed => {
    const canAfford = playerGold >= seed.price;
    const div = document.createElement('div');
    div.className = 'shop-item';
    div.innerHTML = `
      <div class="item-gem" style="background:${seed.color}; box-shadow:0 0 14px ${seed.color}"></div>
      <div class="shop-item-info">
        <p class="item-name">${seed.name}</p>
        <p class="item-desc">${seed.desc}</p>
      </div>
      <span class="item-price">🌙 ${seed.price}</span>
      <button class="shop-btn buy-btn" ${canAfford ? '' : 'disabled'} onclick="buySeed(${seed.id})">Buy</button>
    `;
    container.appendChild(div);
  });
}

function renderShopSellTab() {
  const container = document.getElementById('sell-items');
  container.innerHTML = '';
  let totalEarnings = 0;

  const cropSlots = inventory.slots.filter(s => s.type === 'crop');

  if (cropSlots.length === 0) {
    container.innerHTML = '<p style="color:#8b949e;text-align:center;padding:30px 0;">No crops to sell. Go farm some! 🌱</p>';
  } else {
    cropSlots.forEach(slot => {
      const seedInfo = SEED_TYPES[slot.id];
      const unitPrice = CROP_SELL_PRICES[slot.id];
      const slotTotal = unitPrice * slot.count;
      totalEarnings += slotTotal;
      const color = seedInfo.bloomColor;
      const div = document.createElement('div');
      div.className = 'shop-item';
      div.innerHTML = `
        <div class="item-gem" style="background:${color}; box-shadow:0 0 14px ${color}; border-radius:6px;"></div>
        <div class="shop-item-info">
          <p class="item-name">${seedInfo.cropName} ×${slot.count}</p>
          <p class="item-desc">🌙 ${unitPrice} each → ${slotTotal} Stardust total</p>
        </div>
        <button class="shop-btn sell-btn" onclick="sellCrop(${slot.id})">Sell All</button>
      `;
      container.appendChild(div);
    });
  }

  document.getElementById('sell-total').textContent = `🌙 ${totalEarnings} Stardust`;
}

function buySeed(seedId) {
  const seed = SHOP_SEEDS.find(s => s.id === seedId);
  if (!seed || playerGold < seed.price) return;
  playerGold -= seed.price;
  addItemToInventory('seed', seedId, seed.name);
  document.getElementById('player-gold').textContent = playerGold + ' Stardust';
  renderShopBuyTab(); // Refresh affordability
  document.getElementById('shopkeeper-msg').textContent = `🌱 Enjoy your ${seed.name}! May it grow tall!`;
}

function sellCrop(cropId) {
  const slot = inventory.slots.find(s => s.type === 'crop' && s.id === cropId);
  if (!slot) return;
  const unitPrice = CROP_SELL_PRICES[cropId];
  const earnings = unitPrice * slot.count;
  playerGold += earnings;
  // Remove the slot
  const idx = inventory.slots.indexOf(slot);
  inventory.slots[idx] = { type: 'empty' };
  updateUI();
  document.getElementById('player-gold').textContent = playerGold + ' Stardust';
  renderShopSellTab();
  renderShopBuyTab();
  document.getElementById('shopkeeper-msg').textContent = `💰 Sold! +${earnings} Stardust. Keep farming!`;
}

// Make these global so HTML onclick attributes can reach them
window.closeShop = closeShop;
window.switchTab = switchTab;
window.buySeed = buySeed;
window.sellCrop = sellCrop;

function addItemToInventory(type, id, name) {
  // Try to find existing stack
  const existing = inventory.slots.find(s => s.type === type && s.id === id);
  if (existing) {
    existing.count++;
  } else {
    // Find first empty slot
    const emptyIndex = inventory.slots.findIndex(s => s.type === 'empty');
    if (emptyIndex !== -1) {
      inventory.slots[emptyIndex] = { type, id, count: 1, name };
    }
  }
  updateUI();
}

const building = {
  x: ROCK_WIDTH - 128 - TILE_SIZE * 2,
  y: TILE_SIZE * 2,
  width: 128,
  height: 128,
  collider: {
    x: ROCK_WIDTH - 128 - TILE_SIZE * 2 + 10,
    y: TILE_SIZE * 2 + 40,
    w: 108,
    h: 80
  }
};

const unicorn = {
  x: ROCK_WIDTH * 0.7,
  y: ROCK_HEIGHT * 0.7,
  speed: 80,
  vx: 0,
  vy: 0,
  timer: 0,
  state: 'idle', // 'idle' or 'walking'
  size: 48,
  dirX: -1
};

const alienPlants = [
  { x: 80, y: 80, scale: 0.8 },
  { x: 420, y: 400, scale: 1.1 },
  { x: 100, y: 350, scale: 0.9 },
  { x: 350, y: 300, scale: 1.0 }
];

const shop = {
  x: ROCK_WIDTH - 200 - TILE_SIZE * 2,
  y: TILE_SIZE * 2,
  width: 200,
  height: 200,
  collider: {
    x: ROCK_WIDTH - 200 - TILE_SIZE * 2 + 20,
    y: TILE_SIZE * 2 + 80,
    w: 160,
    h: 100
  }
};

// Generate a random starry background
const stars = [];
for (let i = 0; i < 400; i++) {
  stars.push({
    x: Math.random() * 4000 - 2000,
    y: Math.random() * 4000 - 2000,
    size: Math.random() * 2 + 1,
    alpha: Math.random(),
    speedY: (Math.random() * 0.2 + 0.1) // tiny parallax float
  });
}

// Distant procedural planets
const planets = [];
const planetColors = ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9', '#00f5d4', '#e07a5f', '#3d405b'];
for (let i = 0; i < 8; i++) {
  planets.push({
    x: Math.random() * 4000 - 2000,
    y: Math.random() * 4000 - 2000,
    radius: Math.random() * 30 + 10,
    color: planetColors[Math.floor(Math.random() * planetColors.length)],
    speedY: (Math.random() * 0.05 + 0.01) // very slow parallax
  });
}

// Map Grid is now conceptual, tied to the size of the rock
// "key: 'r,c'" -> value: { state: 'hoed' | 'planted' | 'ready', growth: 0-1 }
const farmData = {};

let lastTime = 0;
let spaceJustPressed = false;

function update(dt) {
  // Move stars slowly to simulate space floating
  stars.forEach(s => {
    s.y += s.speedY * dt * 60;
    if (s.y > 2000) s.y = -2000;
  });
  planets.forEach(p => {
    p.y += p.speedY * dt * 60;
    if (p.y > 2000) p.y = -2000;
  });

  // Movement
  let vx = 0;
  let vy = 0;
  if (keys.w) vy -= 1;
  if (keys.s) vy += 1;
  if (keys.a) vx -= 1;
  if (keys.d) vx += 1;

  if (vx !== 0 && vy !== 0) {
    const len = Math.sqrt(vx * vx + vy * vy);
    vx /= len;
    vy /= len;
  }

  // Save facing direction
  if (vx !== 0) {
    player.dirX = vx; // Persistent horizontal facing
  }
  if (vy !== 0 || vx !== 0) {
    player.dirY = vy;
  }

  let newX = player.x + vx * player.speed * dt;
  let newY = player.y + vy * player.speed * dt;

  // Map Transitions — check BEFORE clamping so the clamp doesn't fight the teleport
  const transitionPadding = player.size;
  let transitioned = false;
  if (currentMap === 'farm' && newX > ROCK_WIDTH - transitionPadding / 2) {
    currentMap = 'town';
    newX = transitionPadding / 2;
    transitioned = true;
  } else if (currentMap === 'town' && newX < transitionPadding / 2) {
    currentMap = 'farm';
    newX = ROCK_WIDTH - transitionPadding / 2;
    transitioned = true;
  }

  // Collision with buildings based on current map
  if (currentMap === 'farm') {
    const bc = building.collider;
    if (newX > bc.x && newX < bc.x + bc.w && newY > bc.y && newY < bc.y + bc.h) {
      newX = player.x;
      newY = player.y;
    }
  } else if (currentMap === 'town') {
    const sc = shop.collider;
    if (newX > sc.x && newX < sc.x + sc.w && newY > sc.y && newY < sc.y + sc.h) {
      newX = player.x;
      newY = player.y;
    }
  }

  // Only clamp to rock bounds if we didn't just transition (avoids teleport reversal)
  if (!transitioned) {
    const padding = player.size / 2;
    newX = Math.max(padding, Math.min(newX, ROCK_WIDTH - padding));
    newY = Math.max(padding, Math.min(newY, ROCK_HEIGHT - padding));
  }

  player.x = newX;
  player.y = newY;

  // Interaction
  if (keys.Space) {
    if (!spaceJustPressed) {
      interact();
      spaceJustPressed = true;
    }
  } else {
    spaceJustPressed = false;
  }

  // Grow crops
  for (const key in farmData) {
    const plot = farmData[key];
    if (plot.state === 'planted' && plot.growth < 1) {
      const type = SEED_TYPES[plot.seedIndex];
      plot.growth += dt * (type ? type.growthRate : 0.1);
      if (plot.growth >= 1) {
        plot.growth = 1;
        plot.state = 'ready';
      }
    }
  }

  // Unicorn Wandering Logic (Only on farm)
  if (currentMap === 'farm') {
    unicorn.timer -= dt;
    if (unicorn.timer <= 0) {
      if (unicorn.state === 'idle') {
        unicorn.state = 'walking';
        const angle = Math.random() * Math.PI * 2;
        unicorn.vx = Math.cos(angle) * unicorn.speed;
        unicorn.vy = Math.sin(angle) * unicorn.speed;
        unicorn.timer = 1 + Math.random() * 3;
        if (unicorn.vx !== 0) unicorn.dirX = unicorn.vx > 0 ? 1 : -1;
      } else {
        unicorn.state = 'idle';
        unicorn.vx = 0;
        unicorn.vy = 0;
        unicorn.timer = 2 + Math.random() * 2;
      }
    }

    if (unicorn.state === 'walking') {
      let nextUnicornX = unicorn.x + unicorn.vx * dt;
      let nextUnicornY = unicorn.y + unicorn.vy * dt;

      // Bounds check for unicorn
      const uPadding = unicorn.size / 2;
      if (nextUnicornX < uPadding || nextUnicornX > ROCK_WIDTH - uPadding ||
        nextUnicornY < uPadding || nextUnicornY > ROCK_HEIGHT - uPadding) {
        unicorn.state = 'idle';
        unicorn.vx = 0;
        unicorn.vy = 0;
        unicorn.timer = 1;
      } else {
        unicorn.x = nextUnicornX;
        unicorn.y = nextUnicornY;
      }
    }
  }
}

function interact() {
  const reach = TILE_SIZE * 0.75;
  const targetX = player.x + player.dirX * reach;
  const targetY = player.y + player.dirY * reach;

  const col = Math.floor(targetX / TILE_SIZE);
  const row = Math.floor(targetY / TILE_SIZE);

  if (col >= 0 && col < MAP_COLS && row >= 0 && row < MAP_ROWS) {
    const key = `${row},${col}`;
    const plot = farmData[key];
    const selectedSlot = inventory.slots[selectedSlotIndex];

    if (!plot) {
      if (currentMap === 'farm') {
        farmData[key] = { state: 'hoed', growth: 0 };
      }
    } else if (plot.state === 'hoed' && selectedSlot.type === 'seed' && selectedSlot.count > 0) {
      const seedId = selectedSlot.id;
      selectedSlot.count--;
      if (selectedSlot.count <= 0) {
        inventory.slots[selectedSlotIndex] = { type: 'empty' };
      }
      farmData[key] = {
        state: 'planted',
        growth: 0,
        seedIndex: seedId
      };
      updateUI();
    } else if (plot.state === 'ready') {
      const cropId = plot.seedIndex;
      const seedInfo = SEED_TYPES[cropId];
      addItemToInventory('crop', cropId, seedInfo.cropName);
      delete farmData[key];
      updateUI();
    }
  }
}

function updateUI() {
  const hotbarEl = document.getElementById('hotbar');
  if (!hotbarEl) return;

  hotbarEl.innerHTML = '';
  inventory.slots.forEach((slot, i) => {
    const slotEl = document.createElement('div');
    slotEl.className = 'hotbar-slot' + (i === selectedSlotIndex ? ' selected' : '');
    slotEl.onclick = () => selectSlot(i);

    const hint = document.createElement('span');
    hint.className = 'key-hint';
    hint.innerText = i + 1;
    slotEl.appendChild(hint);

    if (slot.type !== 'empty') {
      const icon = document.createElement('div');
      icon.className = 'item-icon';

      if (slot.type === 'seed') {
        const seedInfo = SEED_TYPES[slot.id];
        icon.innerHTML = `<div class="icon-seed" style="background: ${seedInfo.color}; box-shadow: 0 0 10px ${seedInfo.color}"></div>`;
      } else if (slot.type === 'crop') {
        const seedInfo = SEED_TYPES[slot.id];
        icon.innerHTML = `<div class="icon-crop" style="background: ${seedInfo.bloomColor}; box-shadow: 0 0 10px ${seedInfo.bloomColor}"></div>`;
      }

      slotEl.appendChild(icon);

      const count = document.createElement('span');
      count.className = 'item-count';
      count.innerText = slot.count;
      slotEl.appendChild(count);
    }

    hotbarEl.appendChild(slotEl);
  });
}

// Initial UI render
document.addEventListener('DOMContentLoaded', updateUI);

function render() {
  const totalMapWidth = MAP_COLS * TILE_SIZE;
  const totalMapHeight = MAP_ROWS * TILE_SIZE;

  // Calculate center offsets
  const offsetX = (cw - totalMapWidth) / 2;
  const offsetY = (ch - totalMapHeight) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.save();
  ctx.translate(offsetX, offsetY);
  // Calculate universal float offset for the platform
  // Slow bobbing over time
  const platformBob = Math.sin(Date.now() / 1500) * 12;

  // Draw Space Background (Static relative to floating rock)
  ctx.fillStyle = '#0a0a1a'; // Deep space color
  ctx.fillRect(-offsetX, -offsetY, cw, ch);

  stars.forEach(s => {
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    // Star positions are screen-wide, adjusted for center offset
    ctx.fillRect(s.x - offsetX, s.y - offsetY, s.size, s.size);
  });

  planets.forEach(p => {
    ctx.fillStyle = p.color;
    ctx.beginPath();
    // Draw planets relative to screen
    ctx.arc(p.x - offsetX, p.y - offsetY, p.radius, 0, Math.PI * 2);
    ctx.fill();
    // Planet shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.arc(p.x - offsetX, p.y - offsetY, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x - offsetX - p.radius * 0.2, p.y - offsetY - p.radius * 0.2, p.radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
  });

  // Apply the universal bob for everything on the platform
  ctx.save();
  ctx.translate(0, platformBob);

  // Draw the Floating Rock
  if (baseImage.complete && baseImage.naturalWidth > 0) {
    // Draw actual user provided image spanning the rock dimensions
    ctx.drawImage(baseImage, 0, 0, ROCK_WIDTH, ROCK_HEIGHT);
  } else {
    // Fallback graphic if the image is missing from the folder
    ctx.fillStyle = 'rgba(77, 58, 45, 0.4)';
    ctx.fillRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.strokeRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText('Please add base.png to the space_farm folder!', ROCK_WIDTH / 2 - 100, ROCK_HEIGHT / 2);
  }

  if (currentMap === 'farm') {
    // Draw Building
    if (buildingImage && buildingImage.complete) {
      ctx.drawImage(buildingImage, building.x, building.y, building.width, building.height);
    }

    // Draw Alien Plants
    if (plantImage && plantImage.complete) {
      alienPlants.forEach(plant => {
        ctx.save();
        ctx.translate(plant.x, plant.y);
        const pWidth = 48 * plant.scale;
        const pHeight = 48 * plant.scale;
        ctx.drawImage(plantImage, -pWidth / 2, -pHeight + 10, pWidth, pHeight);
        ctx.restore();
      });
    }

    // Draw Farm State Overlay (Hoed land and crops)
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        const tx = c * TILE_SIZE;
        const ty = r * TILE_SIZE;
        const plot = farmData[`${r},${c}`];

        if (plot) {
          if (plot.state === 'hoed') {
            // Semi-transparent tilled ground
            ctx.fillStyle = 'rgba(101, 75, 56, 0.85)';
            ctx.fillRect(tx + 4, ty + 4, TILE_SIZE - 8, TILE_SIZE - 8);
          } else if (plot.state === 'planted' || plot.state === 'ready') {
            ctx.fillStyle = 'rgba(101, 75, 56, 0.85)';
            ctx.fillRect(tx + 4, ty + 4, TILE_SIZE - 8, TILE_SIZE - 8);

            // Render Crop
            const s = TILE_SIZE / 2 * plot.growth;
            const type = SEED_TYPES[plot.seedIndex];
            ctx.fillStyle = plot.state === 'ready' ? type.bloomColor : type.color;
            ctx.shadowBlur = plot.state === 'ready' ? 15 : 0;
            ctx.shadowColor = type.bloomColor;

            if (plot.seedIndex === 1) { // Nebula Bloom - Star shape
              drawStar(tx + TILE_SIZE / 2, ty + TILE_SIZE / 2, 5, Math.max(4, s), Math.max(2, s / 2));
            } else if (plot.seedIndex === 2) { // Void Root - Hexagon
              drawPolygon(tx + TILE_SIZE / 2, ty + TILE_SIZE / 2, 6, Math.max(4, s));
            } else { // Moon Seed - Circle
              ctx.beginPath();
              ctx.arc(tx + TILE_SIZE / 2, ty + TILE_SIZE / 2, Math.max(4, s), 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.shadowBlur = 0; // reset
          }
        }
      }
    }

    // Draw Unicorn
    if (unicornImage && unicornImage.complete) {
      ctx.save();
      ctx.translate(unicorn.x, unicorn.y);
      if (unicorn.dirX > 0) ctx.scale(-1, 1);
      const uniBob = Math.sin(Date.now() / 400) * 4;
      const uSize = unicorn.size;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(0, 10, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.drawImage(unicornImage, -uSize / 2, -uSize / 2 + uniBob, uSize, uSize);
      ctx.restore();
    }

    // Highlight tile the player is targeting (only on farm)
    const reach = TILE_SIZE * 0.75;
    const targetX = player.x + player.dirX * reach;
    const targetY = player.y + player.dirY * reach;
    const tCol = Math.floor(targetX / TILE_SIZE);
    const tRow = Math.floor(targetY / TILE_SIZE);

    if (tCol >= 0 && tCol < MAP_COLS && tRow >= 0 && tRow < MAP_ROWS) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(tCol * TILE_SIZE + 2, tRow * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
      ctx.setLineDash([]);
    }
  } else if (currentMap === 'town') {
    // Draw Shop
    if (shopImage) {
      ctx.drawImage(shopImage, shop.x, shop.y, shop.width, shop.height);
    } else if (shopImageRaw.complete && shopImageRaw.naturalWidth > 0) {
      // Fallback: draw raw image if processed version isn't ready yet
      ctx.drawImage(shopImageRaw, shop.x, shop.y, shop.width, shop.height);
    } else {
      // Placeholder outline
      ctx.strokeStyle = '#58a6ff';
      ctx.lineWidth = 3;
      ctx.strokeRect(shop.x, shop.y, shop.width, shop.height);
      ctx.fillStyle = 'rgba(88, 166, 255, 0.1)';
      ctx.fillRect(shop.x, shop.y, shop.width, shop.height);
      ctx.fillStyle = 'white';
      ctx.font = '14px Inter';
      ctx.fillText('Space Market', shop.x + 30, shop.y + shop.height / 2);
    }

    // Welcome to Town Text
    ctx.fillStyle = 'white';
    ctx.font = '16px Inter';
    ctx.fillText('Space Town - Go left to return to Farm', 20, ROCK_HEIGHT - 20);
  }

  // Draw Player shadow
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.ellipse(player.x, player.y + 12, 16, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw Player (Custom Sprite)
  ctx.save();
  ctx.translate(player.x, player.y);

  // Flip sprite based on movement direction (base image faces right)
  const isFacingLeft = player.dirX < 0;
  if (isFacingLeft) {
    ctx.scale(-1, 1);
  } else {
    ctx.scale(1, 1);
  }

  // Enhanced "Antigravity" Floating Animation
  // Faster, wider bobbing when moving to feel 'floaty'
  const isMoving = keys.w || keys.a || keys.s || keys.d;
  const floatSpeed = isMoving ? 120 : 180;
  const floatAmp = isMoving ? 12 : 6;
  const floatOffset = Math.sin(Date.now() / floatSpeed) * floatAmp;

  ctx.translate(0, floatOffset);

  // Add a slight tilt when moving for extra "floaty" feel
  if (isMoving) {
    ctx.rotate(Math.sin(Date.now() / 200) * 0.05);
  }

  if (playerImage && playerImage.complete) {
    const pSize = 56; // Slightly larger for better detail
    ctx.drawImage(playerImage, -pSize / 2, -pSize + 10, pSize, pSize);
  } else {
    // Fallback if image not loaded
    ctx.fillStyle = '#f15bb5';
    ctx.fillRect(-16, -32, 32, 32);
  }

  ctx.restore();
  ctx.restore(); // Platform bob restore
  ctx.restore(); // Centering restore
}

function loop(timestamp) {
  const dt = (timestamp - lastTime) / 1000 || 0;
  lastTime = timestamp;

  update(dt);
  render();

  requestAnimationFrame(loop);
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius)
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y)
    rot += step
  }
  ctx.lineTo(cx, cy - outerRadius)
  ctx.closePath();
  ctx.fill();
}

function drawPolygon(cx, cy, sides, radius) {
  if (sides < 3) return;
  ctx.beginPath();
  const a = (Math.PI * 2) / sides;
  ctx.moveTo(cx + radius, cy);
  for (let i = 1; i < sides; i++) {
    ctx.lineTo(cx + radius * Math.cos(a * i), cy + radius * Math.sin(a * i));
  }
  ctx.closePath();
  ctx.fill();
}

// Click to open shop — converts screen coords back to map coords
canvas.addEventListener('click', (e) => {
  if (shopOpen) return;
  if (currentMap !== 'town') return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const screenX = (e.clientX - rect.left) * scaleX;
  const screenY = (e.clientY - rect.top) * scaleY;

  // Convert screen → map coords (account for center offset)
  const offsetX = (cw - ROCK_WIDTH) / 2;
  const offsetY = (ch - ROCK_HEIGHT) / 2;
  const mapX = screenX - offsetX;
  const mapY = screenY - offsetY;

  // Check if click is within the shop hitbox
  if (mapX >= shop.x - 20 && mapX <= shop.x + shop.width + 20 &&
    mapY >= shop.y - 20 && mapY <= shop.y + shop.height + 20) {
    const distToShop = Math.hypot(player.x - (shop.x + shop.width / 2), player.y - (shop.y + shop.height / 2));
    if (distToShop < 240) {
      openShop();
    }
  }
});

// Escape key closes shop
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && shopOpen) closeShop();
});

requestAnimationFrame(loop);
