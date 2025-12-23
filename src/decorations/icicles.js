/**
 * Icicles module - SVG icicle decorations
 */

/**
 * Create a single SVG icicle with realistic shape
 * @param {number} width - Base width of the icicle
 * @param {number} height - Height of the icicle
 * @returns {SVGElement} The icicle SVG
 */
function createIcicleSVG(width, height) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width + 10} ${height + 5}`);
  svg.setAttribute('width', width + 10);
  svg.setAttribute('height', height + 5);

  // Create defs for gradients
  const defs = document.createElementNS(svgNS, 'defs');

  // Main ice gradient
  const iceGradient = document.createElementNS(svgNS, 'linearGradient');
  iceGradient.setAttribute('id', `ice-grad-${Math.random().toString(36).substr(2, 9)}`);
  iceGradient.setAttribute('x1', '0%');
  iceGradient.setAttribute('y1', '0%');
  iceGradient.setAttribute('x2', '100%');
  iceGradient.setAttribute('y2', '100%');
  iceGradient.innerHTML = `
    <stop offset="0%" stop-color="rgba(220, 240, 255, 0.95)"/>
    <stop offset="30%" stop-color="rgba(180, 220, 250, 0.85)"/>
    <stop offset="70%" stop-color="rgba(150, 200, 240, 0.7)"/>
    <stop offset="100%" stop-color="rgba(120, 180, 230, 0.5)"/>
  `;
  defs.appendChild(iceGradient);

  // Highlight gradient
  const highlightGrad = document.createElementNS(svgNS, 'linearGradient');
  highlightGrad.setAttribute('id', `highlight-${Math.random().toString(36).substr(2, 9)}`);
  highlightGrad.setAttribute('x1', '0%');
  highlightGrad.setAttribute('y1', '0%');
  highlightGrad.setAttribute('x2', '100%');
  highlightGrad.setAttribute('y2', '0%');
  highlightGrad.innerHTML = `
    <stop offset="0%" stop-color="rgba(255, 255, 255, 0)"/>
    <stop offset="30%" stop-color="rgba(255, 255, 255, 0.7)"/>
    <stop offset="50%" stop-color="rgba(255, 255, 255, 0.9)"/>
    <stop offset="70%" stop-color="rgba(255, 255, 255, 0.5)"/>
    <stop offset="100%" stop-color="rgba(255, 255, 255, 0)"/>
  `;
  defs.appendChild(highlightGrad);

  svg.appendChild(defs);

  const centerX = (width + 10) / 2;

  // Create irregular icicle path with bumps and narrowing
  const segments = 8;
  const segmentHeight = height / segments;

  let pathD = `M ${centerX - width/2} 0`;

  // Left edge going down (with slight irregularities)
  for (let i = 1; i <= segments; i++) {
    const progress = i / segments;
    const currentWidth = (width / 2) * (1 - Math.pow(progress, 0.7));
    const wobble = (Math.random() - 0.5) * 3;
    const bulge = Math.sin(progress * Math.PI) * 2;
    pathD += ` L ${centerX - currentWidth + wobble - bulge} ${i * segmentHeight}`;
  }

  // Point at bottom
  pathD += ` L ${centerX} ${height}`;

  // Right edge going up (with slight irregularities)
  for (let i = segments; i >= 1; i--) {
    const progress = i / segments;
    const currentWidth = (width / 2) * (1 - Math.pow(progress, 0.7));
    const wobble = (Math.random() - 0.5) * 3;
    const bulge = Math.sin(progress * Math.PI) * 2;
    pathD += ` L ${centerX + currentWidth + wobble + bulge} ${i * segmentHeight}`;
  }

  pathD += ` L ${centerX + width/2} 0 Z`;

  // Main icicle body
  const iciclePath = document.createElementNS(svgNS, 'path');
  iciclePath.setAttribute('d', pathD);
  iciclePath.setAttribute('fill', `url(#${iceGradient.getAttribute('id')})`);
  svg.appendChild(iciclePath);

  // Add highlight streak
  const highlightPath = document.createElementNS(svgNS, 'path');
  const hlOffset = width * 0.15;
  let hlPathD = `M ${centerX - hlOffset} 5`;
  for (let i = 1; i <= segments - 1; i++) {
    const progress = i / segments;
    const currentOffset = hlOffset * (1 - Math.pow(progress, 0.6));
    hlPathD += ` L ${centerX - currentOffset + 1} ${i * segmentHeight}`;
  }
  highlightPath.setAttribute('d', hlPathD);
  highlightPath.setAttribute('stroke', `url(#${highlightGrad.getAttribute('id')})`);
  highlightPath.setAttribute('stroke-width', '3');
  highlightPath.setAttribute('fill', 'none');
  highlightPath.setAttribute('stroke-linecap', 'round');
  highlightPath.setAttribute('opacity', '0.8');
  svg.appendChild(highlightPath);

  // Add some internal "crack" lines for realism
  const numCracks = Math.floor(Math.random() * 3);
  for (let c = 0; c < numCracks; c++) {
    const crackY = 20 + Math.random() * (height * 0.5);
    const crackLen = 10 + Math.random() * 15;
    const crack = document.createElementNS(svgNS, 'line');
    crack.setAttribute('x1', centerX - 2 + Math.random() * 4);
    crack.setAttribute('y1', crackY);
    crack.setAttribute('x2', centerX - 2 + Math.random() * 4);
    crack.setAttribute('y2', crackY + crackLen);
    crack.setAttribute('stroke', 'rgba(200, 230, 255, 0.5)');
    crack.setAttribute('stroke-width', '1');
    svg.appendChild(crack);
  }

  return svg;
}

/**
 * Create icicles
 * @param {HTMLElement} container - The icicles container element
 * @param {number} count - Number of icicles to create
 */
export function createIcicles(container, count = 15) {
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const icicle = document.createElement('div');
    icicle.classList.add('icicle');

    // Varying sizes
    const width = 10 + Math.random() * 12;
    const height = 50 + Math.random() * 70;

    const svg = createIcicleSVG(width, height);
    icicle.appendChild(svg);

    // Stagger animations
    icicle.style.animationDelay = `${Math.random() * 4}s`;

    // Add dripping drop to some icicles
    if (Math.random() > 0.5) {
      const drop = document.createElement('div');
      drop.classList.add('icicle-drop');
      drop.style.animationDelay = `${Math.random() * 3}s`;
      icicle.appendChild(drop);
    }

    container.appendChild(icicle);
  }
}
