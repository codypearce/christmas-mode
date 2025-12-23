/**
 * Christmas Mode Unit Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('ChristmasMode', () => {
  let ChristmasMode;

  beforeEach(async () => {
    // Clear any previous state
    document.body.innerHTML = '';
    document.head.innerHTML = '';

    // Reset module cache to get fresh instance
    vi.resetModules();

    // Dynamically import fresh module for each test
    const module = await import('../dist/christmas-mode.esm.js');
    ChristmasMode = module.default;
  });

  afterEach(() => {
    // Clean up
    if (ChristmasMode && typeof ChristmasMode.destroy === 'function') {
      try {
        ChristmasMode.destroy();
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  });

  describe('init()', () => {
    it('should initialize without errors', () => {
      expect(() => ChristmasMode.init()).not.toThrow();
    });

    it('should inject CSS into document head', () => {
      ChristmasMode.init();
      const styleEl = document.getElementById('christmas-mode-styles');
      expect(styleEl).not.toBeNull();
      expect(styleEl.tagName).toBe('STYLE');
    });

    it('should create toggle container', () => {
      ChristmasMode.init();
      const toggle = document.getElementById('christmas-mode-toggle-container');
      expect(toggle).not.toBeNull();
    });

    it('should create decorations container', () => {
      ChristmasMode.init();
      const decorations = document.getElementById('christmas-decorations');
      expect(decorations).not.toBeNull();
    });

    it('should not initialize twice', () => {
      ChristmasMode.init();
      ChristmasMode.init();
      const toggles = document.querySelectorAll('#christmas-mode-toggle-container');
      expect(toggles.length).toBe(1);
    });

    it('should hide toggle when toggle option is false', () => {
      ChristmasMode.init({ toggle: false });
      const toggle = document.getElementById('christmas-mode-toggle-container');
      expect(toggle.style.display).toBe('none');
    });

    it('should auto-enable when autoEnable is true', () => {
      ChristmasMode.init({ autoEnable: true });
      expect(ChristmasMode.isEnabled()).toBe(true);
    });

    it('should not auto-enable by default', () => {
      ChristmasMode.init();
      expect(ChristmasMode.isEnabled()).toBe(false);
    });
  });

  describe('enable()', () => {
    it('should enable Christmas mode', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      expect(ChristmasMode.isEnabled()).toBe(true);
    });

    it('should auto-init if not initialized', () => {
      ChristmasMode.enable();
      expect(ChristmasMode.isEnabled()).toBe(true);
      const toggle = document.getElementById('christmas-mode-toggle-container');
      expect(toggle).not.toBeNull();
    });

    it('should check the toggle checkbox', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      const checkbox = document.getElementById('christmas-toggle');
      expect(checkbox.checked).toBe(true);
    });

    it('should add christmas-mode-active class to body', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      expect(document.body.classList.contains('christmas-mode-active')).toBe(true);
    });
  });

  describe('disable()', () => {
    it('should disable Christmas mode', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      ChristmasMode.disable();
      expect(ChristmasMode.isEnabled()).toBe(false);
    });

    it('should uncheck the toggle checkbox', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      ChristmasMode.disable();
      const checkbox = document.getElementById('christmas-toggle');
      expect(checkbox.checked).toBe(false);
    });

    it('should remove christmas-mode-active class from body', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      ChristmasMode.disable();
      expect(document.body.classList.contains('christmas-mode-active')).toBe(false);
    });

    it('should do nothing if not initialized', () => {
      expect(() => ChristmasMode.disable()).not.toThrow();
    });
  });

  describe('toggle()', () => {
    it('should enable when disabled', () => {
      ChristmasMode.init();
      expect(ChristmasMode.isEnabled()).toBe(false);
      ChristmasMode.toggle();
      expect(ChristmasMode.isEnabled()).toBe(true);
    });

    it('should disable when enabled', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      ChristmasMode.toggle();
      expect(ChristmasMode.isEnabled()).toBe(false);
    });

    it('should auto-init if not initialized', () => {
      ChristmasMode.toggle();
      const toggle = document.getElementById('christmas-mode-toggle-container');
      expect(toggle).not.toBeNull();
    });
  });

  describe('isEnabled()', () => {
    it('should return false initially', () => {
      ChristmasMode.init();
      expect(ChristmasMode.isEnabled()).toBe(false);
    });

    it('should return true when enabled', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      expect(ChristmasMode.isEnabled()).toBe(true);
    });

    it('should return false after disable', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      ChristmasMode.disable();
      expect(ChristmasMode.isEnabled()).toBe(false);
    });
  });

  describe('destroy()', () => {
    it('should remove decorations container', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      ChristmasMode.destroy();
      expect(document.getElementById('christmas-decorations')).toBeNull();
    });

    it('should remove toggle container', () => {
      ChristmasMode.init();
      ChristmasMode.destroy();
      expect(document.getElementById('christmas-mode-toggle-container')).toBeNull();
    });

    it('should remove CSS styles', () => {
      ChristmasMode.init();
      ChristmasMode.destroy();
      expect(document.getElementById('christmas-mode-styles')).toBeNull();
    });

    it('should allow re-initialization after destroy', async () => {
      ChristmasMode.init();
      ChristmasMode.destroy();

      // Need fresh import after destroy
      vi.resetModules();
      const module = await import('../dist/christmas-mode.esm.js');
      const freshModule = module.default;

      expect(() => freshModule.init()).not.toThrow();
      const toggle = document.getElementById('christmas-mode-toggle-container');
      expect(toggle).not.toBeNull();
    });

    it('should do nothing if not initialized', () => {
      expect(() => ChristmasMode.destroy()).not.toThrow();
    });
  });

  describe('music controls', () => {
    it('should have playMusic method', () => {
      expect(typeof ChristmasMode.playMusic).toBe('function');
    });

    it('should have stopMusic method', () => {
      expect(typeof ChristmasMode.stopMusic).toBe('function');
    });

    it('should have toggleMusic method', () => {
      expect(typeof ChristmasMode.toggleMusic).toBe('function');
    });

    it('stopMusic should not throw when enabled', () => {
      ChristmasMode.init();
      ChristmasMode.enable();
      expect(() => ChristmasMode.stopMusic()).not.toThrow();
    });
  });

  describe('decorations creation', () => {
    beforeEach(() => {
      ChristmasMode.init();
      ChristmasMode.enable();
    });

    it('should create Christmas lights container', () => {
      const lights = document.getElementById('lights-container');
      expect(lights).not.toBeNull();
    });

    it('should create snow canvas', () => {
      const canvas = document.getElementById('snow-canvas');
      expect(canvas).not.toBeNull();
    });

    it('should create snow ground', () => {
      const ground = document.getElementById('snow-ground');
      expect(ground).not.toBeNull();
    });

    it('should create icicles container', () => {
      const icicles = document.getElementById('icicles-container');
      expect(icicles).not.toBeNull();
    });

    it('should create Christmas tree container', () => {
      const tree = document.getElementById('christmas-tree');
      expect(tree).not.toBeNull();
    });

    it('should create stockings container', () => {
      const stockings = document.getElementById('stockings-container');
      expect(stockings).not.toBeNull();
    });

    it('should create presents container', () => {
      const presents = document.getElementById('presents-container');
      expect(presents).not.toBeNull();
    });

    it('should create snowman container', () => {
      const snowman = document.getElementById('snowman-container');
      expect(snowman).not.toBeNull();
    });

    it('should create north pole container', () => {
      const northPole = document.getElementById('northpole-container');
      expect(northPole).not.toBeNull();
    });

    it('should show decorations container when enabled', () => {
      const decorations = document.getElementById('christmas-decorations');
      expect(decorations.classList.contains('hidden')).toBe(false);
    });
  });

  describe('options handling', () => {
    it('should accept custom target element', () => {
      const customTarget = document.createElement('div');
      customTarget.id = 'custom-target';
      document.body.appendChild(customTarget);

      ChristmasMode.init({ target: customTarget });

      const decorations = customTarget.querySelector('#christmas-decorations');
      expect(decorations).not.toBeNull();
    });

    it('should handle toggle position option', () => {
      ChristmasMode.init({ toggle: { position: 'top-left' } });
      const toggleContainer = document.getElementById('christmas-mode-toggle-container');
      expect(toggleContainer.dataset.position).toBe('top-left');
    });
  });

  describe('public API exports', () => {
    it('should export init function', () => {
      expect(typeof ChristmasMode.init).toBe('function');
    });

    it('should export enable function', () => {
      expect(typeof ChristmasMode.enable).toBe('function');
    });

    it('should export disable function', () => {
      expect(typeof ChristmasMode.disable).toBe('function');
    });

    it('should export toggle function', () => {
      expect(typeof ChristmasMode.toggle).toBe('function');
    });

    it('should export isEnabled function', () => {
      expect(typeof ChristmasMode.isEnabled).toBe('function');
    });

    it('should export destroy function', () => {
      expect(typeof ChristmasMode.destroy).toBe('function');
    });

    it('should export playMusic function', () => {
      expect(typeof ChristmasMode.playMusic).toBe('function');
    });

    it('should export stopMusic function', () => {
      expect(typeof ChristmasMode.stopMusic).toBe('function');
    });

    it('should export toggleMusic function', () => {
      expect(typeof ChristmasMode.toggleMusic).toBe('function');
    });
  });
});
