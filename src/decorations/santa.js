/**
 * Santa module - Background Santa with sleigh and reindeer
 */

/**
 * Create an SVG of Santa's sleigh with 4 reindeer
 * @returns {SVGElement} The complete Santa sleigh SVG
 */
function createBackgroundSantaSVG() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 330 75');
  svg.setAttribute('width', '330');
  svg.setAttribute('height', '75');
  svg.style.overflow = 'visible';

  // Defs for gradients
  const defs = document.createElementNS(svgNS, 'defs');

  // Reindeer body gradient
  const reindeerGrad = document.createElementNS(svgNS, 'linearGradient');
  reindeerGrad.setAttribute('id', 'reindeer-body-grad');
  reindeerGrad.setAttribute('x1', '0%');
  reindeerGrad.setAttribute('y1', '0%');
  reindeerGrad.setAttribute('x2', '0%');
  reindeerGrad.setAttribute('y2', '100%');
  reindeerGrad.innerHTML = `
    <stop offset="0%" stop-color="#8B4513"/>
    <stop offset="50%" stop-color="#6B3410"/>
    <stop offset="100%" stop-color="#5a2d0c"/>
  `;
  defs.appendChild(reindeerGrad);

  // Sleigh gradient
  const sleighGrad = document.createElementNS(svgNS, 'linearGradient');
  sleighGrad.setAttribute('id', 'sleigh-grad');
  sleighGrad.setAttribute('x1', '0%');
  sleighGrad.setAttribute('y1', '0%');
  sleighGrad.setAttribute('x2', '0%');
  sleighGrad.setAttribute('y2', '100%');
  sleighGrad.innerHTML = `
    <stop offset="0%" stop-color="#c41e3a"/>
    <stop offset="50%" stop-color="#a01830"/>
    <stop offset="100%" stop-color="#801020"/>
  `;
  defs.appendChild(sleighGrad);

  // Santa suit gradient
  const santaGrad = document.createElementNS(svgNS, 'linearGradient');
  santaGrad.setAttribute('id', 'santa-suit-grad');
  santaGrad.innerHTML = `
    <stop offset="0%" stop-color="#e23c3c"/>
    <stop offset="100%" stop-color="#c41e3a"/>
  `;
  defs.appendChild(santaGrad);

  // Add glow filter for Rudolph's nose
  const glowFilter = document.createElementNS(svgNS, 'filter');
  glowFilter.setAttribute('id', 'glow');
  glowFilter.setAttribute('x', '-50%');
  glowFilter.setAttribute('y', '-50%');
  glowFilter.setAttribute('width', '200%');
  glowFilter.setAttribute('height', '200%');
  glowFilter.innerHTML = `
    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  `;
  defs.appendChild(glowFilter);

  svg.appendChild(defs);

  /**
   * Create a single reindeer facing RIGHT (nose on right, tail on left)
   * Reindeer width is ~40px, height is ~30px
   */
  let reindeerIndex = 0;
  const createReindeer = (x, y, isRudolph = false) => {
    // Outer group for positioning
    const outerGroup = document.createElementNS(svgNS, 'g');
    outerGroup.setAttribute('transform', `translate(${x}, ${y})`);

    // Inner group for bobbing animation
    const group = document.createElementNS(svgNS, 'g');
    group.classList.add('reindeer-body');
    group.style.animationDelay = `${reindeerIndex * 0.15}s`;
    reindeerIndex++;

    // Tail (on the LEFT side, behind the body)
    const tail = document.createElementNS(svgNS, 'ellipse');
    tail.setAttribute('cx', '3');
    tail.setAttribute('cy', '10');
    tail.setAttribute('rx', '3');
    tail.setAttribute('ry', '2');
    tail.setAttribute('fill', '#d4a574');
    group.appendChild(tail);

    // Body (oval) - centered around x=20
    const body = document.createElementNS(svgNS, 'ellipse');
    body.setAttribute('cx', '20');
    body.setAttribute('cy', '12');
    body.setAttribute('rx', '12');
    body.setAttribute('ry', '8');
    body.setAttribute('fill', 'url(#reindeer-body-grad)');
    group.appendChild(body);

    // Neck (connects body to head, on the RIGHT side)
    const neck = document.createElementNS(svgNS, 'rect');
    neck.setAttribute('x', '28');
    neck.setAttribute('y', '6');
    neck.setAttribute('width', '8');
    neck.setAttribute('height', '8');
    neck.setAttribute('fill', '#7a3c11');
    group.appendChild(neck);

    // Head (on the RIGHT side, facing right)
    const head = document.createElementNS(svgNS, 'ellipse');
    head.setAttribute('cx', '38');
    head.setAttribute('cy', '6');
    head.setAttribute('rx', '6');
    head.setAttribute('ry', '5');
    head.setAttribute('fill', '#8B4513');
    group.appendChild(head);

    // Antlers (on top of head, spreading upward)
    const createAntler = (ax, ay, flip) => {
      const antler = document.createElementNS(svgNS, 'path');
      const scaleX = flip ? -1 : 1;
      antler.setAttribute('d', `M ${ax} ${ay}
        l ${2 * scaleX} -6
        l ${2 * scaleX} 2
        m ${-2 * scaleX} -2
        l ${1.5 * scaleX} -4
        l ${1 * scaleX} 1.5
        m ${-2.5 * scaleX} -5.5
        l ${-0.5 * scaleX} -2`);
      antler.setAttribute('stroke', '#5a2d0c');
      antler.setAttribute('stroke-width', '1.5');
      antler.setAttribute('fill', 'none');
      antler.setAttribute('stroke-linecap', 'round');
      return antler;
    };

    group.appendChild(createAntler(36, 2, false));
    group.appendChild(createAntler(40, 2, true));

    // Eye (on head, looking forward/right)
    const eye = document.createElementNS(svgNS, 'circle');
    eye.setAttribute('cx', '40');
    eye.setAttribute('cy', '5');
    eye.setAttribute('r', '1.5');
    eye.setAttribute('fill', '#1a1a1a');
    group.appendChild(eye);

    // Nose (at the front/right of head)
    const nose = document.createElementNS(svgNS, 'circle');
    nose.setAttribute('cx', '44');
    nose.setAttribute('cy', '7');
    nose.setAttribute('r', '2');
    nose.setAttribute('fill', isRudolph ? '#ff0000' : '#2a1810');
    if (isRudolph) {
      nose.setAttribute('filter', 'url(#glow)');
    }
    group.appendChild(nose);

    // Legs (back legs on left, front legs on right)
    // Back legs (x = 12, 16) - animate opposite to front legs
    const backLegPositions = [12, 16];
    backLegPositions.forEach((lx, i) => {
      const legGroup = document.createElementNS(svgNS, 'g');
      legGroup.classList.add('reindeer-leg', 'back-leg');
      legGroup.style.transformOrigin = `${lx + 1.5}px 18px`;
      legGroup.style.animationDelay = `${i * 0.1}s`;

      const leg = document.createElementNS(svgNS, 'rect');
      leg.setAttribute('x', lx);
      leg.setAttribute('y', '18');
      leg.setAttribute('width', '3');
      leg.setAttribute('height', '10');
      leg.setAttribute('fill', '#6B3410');
      leg.setAttribute('rx', '1');
      legGroup.appendChild(leg);

      const hoof = document.createElementNS(svgNS, 'rect');
      hoof.setAttribute('x', lx - 0.5);
      hoof.setAttribute('y', '26');
      hoof.setAttribute('width', '4');
      hoof.setAttribute('height', '3');
      hoof.setAttribute('fill', '#2a1810');
      hoof.setAttribute('rx', '1');
      legGroup.appendChild(hoof);

      group.appendChild(legGroup);
    });

    // Front legs (x = 24, 28) - animate opposite to back legs
    const frontLegPositions = [24, 28];
    frontLegPositions.forEach((lx, i) => {
      const legGroup = document.createElementNS(svgNS, 'g');
      legGroup.classList.add('reindeer-leg', 'front-leg');
      legGroup.style.transformOrigin = `${lx + 1.5}px 18px`;
      legGroup.style.animationDelay = `${i * 0.1}s`;

      const leg = document.createElementNS(svgNS, 'rect');
      leg.setAttribute('x', lx);
      leg.setAttribute('y', '18');
      leg.setAttribute('width', '3');
      leg.setAttribute('height', '10');
      leg.setAttribute('fill', '#6B3410');
      leg.setAttribute('rx', '1');
      legGroup.appendChild(leg);

      const hoof = document.createElementNS(svgNS, 'rect');
      hoof.setAttribute('x', lx - 0.5);
      hoof.setAttribute('y', '26');
      hoof.setAttribute('width', '4');
      hoof.setAttribute('height', '3');
      hoof.setAttribute('fill', '#2a1810');
      hoof.setAttribute('rx', '1');
      legGroup.appendChild(hoof);

      group.appendChild(legGroup);
    });

    outerGroup.appendChild(group);
    return outerGroup;
  };

  // Sleigh is on the LEFT (being pulled)
  const sleighGroup = document.createElementNS(svgNS, 'g');
  sleighGroup.setAttribute('transform', 'translate(0, 25)');

  // Reins (connecting sleigh to reindeer - going from left to right)
  const reins = document.createElementNS(svgNS, 'g');
  reins.setAttribute('stroke', '#8B4513');
  reins.setAttribute('stroke-width', '1.5');
  reins.setAttribute('fill', 'none');

  // Main harness lines running through all reindeer pairs to Rudolph at front
  const rein1 = document.createElementNS(svgNS, 'path');
  rein1.setAttribute('d', 'M 100 38 L 130 36 L 170 38 L 210 36 L 250 38 L 290 40');
  reins.appendChild(rein1);

  const rein2 = document.createElementNS(svgNS, 'path');
  rein2.setAttribute('d', 'M 100 55 L 130 57 L 170 55 L 210 57 L 250 55 L 290 52');
  reins.appendChild(rein2);

  svg.appendChild(reins);

  // Create 9 reindeer in pairs - on the RIGHT (in front, pulling)
  // Row 1 (closest to sleigh) - Dasher & Dancer
  svg.appendChild(createReindeer(115, 25, false));
  svg.appendChild(createReindeer(115, 42, false));
  // Row 2 - Prancer & Vixen
  svg.appendChild(createReindeer(155, 25, false));
  svg.appendChild(createReindeer(155, 42, false));
  // Row 3 - Comet & Cupid
  svg.appendChild(createReindeer(195, 25, false));
  svg.appendChild(createReindeer(195, 42, false));
  // Row 4 - Donner & Blitzen
  svg.appendChild(createReindeer(235, 25, false));
  svg.appendChild(createReindeer(235, 42, false));
  // Row 5 (front) - Rudolph leads!
  svg.appendChild(createReindeer(275, 33, true));

  // Gift sack (added first so it's behind sleigh - z-order)
  const sack = document.createElementNS(svgNS, 'ellipse');
  sack.setAttribute('cx', '25');
  sack.setAttribute('cy', '20');
  sack.setAttribute('rx', '18');
  sack.setAttribute('ry', '22');
  sack.setAttribute('fill', '#8b4513');
  sleighGroup.appendChild(sack);

  // Sack tie
  const sackTie = document.createElementNS(svgNS, 'path');
  sackTie.setAttribute('d', 'M 15 2 Q 25 -2 35 2');
  sackTie.setAttribute('stroke', '#d4a574');
  sackTie.setAttribute('stroke-width', '4');
  sackTie.setAttribute('fill', 'none');
  sleighGroup.appendChild(sackTie);

  // Gift box popping out of sack
  const giftBox = document.createElementNS(svgNS, 'rect');
  giftBox.setAttribute('x', '18');
  giftBox.setAttribute('y', '-8');
  giftBox.setAttribute('width', '14');
  giftBox.setAttribute('height', '12');
  giftBox.setAttribute('fill', '#e63946');
  giftBox.setAttribute('rx', '1');
  sleighGroup.appendChild(giftBox);

  // Gift ribbon vertical
  const ribbonV = document.createElementNS(svgNS, 'rect');
  ribbonV.setAttribute('x', '24');
  ribbonV.setAttribute('y', '-8');
  ribbonV.setAttribute('width', '3');
  ribbonV.setAttribute('height', '12');
  ribbonV.setAttribute('fill', '#ffd700');
  sleighGroup.appendChild(ribbonV);

  // Gift ribbon horizontal
  const ribbonH = document.createElementNS(svgNS, 'rect');
  ribbonH.setAttribute('x', '18');
  ribbonH.setAttribute('y', '-3');
  ribbonH.setAttribute('width', '14');
  ribbonH.setAttribute('height', '3');
  ribbonH.setAttribute('fill', '#ffd700');
  sleighGroup.appendChild(ribbonH);

  // Gift bow
  const bow = document.createElementNS(svgNS, 'path');
  bow.setAttribute('d', 'M 22 -8 Q 20 -12 22 -14 Q 25 -12 25.5 -8 M 29 -8 Q 31 -12 29 -14 Q 26 -12 25.5 -8');
  bow.setAttribute('fill', '#ffd700');
  bow.setAttribute('stroke', '#daa520');
  bow.setAttribute('stroke-width', '0.5');
  sleighGroup.appendChild(bow);

  // Sleigh body
  const sleighBody = document.createElementNS(svgNS, 'path');
  sleighBody.setAttribute('d', `
    M 10 20
    Q 0 20 0 30
    L 0 40
    Q 0 50 15 50
    L 100 50
    Q 115 50 120 40
    L 120 25
    Q 120 15 105 15
    L 25 15
    Q 10 15 10 20
    Z
  `);
  sleighBody.setAttribute('fill', 'url(#sleigh-grad)');
  sleighBody.setAttribute('stroke', '#8B0000');
  sleighBody.setAttribute('stroke-width', '2');
  sleighGroup.appendChild(sleighBody);

  // Sleigh runner
  const runner = document.createElementNS(svgNS, 'path');
  runner.setAttribute('d', 'M -5 52 Q 0 55 20 55 L 110 55 Q 130 55 125 50');
  runner.setAttribute('stroke', '#ffd700');
  runner.setAttribute('stroke-width', '4');
  runner.setAttribute('fill', 'none');
  runner.setAttribute('stroke-linecap', 'round');
  sleighGroup.appendChild(runner);

  // Gold trim on sleigh
  const trim = document.createElementNS(svgNS, 'path');
  trim.setAttribute('d', 'M 15 15 L 105 15');
  trim.setAttribute('stroke', '#ffd700');
  trim.setAttribute('stroke-width', '3');
  trim.setAttribute('stroke-linecap', 'round');
  sleighGroup.appendChild(trim);

  // Santa (in sleigh, moved up 10px from original -15 to -25)
  const santaGroup = document.createElementNS(svgNS, 'g');
  santaGroup.setAttribute('transform', 'translate(45, -25)');

  // Santa body
  const santaBody = document.createElementNS(svgNS, 'ellipse');
  santaBody.setAttribute('cx', '20');
  santaBody.setAttribute('cy', '30');
  santaBody.setAttribute('rx', '18');
  santaBody.setAttribute('ry', '20');
  santaBody.setAttribute('fill', 'url(#santa-suit-grad)');
  santaGroup.appendChild(santaBody);

  // Belt
  const belt = document.createElementNS(svgNS, 'rect');
  belt.setAttribute('x', '5');
  belt.setAttribute('y', '32');
  belt.setAttribute('width', '30');
  belt.setAttribute('height', '5');
  belt.setAttribute('fill', '#1a1a1a');
  santaGroup.appendChild(belt);

  // Belt buckle
  const buckle = document.createElementNS(svgNS, 'rect');
  buckle.setAttribute('x', '16');
  buckle.setAttribute('y', '31');
  buckle.setAttribute('width', '8');
  buckle.setAttribute('height', '7');
  buckle.setAttribute('fill', '#ffd700');
  buckle.setAttribute('rx', '1');
  santaGroup.appendChild(buckle);

  // Santa head
  const santaHead = document.createElementNS(svgNS, 'circle');
  santaHead.setAttribute('cx', '20');
  santaHead.setAttribute('cy', '5');
  santaHead.setAttribute('r', '10');
  santaHead.setAttribute('fill', '#ffdab9');
  santaGroup.appendChild(santaHead);

  // Santa hat
  const hat = document.createElementNS(svgNS, 'path');
  hat.setAttribute('d', 'M 8 2 Q 20 -15 32 2 L 30 5 Q 20 -5 10 5 Z');
  hat.setAttribute('fill', '#c41e3a');
  santaGroup.appendChild(hat);

  // Hat pom pom
  const pomPom = document.createElementNS(svgNS, 'circle');
  pomPom.setAttribute('cx', '32');
  pomPom.setAttribute('cy', '0');
  pomPom.setAttribute('r', '4');
  pomPom.setAttribute('fill', '#fff');
  santaGroup.appendChild(pomPom);

  // Hat brim (white fur)
  const hatBrim = document.createElementNS(svgNS, 'rect');
  hatBrim.setAttribute('x', '8');
  hatBrim.setAttribute('y', '0');
  hatBrim.setAttribute('width', '24');
  hatBrim.setAttribute('height', '5');
  hatBrim.setAttribute('fill', '#fff');
  hatBrim.setAttribute('rx', '2');
  santaGroup.appendChild(hatBrim);

  // Beard
  const beard = document.createElementNS(svgNS, 'ellipse');
  beard.setAttribute('cx', '20');
  beard.setAttribute('cy', '12');
  beard.setAttribute('rx', '9');
  beard.setAttribute('ry', '8');
  beard.setAttribute('fill', '#fff');
  santaGroup.appendChild(beard);

  // Eyes
  const leftEye = document.createElementNS(svgNS, 'circle');
  leftEye.setAttribute('cx', '16');
  leftEye.setAttribute('cy', '3');
  leftEye.setAttribute('r', '1.5');
  leftEye.setAttribute('fill', '#1a1a1a');
  santaGroup.appendChild(leftEye);

  const rightEye = document.createElementNS(svgNS, 'circle');
  rightEye.setAttribute('cx', '24');
  rightEye.setAttribute('cy', '3');
  rightEye.setAttribute('r', '1.5');
  rightEye.setAttribute('fill', '#1a1a1a');
  santaGroup.appendChild(rightEye);

  // Nose
  const santaNose = document.createElementNS(svgNS, 'circle');
  santaNose.setAttribute('cx', '20');
  santaNose.setAttribute('cy', '6');
  santaNose.setAttribute('r', '2.5');
  santaNose.setAttribute('fill', '#e8a090');
  santaGroup.appendChild(santaNose);

  // Arm waving
  const arm = document.createElementNS(svgNS, 'path');
  arm.setAttribute('d', 'M 35 25 Q 50 15 48 5');
  arm.setAttribute('stroke', '#c41e3a');
  arm.setAttribute('stroke-width', '8');
  arm.setAttribute('fill', 'none');
  arm.setAttribute('stroke-linecap', 'round');
  santaGroup.appendChild(arm);

  // Mitten
  const mitten = document.createElementNS(svgNS, 'circle');
  mitten.setAttribute('cx', '48');
  mitten.setAttribute('cy', '3');
  mitten.setAttribute('r', '5');
  mitten.setAttribute('fill', '#fff');
  santaGroup.appendChild(mitten);

  // Insert Santa BEFORE sleigh body so he appears behind it (z-order)
  sleighGroup.insertBefore(santaGroup, sleighBody);

  svg.appendChild(sleighGroup);

  return svg;
}

/**
 * Create background Santa with sleigh that flies across screen
 * @param {HTMLElement} container - The santa container element
 */
export function createBackgroundSanta(container) {
  // Remove any existing background Santa
  const existing = container.querySelector('.background-santa');
  if (existing) existing.remove();

  const wrapper = document.createElement('div');
  wrapper.classList.add('background-santa');

  const svg = createBackgroundSantaSVG();
  wrapper.appendChild(svg);

  container.appendChild(wrapper);
}
