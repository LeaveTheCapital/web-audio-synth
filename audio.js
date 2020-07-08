// window.AudioContext = window.AudioContext || window.webkitAudioContext;

let ctx = new AudioContext();
let oscillator, waveShaper, modulator, modGain, filter;

const A4 = 440;

const notes = ["A", "Bb", "C", "Db", "D", "Eb", "F", "F#", "G", "Ab"];
const refObj = {};
notes.forEach((note, i) => {
  refObj[note] = A4 * Math.pow(2, i / 12);
});

generateMusicalKeyboard();

function generateMusicalKeyboard() {
  const div = document.getElementById("musical-keyboard");
  notes.forEach(note => {
    let noteEle = document.createElement("div");
    noteEle.innerText = note;
    noteEle.className = "key";
    noteEle.className +=
      note.includes("#") || note.includes("b") ? " black-note" : " white-note";
    noteEle.addEventListener("click", () => {
      if (oscillator) {
        oscillator.frequency.value = refObj[note];
      }
    });
    div.appendChild(noteEle);
  });
}

function startPlaying() {
  oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 261.63;

  waveShaper = ctx.createWaveShaper();

  oscillator.gain = ctx.createGain();

  modulator = ctx.createOscillator();
  modulator.type = "sine";
  modulator.frequency.value = 30;

  modGain = ctx.createGain();
  modGain.gain.value = 50;

  modulator.connect(modGain);

  modGain.connect(oscillator.frequency);

  oscillator.connect(waveShaper);
  waveShaper.oversample = "4x";

  filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 100;
  waveShaper.connect(filter);
  filter.connect(ctx.destination);

  oscillator.start();
  modulator.start();
}

function makeDistortionCurve(amount) {
  let k = typeof amount === "number" ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for (; i < n_samples; ++i) {
    x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  startPlaying();
});

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => {
  //   modulator.stop();
  oscillator.stop();
});

let sineButton = document.getElementById("sine");
sineButton.addEventListener("click", () => {
  oscillator.type = "sine";
});
let squareButton = document.getElementById("square");
squareButton.addEventListener("click", () => {
  oscillator.type = "square";
});
let sawtoothButton = document.getElementById("sawtooth");
sawtoothButton.addEventListener("click", () => {
  oscillator.type = "sawtooth";
});
let triangleButton = document.getElementById("triangle");
triangleButton.addEventListener("click", () => {
  oscillator.type = "triangle";
});

let frequencySlider = document.getElementById("frequency-slider");

frequencySlider.addEventListener("input", event => {
  oscillator.frequency.value = event.target.value;
});

let distortionSlider = document.getElementById("distortion-slider");

distortionSlider.addEventListener("input", event => {
  waveShaper.curve = makeDistortionCurve(Number(event.target.value));
});

let filterSlider = document.getElementById("filter-slider");

filterSlider.addEventListener("input", event => {
  filter.frequency.value = Number(event.target.value);
});

let modgainSlider = document.getElementById("modgain-slider");

modgainSlider.addEventListener("input", event => {
  modGain.gain.value = Number(event.target.value);
});

let modfreqSlider = document.getElementById("modfreq-slider");

modfreqSlider.addEventListener("input", event => {
  modulator.frequency.value = Number(event.target.value);
});
