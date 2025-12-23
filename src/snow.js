/**
 * Snow module - Canvas-based snowfall animation
 */

// Module state
let canvas = null;
let ctx = null;
let snowflakes = [];
let animationId = null;
let isActive = false;

/**
 * Initialize the snow module with a canvas element
 */
export function initSnow(canvasElement) {
  canvas = canvasElement;
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
  }
}

/**
 * Handle window resize
 */
export function resizeSnow() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

/**
 * Create a snowflake object
 */
function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 2 + 1,
    wind: Math.random() * 0.5 - 0.25,
    opacity: Math.random() * 0.5 + 0.5
  };
}

/**
 * Update and draw snowflakes
 */
function updateSnow() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add new snowflakes
  if (Math.random() < 0.6) {
    snowflakes.push(createSnowflake());
  }

  // Update and draw each snowflake
  for (let i = snowflakes.length - 1; i >= 0; i--) {
    const flake = snowflakes[i];

    flake.y += flake.speed;
    flake.x += flake.wind;

    // Draw snowflake
    ctx.beginPath();
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
    ctx.fill();

    // Remove snowflakes that are off screen
    if (flake.y > canvas.height) {
      snowflakes.splice(i, 1);
    }
  }

  if (isActive) {
    animationId = requestAnimationFrame(updateSnow);
  }
}

/**
 * Start the snow animation
 */
export function startSnow() {
  isActive = true;
  updateSnow();
}

/**
 * Stop the snow animation
 */
export function stopSnow() {
  isActive = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  snowflakes = [];
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/**
 * Get the animation ID (for external cancellation if needed)
 */
export function getAnimationId() {
  return animationId;
}
