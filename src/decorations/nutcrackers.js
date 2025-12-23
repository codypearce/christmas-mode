/**
 * Nutcrackers module - Marching nutcracker soldiers
 */

/**
 * Create a single nutcracker soldier
 * @returns {HTMLElement} The nutcracker element
 */
function createNutcracker() {
  const nutcracker = document.createElement('div');
  nutcracker.classList.add('nutcracker');

  // Tall black hat with gold trim
  const hat = document.createElement('div');
  hat.classList.add('nutcracker-hat');

  const hatTop = document.createElement('div');
  hatTop.classList.add('nutcracker-hat-top');
  hat.appendChild(hatTop);

  const hatPlume = document.createElement('div');
  hatPlume.classList.add('nutcracker-hat-plume');
  hat.appendChild(hatPlume);

  nutcracker.appendChild(hat);

  // Hair (curly sides)
  const hairLeft = document.createElement('div');
  hairLeft.classList.add('nutcracker-hair', 'left');
  nutcracker.appendChild(hairLeft);

  const hairRight = document.createElement('div');
  hairRight.classList.add('nutcracker-hair', 'right');
  nutcracker.appendChild(hairRight);

  // Face
  const face = document.createElement('div');
  face.classList.add('nutcracker-face');

  // Eyes
  const eyes = document.createElement('div');
  eyes.classList.add('nutcracker-eyes');
  face.appendChild(eyes);

  // Nose
  const nose = document.createElement('div');
  nose.classList.add('nutcracker-nose');
  face.appendChild(nose);

  // Mustache
  const mustache = document.createElement('div');
  mustache.classList.add('nutcracker-mustache');
  face.appendChild(mustache);

  // Mouth (opens and closes)
  const mouth = document.createElement('div');
  mouth.classList.add('nutcracker-mouth');
  face.appendChild(mouth);

  nutcracker.appendChild(face);

  // Red jacket body
  const body = document.createElement('div');
  body.classList.add('nutcracker-body');

  // Gold buttons
  const buttons = document.createElement('div');
  buttons.classList.add('nutcracker-buttons');
  body.appendChild(buttons);

  // Epaulettes (shoulder decorations)
  const epauletteLeft = document.createElement('div');
  epauletteLeft.classList.add('nutcracker-epaulette', 'left');
  body.appendChild(epauletteLeft);

  const epauletteRight = document.createElement('div');
  epauletteRight.classList.add('nutcracker-epaulette', 'right');
  body.appendChild(epauletteRight);

  nutcracker.appendChild(body);

  // Arms
  const armLeft = document.createElement('div');
  armLeft.classList.add('nutcracker-arm', 'left');
  const handLeft = document.createElement('div');
  handLeft.classList.add('nutcracker-hand');
  armLeft.appendChild(handLeft);
  nutcracker.appendChild(armLeft);

  const armRight = document.createElement('div');
  armRight.classList.add('nutcracker-arm', 'right');
  const handRight = document.createElement('div');
  handRight.classList.add('nutcracker-hand');
  armRight.appendChild(handRight);
  nutcracker.appendChild(armRight);

  // Belt
  const belt = document.createElement('div');
  belt.classList.add('nutcracker-belt');
  nutcracker.appendChild(belt);

  // Legs
  const legs = document.createElement('div');
  legs.classList.add('nutcracker-legs');

  const legLeft = document.createElement('div');
  legLeft.classList.add('nutcracker-leg', 'left');
  const bootLeft = document.createElement('div');
  bootLeft.classList.add('nutcracker-boot');
  legLeft.appendChild(bootLeft);
  legs.appendChild(legLeft);

  const legRight = document.createElement('div');
  legRight.classList.add('nutcracker-leg', 'right');
  const bootRight = document.createElement('div');
  bootRight.classList.add('nutcracker-boot');
  legRight.appendChild(bootRight);
  legs.appendChild(legRight);

  nutcracker.appendChild(legs);

  // Sword (optional decoration)
  const sword = document.createElement('div');
  sword.classList.add('nutcracker-sword');
  nutcracker.appendChild(sword);

  return nutcracker;
}

/**
 * Create nutcracker soldiers marching across the screen at different layers
 * @param {HTMLElement} container - The nutcracker container element
 */
export function createNutcrackers(container) {
  // Clear any existing nutcrackers
  container.innerHTML = '';

  // Define nutcracker configurations: layer, direction, delay
  const configs = [
    { layer: 'layer-back', reverse: false, delay: 2 },
    { layer: 'layer-mid', reverse: true, delay: 5 },
    { layer: 'layer-front', reverse: false, delay: 8 },
    { layer: 'layer-mid', reverse: false, delay: 12 },
  ];

  configs.forEach((config) => {
    const nutcracker = createNutcracker();
    nutcracker.classList.add(config.layer);
    if (config.reverse) {
      nutcracker.classList.add('reverse');
    }
    nutcracker.style.animationDelay = `${config.delay}s`;
    container.appendChild(nutcracker);
  });
}
