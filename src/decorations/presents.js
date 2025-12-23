/**
 * Presents module - Gift box decorations
 */

/**
 * Create presents/gift boxes
 * @param {HTMLElement} container - The presents container element
 * @param {number} count - Number of presents to create
 */
export function createPresents(container, count = 5) {
  const colors = ['red', 'green', 'blue', 'gold'];
  const sizes = [
    { width: 40, height: 35 },
    { width: 50, height: 45 },
    { width: 35, height: 40 },
    { width: 55, height: 50 },
    { width: 45, height: 38 }
  ];

  for (let i = 0; i < count; i++) {
    const present = document.createElement('div');
    present.classList.add('present', colors[i % colors.length]);
    present.style.animationDelay = `${i * 0.15}s`;

    const box = document.createElement('div');
    box.classList.add('present-box');
    const size = sizes[i % sizes.length];
    box.style.width = `${size.width}px`;
    box.style.height = `${size.height}px`;

    const bow = document.createElement('div');
    bow.classList.add('present-bow');

    const bowCenter = document.createElement('div');
    bowCenter.classList.add('present-bow-center');

    present.appendChild(box);
    present.appendChild(bow);
    present.appendChild(bowCenter);
    container.appendChild(present);
  }
}
