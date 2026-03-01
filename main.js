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

// Load the town map image
const townMapImage = new Image();
townMapImage.src = './town_map.png';

// Load the player image
const playerImageRaw = new Image();
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
  tempCtx.putImageData(imageData, 0, 0);
  playerImage = new Image();
  playerImage.src = tempCanvas.toDataURL();
};
playerImageRaw.src = './character1.png';

// Load the player spraying image
const playerSprayerImageRaw = new Image();
let playerSprayerImage = null; // Will hold the 'cleaned' version

playerSprayerImageRaw.onload = () => {
  // Create a temporary canvas to strip the white background
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = playerSprayerImageRaw.width;
  tempCanvas.height = playerSprayerImageRaw.height;
  tempCtx.drawImage(playerSprayerImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  // Background removal logic
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const isWhiteBackground = r > 245 && g > 245 && b > 245;
    if (isWhiteBackground) {
      data[i + 3] = 0; // Transparent
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  playerSprayerImage = new Image();
  playerSprayerImage.src = tempCanvas.toDataURL();
};
playerSprayerImageRaw.src = './character1-ion-sprayer.png';

// Load the cryo hatchery image
const hatcheryImageRaw = new Image();
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
hatcheryImageRaw.src = './cyro_hatchery.png';

// Load the house image
const houseImageRaw = new Image();
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
houseImageRaw.src = './house.png';

// Load the house interior image
const houseInteriorImage = new Image();
houseInteriorImage.src = './house_interior.png';

// Load the unicorn image
const unicornImage = new Image();
unicornImage.src = './unicorn-spritesheet.png';

// Load the alien plant image
const plantImageRaw = new Image();
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
plantImageRaw.src = './alien_plant.png';

// Load the shop/outpost image
const shopImageRaw = new Image();
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
shopImageRaw.src = './orions_outpost.png';

// Load the shop/outpost interior image
const outpostInteriorImage = new Image();
outpostInteriorImage.src = './orions_outpost_interior.png';

// Load the oxygen refiner image
const refinerImageRaw = new Image();
let refinerImage = null;

refinerImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = refinerImageRaw.width;
  tempCanvas.height = refinerImageRaw.height;
  tempCtx.drawImage(refinerImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  refinerImage = new Image();
  refinerImage.src = tempCanvas.toDataURL();
};
refinerImageRaw.src = './oxygen-refiner.png';

// Load the Nebula Lounge image
const loungeImageRaw = new Image();
let loungeImage = null;

loungeImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = loungeImageRaw.width;
  tempCanvas.height = loungeImageRaw.height;
  tempCtx.drawImage(loungeImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  // Background removal logic (targets white surroundings)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // Transparent
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  loungeImage = new Image();
  loungeImage.src = tempCanvas.toDataURL();
};
loungeImageRaw.src = './nebula_lounge.png';

// Load the Nebula Lounge Interior
const loungeInteriorImage = new Image();
loungeInteriorImage.src = './interior_nebula_lounge.png';

// Load the Medic Bay image
const medicBayImageRaw = new Image();
let medicBayImage = null;

medicBayImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = medicBayImageRaw.width;
  tempCanvas.height = medicBayImageRaw.height;
  tempCtx.drawImage(medicBayImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  // Background removal (targeting bright white surrounding colors)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0; // Transparent
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  medicBayImage = new Image();
  medicBayImage.src = tempCanvas.toDataURL();
};
medicBayImageRaw.src = './medic_bay_1.png';

// Load Medic Bay interior
const medicBayInteriorImage = new Image();
medicBayInteriorImage.src = './medic-bay-interior1.png';

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
let laserHoeImageLoaded = false;
laserHoeImage.onload = () => {
  laserHoeImageLoaded = true;
  if (typeof updateUI === 'function') updateUI();
};
laserHoeImage.src = './laser_hoe.png';

const playerActionsSheet = new Image();
playerActionsSheet.src = './laser_hoe_spritesheet2.png';

const ionSprayerImageRaw = new Image();
let ionSprayerImage = null;
ionSprayerImageRaw.onload = () => {
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');
  tempCanvas.width = ionSprayerImageRaw.width;
  tempCanvas.height = ionSprayerImageRaw.height;
  tempCtx.drawImage(ionSprayerImageRaw, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
  const data = imageData.data;

  // Cleanup potential artifact backgrounds on the sprayer
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 240 && g > 240 && b > 240) {
      data[i + 3] = 0;
    }
  }

  tempCtx.putImageData(imageData, 0, 0);
  ionSprayerImage = new Image();
  ionSprayerImage.onload = () => { if (typeof updateUI === 'function') updateUI(); };
  ionSprayerImage.src = tempCanvas.toDataURL();
};
ionSprayerImageRaw.src = './ion-sprayer.png';

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

// Click Interaction Handler
canvas.addEventListener('click', (e) => {
  if (currentMap !== 'farm') return; // Clicking only supported on farm currently

  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // Reverse engineer the camera translation to find world coordinates
  const cameraOffsetX = cw / 2 - player.x;
  const cameraOffsetY = ch / 2 - player.y;

  // Platform bob offsets (from render loop)
  const platformBob = Math.sin(Date.now() / 1500) * 12;

  // Translated world coordinates
  const worldX = clickX - cameraOffsetX;
  const worldY = clickY - cameraOffsetY - platformBob;

  // Check Refiner Bounds First
  const rc = refiner.collider;
  if (worldX > rc.x && worldX < rc.x + rc.w && worldY > rc.y && worldY < rc.y + rc.h) {
    const selectedSlot = inventory.slots[selectedSlotIndex];
    if (selectedSlot && selectedSlot.type === 'tool' && selectedSlot.id === 'ion_sprayer') {
      onRefill(selectedSlot);
      return;
    }
  }

  // If not refiner, check tile grid
  const col = Math.floor(worldX / TILE_SIZE);
  const row = Math.floor(worldY / TILE_SIZE);

  if (col >= 0 && col < MAP_COLS && row >= 0 && row < MAP_ROWS) {
    // Before acting, ensure the player is actually close enough to the clicked tile
    const playerCol = Math.floor(player.x / TILE_SIZE);
    const playerRow = Math.floor(player.y / TILE_SIZE);

    // Allow interaction if within roughly 2 tiles distance
    if (Math.abs(col - playerCol) <= 2 && Math.abs(row - playerRow) <= 2) {
      // Simulate SPACEBAR interact loop on this specific tile
      handleTileInteraction(col, row);
    }
  }
});

// Extracted tile interaction logic so both Spacebar and Click can use it
function handleTileInteraction(col, row) {
  const key = `${row},${col}`;
  const plot = farmData[key];
  const selectedSlot = inventory.slots[selectedSlotIndex];

  if (!plot) {
    if (currentMap === 'farm' && selectedSlot.type === 'tool' && selectedSlot.id === 'laser_hoe') {
      farmData[key] = { state: 'hoed' };
      player.action = 'hoeing';
      player.actionTimer = 0.4;
      playThud();
    }
  } else if (plot.state === 'hoed' || plot.state === 'withered') {
    if (selectedSlot.type === 'seed' && selectedSlot.count > 0) {
      selectedSlot.count--;
      const seedInfo = SEED_TYPES[selectedSlot.id];
      farmData[key] = {
        state: 'planted',
        seedIndex: selectedSlot.id,
        growthDays: 0,
        currentGrowthStage: 0,
        isWatered: false,
        withered: false,
        cropName: seedInfo.cropName
      };
      player.action = 'hoeing'; // Planting uses the same animation
      player.actionTimer = 0.3;
      updateUI();
      playRustle();
    }
  } else if (plot.state === 'planted' && !plot.isWatered) {
    if (selectedSlot.type === 'tool' && selectedSlot.id === 'ion_sprayer') {
      if (selectedSlot.fuelLevel >= 10) {
        selectedSlot.fuelLevel -= 10;
        plot.isWatered = true;
        player.action = 'spraying';
        player.actionTimer = 0.4;
        updateUI();
        playSound(400, 0.1, 'sine');
      } else {
        playSound(150, 0.1, 'square');
      }
    }
  } else if (plot.state === 'ready') {
    let harvestedCount = 1;
    if (Math.random() < 0.2) harvestedCount = 2;

    const itemName = plot.cropName;
    const existingStack = inventory.slots.find(s => s.type === 'crop' && s.name === itemName);

    if (existingStack) {
      existingStack.count += harvestedCount;
    } else {
      const emptySlotIndex = inventory.slots.findIndex(s => s.type === 'empty');
      if (emptySlotIndex !== -1) {
        inventory.slots[emptySlotIndex] = { type: 'crop', name: itemName, count: harvestedCount };
      } else {
        return; // Inventory full
      }
    }

    farmData[key] = { state: 'hoed' };
    player.action = 'harvesting';
    player.actionTimer = 0.4;
    updateUI();
    playSound(800, 0.1, 'triangle');
    setTimeout(() => playSound(1000, 0.1, 'triangle'), 100);
  } else if (plot.state === 'planted' && plot.isWatered && selectedSlot.type === 'tool' && selectedSlot.id === 'laser_hoe') {
    farmData[key] = { state: 'hoed' };
    player.action = 'hoeing';
    player.actionTimer = 0.3;
    playThud();
  }
}

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
let currentMap = 'farm'; // 'farm', 'town', 'lounge_interior'
let transitionAlpha = 0; // For fade to black effect
let isTransitioning = false;

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
    { type: 'tool', id: 'laser_hoe', name: 'Laser Hoe' },
    { type: 'tool', id: 'ion_sprayer', name: 'Ion-Sprayer', fuelLevel: 0, maxFuel: 50 },
    { type: 'seed', id: 0, count: 5 },
    { type: 'seed', id: 1, count: 5 },
    { type: 'seed', id: 2, count: 5 },
    { type: 'seed', id: 3, count: 5 },
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

const MEDIC_BAY_ITEMS = [
  { id: 'bio_gel', type: 'consumable', name: 'Bio-Gel', desc: 'Basic health potion (recovers 50 HP).', price: 20, color: '#00ff00', icon: '💉' },
  { id: 'adrenaline', type: 'consumable', name: 'Adrenaline Shots', desc: 'Temporary speed boost for faster harvesting.', price: 50, color: '#ff0000', icon: '⚡' },
  { id: 'oxygen_tank', type: 'upgrade', name: 'Oxygen Tanks', desc: 'Increases the player\'s time limit when exploring non-oxygenated areas.', price: 150, color: '#00ccff', icon: '🤿' },
  { id: 'vitamins', type: 'upgrade', name: 'Vitamins', desc: 'Increases max stamina permanently.', price: 500, color: '#ffa500', icon: '💊' }
];

const MEDIC_BAY_MESSAGES = [
  '🩺 How are your vitals today, farmer?',
  '💉 Need a quick boost? We have bio-gel in stock.',
  '💊 Don\'t forget your daily vitamins!',
];

let shopOpen = false;
let shopTab = 'buy';
let currentShopId = 'outpost';

window.playerUpgrades = window.playerUpgrades || [];

function openShop(shopId = 'outpost') {
  shopOpen = true;
  currentShopId = shopId;
  const overlay = document.getElementById('shop-overlay');
  overlay.classList.remove('hidden');

  const headerText = document.querySelector('#shop-header h2');
  const shopkeeperImg = document.getElementById('shopkeeper-img');
  const shopkeeperMsg = document.getElementById('shopkeeper-msg');
  const tabSell = document.getElementById('tab-sell');

  if (shopId === 'outpost') {
    headerText.textContent = "🛸 Orion's Outpost";
    shopkeeperImg.src = "./shopkeeper.png";
    shopkeeperMsg.textContent = SHOPKEEPER_MESSAGES[Math.floor(Math.random() * SHOPKEEPER_MESSAGES.length)];
    tabSell.style.display = 'inline-block';
  } else if (shopId === 'medicbay') {
    headerText.textContent = "🏥 Medic Bay";
    shopkeeperImg.src = "./medic-bay-character.png";
    shopkeeperMsg.textContent = MEDIC_BAY_MESSAGES[Math.floor(Math.random() * MEDIC_BAY_MESSAGES.length)];
    tabSell.style.display = 'none';
  }

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

  if (currentShopId === 'outpost') {
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
  } else if (currentShopId === 'medicbay') {
    MEDIC_BAY_ITEMS.forEach(item => {
      const canAfford = playerGold >= item.price;
      const alreadyOwned = item.type === 'upgrade' && window.playerUpgrades.includes(item.id);
      const div = document.createElement('div');
      div.className = 'shop-item';
      div.innerHTML = `
        <div class="item-gem" style="background:${item.color}; box-shadow:0 0 14px ${item.color}; display: flex; align-items: center; justify-content: center; font-size: 24px;">${item.icon}</div>
        <div class="shop-item-info">
          <p class="item-name">${item.name}</p>
          <p class="item-desc">${item.desc}</p>
        </div>
        <span class="item-price">🌙 ${item.price}</span>
        <button class="shop-btn buy-btn" ${canAfford && !alreadyOwned ? '' : 'disabled'} onclick="buyMedicItem('${item.id}')">${alreadyOwned ? 'Owned' : 'Buy'}</button>
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

window.closeShop = closeShop;
window.switchTab = switchTab;
window.buySeed = buySeed;
window.sellCrop = sellCrop;

function buyMedicItem(itemId) {
  const item = MEDIC_BAY_ITEMS.find(i => i.id === itemId);
  if (!item || playerGold < item.price) return;

  if (item.type === 'upgrade') {
    if (window.playerUpgrades.includes(item.id)) return;
    window.playerUpgrades.push(item.id);
    playerGold -= item.price;
  } else {
    playerGold -= item.price;
    addItemToInventory(item.type, item.id, item.name);
  }

  document.getElementById('player-gold').textContent = playerGold + ' Stardust';
  renderShopBuyTab();
  const shopkeeperMsg = document.getElementById('shopkeeper-msg');
  shopkeeperMsg.textContent = `💉 Here's your ${item.name}. Stay healthy!`;
}
window.buyMedicItem = buyMedicItem;

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

const refiner = {
  // Bottom-left corner placement
  x: TILE_SIZE * 2,
  y: ROCK_HEIGHT - 160 - TILE_SIZE,
  width: 120, // Assuming a medium size based on the sprite
  height: 160,
  collider: {
    x: TILE_SIZE * 2 + 15,
    y: ROCK_HEIGHT - 160 - TILE_SIZE + 60,
    w: 90,
    h: 90
  },
  currentStorage: 0,
  maxStorage: 100
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
  frame: 0,
  frameTimer: 0
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

function startTransition(targetMap, onMidpoint) {
  if (isTransitioning) return;
  isTransitioning = true;

  // Fade out
  let startTime = Date.now();
  const duration = 500; // ms to black

  function fadeOut() {
    const now = Date.now();
    const progress = (now - startTime) / duration;
    if (progress >= 1) {
      transitionAlpha = 1;
      currentMap = targetMap;
      if (onMidpoint) onMidpoint();

      // Setup fade in
      startTime = Date.now();
      requestAnimationFrame(fadeIn);
    } else {
      transitionAlpha = progress;
      requestAnimationFrame(fadeOut);
    }
  }

  function fadeIn() {
    const now = Date.now();
    const progress = (now - startTime) / duration;
    if (progress >= 1) {
      transitionAlpha = 0;
      isTransitioning = false;
    } else {
      transitionAlpha = 1 - progress;
      requestAnimationFrame(fadeIn);
    }
  }

  fadeOut();
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

const lounge = {
  x: 100,
  y: TILE_SIZE * 2,
  width: 140,
  height: 110,
  collider: {
    x: 100 + 10,
    y: TILE_SIZE * 2 + 50,
    w: 120,
    h: 50
  }
};

const shop = {
  x: 260,
  y: TILE_SIZE * 2,
  width: 120,
  height: 120,
  collider: {
    x: 260 + 10,
    y: TILE_SIZE * 2 + 50,
    w: 100,
    h: 50
  }
};

const medicBay = {
  x: 400,
  y: TILE_SIZE * 2,
  width: 140,
  height: 110,
  collider: {
    x: 400 + 10,
    y: TILE_SIZE * 2 + 50,
    w: 120,
    h: 50
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

  // Slowly regenerate Oxygen Refiner storage (approx 5 charges per hour)
  if (refiner.currentStorage < refiner.maxStorage) {
    refiner.currentStorage = Math.min(refiner.maxStorage, refiner.currentStorage + dt * 0.1);
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
  if (!isTransitioning) {
    if (currentMap === 'farm' && newX > ROCK_WIDTH - transitionPadding / 2) {
      currentMap = 'town';
      newX = transitionPadding / 2;
      transitioned = true;
    } else if (currentMap === 'town' && newX < transitionPadding / 2) {
      currentMap = 'farm';
      newX = ROCK_WIDTH - transitionPadding / 2;
      transitioned = true;
    } else if (currentMap === 'lounge_interior' && newY > ROCK_HEIGHT - transitionPadding / 2) {
      // Exit lounge back to town
      startTransition('town', () => {
        player.x = lounge.x + lounge.width / 2;
        player.y = lounge.y + lounge.height + 10;
        playPneumaticDoor();
      });
      transitioned = true;
    } else if (currentMap === 'outpost_interior' && newY > ROCK_HEIGHT - transitionPadding / 2) {
      // Exit outpost back to town
      startTransition('town', () => {
        player.x = shop.x + shop.width / 2;
        player.y = shop.y + shop.height + 10;
        playSound(300, 0.2, 'square'); // simple door sound
      });
      transitioned = true;
    } else if (currentMap === 'medicbay_interior' && newY > ROCK_HEIGHT - transitionPadding / 2) {
      // Exit medic bay back to town
      startTransition('town', () => {
        player.x = medicBay.x + medicBay.width / 2;
        player.y = medicBay.y + medicBay.height + 10;
        playSound(300, 0.2, 'square'); // simple door sound
      });
      transitioned = true;
    } else if (currentMap === 'house_interior' && newY > ROCK_HEIGHT - transitionPadding / 2) {
      // Exit house back to farm
      startTransition('farm', () => {
        player.x = house.x + house.width / 2;
        player.y = house.y + house.height + 10;
        playSound(300, 0.2, 'square'); // simple door sound
      });
      transitioned = true;
    }
  }

  // Collision with buildings based on current map
  if (!isTransitioning && currentMap === 'farm') {
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
    const rc = refiner.collider;
    if (newX > rc.x && newX < rc.x + rc.w && newY > rc.y && newY < rc.y + rc.h) {
      newX = player.x;
      newY = player.y;
    }
  } else if (!isTransitioning && currentMap === 'town') {
    const sc = shop.collider;
    if (newX > sc.x && newX < sc.x + sc.w && newY > sc.y && newY < sc.y + sc.h) {
      newX = player.x;
      newY = player.y;
    }
    const lc = lounge.collider;
    if (newX > lc.x && newX < lc.x + lc.w && newY > lc.y && newY < lc.y + lc.h) {
      newX = player.x;
      newY = player.y;
    }
    const mc = medicBay.collider;
    if (newX > mc.x && newX < mc.x + mc.w && newY > mc.y && newY < mc.y + mc.h) {
      newX = player.x;
      newY = player.y;
    }
  } else if (!isTransitioning && currentMap === 'lounge_interior') {
    // Basic wall bounds for interior (assume rock bounds for now)
    // The player should not go higher than the counter
    if (newY < 120) newY = player.y;
  } else if (!isTransitioning && currentMap === 'outpost_interior') {
    // Basic wall bounds for interior counter
    if (newY < 180) newY = player.y;
  } else if (!isTransitioning && currentMap === 'medicbay_interior') {
    // Basic wall bounds for medic bay
    if (newY < 120) newY = player.y;
  } else if (!isTransitioning && currentMap === 'house_interior') {
    // Basic wall bounds for house interior
    if (newY < 140) newY = player.y;
  }

  // Only clamp to rock bounds if we didn't just transition (avoids teleport reversal)
  if (!transitioned && !isTransitioning) {
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
      unicorn.frame = 0;
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
          unicorn.frame = 0;
          unicorn.vx = 0;
          unicorn.vy = 0;
          unicorn.timer = 2 + Math.random() * 2;
        }
      }

      if (unicorn.state === 'walking') {
        let nextUnicornX = unicorn.x + unicorn.vx * dt;
        let nextUnicornY = unicorn.y + unicorn.vy * dt;

        unicorn.frameTimer += dt;
        if (unicorn.frameTimer > 0.15) {
          unicorn.frame = (unicorn.frame + 1) % 3; // 3 frames of animation
          unicorn.frameTimer = 0;
        }

        // Building collision
        let collided = false;
        if (hatchery) {
          const hc = hatchery.collider;
          if (nextUnicornX > hc.x && nextUnicornX < hc.x + hc.w && nextUnicornY > hc.y && nextUnicornY < hc.y + hc.h) collided = true;
        }
        if (house) {
          const hsc = house.collider;
          if (nextUnicornX > hsc.x && nextUnicornX < hsc.x + hsc.w && nextUnicornY > hsc.y && nextUnicornY < hsc.y + hsc.h) collided = true;
        }
        if (refiner) {
          const rc = refiner.collider;
          if (nextUnicornX > rc.x && nextUnicornX < rc.x + rc.w && nextUnicornY > rc.y && nextUnicornY < rc.y + rc.h) collided = true;
        }

        if (collided) {
          unicorn.state = 'idle';
          unicorn.frame = 0;
          unicorn.vx = 0;
          unicorn.vy = 0;
          unicorn.timer = 1;
        }

        // Bounds check for unicorn
        const uPadding = unicorn.size / 2;
        if (nextUnicornX < uPadding || nextUnicornX > ROCK_WIDTH - uPadding ||
          nextUnicornY < uPadding || nextUnicornY > ROCK_HEIGHT - uPadding) {
          unicorn.state = 'idle';
          unicorn.frame = 0;
          unicorn.vx = 0;
          unicorn.vy = 0;
          unicorn.timer = 1;
        } else if (!collided) {
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

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(freq, duration, type = 'sine') {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  // Volume envelope
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playThud(duration = 0.15) {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  // The 'thud' component
  const osc = audioCtx.createOscillator();
  const oscGain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

  oscGain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(oscGain);
  oscGain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);

  // The 'crunch' dirt component
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, audioCtx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + duration);

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);

  noise.start();
}

function playRustle(duration = 0.1) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1500, audioCtx.currentTime);
  filter.Q.value = 1.0;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(0.8, audioCtx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(audioCtx.destination);

  noise.start();
}

function playPneumaticDoor(duration = 0.6) {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const bufferSize = audioCtx.sampleRate * duration;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1; // White noise
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  // Pass noise through a highpass filter to give it that "ssshhh" air lock sound
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1000, audioCtx.currentTime);
  filter.frequency.linearRampToValueAtTime(3000, audioCtx.currentTime + duration); // Sweep the filter up

  // Shape the volume envelope for a sudden burst that trails off quickly
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.05); // sharp attack
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration); // decay

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  noise.start();
}

function onRefill(sprayerSlot) {
  const needed = sprayerSlot.maxFuel - sprayerSlot.fuelLevel;
  if (needed > 0) {
    // Play ascending arpeggio success sound
    playSound(440, 0.1, 'sine');
    setTimeout(() => playSound(554, 0.1, 'sine'), 100);
    setTimeout(() => playSound(659, 0.2, 'sine'), 200);

    // Instantly max out the Sprayer fuel capacity
    sprayerSlot.fuelLevel = sprayerSlot.maxFuel;

    updateUI();
    player.action = 'spraying';
    player.actionTimer = 0.5;
  } else {
    // Already full sound (soft bump)
    playSound(150, 0.2, 'sawtooth');
  }
}

function interact() {
  const reach = TILE_SIZE * 1.5; // Slightly longer reach to interact with refiner boundaries
  const targetX = player.x + player.dirX * reach;
  const targetY = player.y + player.dirY * reach;

  // Check Interaction against Refiner Structure directly via bounds-collision
  const rc = refiner.collider;
  if (targetX > rc.x && targetX < rc.x + rc.w && targetY > rc.y && targetY < rc.y + rc.h) {
    const selectedSlot = inventory.slots[selectedSlotIndex];
    if (selectedSlot && selectedSlot.type === 'tool' && selectedSlot.id === 'ion_sprayer') {
      onRefill(selectedSlot);
      return; // Stop further grid-based interactions
    }
  }

  // Re-adjust reach for tile grid interaction
  const tileTargetX = player.x + player.dirX * TILE_SIZE * 0.75;
  const tileTargetY = player.y + player.dirY * TILE_SIZE * 0.75;

  const col = Math.floor(tileTargetX / TILE_SIZE);
  const row = Math.floor(tileTargetY / TILE_SIZE);

  if (col >= 0 && col < MAP_COLS && row >= 0 && row < MAP_ROWS) {
    const key = `${row},${col}`;
    const plot = farmData[key];
    const selectedSlot = inventory.slots[selectedSlotIndex];

    if (!plot) {
      if (currentMap === 'farm' && selectedSlot.type === 'tool' && selectedSlot.id === 'laser_hoe') {
        farmData[key] = { state: 'hoed' };
        player.action = 'hoeing';
        player.actionTimer = 0.4;
        playThud();
      }
    } else if (plot.state === 'hoed' || plot.state === 'withered') {
      if (selectedSlot.type === 'seed' && selectedSlot.count > 0) {
        selectedSlot.count--;
        const seedInfo = SEED_TYPES[selectedSlot.id];
        farmData[key] = {
          state: 'planted',
          seedId: selectedSlot.id,
          daysGrown: 0,
          isWatered: false,
          cropName: seedInfo.cropName
        };
        player.action = 'hoeing';
        player.actionTimer = 0.3;
        updateUI();
        playRustle();
      }
    } else if (plot.state === 'planted' && !plot.isWatered) {
      if (selectedSlot.type === 'tool' && selectedSlot.id === 'ion_sprayer') {
        if (selectedSlot.fuelLevel >= 10) {
          selectedSlot.fuelLevel -= 10;
          plot.isWatered = true;
          player.action = 'spraying';
          player.actionTimer = 0.4;
          updateUI();
          playSound(400, 0.1, 'sine');
        } else {
          playSound(150, 0.1, 'square');
        }
      }
    } else if (plot.state === 'ready') {
      let harvestedCount = 1;
      if (Math.random() < 0.2) harvestedCount = 2;

      // Fallback for corrupted old save data
      const fallbackIndex = plot.seedIndex !== undefined ? plot.seedIndex : plot.seedId;
      const itemName = plot.cropName || SEED_TYPES[fallbackIndex].cropName;

      const existingStack = inventory.slots.find(s => s.type === 'crop' && s.name === itemName);

      if (existingStack) {
        existingStack.count += harvestedCount;
      } else {
        const emptySlotIndex = inventory.slots.findIndex(s => s.type === 'empty');
        if (emptySlotIndex !== -1) {
          inventory.slots[emptySlotIndex] = { type: 'crop', name: itemName, count: harvestedCount };
        } else {
          return; // Inventory full
        }
      }

      farmData[key] = { state: 'hoed' };
      player.action = 'harvesting';
      player.actionTimer = 0.4;
      updateUI();
      playSound(800, 0.1, 'triangle');
      setTimeout(() => playSound(1000, 0.1, 'triangle'), 100);
    } else if (plot.state === 'planted' && plot.isWatered && selectedSlot.type === 'tool' && selectedSlot.id === 'laser_hoe') {
      farmData[key] = { state: 'hoed' };
      player.action = 'hoeing';
      player.actionTimer = 0.3;
      playThud();
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
        if (slot.id === 'laser_hoe' && laserHoeImageLoaded) {
          icon.innerHTML = `<img src="${laserHoeImage.src}" style="width:36px;height:auto;image-rendering:pixelated;" />`;
        } else if (slot.id === 'ion_sprayer' && ionSprayerImage && ionSprayerImage.complete) {
          // Draw Ion Sprayer
          icon.innerHTML = `<img src="${ionSprayerImage.src}" style="width:36px;height:auto;image-rendering:pixelated;" />`;
          // Draw Fuel Bar Over Layer
          const fuelPct = slot.fuelLevel / slot.maxFuel;
          icon.innerHTML += `
            <div style="position: absolute; bottom: 0px; left: 4px; right: 4px; height: 6px; background: #222; border-radius: 4px; overflow: hidden; border: 1px solid #000;">
              <div style="width: ${fuelPct * 100}%; height: 100%; background: #00f5d4; box-shadow: 0 0 5px #00f5d4;"></div>
            </div>
          `;
        } else {
          icon.innerHTML = `<div style="font-size:20px;">⛏️</div>`;
        }
      } else if (slot.type === 'consumable') {
        const itemInfo = MEDIC_BAY_ITEMS.find(i => i.id === slot.id);
        icon.innerHTML = `<div style="font-size:24px; text-align:center; display: flex; justify-content: center; align-items: center; height: 100%;">${itemInfo ? itemInfo.icon : '❓'}</div>`;
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

  // Draw the Floating Rock or Town Map
  if (currentMap === 'town') {
    if (townMapImage.complete && townMapImage.naturalWidth > 0) {
      ctx.drawImage(townMapImage, 0, 0, ROCK_WIDTH, ROCK_HEIGHT);
    } else {
      ctx.fillStyle = 'rgba(77, 58, 45, 0.4)';
      ctx.fillRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.strokeRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('Loading town map...', ROCK_WIDTH / 2 - 100, ROCK_HEIGHT / 2);
    }
  } else {
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
  }

  // Draw interior over the rock if inside lounge
  if (currentMap === 'lounge_interior') {
    if (loungeInteriorImage.complete && loungeInteriorImage.naturalWidth > 0) {
      ctx.drawImage(loungeInteriorImage, 0, 0, ROCK_WIDTH, Math.min(ROCK_HEIGHT, loungeInteriorImage.naturalHeight * (ROCK_WIDTH / loungeInteriorImage.naturalWidth)));
    } else {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, ROCK_WIDTH, 120); // counter
      ctx.fillStyle = 'white';
      ctx.fillText('Nebula Lounge Interior Loading...', ROCK_WIDTH / 2 - 100, ROCK_HEIGHT / 2);
    }
  } else if (currentMap === 'outpost_interior') {
    if (outpostInteriorImage.complete && outpostInteriorImage.naturalWidth > 0) {
      ctx.drawImage(outpostInteriorImage, 0, 0, ROCK_WIDTH, Math.min(ROCK_HEIGHT, outpostInteriorImage.naturalHeight * (ROCK_WIDTH / outpostInteriorImage.naturalWidth)));
    } else {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
      ctx.fillStyle = '#1e3a8a'; // blue counter
      ctx.fillRect(0, 0, ROCK_WIDTH, 180);
      ctx.fillStyle = 'white';
      ctx.fillText('Orion\'s Outpost Interior Loading...', ROCK_WIDTH / 2 - 100, ROCK_HEIGHT / 2);
    }
  } else if (currentMap === 'medicbay_interior') {
    if (medicBayInteriorImage.complete && medicBayInteriorImage.naturalWidth > 0) {
      ctx.drawImage(medicBayInteriorImage, 0, 0, ROCK_WIDTH, Math.min(ROCK_HEIGHT, medicBayInteriorImage.naturalHeight * (ROCK_WIDTH / medicBayInteriorImage.naturalWidth)));
    } else {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
      ctx.fillStyle = 'white';
      ctx.fillText('Medic Bay Interior Loading...', ROCK_WIDTH / 2 - 100, ROCK_HEIGHT / 2);
    }
  } else if (currentMap === 'house_interior') {
    if (houseInteriorImage.complete && houseInteriorImage.naturalWidth > 0) {
      ctx.drawImage(houseInteriorImage, 0, 0, ROCK_WIDTH, Math.min(ROCK_HEIGHT, houseInteriorImage.naturalHeight * (ROCK_WIDTH / houseInteriorImage.naturalWidth)));
    } else {
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, ROCK_WIDTH, ROCK_HEIGHT);
      ctx.fillStyle = 'white';
      ctx.fillText('House Interior Loading...', ROCK_WIDTH / 2 - 100, ROCK_HEIGHT / 2);
    }
  }

  // We will collect objects that need depth sorting into an array, sort them by 'bottomY', and draw them.
  const drawables = [];

  if (currentMap === 'farm') {

    // Draw Cryo Hatchery
    if (hatcheryImage && hatcheryImage.complete) {
      drawables.push({
        yPos: hatchery.y + hatchery.height,
        draw: () => {
          ctx.drawImage(hatcheryImage, hatchery.x, hatchery.y, hatchery.width, hatchery.height);
        }
      });
    }

    // Draw House
    if (houseImage && houseImage.complete) {
      drawables.push({
        yPos: house.y + house.height - 20, // offset slightly for perspective
        draw: () => {
          ctx.drawImage(houseImage, house.x, house.y, house.width, house.height);
        }
      });
    }

    // Draw Oxygen Refiner
    if (refinerImage && refinerImage.complete) {
      // Background breathable zone aura (drawn behind)
      drawables.push({
        yPos: -Infinity, // Always draw aura at the very bottom
        draw: () => {
          const pulse = Math.sin(Date.now() / 800) * 0.2 + 0.8;
          const auraGradient = ctx.createRadialGradient(
            refiner.x + refiner.width / 2, refiner.y + refiner.height / 2, refiner.width / 3,
            refiner.x + refiner.width / 2, refiner.y + refiner.height / 2, refiner.width * 2
          );
          auraGradient.addColorStop(0, `rgba(184, 240, 216, ${0.4 * pulse})`);
          auraGradient.addColorStop(1, 'rgba(184, 240, 216, 0)');

          ctx.fillStyle = auraGradient;
          ctx.beginPath();
          ctx.arc(refiner.x + refiner.width / 2, refiner.y + refiner.height / 2, refiner.width * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // The building itself
      drawables.push({
        yPos: refiner.y + refiner.height - 20,
        draw: () => {
          ctx.drawImage(refinerImage, refiner.x, refiner.y, refiner.width, refiner.height);
        }
      });
    }

    // Draw Alien Plants
    if (plantImage && plantImage.complete) {
      alienPlants.forEach(plant => {
        drawables.push({
          yPos: plant.y,
          draw: () => {
            ctx.save();
            ctx.translate(plant.x, plant.y);
            const pWidth = 48 * plant.scale;
            const pHeight = 48 * plant.scale;
            ctx.drawImage(plantImage, -pWidth / 2, -pHeight + 10, pWidth, pHeight);
            ctx.restore();
          }
        });
      });
    }

    // Crop rendering pushing to drawables
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

            // Stage-based crop rendering pushed to front
            const stage = plot.currentGrowthStage || 0;
            const fallbackIndex = plot.seedIndex !== undefined ? plot.seedIndex : plot.seedId;
            const type = SEED_TYPES[fallbackIndex];
            const isReady = plot.state === 'ready';

            if (!type) return; // Prevent render crash from corrupted save states

            drawables.push({
              yPos: ty + TILE_SIZE, // Bottom of the tile bounds
              draw: () => {
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

                  if (fallbackIndex === 0) {
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

                  } else if (fallbackIndex === 1) {
                    // Glass-Pods: Transparent beans
                    ctx.fillStyle = 'rgba(126, 200, 168, 0.7)';
                    ctx.beginPath(); ctx.ellipse(cx - 3, cy, 4, 8, -0.2, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(cx + 3, cy, 4, 8, 0.2, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = 'rgba(200, 255, 230, 0.8)';
                    ctx.beginPath(); ctx.arc(cx - 3, cy - 2, 2, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(cx + 3, cy + 1, 2, 0, Math.PI * 2); ctx.fill();

                  } else if (fallbackIndex === 2) {
                    // Cratertatoes: Moon-rock lumps
                    ctx.fillStyle = '#b0b0b0';
                    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(cx - 4, cy + 3, 3, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(cx + 4, cy - 2, 2.5, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = 'rgba(60, 60, 60, 0.3)';
                    ctx.beginPath(); ctx.arc(cx - 1, cy - 1, 1.5, 0, Math.PI * 2); ctx.fill();

                  } else if (fallbackIndex === 3) {
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
            });
          }
        }
      }
    }

    // Draw Unicorn
    if (unicornImage && unicornImage.complete) {
      drawables.push({
        yPos: unicorn.y,
        draw: () => {
          ctx.save();
          ctx.translate(unicorn.x, unicorn.y);
          if (unicorn.dirX > 0) ctx.scale(-1, 1);
          const uniBob = unicorn.state === 'petted'
            ? Math.sin(Date.now() / 200) * 2  // gentle happy wiggle when petted
            : (unicorn.state === 'walking' ? 0 : Math.sin(Date.now() / 400) * 4);

          const uSize = unicorn.size * 1.5;

          ctx.fillStyle = 'rgba(0,0,0,0.3)';
          ctx.beginPath(); ctx.ellipse(0, 10, 12, 4, 0, 0, Math.PI * 2); ctx.fill();

          // Assuming spritesheet is 3 frames horizontally by 2 frames vertically
          const maxCols = 3;
          const maxRows = 2; // Slice vertically so we don't draw both rows
          const frameW = unicornImage.width / maxCols;
          const frameH = unicornImage.height / maxRows;

          // Maintain aspect ratio proportionally fitting inside uSize container
          const ratio = frameW / frameH;
          const actW = Math.max(uSize, uSize * ratio);
          const actH = Math.max(uSize, uSize / ratio);

          ctx.drawImage(
            unicornImage,
            unicorn.frame * frameW, 0, frameW, frameH,
            -actW / 2, -actH / 2 + uniBob, actW, actH
          );
          ctx.restore();

          // Draw heart particles above unicorn
          heartParticles.forEach(h => {
            const heartSize = 14 * h.scale;
            // Hearts use a warm pink/red color
            const heartColor = `rgb(${220 + Math.floor(35 * h.scale)}, ${40 + Math.floor(40 * h.scale)}, ${80 + Math.floor(40 * h.scale)})`;
            drawPixelHeart(h.x, h.y, heartSize, heartColor, Math.max(0, h.life));
          });
        }
      });
    }

  } else if (currentMap === 'town') {
    // Draw Shop
    drawables.push({
      yPos: shop.y + shop.height - 20,
      draw: () => {
        if (shopImage && shopImage.complete) {
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

        // Draw an 'Enter' indicator above the door
        const doorX = shop.x + shop.width * 0.5;
        const doorY = shop.y + shop.height - 20;
        const bounce = Math.sin(Date.now() / 300) * 5;
        const distToDoor = Math.hypot(player.x - doorX, player.y - doorY);

        if (distToDoor < 150) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.beginPath();
          ctx.roundRect(doorX - 25, doorY - 40 + bounce, 50, 20, 4);
          ctx.fill();

          ctx.fillStyle = '#00f5d4';
          ctx.font = '12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText('ENTER', doorX, doorY - 26 + bounce);
          ctx.textAlign = 'left';
        }
      }
    });

    // Draw Lounge
    drawables.push({
      yPos: lounge.y + lounge.height - 20,
      draw: () => {
        if (loungeImage && loungeImage.complete) {
          ctx.drawImage(loungeImage, lounge.x, lounge.y, lounge.width, lounge.height);
        } else if (loungeImageRaw.complete && loungeImageRaw.naturalWidth > 0) {
          ctx.drawImage(loungeImageRaw, lounge.x, lounge.y, lounge.width, lounge.height);
        } else {
          ctx.strokeStyle = '#f15bb5';
          ctx.lineWidth = 3;
          ctx.strokeRect(lounge.x, lounge.y, lounge.width, lounge.height);
          ctx.fillStyle = 'white';
          ctx.font = '14px Inter';
          ctx.fillText('Nebula Lounge', lounge.x + 30, lounge.y + lounge.height / 2);
        }

        // Draw an 'Enter' indicator above the door
        const doorX = lounge.x + lounge.width * 0.5;
        const doorY = lounge.y + lounge.height - 20;

        // Bouncing animation
        const bounce = Math.sin(Date.now() / 300) * 5;

        // Check distance to door to only show when player is close
        const distToDoor = Math.hypot(player.x - doorX, player.y - doorY);
        if (distToDoor < 150) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.beginPath();
          ctx.roundRect(doorX - 25, doorY - 40 + bounce, 50, 20, 4);
          ctx.fill();

          ctx.fillStyle = '#00f5d4';
          ctx.font = '12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText('ENTER', doorX, doorY - 26 + bounce);
          ctx.textAlign = 'left'; // Reset
        }
      }
    });

    // Draw Medic Bay
    drawables.push({
      yPos: medicBay.y + medicBay.height - 20,
      draw: () => {
        if (medicBayImage && medicBayImage.complete) {
          ctx.drawImage(medicBayImage, medicBay.x, medicBay.y, medicBay.width, medicBay.height);
        } else if (medicBayImageRaw.complete && medicBayImageRaw.naturalWidth > 0) {
          ctx.drawImage(medicBayImageRaw, medicBay.x, medicBay.y, medicBay.width, medicBay.height);
        } else {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.strokeRect(medicBay.x, medicBay.y, medicBay.width, medicBay.height);
          ctx.fillStyle = 'white';
          ctx.font = '14px Inter';
          ctx.fillText('Medic Bay', medicBay.x + 30, medicBay.y + medicBay.height / 2);
        }

        // Draw an 'Enter' indicator above the door
        const doorX = medicBay.x + medicBay.width * 0.5;
        const doorY = medicBay.y + medicBay.height - 20;

        // Bouncing animation
        const bounce = Math.sin(Date.now() / 300) * 5;

        // Check distance to door
        const distToDoor = Math.hypot(player.x - doorX, player.y - doorY);
        if (distToDoor < 150) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.beginPath();
          ctx.roundRect(doorX - 25, doorY - 40 + bounce, 50, 20, 4);
          ctx.fill();

          ctx.fillStyle = '#00f5d4';
          ctx.font = '12px Inter';
          ctx.textAlign = 'center';
          ctx.fillText('ENTER', doorX, doorY - 26 + bounce);
          ctx.textAlign = 'left';
        }
      }
    });

  }

  // Player Drawable
  drawables.push({
    yPos: player.y,
    draw: () => {
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

      if (player.action === 'spraying' && playerSprayerImage && playerSprayerImage.complete) {
        // Draw Custom Sprayer Sprite
        const pSize = 56;
        ctx.drawImage(playerSprayerImage, -pSize / 2, -pSize + 10, pSize, pSize);
      } else if (player.action && playerActionsSheet.complete) {
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
    }
  });

  // Sort and execute draw commands
  drawables.sort((a, b) => a.yPos - b.yPos);
  drawables.forEach(d => d.draw());

  if (currentMap === 'farm') {
    // Highlight tile the player is targeting (only on farm)
    // Drawn last to be over everything
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
    // Welcome to Town Text
    ctx.fillStyle = 'white';
    ctx.font = '16px Inter';
    ctx.fillText('Space Town - Go left to return to Farm', 20, ROCK_HEIGHT - 20);
  } else if (currentMap === 'lounge_interior') {
    ctx.fillStyle = 'white';
    ctx.font = '16px Inter';
    ctx.fillText('Nebula Lounge - Walk down to exit', 20, ROCK_HEIGHT - 20);
  } else if (currentMap === 'outpost_interior') {
    ctx.fillStyle = 'white';
    ctx.font = '16px Inter';
    ctx.fillText('Orion\'s Outpost - Walk down to exit', 20, ROCK_HEIGHT - 20);

    // Click indicator for shopkeeper
    const keeperX = ROCK_WIDTH / 2;
    const keeperY = 160;
    const distToKeeper = Math.hypot(player.x - keeperX, player.y - keeperY);
    if (distToKeeper < 150 && !shopOpen) {
      const bounce = Math.sin(Date.now() / 300) * 5;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.roundRect(keeperX - 25, keeperY - 40 + bounce, 50, 20, 4);
      ctx.fill();

      ctx.fillStyle = '#f15bb5';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('SHOP', keeperX, keeperY - 26 + bounce);
      ctx.textAlign = 'left';
    }
  } else if (currentMap === 'medicbay_interior') {
    ctx.fillStyle = 'white';
    ctx.font = '16px Inter';
    ctx.fillText('Medic Bay - Walk down to exit', 20, ROCK_HEIGHT - 20);

    // Click indicator for medic bay shopkeeper
    const medicX = ROCK_WIDTH / 2;
    const medicY = 160;
    const distToMedic = Math.hypot(player.x - medicX, player.y - medicY);
    if (distToMedic < 150 && !shopOpen) {
      const bounce = Math.sin(Date.now() / 300) * 5;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.roundRect(medicX - 25, medicY - 40 + bounce, 50, 20, 4);
      ctx.fill();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '12px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('SHOP', medicX, medicY - 26 + bounce);
      ctx.textAlign = 'left';
    }
  } else if (currentMap === 'house_interior') {
    ctx.fillStyle = 'white';
    ctx.font = '16px Inter';
    ctx.fillText('Home Sweet Home - Walk down to exit', 20, ROCK_HEIGHT - 20);
  }

  // Draw Screen Fade overlay
  if (transitionAlpha > 0) {
    ctx.fillStyle = `rgba(0,0,0,${transitionAlpha})`;
    ctx.fillRect(-offsetX, -offsetY - platformBob, cw, ch);
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

    // Check House Interaction
    const houseDoorX = house.x + house.width * 0.5;
    const houseDoorY = house.y + house.height - 20;

    if (mapX >= house.x && mapX <= house.x + house.width &&
      mapY >= house.y && mapY <= house.y + house.height) {
      const distToHouseDoor = Math.hypot(player.x - houseDoorX, player.y - houseDoorY);
      if (distToHouseDoor < 150) {
        startTransition('house_interior', () => {
          player.x = ROCK_WIDTH / 2;
          player.y = ROCK_HEIGHT - player.size * 2;
          playSound(300, 0.2, 'square'); // simple door sound
        });
        return; // don't process further clicks
      }
    }
  }

  // --- Shop Interaction (town only) ---
  if (currentMap === 'town') {
    const doorX = shop.x + shop.width * 0.5;
    const doorY = shop.y + shop.height - 20;

    if (mapX >= doorX - 40 && mapX <= doorX + 40 &&
      mapY >= doorY - 40 && mapY <= doorY + 40) {
      const distToDoor = Math.hypot(player.x - doorX, player.y - doorY);
      if (distToDoor < 150) {
        startTransition('outpost_interior', () => {
          player.x = ROCK_WIDTH / 2;
          player.y = ROCK_HEIGHT - player.size * 2;
          playSound(300, 0.2, 'square'); // simple door
        });
      }
    }

    // Check Lounge interaction (Door)
    const loungeDoorX = lounge.x + lounge.width * 0.5;
    const loungeDoorY = lounge.y + lounge.height - 20;

    if (mapX >= loungeDoorX - 40 && mapX <= loungeDoorX + 40 &&
      mapY >= loungeDoorY - 40 && mapY <= loungeDoorY + 40) {
      const distToLounge = Math.hypot(player.x - loungeDoorX, player.y - loungeDoorY);
      if (distToLounge < 150) {
        startTransition('lounge_interior', () => {
          player.x = ROCK_WIDTH / 2;
          player.y = ROCK_HEIGHT - player.size * 2;
          playPneumaticDoor();
        });
      }
    }

    // Check Medic Bay interaction (Door)
    const medicDoorX = medicBay.x + medicBay.width * 0.5;
    const medicDoorY = medicBay.y + medicBay.height - 20;

    if (mapX >= medicDoorX - 40 && mapX <= medicDoorX + 40 &&
      mapY >= medicDoorY - 40 && mapY <= medicDoorY + 40) {
      const distToMedic = Math.hypot(player.x - medicDoorX, player.y - medicDoorY);
      if (distToMedic < 150) {
        startTransition('medicbay_interior', () => {
          player.x = ROCK_WIDTH / 2;
          player.y = ROCK_HEIGHT - player.size * 2;
          playSound(300, 0.2, 'square'); // simple door
        });
      }
    }
  }

  // --- Interior Interactions ---
  if (currentMap === 'outpost_interior') {
    const keeperX = ROCK_WIDTH / 2;
    const keeperY = 160;

    // Check click near the counter
    if (mapX >= keeperX - 80 && mapX <= keeperX + 80 &&
      mapY >= keeperY - 80 && mapY <= keeperY + 80) {
      const distToKeeper = Math.hypot(player.x - keeperX, player.y - keeperY);
      if (distToKeeper < 150 && !shopOpen) {
        openShop('outpost');
      }
    }
  } else if (currentMap === 'medicbay_interior') {
    const medicX = ROCK_WIDTH / 2;
    const medicY = 160;

    // Check click near the counter
    if (mapX >= medicX - 80 && mapX <= medicX + 80 &&
      mapY >= medicY - 80 && mapY <= medicY + 80) {
      const distToMedic = Math.hypot(player.x - medicX, player.y - medicY);
      if (distToMedic < 150 && !shopOpen) {
        openShop('medicbay');
      }
    }
  }
});

// Escape key closes shop
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && shopOpen) closeShop();
});

requestAnimationFrame(loop);
