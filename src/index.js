/**
 * Christmas Mode - Main JavaScript
 * Adds festive decorations to any webpage
 */

import cssContent from 'styles.css';
import { playJingleBells, stopMusic, toggleMusic, setMusicButton } from './music.js';
import { initSnow, startSnow, stopSnow, resizeSnow } from './snow.js';
import { createLights as createLightsModule, createStars as createStarsModule } from './decorations/lights.js';
import { createIcicles as createIciclesModule } from './decorations/icicles.js';
import { createStockings as createStockingsModule } from './decorations/stockings.js';
import { createPresents as createPresentsModule } from './decorations/presents.js';
import { createChristmasTree as createChristmasTreeModule } from './decorations/tree.js';
import { createCandyCanes as createCandyCanesModule } from './decorations/candycanes.js';
import { createSnowman as createSnowmanModule } from './decorations/snowman.js';
import { createOrnaments as createOrnamentsModule } from './decorations/ornaments.js';
import { createHolly as createHollyModule } from './decorations/holly.js';
import { createWreath as createWreathModule } from './decorations/wreath.js';
import { createElves as createElvesModule, createWalkingElves as createWalkingElvesModule, createSleddingElves as createSleddingElvesModule } from './decorations/elves.js';
import { createNutcrackers as createNutcrackersModule } from './decorations/nutcrackers.js';
import { createBackgroundSanta as createBackgroundSantaModule } from './decorations/santa.js';
import { createNorthPole as createNorthPoleModule } from './decorations/northpole.js';

// State
let isChristmasModeActive = false;
let isInitialized = false;
let options = {};

// DOM Elements (assigned after DOM creation)
let christmasToggle = null;
let decorationsContainer = null;
let lightsContainer = null;
let iciclesContainer = null;
let stockingsContainer = null;
let snowCanvas = null;
let snowGround = null;
let santaContainer = null;
let sparklesContainer = null;
let musicBtn = null;
let presentsContainer = null;
let christmasTree = null;
let snowmanContainer = null;
let candycaneContainer = null;
let ornamentsContainer = null;
let hollyContainer = null;
let wreathContainer = null;
let starsContainer = null;
let elvesContainer = null;
let nutcrackerContainer = null;
let northpoleContainer = null;
let toggleContainer = null;

// Dialog system (replacing alert/confirm)
let dialogOverlay = null;
let dialogMessage = null;
let dialogConfirm = null;
let dialogCancel = null;

/**
   * Show custom dialog
   * @param {string} message - Message to display
   * @param {boolean} showCancel - Whether to show cancel button
   * @returns {Promise<boolean>} - Resolves true if confirmed, false if cancelled
   */
function showDialog(message, showCancel = false) {
    return new Promise((resolve) => {
      dialogMessage.textContent = message;
      dialogCancel.classList.toggle('hidden', !showCancel);
      dialogOverlay.classList.remove('hidden');

      const handleConfirm = () => {
        dialogOverlay.classList.add('hidden');
        dialogConfirm.removeEventListener('click', handleConfirm);
        dialogCancel.removeEventListener('click', handleCancel);
        resolve(true);
      };

      const handleCancel = () => {
        dialogOverlay.classList.add('hidden');
        dialogConfirm.removeEventListener('click', handleConfirm);
        dialogCancel.removeEventListener('click', handleCancel);
        resolve(false);
      };

      dialogConfirm.addEventListener('click', handleConfirm);
      dialogCancel.addEventListener('click', handleCancel);
    });
  }

/**
   * Activate Christmas Mode
   */
