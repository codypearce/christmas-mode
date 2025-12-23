/**
 * North Pole module - North Pole sign decoration
 */

import { createMiniCandyCane } from './candycanes.js';

/**
 * Create the North Pole sign
 * @param {HTMLElement} container - The north pole container element
 */
export function createNorthPole(container) {
  container.innerHTML = '';

  const northpole = document.createElement('div');
  northpole.classList.add('northpole');

  // The striped pole
  const pole = document.createElement('div');
  pole.classList.add('northpole-pole');
  northpole.appendChild(pole);

  // Snow cap on top of pole
  const snowCap = document.createElement('div');
  snowCap.classList.add('northpole-snowcap');
  northpole.appendChild(snowCap);

  // The wooden sign
  const sign = document.createElement('div');
  sign.classList.add('northpole-sign');

  // Sign text
  const signText = document.createElement('div');
  signText.classList.add('northpole-text');
  signText.textContent = 'NORTH POLE';
  sign.appendChild(signText);

  // Snow on top of sign
  const signSnow = document.createElement('div');
  signSnow.classList.add('northpole-sign-snow');
  sign.appendChild(signSnow);

  northpole.appendChild(sign);

  // Icicles hanging from sign
  for (let i = 0; i < 3; i++) {
    const icicle = document.createElement('div');
    icicle.classList.add('northpole-icicle');
    icicle.style.left = `${25 + i * 25}%`;
    icicle.style.height = `${8 + Math.random() * 8}px`;
    icicle.style.animationDelay = `${i * 0.3}s`;
    sign.appendChild(icicle);
  }

  // Snow pile at base
  const snowPile = document.createElement('div');
  snowPile.classList.add('northpole-snow-pile');
  northpole.appendChild(snowPile);

  // Candy canes stuck in the snow pile - 3 total
  const farLeftCane = document.createElement('div');
  farLeftCane.classList.add('northpole-candycane', 'far-left');
  farLeftCane.appendChild(createMiniCandyCane('northpole-far-left'));
  northpole.appendChild(farLeftCane);

  const rightCane = document.createElement('div');
  rightCane.classList.add('northpole-candycane', 'right');
  rightCane.appendChild(createMiniCandyCane('northpole-right'));
  northpole.appendChild(rightCane);

  const farRightCane = document.createElement('div');
  farRightCane.classList.add('northpole-candycane', 'far-right');
  farRightCane.appendChild(createMiniCandyCane('northpole-far-right'));
  northpole.appendChild(farRightCane);

  // Caroler (music button) standing by the sign - hidden initially, appears after delay
  const carolerBtn = document.createElement('button');
  carolerBtn.id = 'music-btn';
  carolerBtn.className = 'music-btn caroler-btn northpole-caroler caroler-hidden';
  carolerBtn.title = 'Toggle Jingle Bells';
  carolerBtn.innerHTML = `
    <span class="caroler">
      <span class="caroler-hat">
        <span class="hat-brim"></span>
        <span class="hat-pom"></span>
      </span>
      <span class="caroler-face">
        <span class="caroler-eyes"></span>
        <span class="caroler-mouth"></span>
      </span>
      <span class="caroler-scarf"></span>
      <span class="caroler-body">
        <span class="caroler-book"></span>
      </span>
      <span class="caroler-legs">
        <span class="caroler-leg left"></span>
        <span class="caroler-leg right"></span>
      </span>
      <span class="caroler-feet">
        <span class="caroler-foot left"></span>
        <span class="caroler-foot right"></span>
      </span>
    </span>
  `;
  northpole.appendChild(carolerBtn);

  container.appendChild(northpole);
}
