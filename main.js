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

// Load the cryo hatchery image
const hatcheryImageRaw = new Image();
hatcheryImageRaw.src = './cyro_hatchery.png';
let hatcheryImage = null;

hatcheryImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = hatcheryImageRaw.width;
  tempCanvas.height = hatcheryImageRaw.height;
  tempCtx.drawImage(hatcheryImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  hatcheryImage = new Image();
  hatcheryImage.src = tempCanvas.toDataURL();
};

// Load the house image
const houseImageRaw = new Image();
houseImageRaw.src = './house.png';
let houseImage = null;

houseImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = houseImageRaw.width;
  tempCanvas.height = houseImageRaw.height;
  tempCtx.drawImage(houseImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  houseImage = new Image();
  houseImage.src = tempCanvas.toDataURL();
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

// Load the shop/outpost image
const shopImageRaw = new Image();
shopImageRaw.src = './orions_outpost.png';
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

// Load seed packet images
const seedPacketImages = [new Image(), new Image(), new Image(), new Image()];
seedPacketImages[0].src = './star-parsnip_seeds.png';
seedPacketImages[1].src = './Glass_pods_seeds.png';
seedPacketImages[2].src = './cratertatos_seeds.png';
seedPacketImages[3].src = './nova_berries_seeds.png';
// Re-render hotbar once seed images load so they appear instead of fallback dots
seedPacketImages.forEach(img => { img.onload = () => { if (typeof updateUI === 'function') updateUI(); }; });

// Load tool images
const laserHoeImage = new Image();
laserHoeImage.src = './laser_hoe.png';
laserHoeImage.onload = () => { if (typeof updateUI === 'function') updateUI(); };

const playerActionsSheet = new Image();
playerActionsSheet.src = './laser_hoe_spritesheet2.png';

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
  { name: 'Star-Parsnip Seeds', color: '#f5d76e', bloomColor: '#fffbe6', cropName: 'Star-Parsnip', totalGrowthDays: 4, compatibleSeasons: [0, 1] },
  { name: 'Glass-Pods Seeds', color: '#7ec8a8', bloomColor: '#b8f0d8', cropName: 'Glass-Pods', totalGrowthDays: 6, compatibleSeasons: [0, 2] },
  { name: 'Cratertatoes Seeds', color: '#8a8a8a', bloomColor: '#b0b0b0', cropName: 'Cratertatoes', totalGrowthDays: 3, compatibleSeasons: [0, 1, 2, 3] },
  { name: 'Nova-Berries Seeds', color: '#4a6fa5', bloomColor: '#6e9eef', cropName: 'Nova-Berries', totalGrowthDays: 8, compatibleSeasons: [2, 3] }
];

let selectedSlotIndex = 0;

function selectSlot(index) {
  selectedSlotIndex = index;
  updateUI();
}

// Click listener for hotbar slots will be handled by dynamic generation

// Game state
let currentMap = 'farm'; // 'farm' or 'town'

// Season / Calendar System
const SEASONS = [
  { name: 'Solar Flare', icon: '☀️', color: '#ff9800', glowColor: 'rgba(255, 152, 0, 0.4)' },
  { name: 'Binary Heat', icon: '🔥', color: '#f44336', glowColor: 'rgba(244, 67, 54, 0.4)' },
  { name: 'Gravity Sink', icon: '�', color: '#9c27b0', glowColor: 'rgba(156, 39, 176, 0.4)' },
  { name: 'Void Cycle', icon: '🌑', color: '#29b6f6', glowColor: 'rgba(41, 182, 246, 0.4)' },
];
const DAYS_PER_SEASON = 28;
const DAY_LENGTH_SECONDS = 90; // ~90 seconds real time = 1 game day
const HOURS_PER_DAY = 20; // Game runs from 6:00 AM to 2:00 AM (20 hours)
const START_HOUR = 6; // Day starts at 6 AM

// Global calendar state — accessible by crop scripts via window.currentDay etc.
let currentDay = 1;
let currentSeason = 0;
let currentYear = 1;
let currentHour = START_HOUR;
let currentMinute = 0;
let dayTimer = 0;

// Expose globally for other scripts
window.currentDay = currentDay;
window.currentSeason = currentSeason;
window.currentYear = currentYear;
window.currentHour = currentHour;
window.currentMinute = currentMinute;
window.SEASONS = SEASONS;

