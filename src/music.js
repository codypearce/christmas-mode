/**
 * Music module - Jingle Bells synthesizer
 */

const NOTE_FREQUENCIES = {
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
  'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25
};

const JINGLE_BELLS_MELODY = [
  ['E4', 1], ['E4', 1], ['E4', 2],
  ['E4', 1], ['E4', 1], ['E4', 2],
  ['E4', 1], ['G4', 1], ['C4', 1], ['D4', 1], ['E4', 4],
  ['F4', 1], ['F4', 1], ['F4', 1], ['F4', 1],
  ['F4', 1], ['E4', 1], ['E4', 1], ['E4', 0.5], ['E4', 0.5],
  ['E4', 1], ['D4', 1], ['D4', 1], ['E4', 1], ['D4', 2], ['G4', 2],
  ['E4', 1], ['E4', 1], ['E4', 2],
  ['E4', 1], ['E4', 1], ['E4', 2],
  ['E4', 1], ['G4', 1], ['C4', 1], ['D4', 1], ['E4', 4],
  ['F4', 1], ['F4', 1], ['F4', 1], ['F4', 1],
  ['F4', 1], ['E4', 1], ['E4', 1], ['E4', 0.5], ['E4', 0.5],
  ['G4', 1], ['G4', 1], ['F4', 1], ['D4', 1], ['C4', 4]
];

// Module state
let audioContext = null;
let isMusicPlaying = false;
let musicTimeoutIds = [];
let musicBtnRef = null;

/**
 * Set the music button reference
 */
export function setMusicButton(btn) {
  musicBtnRef = btn;
}

/**
 * Check if music is currently playing
 */
export function isPlaying() {
  return isMusicPlaying;
}

/**
 * Initialize or get AudioContext
 */
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

/**
 * Play a bell/chime note using multiple harmonics
 */
function playBellNote(frequency, startTime, duration, volume = 0.15) {
  const ctx = getAudioContext();

  const partials = [
    { ratio: 1, gain: 1 },
    { ratio: 2, gain: 0.6 },
    { ratio: 3, gain: 0.4 },
    { ratio: 4.2, gain: 0.25 },
    { ratio: 5.4, gain: 0.2 },
  ];

  const masterGain = ctx.createGain();
  masterGain.connect(ctx.destination);

  partials.forEach(partial => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency * partial.ratio, startTime);

    const partialVolume = volume * partial.gain;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(partialVolume, startTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(partialVolume * 0.4, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  });
}

/**
 * Schedule the Jingle Bells melody
 */
function scheduleMelody(tempo) {
  const ctx = getAudioContext();
  const beatDuration = 60 / tempo;
  let currentTime = ctx.currentTime + 0.05;

  JINGLE_BELLS_MELODY.forEach(([note, beats]) => {
    const frequency = NOTE_FREQUENCIES[note];
    const duration = beats * beatDuration;

    playBellNote(frequency, currentTime, duration);
    currentTime += beats * beatDuration;
  });

  return JINGLE_BELLS_MELODY.reduce((sum, [, beats]) => sum + beats, 0) * beatDuration;
}

/**
 * Play Jingle Bells melody with looping
 */
export function playJingleBells(tempo = 160) {
  musicTimeoutIds.forEach(id => clearTimeout(id));
  musicTimeoutIds = [];

  isMusicPlaying = true;
  if (musicBtnRef) {
    musicBtnRef.classList.add('playing');
  }

  const totalDuration = scheduleMelody(tempo);

  const loopTimeout = setTimeout(() => {
    if (isMusicPlaying) {
      playJingleBells(tempo);
    }
  }, totalDuration * 1000);

  musicTimeoutIds.push(loopTimeout);
}

/**
 * Stop the music
 */
export function stopMusic() {
  isMusicPlaying = false;
  if (musicBtnRef) {
    musicBtnRef.classList.remove('playing');
  }

  musicTimeoutIds.forEach(id => clearTimeout(id));
  musicTimeoutIds = [];

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

/**
 * Toggle music playback
 */
export function toggleMusic() {
  if (isMusicPlaying) {
    stopMusic();
  } else {
    playJingleBells(160);
  }
}
