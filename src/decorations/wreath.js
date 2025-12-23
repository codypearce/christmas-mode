/**
 * Wreath module - Wreath decoration with bow
 */

/**
 * Create an SVG wreath
 * @param {number} size - Diameter of the wreath
 * @returns {SVGElement} The wreath SVG
 */
function createWreathSVG(size = 120) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 120 120');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);

  const cx = 60;
  const cy = 60;
  const outerRadius = 50;
  const innerRadius = 30;

  // Simple green ring for the wreath body
  const ring = document.createElementNS(svgNS, 'circle');
  ring.setAttribute('cx', cx);
  ring.setAttribute('cy', cy);
  ring.setAttribute('r', (outerRadius + innerRadius) / 2);
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', '#228B22');
  ring.setAttribute('stroke-width', outerRadius - innerRadius);
  svg.appendChild(ring);

  // Add simple leaf shapes around the wreath
  const numLeaves = 16;
  for (let i = 0; i < numLeaves; i++) {
    const angle = (i / numLeaves) * Math.PI * 2;
    const midRadius = (outerRadius + innerRadius) / 2;
    const x = cx + Math.cos(angle) * midRadius;
    const y = cy + Math.sin(angle) * midRadius;

    // Simple leaf pointing outward
    const leaf = document.createElementNS(svgNS, 'ellipse');
    leaf.setAttribute('cx', x + Math.cos(angle) * 8);
    leaf.setAttribute('cy', y + Math.sin(angle) * 8);
    leaf.setAttribute('rx', '8');
    leaf.setAttribute('ry', '4');
    leaf.setAttribute('fill', '#1a6b1a');
    leaf.setAttribute('transform', `rotate(${angle * 180 / Math.PI + 90} ${x + Math.cos(angle) * 8} ${y + Math.sin(angle) * 8})`);
    svg.appendChild(leaf);
  }

  // Add simple red berries
  const numBerries = 8;
  for (let i = 0; i < numBerries; i++) {
    const angle = (i / numBerries) * Math.PI * 2 + Math.PI / 8;
    const midRadius = (outerRadius + innerRadius) / 2;
    const x = cx + Math.cos(angle) * midRadius;
    const y = cy + Math.sin(angle) * midRadius;

    const berry = document.createElementNS(svgNS, 'circle');
    berry.setAttribute('cx', x);
    berry.setAttribute('cy', y);
    berry.setAttribute('r', '5');
    berry.setAttribute('fill', '#c41e3a');
    svg.appendChild(berry);
  }

  // Add simple gold ornaments
  const numOrnaments = 4;
  for (let i = 0; i < numOrnaments; i++) {
    const angle = (i / numOrnaments) * Math.PI * 2;
    const midRadius = (outerRadius + innerRadius) / 2;
    const x = cx + Math.cos(angle) * midRadius;
    const y = cy + Math.sin(angle) * midRadius;

    const ornament = document.createElementNS(svgNS, 'circle');
    ornament.setAttribute('cx', x);
    ornament.setAttribute('cy', y);
    ornament.setAttribute('r', '7');
    ornament.setAttribute('fill', '#ffd700');
    svg.appendChild(ornament);
  }

  return svg;
}

/**
 * Create wreath decoration
 * @param {HTMLElement} container - The wreath container element
 */
export function createWreath(container) {
  container.innerHTML = '';

  const wreath = document.createElement('div');
  wreath.classList.add('wreath');

  // Create SVG wreath
  const svg = createWreathSVG(140);
  wreath.appendChild(svg);

  // Create bow
  const bow = document.createElement('div');
  bow.classList.add('wreath-bow');

  const loopLeft = document.createElement('div');
  loopLeft.classList.add('wreath-bow-loop', 'left');
  bow.appendChild(loopLeft);

  const loopRight = document.createElement('div');
  loopRight.classList.add('wreath-bow-loop', 'right');
  bow.appendChild(loopRight);

  const bowCenter = document.createElement('div');
  bowCenter.classList.add('wreath-bow-center');
  bow.appendChild(bowCenter);

  const tailLeft = document.createElement('div');
  tailLeft.classList.add('wreath-bow-tail', 'left');
  const tailLeftEnd = document.createElement('div');
  tailLeftEnd.classList.add('wreath-bow-tail-end');
  tailLeft.appendChild(tailLeftEnd);
  bow.appendChild(tailLeft);

  const tailRight = document.createElement('div');
  tailRight.classList.add('wreath-bow-tail', 'right');
  const tailRightEnd = document.createElement('div');
  tailRightEnd.classList.add('wreath-bow-tail-end');
  tailRight.appendChild(tailRightEnd);
  bow.appendChild(tailRight);

  wreath.appendChild(bow);

  container.appendChild(wreath);
}
