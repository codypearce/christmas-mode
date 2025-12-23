/**
 * Snowman module - Snowman decoration
 */

/**
 * Create snowman with all parts
 * @param {HTMLElement} container - The snowman container element
 */
export function createSnowman(container) {
  // Clear any existing snowman
  container.innerHTML = '';

  const snowman = document.createElement('div');
  snowman.classList.add('snowman');

  // Body parts (bottom, middle, head)
  const bottom = document.createElement('div');
  bottom.classList.add('snowman-bottom');
  snowman.appendChild(bottom);

  const middle = document.createElement('div');
  middle.classList.add('snowman-middle');
  snowman.appendChild(middle);

  const head = document.createElement('div');
  head.classList.add('snowman-head');

  // Eyes
  const leftEye = document.createElement('div');
  leftEye.classList.add('snowman-eye', 'left');
  head.appendChild(leftEye);

  const rightEye = document.createElement('div');
  rightEye.classList.add('snowman-eye', 'right');
  head.appendChild(rightEye);

  // Carrot nose
  const nose = document.createElement('div');
  nose.classList.add('snowman-nose');
  head.appendChild(nose);

  // Smile
  const smile = document.createElement('div');
  smile.classList.add('snowman-smile');
  head.appendChild(smile);

  snowman.appendChild(head);

  // Hat
  const hat = document.createElement('div');
  hat.classList.add('snowman-hat');

  const hatBrim = document.createElement('div');
  hatBrim.classList.add('snowman-hat-brim');
  hat.appendChild(hatBrim);

  const hatTop = document.createElement('div');
  hatTop.classList.add('snowman-hat-top');
  hat.appendChild(hatTop);

  const hatBand = document.createElement('div');
  hatBand.classList.add('snowman-hat-band');
  hat.appendChild(hatBand);

  snowman.appendChild(hat);

  // Scarf
  const scarf = document.createElement('div');
  scarf.classList.add('snowman-scarf');

  const scarfTail = document.createElement('div');
  scarfTail.classList.add('snowman-scarf-tail');
  scarf.appendChild(scarfTail);

  snowman.appendChild(scarf);

  // Buttons on middle section
  for (let i = 0; i < 3; i++) {
    const button = document.createElement('div');
    button.classList.add('snowman-button');
    snowman.appendChild(button);
  }

  // Arms
  const leftArm = document.createElement('div');
  leftArm.classList.add('snowman-arm', 'left');
  snowman.appendChild(leftArm);

  const rightArm = document.createElement('div');
  rightArm.classList.add('snowman-arm', 'right');
  snowman.appendChild(rightArm);

  container.appendChild(snowman);
}