function syncGlobals() {
  window.currentDay = currentDay;
  window.currentSeason = currentSeason;
  window.currentYear = currentYear;
  window.currentHour = currentHour;
  window.currentMinute = currentMinute;
}

function advanceDay() {
  currentDay++;
  if (currentDay > DAYS_PER_SEASON) {
    currentDay = 1;
    currentSeason++;
    if (currentSeason >= SEASONS.length) {
      currentSeason = 0;
      currentYear++;
    }
  }
  currentHour = START_HOUR;
  currentMinute = 0;
  syncGlobals();
  onNewDay(); // Process crop growth at dawn
  updateCalendarUI();
}

// Called every morning — processes crop growth, watering, and season checks
function onNewDay() {
  for (const key in farmData) {
    const plot = farmData[key];
    if (!plot || plot.state === 'hoed' || plot.state === 'ready') continue;

    if (plot.state === 'withered') continue; // Withered crops stay dead

    if (plot.state === 'planted') {
      const seedType = SEED_TYPES[plot.seedIndex];

      // Season check — wither if wrong season
      if (!seedType.compatibleSeasons.includes(currentSeason)) {
        plot.state = 'withered';
        plot.withered = true;
        continue;
      }

      // Growth check — only grow if watered
      if (plot.isWatered) {
        plot.growthDays++;
        // Recalculate growth stage (0-4)
        const progress = plot.growthDays / seedType.totalGrowthDays;
        plot.currentGrowthStage = Math.min(4, Math.floor(progress * 5));

        // Ready to harvest at stage 4
        if (plot.growthDays >= seedType.totalGrowthDays) {
          plot.state = 'ready';
          plot.currentGrowthStage = 4;
        }
      }

      // Reset watering for the new day
      plot.isWatered = false;
    }
  }
}

function updateGameTime(dt) {
  dayTimer += dt;

  // Calculate how many game-seconds per real-second
  const gameSecondsPerRealSecond = (HOURS_PER_DAY * 60) / DAY_LENGTH_SECONDS;
  const gameMinutesElapsed = dt * gameSecondsPerRealSecond;

  currentMinute += gameMinutesElapsed;
  while (currentMinute >= 60) {
    currentMinute -= 60;
    currentHour++;
  }

  // Check if the day is over
  if (dayTimer >= DAY_LENGTH_SECONDS) {
    dayTimer -= DAY_LENGTH_SECONDS;
    advanceDay();
  }

  syncGlobals();
}

function formatGameTime(hour, minute) {
  const h = Math.floor(hour);
  const m = Math.floor(minute);
  const period = h >= 12 && h < 24 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
}

function updateCalendarUI() {
  const season = SEASONS[currentSeason];
  const iconEl = document.getElementById('season-icon');
  const nameEl = document.getElementById('season-name');
  const dayEl = document.getElementById('day-display');
  const timeEl = document.getElementById('time-display');
  const yearEl = document.getElementById('year-display');
  const hudEl = document.getElementById('calendar-hud');

  if (!iconEl) return;

  iconEl.textContent = season.icon;
  nameEl.textContent = season.name;
  nameEl.style.color = season.color;
  nameEl.style.textShadow = `0 0 8px ${season.glowColor}`;
  dayEl.textContent = `Day ${currentDay}`;
  timeEl.textContent = formatGameTime(currentHour, currentMinute);
  yearEl.textContent = `Year ${currentYear}`;
  hudEl.style.borderColor = `${season.color}33`;
  hudEl.style.boxShadow = `0 4px 20px rgba(0,0,0,0.5), 0 0 15px ${season.glowColor}`;
}

// Initialize calendar on load
document.addEventListener('DOMContentLoaded', updateCalendarUI);

const player = {
  x: ROCK_WIDTH / 2,
  y: ROCK_HEIGHT / 2,
  size: 32,
  speed: 250,
  color: '#58a6ff',
  dirX: 0,
  dirY: 1,
  action: null, // 'hoeing' | 'harvesting'
  actionTimer: 0,
};

