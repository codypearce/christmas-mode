/**
 * Elves module - All elf decorations (snowball fight, walking, sledding)
 */

/**
 * Create a single elf element
 * @param {string} type - 'throwing' or 'ducking'
 * @returns {HTMLElement} The elf element
 */
function createElf(type) {
  const elf = document.createElement('div');
  elf.classList.add('elf', type);

  // Hat
  const hat = document.createElement('div');
  hat.classList.add('elf-hat');
  elf.appendChild(hat);

  // Face
  const face = document.createElement('div');
  face.classList.add('elf-face');

  // Ears
  const leftEar = document.createElement('div');
  leftEar.classList.add('elf-ear', 'left');
  face.appendChild(leftEar);

  const rightEar = document.createElement('div');
  rightEar.classList.add('elf-ear', 'right');
  face.appendChild(rightEar);

  // Eyes
  const eyes = document.createElement('div');
  eyes.classList.add('elf-eyes');
  face.appendChild(eyes);

  // Cheeks
  const cheeks = document.createElement('div');
  cheeks.classList.add('elf-cheeks');
  face.appendChild(cheeks);

  // Mouth
  const mouth = document.createElement('div');
  mouth.classList.add('elf-mouth');
  face.appendChild(mouth);

  elf.appendChild(face);

  // Body
  const body = document.createElement('div');
  body.classList.add('elf-body');
  elf.appendChild(body);

  // Legs
  const legs = document.createElement('div');
  legs.classList.add('elf-legs');

  const leftLeg = document.createElement('div');
  leftLeg.classList.add('elf-leg', 'left');
  const leftShoe = document.createElement('div');
  leftShoe.classList.add('elf-shoe', 'left');
  leftLeg.appendChild(leftShoe);
  legs.appendChild(leftLeg);

  const rightLeg = document.createElement('div');
  rightLeg.classList.add('elf-leg', 'right');
  const rightShoe = document.createElement('div');
  rightShoe.classList.add('elf-shoe', 'right');
  rightLeg.appendChild(rightShoe);
  legs.appendChild(rightLeg);

  elf.appendChild(legs);

  // Arms
  const leftArm = document.createElement('div');
  leftArm.classList.add('elf-arm', 'left');
  const leftHand = document.createElement('div');
  leftHand.classList.add('elf-hand');
  leftArm.appendChild(leftHand);
  elf.appendChild(leftArm);

  const rightArm = document.createElement('div');
  rightArm.classList.add('elf-arm', 'right');
  const rightHand = document.createElement('div');
  rightHand.classList.add('elf-hand');
  rightArm.appendChild(rightHand);
  elf.appendChild(rightArm);

  // Add snowball for throwing elf
  if (type === 'throwing') {
    const snowball = document.createElement('div');
    snowball.classList.add('snowball');
    elf.appendChild(snowball);
  }

  return elf;
}

/**
 * Create elves having a snowball fight
 * @param {HTMLElement} container - The elves container element
 */
export function createElves(container) {
  // Clear any existing elves
  container.innerHTML = '';

  // Create throwing elf (on the left)
  const throwingElf = createElf('throwing');
  container.appendChild(throwingElf);

  // Create ducking elf (on the right)
  const duckingElf = createElf('ducking');
  container.appendChild(duckingElf);
}

/**
 * Create a walking elf carrying a present
 * @returns {HTMLElement} The walking elf element
 */
function createWalkingElf() {
  const elf = document.createElement('div');
  elf.classList.add('elf', 'walking');

  // Hat
  const hat = document.createElement('div');
  hat.classList.add('elf-hat');
  elf.appendChild(hat);

  // Face
  const face = document.createElement('div');
  face.classList.add('elf-face');

  // Ears
  const leftEar = document.createElement('div');
  leftEar.classList.add('elf-ear', 'left');
  face.appendChild(leftEar);

  const rightEar = document.createElement('div');
  rightEar.classList.add('elf-ear', 'right');
  face.appendChild(rightEar);

  // Eyes
  const eyes = document.createElement('div');
  eyes.classList.add('elf-eyes');
  face.appendChild(eyes);

  // Cheeks
  const cheeks = document.createElement('div');
  cheeks.classList.add('elf-cheeks');
  face.appendChild(cheeks);

  // Mouth
  const mouth = document.createElement('div');
  mouth.classList.add('elf-mouth');
  face.appendChild(mouth);

  elf.appendChild(face);

  // Body
  const body = document.createElement('div');
  body.classList.add('elf-body');
  elf.appendChild(body);

  // Legs
  const legs = document.createElement('div');
  legs.classList.add('elf-legs');

  const leftLeg = document.createElement('div');
  leftLeg.classList.add('elf-leg', 'left');
  const leftShoe = document.createElement('div');
  leftShoe.classList.add('elf-shoe', 'left');
  leftLeg.appendChild(leftShoe);
  legs.appendChild(leftLeg);

  const rightLeg = document.createElement('div');
  rightLeg.classList.add('elf-leg', 'right');
  const rightShoe = document.createElement('div');
  rightShoe.classList.add('elf-shoe', 'right');
  rightLeg.appendChild(rightShoe);
  legs.appendChild(rightLeg);

  elf.appendChild(legs);

  // Arms (positioned to hold present)
  const leftArm = document.createElement('div');
  leftArm.classList.add('elf-arm', 'left');
  const leftHand = document.createElement('div');
  leftHand.classList.add('elf-hand');
  leftArm.appendChild(leftHand);
  elf.appendChild(leftArm);

  const rightArm = document.createElement('div');
  rightArm.classList.add('elf-arm', 'right');
  const rightHand = document.createElement('div');
  rightHand.classList.add('elf-hand');
  rightArm.appendChild(rightHand);
  elf.appendChild(rightArm);

  // Present box
  const present = document.createElement('div');
  present.classList.add('elf-present');
  const ribbon = document.createElement('div');
  ribbon.classList.add('elf-present-ribbon');
  present.appendChild(ribbon);
  const bow = document.createElement('div');
  bow.classList.add('elf-present-bow');
  present.appendChild(bow);
  elf.appendChild(present);

  return elf;
}

