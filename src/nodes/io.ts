/**
 * This file aggregrates all the possible I/O (input and output) for nodes.
 * This is used for determine if a node can even be connected to - and how.
 */

import type { AllNodeTypes, AllSafeNodeTypes } from ".";
import { AnalyserIO } from "./Analyser";
import { ArpeggioIO } from "./Arpeggio";
import { BitcrusherIO } from "./Bitcrusher";
import { ConstantSourceIO } from "./ConstantSource";
import { DelayIO } from "./Delay";
import { GainIO } from "./Gain";
import { MoogIO } from "./Moog";
import { OscillatorIO } from "./Oscillator";
import { PinkNoiseIO } from "./PinkNoise";
import { RecorderIO } from "./Recorder";
import { SampleIO } from "./Sample";
import type { NodeIO } from "./types";
import { WaveShaperIO } from "./WaveShaper";
import { WhiteNoiseIO } from "./WhiteNoise";

const NODE_CONNECTION_MAP: Record<AllNodeTypes, NodeIO> = {
  "constant-source": ConstantSourceIO,
  osc: OscillatorIO,
  gain: GainIO,
  analyser: AnalyserIO,
  delay: DelayIO,
  sample: SampleIO,
  "wave-shaper": WaveShaperIO,
  bitcrusher: BitcrusherIO,
  arpeggio: ArpeggioIO,
  "white-noise": WhiteNoiseIO,
  "pink-noise": PinkNoiseIO,
  moog: MoogIO,
  recorder: RecorderIO,
  output: {
    inputs: [],
    outputs: [],
  },
};

export default NODE_CONNECTION_MAP;