function activateChristmasMode() {
    isChristmasModeActive = true;
    decorationsContainer.classList.remove('hidden');
    document.body.classList.add('christmas-mode-active');

    initSnow(snowCanvas);
    createStarsModule(starsContainer, 60);
    createLightsModule(lightsContainer, 20);
    createIciclesModule(iciclesContainer, 15);
    createStockingsModule(stockingsContainer, 3);
    createPresentsModule(presentsContainer, 5);
    createChristmasTreeModule(christmasTree);
    createSnowmanModule(snowmanContainer);
    createCandyCanesModule(candycaneContainer);
    createOrnamentsModule(ornamentsContainer);
    createHollyModule(hollyContainer);
    createWreathModule(wreathContainer);
    createElvesModule(elvesContainer);
    createWalkingElvesModule(elvesContainer);
    createSleddingElvesModule(elvesContainer);
    createNutcrackersModule(nutcrackerContainer);
    createBackgroundSantaModule(santaContainer);
    createNorthPoleModule(northpoleContainer);

    // Assign music button reference and add event listener (created in createNorthPole)
    musicBtn = document.getElementById('music-btn');
    setMusicButton(musicBtn);
    if (musicBtn) {
      musicBtn.addEventListener('click', toggleMusic);

      // Caroler appears after snow has accumulated (2.5s) and starts singing immediately
      // (unless music is disabled via options)
      setTimeout(() => {
        if (musicBtn && isChristmasModeActive) {
          musicBtn.classList.remove('caroler-hidden');
          musicBtn.classList.add('caroler-entrance');
          // Start singing immediately when caroler appears (if music enabled)
          if (options.music !== false) {
            playJingleBells(160);
          }
        }
      }, 2500);
    }

    // Start snow animation
    startSnow();

    // Accumulate snow ground after delay
    setTimeout(() => {
      snowGround.classList.add('accumulated');
    }, 2000);

    // Activate snow depth layers
    const snowDepthLayers = document.getElementById('snow-depth-layers');
    if (snowDepthLayers) {
      setTimeout(() => {
        snowDepthLayers.classList.add('active');
      }, 2500);
    }
  }

/**
   * Deactivate Christmas Mode
   */
function deactivateChristmasMode() {
    isChristmasModeActive = false;
    document.body.classList.remove('christmas-mode-active');

    // Stop music
    stopMusic();

    // Stop snow animation
    stopSnow();

    // Hide and clear decorations (with null checks for destroy() calls)
    if (decorationsContainer) decorationsContainer.classList.add('hidden');
    if (starsContainer) starsContainer.innerHTML = '';
    if (lightsContainer) lightsContainer.innerHTML = '';
    if (iciclesContainer) iciclesContainer.innerHTML = '';
    if (stockingsContainer) stockingsContainer.innerHTML = '';
    if (santaContainer) santaContainer.innerHTML = '';
    if (sparklesContainer) sparklesContainer.innerHTML = '';
    if (presentsContainer) presentsContainer.innerHTML = '';
    if (christmasTree) christmasTree.innerHTML = '';
    if (snowmanContainer) snowmanContainer.innerHTML = '';
    if (candycaneContainer) candycaneContainer.innerHTML = '';
    if (ornamentsContainer) ornamentsContainer.innerHTML = '';
    if (hollyContainer) hollyContainer.innerHTML = '';
    // Remove holly from cards
    document.querySelectorAll('.card .holly').forEach(holly => holly.remove());
    if (wreathContainer) wreathContainer.innerHTML = '';
    if (elvesContainer) elvesContainer.innerHTML = '';
    if (nutcrackerContainer) nutcrackerContainer.innerHTML = '';
    if (northpoleContainer) northpoleContainer.innerHTML = '';

    if (snowGround) {
      snowGround.classList.remove('accumulated');
      snowGround.style.height = '';
    }

    // Deactivate snow depth layers
    const snowDepthLayers = document.getElementById('snow-depth-layers');
    if (snowDepthLayers) {
      snowDepthLayers.classList.remove('active');
    }
  }

/**
 * Handle window resize
 */
function handleResize() {
  if (isChristmasModeActive) {
    resizeSnow();
  }
}

/**
 * Inject CSS into the page
 */