/**
 * Create walking elves carrying presents across the screen
 * @param {HTMLElement} container - The elves container element
 */
export function createWalkingElves(container) {
  const configs = [
    { layer: 'layer-back', reverse: true, delay: 4 },
    { layer: 'layer-mid', reverse: false, delay: 10 },
    { layer: 'layer-front', reverse: true, delay: 16 },
  ];

  configs.forEach((config) => {
    const elf = createWalkingElf();
    elf.classList.add(config.layer);
    if (config.reverse) {
      elf.classList.add('reverse');
    }
    elf.style.animationDelay = `${config.delay}s`;
    container.appendChild(elf);
  });
}

/**
 * Create SVG of elf on sled (side profile view)
 * @returns {SVGElement} The sledding elf SVG
 */
function createSleddingElfSVG() {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 80 50');
  svg.setAttribute('width', '80');
  svg.setAttribute('height', '50');
  svg.style.overflow = 'visible';

  // Sled runners (curved bottom)
  const runner = document.createElementNS(svgNS, 'path');
  runner.setAttribute('d', 'M5,45 Q0,45 0,40 L0,38 Q0,36 2,36 L70,36 Q75,36 75,40 L75,42 Q75,45 70,45 Z');
  runner.setAttribute('fill', '#8B4513');
  runner.setAttribute('stroke', '#5D3A1A');
  runner.setAttribute('stroke-width', '1');
  svg.appendChild(runner);

  // Sled seat/platform
  const seat = document.createElementNS(svgNS, 'rect');
  seat.setAttribute('x', '10');
  seat.setAttribute('y', '30');
  seat.setAttribute('width', '55');
  seat.setAttribute('height', '6');
  seat.setAttribute('rx', '2');
  seat.setAttribute('fill', '#A0522D');
  svg.appendChild(seat);

  // Sled back support
  const back = document.createElementNS(svgNS, 'rect');
  back.setAttribute('x', '58');
  back.setAttribute('y', '20');
  back.setAttribute('width', '4');
  back.setAttribute('height', '12');
  back.setAttribute('rx', '1');
  back.setAttribute('fill', '#8B4513');
  svg.appendChild(back);

  // Elf body (sitting, side profile) - green coat
  const body = document.createElementNS(svgNS, 'ellipse');
  body.setAttribute('cx', '40');
  body.setAttribute('cy', '26');
  body.setAttribute('rx', '10');
  body.setAttribute('ry', '8');
  body.setAttribute('fill', '#228B22');
  svg.appendChild(body);

  // Elf head (side profile)
  const head = document.createElementNS(svgNS, 'circle');
  head.setAttribute('cx', '38');
  head.setAttribute('cy', '12');
  head.setAttribute('r', '8');
  head.setAttribute('fill', '#FDDAB9');
  svg.appendChild(head);

  // Elf ear (pointy, side view)
  const ear = document.createElementNS(svgNS, 'path');
  ear.setAttribute('d', 'M30,12 L26,8 L28,14 Z');
  ear.setAttribute('fill', '#FDDAB9');
  svg.appendChild(ear);

  // Elf hat (pointy, side profile)
  const hat = document.createElementNS(svgNS, 'path');
  hat.setAttribute('d', 'M30,8 L38,0 L48,6 L46,10 Q40,8 32,10 Z');
  hat.setAttribute('fill', '#228B22');
  svg.appendChild(hat);

  // Hat pom-pom
  const pompom = document.createElementNS(svgNS, 'circle');
  pompom.setAttribute('cx', '38');
  pompom.setAttribute('cy', '0');
  pompom.setAttribute('r', '3');
  pompom.setAttribute('fill', '#FFD700');
  svg.appendChild(pompom);

  // Hat brim
  const brim = document.createElementNS(svgNS, 'path');
  brim.setAttribute('d', 'M30,10 Q38,7 46,10 Q38,12 30,10');
  brim.setAttribute('fill', '#C41E3A');
  svg.appendChild(brim);

  // Eye
  const eye = document.createElementNS(svgNS, 'circle');
  eye.setAttribute('cx', '42');
  eye.setAttribute('cy', '11');
  eye.setAttribute('r', '1.5');
  eye.setAttribute('fill', '#333');
  svg.appendChild(eye);

  // Rosy cheek
  const cheek = document.createElementNS(svgNS, 'circle');
  cheek.setAttribute('cx', '44');
  cheek.setAttribute('cy', '14');
  cheek.setAttribute('r', '2');
  cheek.setAttribute('fill', 'rgba(255,150,150,0.5)');
  svg.appendChild(cheek);

  // Smile
  const smile = document.createElementNS(svgNS, 'path');
  smile.setAttribute('d', 'M40,16 Q43,18 45,16');
  smile.setAttribute('stroke', '#C47A7A');
  smile.setAttribute('stroke-width', '1');
  smile.setAttribute('fill', 'none');
  svg.appendChild(smile);

  // Arm holding sled rope (bent forward)
  const arm = document.createElementNS(svgNS, 'path');
  arm.setAttribute('d', 'M35,22 Q28,24 22,22');
  arm.setAttribute('stroke', '#228B22');
  arm.setAttribute('stroke-width', '4');
  arm.setAttribute('stroke-linecap', 'round');
  arm.setAttribute('fill', 'none');
  svg.appendChild(arm);

  // Hand
  const hand = document.createElementNS(svgNS, 'circle');
  hand.setAttribute('cx', '22');
  hand.setAttribute('cy', '22');
  hand.setAttribute('r', '3');
  hand.setAttribute('fill', '#FDDAB9');
  svg.appendChild(hand);

  // Rope from hand to front of sled
  const rope = document.createElementNS(svgNS, 'path');
  rope.setAttribute('d', 'M22,24 Q15,30 10,34');
  rope.setAttribute('stroke', '#8B7355');
  rope.setAttribute('stroke-width', '1.5');
  rope.setAttribute('fill', 'none');
  svg.appendChild(rope);

  // Legs (bent, sitting position)
  const legs = document.createElementNS(svgNS, 'path');
  legs.setAttribute('d', 'M35,32 Q30,36 25,34');
  legs.setAttribute('stroke', '#C41E3A');
  legs.setAttribute('stroke-width', '5');
  legs.setAttribute('stroke-linecap', 'round');
  legs.setAttribute('fill', 'none');
  svg.appendChild(legs);

  // Curly-toed shoe
  const shoe = document.createElementNS(svgNS, 'path');
  shoe.setAttribute('d', 'M23,33 L18,34 Q15,34 14,32 Q15,31 18,32 L23,31 Z');
  shoe.setAttribute('fill', '#228B22');
  svg.appendChild(shoe);

  // Shoe bell
  const shoeBell = document.createElementNS(svgNS, 'circle');
  shoeBell.setAttribute('cx', '14');
  shoeBell.setAttribute('cy', '32');
  shoeBell.setAttribute('r', '2');
  shoeBell.setAttribute('fill', '#FFD700');
  svg.appendChild(shoeBell);

  // Belt
  const belt = document.createElementNS(svgNS, 'ellipse');
  belt.setAttribute('cx', '40');
  belt.setAttribute('cy', '28');
  belt.setAttribute('rx', '10');
  belt.setAttribute('ry', '2');
  belt.setAttribute('fill', '#1A1A1A');
  svg.appendChild(belt);

  // Belt buckle
  const buckle = document.createElementNS(svgNS, 'rect');
  buckle.setAttribute('x', '38');
  buckle.setAttribute('y', '26');
  buckle.setAttribute('width', '4');
  buckle.setAttribute('height', '4');
  buckle.setAttribute('fill', '#FFD700');
  svg.appendChild(buckle);

  return svg;
}

/**
 * Create a sledding elf element
 * @returns {HTMLElement} The sledding elf wrapper
 */
function createSleddingElf() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('sledding-elf');
  wrapper.appendChild(createSleddingElfSVG());
  return wrapper;
}

/**
 * Create sledding elves zooming across the screen
 * @param {HTMLElement} container - The elves container element
 */
export function createSleddingElves(container) {
  const configs = [
    { layer: 'layer-mid', reverse: false, delay: 7 },
    { layer: 'layer-front', reverse: true, delay: 20 },
  ];

  configs.forEach((config) => {
    const elf = createSleddingElf();
    elf.classList.add(config.layer);
    if (config.reverse) {
      elf.classList.add('reverse');
    }
    elf.style.animationDelay = `${config.delay}s`;
    container.appendChild(elf);
  });
}
