export interface ChristmasModeOptions {
  /**
   * Show the toggle switch. Can be boolean or position config.
   * @default true
   */
  toggle?: boolean | {
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  };

  /**
   * Show the music button (caroler)
   * @default true
   */
  musicButton?: boolean;

  /**
   * Auto-enable Christmas mode on init
   * @default false
   */
  autoEnable?: boolean;

  /**
   * Enable snow effect
   * @default true
   */
  snow?: boolean;

  /**
   * Enable Christmas lights
   * @default true
   */
  lights?: boolean;

  /**
   * Enable Christmas tree
   * @default true
   */
  tree?: boolean;

  /**
   * Enable snowman
   * @default true
   */
  snowman?: boolean;

  /**
   * Enable North Pole sign
   * @default true
   */
  northPole?: boolean;

  /**
   * Target element to append decorations to
   * @default document.body
   */
  target?: HTMLElement;
}

export interface ChristmasMode {
  /**
   * Initialize Christmas Mode with options
   */
  init(options?: ChristmasModeOptions): void;

  /**
   * Enable Christmas Mode
   */
  enable(): void;

  /**
   * Disable Christmas Mode
   */
  disable(): void;

  /**
   * Toggle Christmas Mode on/off
   */
  toggle(): void;

  /**
   * Check if Christmas Mode is currently active
   */
  isEnabled(): boolean;

  /**
   * Start playing Jingle Bells
   */
  playMusic(): void;

  /**
   * Stop playing music
   */
  stopMusic(): void;

  /**
   * Toggle music on/off
   */
  toggleMusic(): void;

  /**
   * Destroy Christmas Mode and clean up all elements
   */
  destroy(): void;
}

declare const christmasMode: ChristmasMode;
export default christmasMode;