function injectCSS() {
  if (document.getElementById('christmas-mode-styles')) return;

const style = document.createElement('style');
  style.id = 'christmas-mode-styles';
  style.textContent = cssContent;
  document.head.appendChild(style);
}

/**
 * Create all required DOM elements
 */
function createDOM(targetElement) {
const target = targetElement || document.body;

  // Create main decorations container
  decorationsContainer = document.createElement('div');
  decorationsContainer.id = 'christmas-decorations';
  decorationsContainer.className = 'hidden';
  decorationsContainer.innerHTML = `
    <div id="stars-container"></div>
    <div id="lights-container"></div>
    <div id="icicles-container"></div>
    <div id="mantle-container">
      <div id="mantle-bar"></div>
      <div id="stockings-container"></div>
    </div>
    <canvas id="snow-canvas"></canvas>
    <div id="snow-ground"></div>
    <div id="snow-depth-layers">
      <div class="gingerbread-house gb-house-left">
        <div class="gb-chimney">
          <div class="gb-chimney-snow"></div>
          <div class="gb-smoke">
            <div class="gb-smoke-puff"></div>
            <div class="gb-smoke-puff"></div>
            <div class="gb-smoke-puff"></div>
          </div>
        </div>
        <div class="gb-roof">
          <div class="gb-roof-icing"></div>
          <div class="gb-roof-candy gb-candy-1"></div>
          <div class="gb-roof-candy gb-candy-2"></div>
          <div class="gb-roof-candy gb-candy-3"></div>
        </div>
        <div class="gb-house">
          <div class="gb-door">
            <div class="gb-door-icing"></div>
            <div class="gb-doorknob"></div>
          </div>
          <div class="gb-window gb-window-left">
            <div class="gb-window-pane"></div>
            <div class="gb-window-icing"></div>
          </div>
          <div class="gb-window gb-window-right">
            <div class="gb-window-pane"></div>
            <div class="gb-window-icing"></div>
          </div>
          <div class="gb-icing-bottom"></div>
          <div class="gb-candy-cane gb-cc-left"></div>
          <div class="gb-candy-cane gb-cc-right"></div>
        </div>
      </div>
      <div class="gingerbread-house gb-house-right">
        <div class="gb-chimney">
          <div class="gb-chimney-snow"></div>
          <div class="gb-smoke">
            <div class="gb-smoke-puff"></div>
            <div class="gb-smoke-puff"></div>
            <div class="gb-smoke-puff"></div>
          </div>
        </div>
        <div class="gb-roof">
          <div class="gb-roof-icing"></div>
          <div class="gb-roof-candy gb-candy-1"></div>
          <div class="gb-roof-candy gb-candy-2"></div>
          <div class="gb-roof-candy gb-candy-3"></div>
        </div>
        <div class="gb-house">
          <div class="gb-door">
            <div class="gb-door-icing"></div>
            <div class="gb-doorknob"></div>
          </div>
          <div class="gb-window gb-window-left">
            <div class="gb-window-pane"></div>
            <div class="gb-window-icing"></div>
          </div>
          <div class="gb-window gb-window-right">
            <div class="gb-window-pane"></div>
            <div class="gb-window-icing"></div>
          </div>
          <div class="gb-icing-bottom"></div>
          <div class="gb-candy-cane gb-cc-left"></div>
          <div class="gb-candy-cane gb-cc-right"></div>
        </div>
      </div>
      <div class="gingerbread-house gb-house-center">
        <div class="gb-chimney">
          <div class="gb-chimney-snow"></div>
          <div class="gb-smoke">
            <div class="gb-smoke-puff"></div>
            <div class="gb-smoke-puff"></div>
            <div class="gb-smoke-puff"></div>
          </div>
        </div>
        <div class="gb-roof">
          <div class="gb-roof-icing"></div>
          <div class="gb-roof-candy gb-candy-1"></div>
          <div class="gb-roof-candy gb-candy-2"></div>
          <div class="gb-roof-candy gb-candy-3"></div>
          <div class="gb-lights gb-lights-roof">
            <div class="gb-light gb-light-red"></div>
            <div class="gb-light gb-light-green"></div>
            <div class="gb-light gb-light-yellow"></div>
            <div class="gb-light gb-light-blue"></div>
            <div class="gb-light gb-light-red"></div>
            <div class="gb-light gb-light-green"></div>
          </div>
        </div>
        <div class="gb-house">
          <div class="gb-door">
            <div class="gb-door-icing"></div>
            <div class="gb-doorknob"></div>
          </div>
          <div class="gb-window gb-window-left">
            <div class="gb-window-pane"></div>
            <div class="gb-window-icing"></div>
          </div>
          <div class="gb-window gb-window-right">
            <div class="gb-window-pane"></div>
            <div class="gb-window-icing"></div>
          </div>
          <div class="gb-icing-bottom"></div>
          <div class="gb-candy-cane gb-cc-left"></div>
          <div class="gb-candy-cane gb-cc-right"></div>
          <div class="gb-lights gb-lights-door">
            <div class="gb-light gb-light-yellow"></div>
            <div class="gb-light gb-light-red"></div>
            <div class="gb-light gb-light-green"></div>
            <div class="gb-light gb-light-blue"></div>
            <div class="gb-light gb-light-yellow"></div>
          </div>
        </div>
      </div>
      <div class="snow-drift snow-drift-far"></div>
      <div class="snow-drift snow-drift-back"></div>
      <div class="snow-drift snow-drift-mid"></div>
      <div class="snow-drift snow-drift-front"></div>
    </div>
    <div id="santa-container"></div>
    <div id="sparkles-container"></div>
    <div id="presents-container"></div>
    <div id="christmas-tree"></div>
    <div id="snowman-container"></div>
    <div id="candycane-container"></div>
    <div id="ornaments-container"></div>
    <div id="holly-container"></div>
    <div id="wreath-container"></div>
    <div id="elves-container"></div>
    <div id="nutcracker-container"></div>
    <div id="northpole-container"></div>
  `;
  target.appendChild(decorationsContainer);

  // Create toggle container
  toggleContainer = document.createElement('div');
  toggleContainer.id = 'christmas-mode-toggle-container';
  toggleContainer.innerHTML = `
    <label class="ornament-snow-toggle">
      <input type="checkbox" id="christmas-toggle">
      <span class="snow-track">
        <span class="snow-surface"></span>
        <span class="snow-groove"></span>
        <span class="pushed-snow pushed-snow-left"></span>
        <span class="pushed-snow pushed-snow-right"></span>
        <span class="sliding-ornament">
          <span class="ornament-string"></span>
          <span class="ornament-cap"></span>
          <span class="ornament-ball"></span>
        </span>
      </span>
    </label>
  `;
  target.appendChild(toggleContainer);

  // Create dialog
  dialogOverlay = document.createElement('div');
  dialogOverlay.id = 'dialog-overlay';
  dialogOverlay.className = 'hidden';
  dialogOverlay.innerHTML = `
    <div class="dialog-box">
      <p id="dialog-message"></p>
      <div class="dialog-buttons">
        <button id="dialog-confirm">OK</button>
        <button id="dialog-cancel" class="hidden">Cancel</button>
      </div>
    </div>
  `;
  target.appendChild(dialogOverlay);

  // Assign DOM references
  christmasToggle = document.getElementById('christmas-toggle');
  lightsContainer = document.getElementById('lights-container');
  iciclesContainer = document.getElementById('icicles-container');
  stockingsContainer = document.getElementById('stockings-container');
  snowCanvas = document.getElementById('snow-canvas');
  snowGround = document.getElementById('snow-ground');
  santaContainer = document.getElementById('santa-container');
  sparklesContainer = document.getElementById('sparkles-container');
  presentsContainer = document.getElementById('presents-container');
  christmasTree = document.getElementById('christmas-tree');
  snowmanContainer = document.getElementById('snowman-container');
  candycaneContainer = document.getElementById('candycane-container');
  ornamentsContainer = document.getElementById('ornaments-container');
  hollyContainer = document.getElementById('holly-container');
  wreathContainer = document.getElementById('wreath-container');
  starsContainer = document.getElementById('stars-container');
  elvesContainer = document.getElementById('elves-container');
  nutcrackerContainer = document.getElementById('nutcracker-container');
  northpoleContainer = document.getElementById('northpole-container');
  dialogMessage = document.getElementById('dialog-message');
  dialogConfirm = document.getElementById('dialog-confirm');
  dialogCancel = document.getElementById('dialog-cancel');
}

