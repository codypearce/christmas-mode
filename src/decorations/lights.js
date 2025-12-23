/**
 * Lights module - Christmas lights and stars
 */

/**
 * Create Christmas lights
 * @param {HTMLElement} container - The lights container element
 * @param {number} count - Number of lights to create
 */
export function createLights(container, count = 20) {
  const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

  // Create wire SVG
  const wireSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  wireSvg.classList.add('light-wire');
  wireSvg.setAttribute('viewBox', `0 0 ${window.innerWidth} 30`);
  wireSvg.setAttribute('preserveAspectRatio', 'none');

  let pathD = `M 0 5`;
  const segmentWidth = window.innerWidth / count;

  for (let i = 0; i < count; i++) {
    const x1 = i * segmentWidth + segmentWidth * 0.5;
    const x2 = (i + 1) * segmentWidth;
    pathD += ` Q ${x1} 25, ${x2} 5`;
  }

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  path.setAttribute('stroke', '#333');
  path.setAttribute('stroke-width', '3');
  path.setAttribute('fill', 'none');
  wireSvg.appendChild(path);
  container.appendChild(wireSvg);

  // Create light bulbs
  for (let i = 0; i < count; i++) {
    const light = document.createElement('div');
    light.classList.add('light-bulb', colors[i % colors.length]);
    light.style.animationDelay = `${Math.random() * 2}s`;
    light.style.marginTop = '15px';
    container.appendChild(light);
  }
}

/**
 * Create background stars with some twinkling
 * @param {HTMLElement} container - The stars container element
 * @param {number} count - Number of stars to create
 */
export function createStars(container, count = 60) {
  container.innerHTML = '';

  const twinkleClasses = ['', '', '', 'twinkle', 'twinkle-slow', 'twinkle-fast'];

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random size (more small stars than large)
    const sizeRoll = Math.random();
    if (sizeRoll < 0.6) {
      star.classList.add('small');
    } else if (sizeRoll < 0.85) {
      star.classList.add('medium');
    } else {
      star.classList.add('large');
    }

    // Some stars twinkle
    const twinkle = twinkleClasses[Math.floor(Math.random() * twinkleClasses.length)];
    if (twinkle) {
      star.classList.add(twinkle);
      star.style.animationDelay = `${Math.random() * 3}s`;
    }

    // Random position (upper portion of screen mostly)
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 70}%`;

    // Slight opacity variation
    star.style.opacity = 0.4 + Math.random() * 0.6;

    container.appendChild(star);
  }

  // Add a few bright stars with cross effect
  const brightCount = 3;
  for (let i = 0; i < brightCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star', 'bright', 'twinkle-slow');
    star.style.left = `${15 + Math.random() * 70}%`;
    star.style.top = `${5 + Math.random() * 40}%`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(star);
  }

  // Add the moon
  const moon = document.createElement('div');
  moon.classList.add('moon');

  // Add crater details
  for (let i = 1; i <= 3; i++) {
    const crater = document.createElement('div');
    crater.classList.add('moon-crater', `crater-${i}`);
    moon.appendChild(crater);
  }

  container.appendChild(moon);
}
