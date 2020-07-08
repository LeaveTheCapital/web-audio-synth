// window.AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();
let oscillator = ctx.createOscillator();
oscillator.type = "sine";
oscillator.frequency.value = 261.63;
// let waveShaper = ctx.createWaveShaper();

oscillator.start(0);
oscillator.connect(ctx.destination);
waveShaper.oversample = "4x";

// let filter = ctx.createBiquadFilter();
// filter.type = "lowpass";
// filter.frequency.value = 100;

// waveShaper.connect(filter);
// filter.connect(ctx.destination);

// waveShaper.connect(ctx.destination);