/**
 * Set up event listeners
 */
function setupEventListeners() {
  // Toggle switch
  christmasToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
      activateChristmasMode();
    } else {
      deactivateChristmasMode();
    }
  });

  // Window resize
  window.addEventListener('resize', handleResize);
}

/**
 * Clean up and remove all Christmas Mode elements
 */
function destroy() {
  if (!isInitialized) return;

  deactivateChristmasMode();

  // Remove DOM elements
  if (decorationsContainer) decorationsContainer.remove();
  if (toggleContainer) toggleContainer.remove();
  if (dialogOverlay) dialogOverlay.remove();

  // Remove CSS
const styleEl = document.getElementById('christmas-mode-styles');
  if (styleEl) styleEl.remove();

  // Reset state
  isInitialized = false;
  christmasToggle = null;
  decorationsContainer = null;
  toggleContainer = null;
}

// ============================================
// Public API
// ============================================

/**
 * Initialize Christmas Mode
 * @param {Object} opts - Configuration options
 */
function init(opts = {}) {
  if (isInitialized) return;

  options = {
    toggle: true,
    musicButton: true,
    autoEnable: false,
    target: document.body,
    ...opts
  };

  injectCSS();
  createDOM(options.target);
  setupEventListeners();

  // If target is not document.body, add contained class for proper positioning
  const isContained = options.target && options.target !== document.body;
  if (isContained) {
    decorationsContainer.classList.add('contained');
    toggleContainer.classList.add('contained');
    // Ensure target has relative positioning for absolute children
    const targetPosition = window.getComputedStyle(options.target).position;
    if (targetPosition === 'static') {
      options.target.style.position = 'relative';
    }
  }

  // Handle toggle visibility
  if (!options.toggle) {
    toggleContainer.style.display = 'none';
  } else if (typeof options.toggle === 'object' && options.toggle.position) {
    toggleContainer.dataset.position = options.toggle.position;
  }

  // Handle music button visibility
  if (!options.musicButton) {
    musicBtn.style.display = 'none';
  }

  // Auto-enable if requested
  if (options.autoEnable) {
    christmasToggle.checked = true;
    activateChristmasMode();
  }

  isInitialized = true;
}

/**
 * Enable Christmas Mode
 */
function enable() {
  if (!isInitialized) init();
  christmasToggle.checked = true;
  activateChristmasMode();
}

/**
 * Disable Christmas Mode
 */
function disable() {
  if (!isInitialized) return;
  christmasToggle.checked = false;
  deactivateChristmasMode();
}

/**
 * Toggle Christmas Mode
 */
function toggle() {
  if (!isInitialized) init();
  christmasToggle.checked = !christmasToggle.checked;
  if (christmasToggle.checked) {
    activateChristmasMode();
  } else {
    deactivateChristmasMode();
  }
}

/**
 * Check if Christmas Mode is enabled
 */
function isEnabled() {
  return isChristmasModeActive;
}

/**
 * Start music
 */
function playMusic() {
  if (!isInitialized) init();
  if (!isMusicPlaying) {
    playJingleBells(160);
  }
}

// Export public API
const ChristmasMode = {
  init,
  enable,
  disable,
  toggle,
  isEnabled,
  playMusic,
  stopMusic,
  toggleMusic,
  destroy
};

export default ChristmasMode;
