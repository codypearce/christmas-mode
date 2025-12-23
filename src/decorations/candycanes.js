/**
 * Candy Canes module - SVG candy cane decorations
 */

/**
 * Create a mini candy cane SVG for stockings
 * @param {string|number} id - Unique identifier for the candy cane
 * @returns {SVGElement} The candy cane SVG
 */
export function createMiniCandyCane(id) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 30 50');
  svg.setAttribute('width', '30');
  svg.setAttribute('height', '50');
  svg.style.overflow = 'visible';

  const defs = document.createElementNS(svgNS, 'defs');
  const pattern = document.createElementNS(svgNS, 'pattern');
  pattern.setAttribute('id', `mini-candy-stripe-${id}`);
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');
  pattern.setAttribute('width', '8');
  pattern.setAttribute('height', '8');
  pattern.setAttribute('patternTransform', 'rotate(-45)');

  const whiteRect = document.createElementNS(svgNS, 'rect');
  whiteRect.setAttribute('width', '8');
  whiteRect.setAttribute('height', '4');
  whiteRect.setAttribute('fill', '#ffffff');
  pattern.appendChild(whiteRect);

  const redRect = document.createElementNS(svgNS, 'rect');
  redRect.setAttribute('y', '4');
  redRect.setAttribute('width', '8');
  redRect.setAttribute('height', '4');
  redRect.setAttribute('fill', '#e23c3c');
  pattern.appendChild(redRect);

  defs.appendChild(pattern);
  svg.appendChild(defs);

  const shadowPath = document.createElementNS(svgNS, 'path');
  shadowPath.setAttribute('d', 'M 8 3 A 8 8 0 0 1 24 3 L 24 45');
  shadowPath.setAttribute('fill', 'none');
  shadowPath.setAttribute('stroke', 'rgba(0,0,0,0.15)');
  shadowPath.setAttribute('stroke-width', '10');
  shadowPath.setAttribute('stroke-linecap', 'round');
  svg.appendChild(shadowPath);

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', 'M 8 3 A 8 8 0 0 1 24 3 L 24 45');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', `url(#mini-candy-stripe-${id})`);
  path.setAttribute('stroke-width', '8');
  path.setAttribute('stroke-linecap', 'round');
  svg.appendChild(path);

  return svg;
}

/**
 * Create a full-size decorative candy cane
 * @param {HTMLElement} container - The candy cane container element
 * @param {string} positionClass - CSS class for positioning
 * @param {number} delay - Animation delay in seconds
 */
export function createCandyCane(container, positionClass, delay) {
  const cane = document.createElement('div');
  cane.classList.add('candy-cane', positionClass);
  cane.style.animationDelay = `${delay}s`;
  container.appendChild(cane);
}

/**
 * Create all decorative candy canes
 * @param {HTMLElement} container - The candy cane container element
 */
export function createCandyCanes(container) {
  // Only left and right side candy canes (not bottom corners)
  createCandyCane(container, 'left-side', 0.2);
  createCandyCane(container, 'right-side', 0.4);
}
