import Gain from "./Gain";
import Oscillator from "./Oscillator";
import Output from "./Output";
import Analyser from "./Analyser";
import Delay from "./Delay";
import Sample from "./Sample";
import ConstantSource from "./ConstantSource";
import WaveShaper from "./WaveShaper";
import Bitcrusher from "./Bitcrusher";
import Arpeggio from "./Arpeggio";
import WhiteNoise from "./WhiteNoise";
import PinkNoise from "./PinkNoise";
import Moog from "./Moog";

const ALL_NODE_TYPES = {
  osc: Oscillator,
  gain: Gain,
  analyser: Analyser,
  delay: Delay,
  sample: Sample,
  output: Output,
  "constant-source": ConstantSource,
  "wave-shaper": WaveShaper,
  bitcrusher: Bitcrusher,
  arpeggio: Arpeggio,
  "white-noise": WhiteNoise,
  "pink-noise": PinkNoise,
  moog: Moog,
};
const { output: _, ...safeNodeTypes } = {
  ...ALL_NODE_TYPES,
};
export const ALL_SAFE_NODE_TYPES = safeNodeTypes;
export type AllSafeNodeTypes = keyof typeof ALL_SAFE_NODE_TYPES;

export const ALL_SAFE_NODE_NAMES: Record<
  keyof typeof ALL_SAFE_NODE_TYPES,
  string
> = {
  osc: "Oscillator Node",
  gain: "Gain Node",
  analyser: "Analyser Node",
  delay: "Delay Node",
  sample: "Sample Node",
  "constant-source": "Constant Source",
  "wave-shaper": "Wave Shaper",
  bitcrusher: "Bitcrusher",
  arpeggio: "Arpeggio",
  "white-noise": "White Noise",
  "pink-noise": "Pink Noise",
  moog: "Moog",
};

export type CustomNodeTypesNames = keyof typeof ALL_SAFE_NODE_TYPES;

export default ALL_NODE_TYPES;
