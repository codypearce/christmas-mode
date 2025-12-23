/**
 * Test setup - runs before each test file
 */

import { vi, afterEach } from 'vitest';

// Mock AudioContext for music tests
class MockAudioContext {
  constructor() {
    this.currentTime = 0;
    this.state = 'running';
  }

  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() },
      connect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
    };
  }

  createGain() {
    return {
      gain: {
        value: 0,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      connect: vi.fn(),
    };
  }

  get destination() {
    return {};
  }

  close() {
    return Promise.resolve();
  }
}

// Mock canvas context for jsdom
class MockCanvasRenderingContext2D {
  constructor() {
    this.fillStyle = '';
    this.strokeStyle = '';
    this.lineWidth = 1;
    this.globalAlpha = 1;
    this.shadowColor = '';
    this.shadowBlur = 0;
  }
  clearRect() {}
  fillRect() {}
  beginPath() {}
  closePath() {}
  arc() {}
  fill() {}
  stroke() {}
  moveTo() {}
  lineTo() {}
  save() {}
  restore() {}
  translate() {}
  rotate() {}
  scale() {}
  setTransform() {}
  drawImage() {}
  createLinearGradient() {
    return {
      addColorStop: vi.fn(),
    };
  }
  createRadialGradient() {
    return {
      addColorStop: vi.fn(),
    };
  }
  measureText() {
    return { width: 0 };
  }
  fillText() {}
  strokeText() {}
}

// Patch HTMLCanvasElement.prototype.getContext
HTMLCanvasElement.prototype.getContext = function(type) {
  if (type === '2d') {
    return new MockCanvasRenderingContext2D();
  }
  return null;
};

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  return setTimeout(() => cb(performance.now()), 16);
});

global.cancelAnimationFrame = vi.fn((id) => {
  clearTimeout(id);
});

// Mock AudioContext globally
global.AudioContext = MockAudioContext;
global.webkitAudioContext = MockAudioContext;

// Clean up DOM after each test
afterEach(() => {
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});
