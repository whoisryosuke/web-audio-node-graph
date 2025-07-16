export function createWhiteNoiseBufferNode(
  audioCtx: AudioContext | OfflineAudioContext
) {
  // Generate 2 second buffer
  const bufferSize = 2 * audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    // Generate random numbers between -1 and 1
    data[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = buffer;
  whiteNoise.loop = true;

  return whiteNoise;
}

export function createWhiteNoiseBuffer(
  audioCtx: AudioContext | OfflineAudioContext
) {
  // Generate 2 second buffer
  const bufferSize = 2 * audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    // Generate random numbers between -1 and 1
    data[i] = Math.random() * 2 - 1;
  }

  return buffer;
}