const inventory = {
  slots: [
    { type: 'tool', id: 'laser_hoe' },
    { type: 'seed', id: 0, count: 5 },
    { type: 'seed', id: 1, count: 5 },
    { type: 'seed', id: 2, count: 5 },
    { type: 'seed', id: 3, count: 5 },
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
  { id: 0, name: 'Star-Parsnip Seeds', desc: 'A glowing white root. Classic and reliable.', price: 10, color: '#f5d76e' },
  { id: 1, name: 'Glass-Pods Seeds', desc: 'Transparent beans with visible liquid sap inside.', price: 15, color: '#7ec8a8' },
  { id: 2, name: 'Cratertatoes Seeds', desc: 'Lumpy tubers that look like tiny moon rocks. Fast grower!', price: 12, color: '#8a8a8a' },
  { id: 3, name: 'Nova-Berries Seeds', desc: 'Rare blue berries that pulse with starlight. Worth the wait!', price: 20, color: '#4a6fa5' },
];

const CROP_SELL_PRICES = [25, 35, 30, 45]; // Sell price per crop type (index = seed id)

// Shop tools
const SHOP_TOOLS = [
  { id: 'laser_hoe', name: 'Laser Hoe', desc: 'Plasma-edged tiller. Cuts through alien soil like butter!', price: 50, icon: '⛏️' },
];

const SHOPKEEPER_MESSAGES = [
  '✨ Welcome to Orion\'s Outpost! What\'ll it be today?',
  '🥕 Star-Parsnips are glowing bright this season!',
  '🫘 Glass-Pods — you can see the sap right through \'em!',
  '🪨 Cratertatoes grow fast — great for beginners!',
  '🫐 Nova-Berries take patience, but they\'re worth every Stardust!',
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
    const imgSrc = seedPacketImages[seed.id] && seedPacketImages[seed.id].complete ? seedPacketImages[seed.id].src : '';
    const imgHtml = imgSrc
      ? `<img src="${imgSrc}" style="width:48px;height:auto;border-radius:6px;image-rendering:pixelated;" />`
      : `<div class="item-gem" style="background:${seed.color}; box-shadow:0 0 14px ${seed.color}"></div>`;
    div.innerHTML = `
      ${imgHtml}
      <div class="shop-item-info">
        <p class="item-name">${seed.name}</p>
        <p class="item-desc">${seed.desc}</p>
      </div>
      <span class="item-price">🌙 ${seed.price}</span>
      <button class="shop-btn buy-btn" ${canAfford ? '' : 'disabled'} onclick="buySeed(${seed.id})">Buy</button>
    `;
    container.appendChild(div);
  });

  // Add tools section
  if (SHOP_TOOLS.length > 0) {
    const toolHeader = document.createElement('div');
    toolHeader.style.cssText = 'padding: 8px 0 4px; color: #8b949e; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 8px;';
    toolHeader.textContent = '🔧 TOOLS';
    container.appendChild(toolHeader);

    SHOP_TOOLS.forEach(tool => {
      const canAfford = playerGold >= tool.price;
      const alreadyOwned = inventory.slots.some(s => s.type === 'tool' && s.id === tool.id);
      const toolImgHtml = (tool.id === 'laser_hoe' && laserHoeImage.complete)
        ? `<img src="${laserHoeImage.src}" style="width:48px;height:auto;border-radius:6px;image-rendering:pixelated;" />`
        : `<div class="item-gem" style="background:#7c8aff; box-shadow:0 0 14px #7c8aff"></div>`;
      const div = document.createElement('div');
      div.className = 'shop-item';
      div.innerHTML = `
        ${toolImgHtml}
        <div class="shop-item-info">
          <p class="item-name">${tool.name}</p>
          <p class="item-desc">${tool.desc}</p>
        </div>
        <span class="item-price">🌙 ${tool.price}</span>
        <button class="shop-btn buy-btn" ${canAfford && !alreadyOwned ? '' : 'disabled'} onclick="buyTool('${tool.id}')">${alreadyOwned ? 'Owned' : 'Buy'}</button>
      `;
      container.appendChild(div);
    });
  }
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

function buyTool(toolId) {
  const tool = SHOP_TOOLS.find(t => t.id === toolId);
  if (!tool || playerGold < tool.price) return;
  // Check if already owned
  if (inventory.slots.some(s => s.type === 'tool' && s.id === toolId)) return;
  playerGold -= tool.price;
  addItemToInventory('tool', toolId, tool.name);
  document.getElementById('player-gold').textContent = playerGold + ' Stardust';
  renderShopBuyTab();
  document.getElementById('shopkeeper-msg').textContent = `⚒️ Here's your ${tool.name}! Happy tilling!`;
}
window.buyTool = buyTool;

