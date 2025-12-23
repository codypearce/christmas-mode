/**
 * Stockings module - Christmas stockings with candy canes
 */

import { createMiniCandyCane } from './candycanes.js';

/**
 * Create stocking SVG with proper boot shape
 */
function createStockingSVG(color, darkColor, id) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 80 110');
  svg.setAttribute('width', '80');
  svg.setAttribute('height', '110');

  const defs = document.createElementNS(svgNS, 'defs');

  // Gradient for stocking body
  const grad = document.createElementNS(svgNS, 'linearGradient');
  grad.setAttribute('id', `stocking-grad-${id}`);
  grad.setAttribute('x1', '0%');
  grad.setAttribute('y1', '0%');
  grad.setAttribute('x2', '100%');
  grad.setAttribute('y2', '100%');
  grad.innerHTML = `<stop offset="0%" stop-color="${color}"/><stop offset="100%" stop-color="${darkColor}"/>`;
  defs.appendChild(grad);

  // Gradient for cuff
  const cuffGrad = document.createElementNS(svgNS, 'linearGradient');
  cuffGrad.setAttribute('id', `cuff-grad-${id}`);
  cuffGrad.setAttribute('x1', '0%');
  cuffGrad.setAttribute('y1', '0%');
  cuffGrad.setAttribute('x2', '0%');
  cuffGrad.setAttribute('y2', '100%');
  cuffGrad.innerHTML = `<stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#f5f5f5"/><stop offset="100%" stop-color="#e8e8e8"/>`;
  defs.appendChild(cuffGrad);

  svg.appendChild(defs);

  // Stocking path - proper curved boot shape
  const stockingPath = `
    M 15 22
    L 15 70
    C 15 85, 18 96, 35 98
    C 50 100, 68 94, 70 82
    C 72 70, 65 62, 54 62
    L 50 62
    L 50 22
    Z
  `;

  // Shadow
  const shadow = document.createElementNS(svgNS, 'path');
  shadow.setAttribute('d', stockingPath);
  shadow.setAttribute('fill', 'rgba(0,0,0,0.2)');
  shadow.setAttribute('transform', 'translate(2, 2)');
  svg.appendChild(shadow);

  // Stocking body
  const body = document.createElementNS(svgNS, 'path');
  body.setAttribute('d', stockingPath);
  body.setAttribute('fill', `url(#stocking-grad-${id})`);
  svg.appendChild(body);

  // Heel accent
  const heel = document.createElementNS(svgNS, 'path');
  heel.setAttribute('d', 'M 15 70 C 15 85, 18 96, 35 98 L 28 95 C 17 90, 15 80, 15 74 Z');
  heel.setAttribute('fill', darkColor);
  heel.setAttribute('opacity', '0.3');
  svg.appendChild(heel);

  // Cuff (fluffy top)
  const cuff = document.createElementNS(svgNS, 'ellipse');
  cuff.setAttribute('cx', '32.5');
  cuff.setAttribute('cy', '20');
  cuff.setAttribute('rx', '22');
  cuff.setAttribute('ry', '14');
  cuff.setAttribute('fill', `url(#cuff-grad-${id})`);
  svg.appendChild(cuff);

  // Cuff texture bumps for fluffy look
  for (let i = 0; i < 5; i++) {
    const bump = document.createElementNS(svgNS, 'ellipse');
    bump.setAttribute('cx', String(14 + i * 9));
    bump.setAttribute('cy', '10');
    bump.setAttribute('rx', '6');
    bump.setAttribute('ry', '5');
    bump.setAttribute('fill', '#fff');
    svg.appendChild(bump);
  }

  return svg;
}

/**
 * Create stockings with candy canes
 * @param {HTMLElement} container - The stockings container element
 * @param {number} count - Number of stockings to create
 */
export function createStockings(container, count = 3) {
  const stockingColors = [
    { main: '#c41e3a', dark: '#8b0000' },
    { main: '#228B22', dark: '#145214' },
    { main: '#c41e3a', dark: '#8b0000' }
  ];

  for (let i = 0; i < count; i++) {
    const colors = stockingColors[i % stockingColors.length];
    const stocking = document.createElement('div');
    stocking.classList.add('stocking');

    // Mini candy cane sticking out
    const candyWrapper = document.createElement('div');
    candyWrapper.classList.add('stocking-candy-cane');
    if (i === 2) {
      candyWrapper.style.transform = `rotate(${-20 + (i * 20)}deg) scaleX(-1)`;
      candyWrapper.style.left = '14px';
    } else {
      candyWrapper.style.transform = `rotate(${-20 + (i * 20)}deg)`;
    }
    candyWrapper.appendChild(createMiniCandyCane(i));
    stocking.appendChild(candyWrapper);

    // SVG stocking
    const stockingSvg = createStockingSVG(colors.main, colors.dark, i);
    stocking.appendChild(stockingSvg);

    container.appendChild(stocking);
  }
}
