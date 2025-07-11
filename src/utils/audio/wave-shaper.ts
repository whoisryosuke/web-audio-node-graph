// Sigmoid Function - generates an S-like curve
function generateSigmoidCurve(amount: number) {
  const k = amount ? amount : 50;
  const n_samples = 44100;
  const curve = new Float32Array(n_samples);
  const deg = Math.PI / 180;

  for (let i = 0; i < n_samples; i++) {
    const x = (i * 2) / n_samples - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

function generateHardClipCurve(amount: number) {
  const curve = new Float32Array(44100);
  const n = curve.length;
  for (let i = 0; i < n; i++) {
    let x = (i * 2) / n - 1;
    curve[i] = Math.max(-0.3, Math.min(0.3, x)); // clip at ±0.3
  }
  return curve;
}

const WAVE_SHAPER_CURVE_TYPES = {
  sigmoid: "Sigmoid",
  hardclip: "Hard Clip",
};

export type WaveShaperCurveTypes = keyof typeof WAVE_SHAPER_CURVE_TYPES;

export function generateWaveShaperCurve(
  type: WaveShaperCurveTypes,
  amount: number
) {
  switch (type) {
    case "sigmoid":
      return generateSigmoidCurve(amount);
    case "hardclip":
      return generateHardClipCurve(amount);
  }
}
