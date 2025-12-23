/**
 * Holly module - Holly decoration with berries
 */

/**
 * Create an SVG holly decoration
 * @param {number} scale - Scale factor for the holly
 * @returns {SVGElement} The holly SVG
 */
function createHollySVG(scale = 1) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  const width = 80 * scale;
  const height = 60 * scale;
  svg.setAttribute('viewBox', '0 0 80 60');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);

  // Defs for gradients
  const defs = document.createElementNS(svgNS, 'defs');

  // Leaf gradient
  const leafGradId = `holly-leaf-${Math.random().toString(36).substr(2, 9)}`;
  const leafGrad = document.createElementNS(svgNS, 'linearGradient');
  leafGrad.setAttribute('id', leafGradId);
  leafGrad.setAttribute('x1', '0%');
  leafGrad.setAttribute('y1', '0%');
  leafGrad.setAttribute('x2', '100%');
  leafGrad.setAttribute('y2', '100%');
  leafGrad.innerHTML = `
    <stop offset="0%" stop-color="#2d5a27"/>
    <stop offset="50%" stop-color="#1e7b1e"/>
    <stop offset="100%" stop-color="#155415"/>
  `;
  defs.appendChild(leafGrad);

  // Berry gradient
  const berryGradId = `holly-berry-${Math.random().toString(36).substr(2, 9)}`;
  const berryGrad = document.createElementNS(svgNS, 'radialGradient');
  berryGrad.setAttribute('id', berryGradId);
  berryGrad.innerHTML = `
    <stop offset="0%" stop-color="#ff4444"/>
    <stop offset="70%" stop-color="#cc0000"/>
    <stop offset="100%" stop-color="#880000"/>
  `;
  defs.appendChild(berryGrad);

  svg.appendChild(defs);

  // Create spiky holly leaf
  const createLeaf = (cx, cy, angle, size) => {
    const leaf = document.createElementNS(svgNS, 'path');
    const s = size;
    const d = `
      M ${cx} ${cy}
      Q ${cx - s * 0.3} ${cy - s * 0.2} ${cx - s * 0.5} ${cy - s * 0.4}
      L ${cx - s * 0.35} ${cy - s * 0.3}
      Q ${cx - s * 0.5} ${cy - s * 0.5} ${cx - s * 0.4} ${cy - s * 0.7}
      L ${cx - s * 0.25} ${cy - s * 0.55}
      Q ${cx - s * 0.2} ${cy - s * 0.8} ${cx} ${cy - s}
      Q ${cx + s * 0.2} ${cy - s * 0.8} ${cx + s * 0.25} ${cy - s * 0.55}
      L ${cx + s * 0.4} ${cy - s * 0.7}
      Q ${cx + s * 0.5} ${cy - s * 0.5} ${cx + s * 0.35} ${cy - s * 0.3}
      L ${cx + s * 0.5} ${cy - s * 0.4}
      Q ${cx + s * 0.3} ${cy - s * 0.2} ${cx} ${cy}
      Z
    `;
    leaf.setAttribute('d', d);
    leaf.setAttribute('fill', `url(#${leafGradId})`);
    leaf.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`);
    return leaf;
  };

  // Add leaves in different directions
  svg.appendChild(createLeaf(40, 35, -30, 28));
  svg.appendChild(createLeaf(40, 35, 30, 28));
  svg.appendChild(createLeaf(40, 35, 0, 30));

  // Add berries in center
  const berryPositions = [
    { x: 40, y: 32 },
    { x: 35, y: 38 },
    { x: 45, y: 38 },
  ];

  berryPositions.forEach(pos => {
    const berry = document.createElementNS(svgNS, 'circle');
    berry.setAttribute('cx', pos.x);
    berry.setAttribute('cy', pos.y);
    berry.setAttribute('r', '6');
    berry.setAttribute('fill', `url(#${berryGradId})`);
    svg.appendChild(berry);

    // Highlight on berry
    const highlight = document.createElementNS(svgNS, 'circle');
    highlight.setAttribute('cx', pos.x - 2);
    highlight.setAttribute('cy', pos.y - 2);
    highlight.setAttribute('r', '2');
    highlight.setAttribute('fill', 'rgba(255, 255, 255, 0.5)');
    svg.appendChild(highlight);
  });

  return svg;
}

/**
 * Create holly decorations on content cards
 * @param {HTMLElement} container - The holly container element (unused, holly goes on cards)
 */
export function createHolly(container) {
  container.innerHTML = '';

  // Add holly to each content card
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, cardIndex) => {
    // Add holly to top-left corner of each card
    const holly = document.createElement('div');
    holly.classList.add('holly', 'card-holly');
    holly.style.animationDelay = `${cardIndex * 0.15}s`;

    const svg = createHollySVG(0.8);
    holly.appendChild(svg);

    // Position relative to the card
    card.style.position = 'relative';
    card.appendChild(holly);
  });
}
