/**
 * Christmas Tree module
 */

/**
 * Adjust color brightness
 * @param {string} color - Hex color
 * @param {number} amount - Amount to adjust (-255 to 255)
 * @returns {string} Adjusted hex color
 */
function adjustColor(color, amount) {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Create Christmas tree with ornaments, lights, and presents
 * @param {HTMLElement} container - The tree container element
 */
export function createChristmasTree(container) {
  // Clear any existing tree content
  container.innerHTML = '';

  // Tree trunk
  const trunk = document.createElement('div');
  trunk.classList.add('tree-trunk');
  container.appendChild(trunk);

  // Tree tiers (triangles)
  for (let i = 1; i <= 3; i++) {
    const tier = document.createElement('div');
    tier.classList.add('tree-tier', `tree-tier-${i}`);
    container.appendChild(tier);
  }

  // Star on top
  const star = document.createElement('div');
  star.classList.add('tree-star');
  star.innerHTML = '&#9733;'; // Star character
  container.appendChild(star);

  // Add ornaments (adjusted for bigger tree)
  const ornamentPositions = [
    { left: '28%', bottom: '80px', color: 'red' },
    { left: '62%', bottom: '90px', color: 'gold' },
    { left: '22%', bottom: '130px', color: 'blue' },
    { left: '68%', bottom: '140px', color: 'silver' },
    { left: '45%', bottom: '110px', color: 'red' },
    { left: '32%', bottom: '180px', color: 'gold' },
    { left: '60%', bottom: '190px', color: 'blue' },
    { left: '45%', bottom: '220px', color: 'silver' },
    { left: '38%', bottom: '260px', color: 'red' },
    { left: '55%', bottom: '270px', color: 'gold' },
    { left: '45%', bottom: '300px', color: 'blue' },
    { left: '25%', bottom: '160px', color: 'silver' },
    { left: '65%', bottom: '170px', color: 'red' }
  ];

  ornamentPositions.forEach((pos, index) => {
    const ornament = document.createElement('div');
    ornament.classList.add('tree-ornament', pos.color);
    ornament.style.left = pos.left;
    ornament.style.bottom = pos.bottom;
    ornament.style.animationDelay = `${index * 0.3}s`;
    container.appendChild(ornament);
  });

  // Add twinkling lights (adjusted for bigger tree)
  const lightPositions = [
    { left: '25%', bottom: '85px' },
    { left: '65%', bottom: '95px' },
    { left: '35%', bottom: '120px' },
    { left: '58%', bottom: '135px' },
    { left: '28%', bottom: '165px' },
    { left: '62%', bottom: '180px' },
    { left: '40%', bottom: '210px' },
    { left: '55%', bottom: '230px' },
    { left: '45%', bottom: '260px' },
    { left: '38%', bottom: '290px' },
    { left: '52%', bottom: '295px' }
  ];

  lightPositions.forEach((pos, index) => {
    const light = document.createElement('div');
    light.classList.add('tree-lights', 'on');
    light.style.left = pos.left;
    light.style.bottom = pos.bottom;
    light.style.animationDelay = `${index * 0.2}s`;
    container.appendChild(light);
  });

  // Add presents under the tree
  const presentConfigs = [
    { left: '15px', bottom: 5, width: 50, height: 40, color: '#e74c3c', ribbon: '#ffd700' },
    { left: '68px', bottom: 3, width: 35, height: 28, color: '#3498db', ribbon: '#fff' },
    { left: '120px', bottom: 3, width: 55, height: 44, color: '#f39c12', ribbon: '#c0392b' },
    { left: '190px', bottom: 4, width: 40, height: 34, color: '#27ae60', ribbon: '#ffd700' },
    { left: '38px', bottom: 42, width: 38, height: 30, color: '#9b59b6', ribbon: '#fff' },
    { left: '145px', bottom: 48, width: 32, height: 26, color: '#e91e63', ribbon: '#ffd700' },
    { left: '95px', bottom: 38, width: 30, height: 24, color: '#1abc9c', ribbon: '#e74c3c' },
    { left: '205px', bottom: 35, width: 28, height: 22, color: '#3498db', ribbon: '#f39c12' }
  ];

  presentConfigs.forEach((config) => {
    const present = document.createElement('div');
    present.classList.add('tree-present');
    present.style.left = config.left;
    present.style.width = `${config.width}px`;
    present.style.height = `${config.height}px`;
    present.style.bottom = `${config.bottom}px`;

    const box = document.createElement('div');
    box.classList.add('tree-present-box');
    box.style.background = `linear-gradient(135deg, ${config.color}, ${adjustColor(config.color, -30)})`;

    const ribbonV = document.createElement('div');
    ribbonV.classList.add('tree-present-ribbon-v');
    box.appendChild(ribbonV);

    const ribbonH = document.createElement('div');
    ribbonH.classList.add('tree-present-ribbon-h');
    box.appendChild(ribbonH);

    const bow = document.createElement('div');
    bow.classList.add('tree-present-bow');
    bow.style.background = config.ribbon;
    box.appendChild(bow);

    present.appendChild(box);
    container.appendChild(present);
  });
}