function addItemToInventory(type, id, name) {
  // Tools don't stack — check if already owned
  if (type === 'tool') {
    if (inventory.slots.some(s => s.type === 'tool' && s.id === id)) return;
    const emptyIndex = inventory.slots.findIndex(s => s.type === 'empty');
    if (emptyIndex !== -1) {
      inventory.slots[emptyIndex] = { type: 'tool', id, name };
    }
    updateUI();
    return;
  }
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

const hatchery = {
  x: ROCK_WIDTH - 160 - TILE_SIZE * 2,
  y: TILE_SIZE * 1,
  width: 160,
  height: 160,
  collider: {
    x: ROCK_WIDTH - 160 - TILE_SIZE * 2 + 20,
    y: TILE_SIZE * 1 + 60,
    w: 120,
    h: 90
  }
};

const house = {
  x: TILE_SIZE * 2,
  y: TILE_SIZE * 1,
  width: 160,
  height: 160,
  collider: {
    x: TILE_SIZE * 2 + 15,
    y: TILE_SIZE * 1 + 70,
    w: 130,
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
  state: 'idle', // 'idle', 'walking', or 'petted'
  size: 48,
  dirX: -1,
  petTimer: 0, // how long the unicorn stays still after being petted
};

// Heart particles that float up when unicorn is petted
const heartParticles = [];

function spawnHeart(x, y) {
  heartParticles.push({
    x: x + (Math.random() - 0.5) * 16,
    y: y - 20,
    vy: -40 - Math.random() * 20,
    vx: (Math.random() - 0.5) * 30,
    life: 1.0, // fades from 1 to 0
    scale: 0.5 + Math.random() * 0.5,
    rotation: (Math.random() - 0.5) * 0.3,
  });
}

function drawPixelHeart(cx, cy, size, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  // Pixel heart shape using small rects (8x7 pixel grid scaled up)
  const s = size / 8; // size of each "pixel" in the heart
  const pixels = [
    // Row 0 (top)
    [1, 0], [2, 0], [5, 0], [6, 0],
    // Row 1
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    // Row 2
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
    // Row 3
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    // Row 4
    [2, 4], [3, 4], [4, 4], [5, 4],
    // Row 5
    [3, 5], [4, 5],
  ];
  // Center the heart
  const offsetX = -4 * s;
  const offsetY = -3 * s;
  pixels.forEach(([px, py]) => {
    ctx.fillRect(cx + offsetX + px * s, cy + offsetY + py * s, s, s);
  });
  // Add a highlight pixel for shine effect
  ctx.fillStyle = 'rgba(255, 255, 255, ' + (alpha * 0.6) + ')';
  ctx.fillRect(cx + offsetX + 1 * s, cy + offsetY + 1 * s, s, s);
  ctx.fillRect(cx + offsetX + 5 * s, cy + offsetY + 0 * s, s, s);
  ctx.restore();
}

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
  // Advance game clock (hours, minutes, day transitions)
  updateGameTime(dt);
  // Refresh HUD clock display ~4x per second (every 15 frames)
  if (Math.floor(dayTimer * 4) !== Math.floor((dayTimer - dt) * 4)) {
    updateCalendarUI();
  }

  // Move stars slowly to simulate space floating
  stars.forEach(s => {
    s.y += s.speedY * dt * 60;
    if (s.y > 2000) s.y = -2000;
  });
  planets.forEach(p => {
    p.y += p.speedY * dt * 60;
    if (p.y > 2000) p.y = -2000;
  });

  // Handle action animations
  if (player.actionTimer > 0) {
    player.actionTimer -= dt;
    if (player.actionTimer <= 0) {
      player.actionTimer = 0;
      player.action = null;
    }
  }

  // --- Map boundaries constraints ---
  const mapLeft = (canvas.width - ROCK_WIDTH) / 2;
  const mapRight = mapLeft + ROCK_WIDTH;
  const mapTop = (canvas.height - ROCK_HEIGHT) / 2;
  const mapBottom = mapTop + ROCK_HEIGHT;

  // Move player (only if not doing an action animation)
  let newX = player.x;
  let newY = player.y;

  if (player.actionTimer <= 0) {
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

    newX = player.x + vx * player.speed * dt;
    newY = player.y + vy * player.speed * dt;
  }

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
    const hc = hatchery.collider;
    if (newX > hc.x && newX < hc.x + hc.w && newY > hc.y && newY < hc.y + hc.h) {
      newX = player.x;
      newY = player.y;
    }
    const hsc = house.collider;
    if (newX > hsc.x && newX < hsc.x + hsc.w && newY > hsc.y && newY < hsc.y + hsc.h) {
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

  // (Crop growth is now day-based — see onNewDay())

  // Unicorn Wandering Logic (Only on farm)
  if (currentMap === 'farm') {
    // Handle petted state — unicorn stays still for a bit
    if (unicorn.state === 'petted') {
      unicorn.petTimer -= dt;
      unicorn.vx = 0;
      unicorn.vy = 0;
      if (unicorn.petTimer <= 0) {
        unicorn.state = 'idle';
        unicorn.timer = 1 + Math.random() * 2;
      }
    } else {
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

  // Update heart particles
  for (let i = heartParticles.length - 1; i >= 0; i--) {
    const h = heartParticles[i];
    h.y += h.vy * dt;
    h.x += h.vx * dt;
    h.vy *= 0.98; // slow down gently
    h.vx *= 0.96;
    h.life -= dt * 0.8; // fade over ~1.25 seconds
    if (h.life <= 0) {
      heartParticles.splice(i, 1);
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
      if (currentMap === 'farm' && selectedSlot.type === 'tool' && selectedSlot.id === 'laser_hoe') {
        farmData[key] = { state: 'hoed' };
        player.action = 'hoeing';
        player.actionTimer = 0.4;
      }
    } else if (plot.state === 'hoed' && selectedSlot.type === 'seed' && selectedSlot.count > 0) {
      // Plant a seed
      const seedId = selectedSlot.id;
      selectedSlot.count--;
      if (selectedSlot.count <= 0) {
        inventory.slots[selectedSlotIndex] = { type: 'empty' };
      }
      farmData[key] = {
        state: 'planted',
        seedIndex: seedId,
        growthDays: 0,
        currentGrowthStage: 0,
        isWatered: false,
        withered: false
      };
      player.action = 'hoeing'; // Planting uses the same animation
      player.actionTimer = 0.3;
      updateUI();
    } else if (plot.state === 'planted' && !plot.isWatered) {
      // Water a planted crop
      plot.isWatered = true;
      player.action = 'hoeing'; // Watering uses the same animation
      player.actionTimer = 0.3;
    } else if (plot.state === 'ready') {
      // Harvest
      const cropId = plot.seedIndex;
      const seedInfo = SEED_TYPES[cropId];
      addItemToInventory('crop', cropId, seedInfo.cropName);
      delete farmData[key];
      player.action = 'harvesting';
      player.actionTimer = 0.4;
      updateUI();
    } else if (plot.state === 'withered') {
      // Clear withered crop
      delete farmData[key];
      player.action = 'hoeing';
      player.actionTimer = 0.3;
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
        const seedImg = seedPacketImages[slot.id];
        if (seedImg && seedImg.complete) {
          icon.innerHTML = `<img src="${seedImg.src}" style="width:32px;height:auto;image-rendering:pixelated;" />`;
        } else {
          const seedInfo = SEED_TYPES[slot.id];
          icon.innerHTML = `<div class="icon-seed" style="background: ${seedInfo.color}; box-shadow: 0 0 10px ${seedInfo.color}"></div>`;
        }
      } else if (slot.type === 'crop') {
        const seedInfo = SEED_TYPES[slot.id];
        icon.innerHTML = `<div class="icon-crop" style="background: ${seedInfo.bloomColor}; box-shadow: 0 0 10px ${seedInfo.bloomColor}"></div>`;
      } else if (slot.type === 'tool') {
        if (slot.id === 'laser_hoe' && laserHoeImage.complete) {
          icon.innerHTML = `<img src="${laserHoeImage.src}" style="width:36px;height:auto;image-rendering:pixelated;" />`;
        } else {
          icon.innerHTML = `<div style="font-size:20px;">⛏️</div>`;
        }
      }

      slotEl.appendChild(icon);

      if (slot.count !== undefined) {
        const count = document.createElement('span');
        count.className = 'item-count';
        count.innerText = slot.count;
        slotEl.appendChild(count);
      }
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
    // Draw Cryo Hatchery
    if (hatcheryImage && hatcheryImage.complete) {
      ctx.drawImage(hatcheryImage, hatchery.x, hatchery.y, hatchery.width, hatchery.height);
    }

    // Draw House
    if (houseImage && houseImage.complete) {
      ctx.drawImage(houseImage, house.x, house.y, house.width, house.height);
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
          const cx = tx + TILE_SIZE / 2;
          const cy = ty + TILE_SIZE / 2;

          if (plot.state === 'hoed') {
            ctx.fillStyle = 'rgba(101, 75, 56, 0.85)';
            ctx.fillRect(tx + 4, ty + 4, TILE_SIZE - 8, TILE_SIZE - 8);

          } else if (plot.state === 'withered') {
            // Withered crop — dark brown soil + gray dead plant
            ctx.fillStyle = 'rgba(80, 55, 35, 0.9)';
            ctx.fillRect(tx + 4, ty + 4, TILE_SIZE - 8, TILE_SIZE - 8);
            ctx.fillStyle = '#6b5b4a';
            ctx.beginPath(); ctx.arc(cx, cy + 2, 4, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#5a4a3a';
            ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(cx, cy + 2); ctx.lineTo(cx - 2, cy - 5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx, cy + 2); ctx.lineTo(cx + 3, cy - 4); ctx.stroke();
            // Withered X indicator
            ctx.strokeStyle = 'rgba(255, 80, 80, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(tx + 6, ty + 6); ctx.lineTo(tx + TILE_SIZE - 6, ty + TILE_SIZE - 6); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(tx + TILE_SIZE - 6, ty + 6); ctx.lineTo(tx + 6, ty + TILE_SIZE - 6); ctx.stroke();

          } else if (plot.state === 'planted' || plot.state === 'ready') {
            // Soil — darker if watered
            ctx.fillStyle = plot.isWatered ? 'rgba(60, 45, 30, 0.95)' : 'rgba(101, 75, 56, 0.85)';
            ctx.fillRect(tx + 4, ty + 4, TILE_SIZE - 8, TILE_SIZE - 8);

            // Watered sparkle indicator
            if (plot.isWatered) {
              ctx.fillStyle = 'rgba(100, 180, 255, 0.4)';
              ctx.beginPath(); ctx.arc(tx + 8, ty + 8, 2, 0, Math.PI * 2); ctx.fill();
              ctx.beginPath(); ctx.arc(tx + TILE_SIZE - 8, ty + TILE_SIZE - 10, 1.5, 0, Math.PI * 2); ctx.fill();
            }

            // Stage-based crop rendering
            const stage = plot.currentGrowthStage || 0;
            const type = SEED_TYPES[plot.seedIndex];
            const isReady = plot.state === 'ready';

            if (stage === 0) {
              // Stage 0: Seed — tiny dot
              ctx.fillStyle = type.color;
              ctx.beginPath(); ctx.arc(cx, cy + 3, 2, 0, Math.PI * 2); ctx.fill();

            } else if (stage === 1) {
              // Stage 1: Sprout — small stem + tiny leaf
              ctx.strokeStyle = '#4caf50';
              ctx.lineWidth = 1.5;
              ctx.beginPath(); ctx.moveTo(cx, cy + 6); ctx.lineTo(cx, cy); ctx.stroke();
              ctx.fillStyle = '#66bb6a';
              ctx.beginPath(); ctx.ellipse(cx + 2, cy, 2, 3, 0.3, 0, Math.PI * 2); ctx.fill();

            } else if (stage === 2) {
              // Stage 2: Growing — taller stem + two leaves
              ctx.strokeStyle = '#43a047';
              ctx.lineWidth = 2;
              ctx.beginPath(); ctx.moveTo(cx, cy + 6); ctx.lineTo(cx, cy - 4); ctx.stroke();
              ctx.fillStyle = '#66bb6a';
              ctx.beginPath(); ctx.ellipse(cx - 3, cy - 2, 3, 4, -0.3, 0, Math.PI * 2); ctx.fill();
              ctx.beginPath(); ctx.ellipse(cx + 3, cy - 1, 3, 4, 0.3, 0, Math.PI * 2); ctx.fill();
              // Color hint of crop type
              ctx.fillStyle = type.color + '60';
              ctx.beginPath(); ctx.arc(cx, cy - 5, 2, 0, Math.PI * 2); ctx.fill();

            } else if (stage === 3) {
              // Stage 3: Near-mature — full plant with crop color
              ctx.strokeStyle = '#388e3c';
              ctx.lineWidth = 2.5;
              ctx.beginPath(); ctx.moveTo(cx, cy + 6); ctx.lineTo(cx, cy - 6); ctx.stroke();
              ctx.fillStyle = '#4caf50';
              ctx.beginPath(); ctx.ellipse(cx - 4, cy - 3, 3, 5, -0.3, 0, Math.PI * 2); ctx.fill();
              ctx.beginPath(); ctx.ellipse(cx + 4, cy - 2, 3, 5, 0.3, 0, Math.PI * 2); ctx.fill();
              // Crop bud
              ctx.fillStyle = type.color;
              ctx.shadowBlur = 4;
              ctx.shadowColor = type.color;
              ctx.beginPath(); ctx.arc(cx, cy - 7, 3, 0, Math.PI * 2); ctx.fill();
              ctx.shadowBlur = 0;

            } else if (stage >= 4 || isReady) {
              // Stage 4: Harvest-ready — full crop-specific rendering with glow
              ctx.shadowBlur = 10;
              ctx.shadowColor = type.bloomColor;

              if (plot.seedIndex === 0) {
                // Star-Parsnip: Glowing root
                ctx.fillStyle = '#fffbe6';
                const rw = 5, rh = 10;
                ctx.beginPath();
                ctx.moveTo(cx - rw, cy - rh * 0.2);
                ctx.lineTo(cx + rw, cy - rh * 0.2);
                ctx.lineTo(cx + rw * 0.3, cy + rh * 0.8);
                ctx.lineTo(cx - rw * 0.3, cy + rh * 0.8);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#4caf50';
                ctx.beginPath(); ctx.ellipse(cx - 3, cy - rh * 0.2 - 2, 3, 5, -0.3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(cx + 3, cy - rh * 0.2 - 2, 3, 5, 0.3, 0, Math.PI * 2); ctx.fill();

              } else if (plot.seedIndex === 1) {
                // Glass-Pods: Transparent beans
                ctx.fillStyle = 'rgba(126, 200, 168, 0.7)';
                ctx.beginPath(); ctx.ellipse(cx - 3, cy, 4, 8, -0.2, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(cx + 3, cy, 4, 8, 0.2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = 'rgba(200, 255, 230, 0.8)';
                ctx.beginPath(); ctx.arc(cx - 3, cy - 2, 2, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx + 3, cy + 1, 2, 0, Math.PI * 2); ctx.fill();

              } else if (plot.seedIndex === 2) {
                // Cratertatoes: Moon-rock lumps
                ctx.fillStyle = '#b0b0b0';
                ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx - 4, cy + 3, 3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx + 4, cy - 2, 2.5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = 'rgba(60, 60, 60, 0.3)';
                ctx.beginPath(); ctx.arc(cx - 1, cy - 1, 1.5, 0, Math.PI * 2); ctx.fill();

              } else if (plot.seedIndex === 3) {
                // Nova-Berries: Pulsing blue berries
                const pulse = Math.sin(Date.now() / 500) * 0.3 + 0.7;
                ctx.fillStyle = `rgba(110, 158, 239, ${pulse})`;
                ctx.shadowBlur = 15 * pulse;
                const br = 3.5;
                ctx.beginPath(); ctx.arc(cx, cy - br * 0.5, br, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx - br, cy + br * 0.5, br, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(cx + br, cy + br * 0.5, br, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.4})`;
                ctx.beginPath(); ctx.arc(cx - 1, cy - br * 0.5 - 1, 1.5, 0, Math.PI * 2); ctx.fill();
              }

              ctx.shadowBlur = 0;
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
      const uniBob = unicorn.state === 'petted'
        ? Math.sin(Date.now() / 200) * 2  // gentle happy wiggle when petted
        : Math.sin(Date.now() / 400) * 4;
      const uSize = unicorn.size;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath(); ctx.ellipse(0, 10, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
      ctx.drawImage(unicornImage, -uSize / 2, -uSize / 2 + uniBob, uSize, uSize);
      ctx.restore();
    }

    // Draw heart particles above unicorn
    heartParticles.forEach(h => {
      const heartSize = 14 * h.scale;
      // Hearts use a warm pink/red color
      const heartColor = `rgb(${220 + Math.floor(35 * h.scale)}, ${40 + Math.floor(40 * h.scale)}, ${80 + Math.floor(40 * h.scale)})`;
      drawPixelHeart(h.x, h.y, heartSize, heartColor, Math.max(0, h.life));
    });

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
      ctx.fillText('Orion\'s Outpost', shop.x + 30, shop.y + shop.height / 2);
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

  // Draw Player (Custom Sprite or Animation)
  ctx.save();
  ctx.translate(player.x, player.y);

  // Flip sprite based on movement direction
  const isFacingLeft = player.dirX < 0;
  if (isFacingLeft) {
    ctx.scale(-1, 1);
  }

  if (player.action && playerActionsSheet.complete) {
    // Render animated action from spritesheet (3 cols x 2 rows, ~250x264 each)
    const frameW = playerActionsSheet.width / 3;
    const frameH = playerActionsSheet.height / 2;
    let srcX = 0;
    let srcY = 0;

    if (player.action === 'hoeing') {
      srcX = frameW * 1; // Col 1
      srcY = frameH * 1; // Row 1 (striking down)
    } else if (player.action === 'harvesting') {
      srcX = frameW * 2; // Col 2
      srcY = frameH * 0; // Row 0 (holding parsnip)
    }

    const scale = 0.28; // Tweak to match standard player size
    const drawW = frameW * scale;
    const drawH = frameH * scale;

    ctx.drawImage(
      playerActionsSheet,
      srcX, srcY, frameW, frameH,
      -drawW / 2 + 10, -drawH + 15, drawW, drawH
    );
  } else {
    // Normal Floating Idle/Walk Animation
    const isMoving = keys.w || keys.a || keys.s || keys.d;
    const floatSpeed = isMoving ? 120 : 180;
    const floatAmp = isMoving ? 12 : 6;
    const floatOffset = Math.sin(Date.now() / floatSpeed) * floatAmp;

    ctx.translate(0, floatOffset);
    if (isMoving) {
      ctx.rotate(Math.sin(Date.now() / 200) * 0.05);
    }

    if (playerImage && playerImage.complete) {
      const pSize = 56;
      ctx.drawImage(playerImage, -pSize / 2, -pSize + 10, pSize, pSize);
    } else {
      ctx.fillStyle = '#f15bb5';
      ctx.fillRect(-16, -32, 32, 32);
    }
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

// Click handler — converts screen coords back to map coords
canvas.addEventListener('click', (e) => {
  if (shopOpen) return;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const screenX = (e.clientX - rect.left) * scaleX;
  const screenY = (e.clientY - rect.top) * scaleY;

  // Convert screen → map coords (account for center offset + platform bob)
  const offsetX = (cw - ROCK_WIDTH) / 2;
  const offsetY = (ch - ROCK_HEIGHT) / 2;
  const platformBob = Math.sin(Date.now() / 1500) * 12;
  const mapX = screenX - offsetX;
  const mapY = screenY - offsetY - platformBob;

  // --- Unicorn Interaction (farm only) ---
  if (currentMap === 'farm') {
    const distToUnicorn = Math.hypot(mapX - unicorn.x, mapY - unicorn.y);
    const playerDistToUnicorn = Math.hypot(player.x - unicorn.x, player.y - unicorn.y);

    if (distToUnicorn < unicorn.size && playerDistToUnicorn < 80) {
      // Pet the unicorn! 💖
      unicorn.state = 'petted';
      unicorn.petTimer = 2.5; // stay still for 2.5 seconds
      unicorn.vx = 0;
      unicorn.vy = 0;
      // Face the unicorn toward the player
      unicorn.dirX = player.x < unicorn.x ? -1 : 1;

      // Spawn 3 hearts in a burst
      for (let i = 0; i < 3; i++) {
        setTimeout(() => spawnHeart(unicorn.x, unicorn.y - unicorn.size / 2), i * 150);
      }
      return; // don't process further clicks
    }
  }

  // --- Shop Interaction (town only) ---
  if (currentMap === 'town') {
    if (mapX >= shop.x - 20 && mapX <= shop.x + shop.width + 20 &&
      mapY >= shop.y - 20 && mapY <= shop.y + shop.height + 20) {
      const distToShop = Math.hypot(player.x - (shop.x + shop.width / 2), player.y - (shop.y + shop.height / 2));
      if (distToShop < 240) {
        openShop();
      }
    }
  }
});

// Escape key closes shop
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && shopOpen) closeShop();
});

requestAnimationFrame(loop);
