/**
 * Ornaments module - Hanging ornament decorations
 */

/**
 * Create a single hanging ornament
 * @param {string} color - Color class (red, gold, blue, green, silver)
 * @param {string} size - Size class (small, '', large)
 * @param {number} stringLength - Length of the string in pixels
 * @param {number} left - Left position as percentage
 * @param {number} delay - Animation delay in seconds
 * @returns {HTMLElement} The ornament element
 */
function createOrnament(color, size, stringLength, left, delay) {
  const ornament = document.createElement('div');
  ornament.classList.add('hanging-ornament');
  if (size) ornament.classList.add(size);
  ornament.style.left = `${left}%`;
  ornament.style.animationDelay = `${delay}s, ${delay + 0.5}s`;

  // String
  const string = document.createElement('div');
  string.classList.add('ornament-string');
  string.style.height = `${stringLength}px`;
  ornament.appendChild(string);

  // Cap (metal top)
  const cap = document.createElement('div');
  cap.classList.add('ornament-cap');
  ornament.appendChild(cap);

  // Ball
  const ball = document.createElement('div');
  ball.classList.add('ornament-ball', color);
  ornament.appendChild(ball);

  return ornament;
}

/**
 * Create hanging ornaments across the top
 * @param {HTMLElement} container - The ornaments container element
 */
export function createOrnaments(container) {
  container.innerHTML = '';

  // Create ornaments at various positions
  const ornamentConfigs = [
    { left: 8, stringLength: 40, color: 'red', size: '' },
    { left: 18, stringLength: 60, color: 'gold', size: 'large' },
    { left: 28, stringLength: 35, color: 'blue', size: 'small' },
    { left: 42, stringLength: 55, color: 'silver', size: '' },
    { left: 55, stringLength: 45, color: 'green', size: 'small' },
    { left: 68, stringLength: 70, color: 'red', size: 'large' },
    { left: 78, stringLength: 38, color: 'gold', size: '' },
    { left: 88, stringLength: 50, color: 'blue', size: '' },
  ];

  ornamentConfigs.forEach((config, index) => {
    const ornament = createOrnament(
      config.color,
      config.size,
      config.stringLength,
      config.left,
      index * 0.15
    );
    container.appendChild(ornament);
  });
}
