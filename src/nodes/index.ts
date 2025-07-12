import Gain from "./Gain";
import Oscillator from "./Oscillator";
import Output from "./Output";
import Analyser from "./Analyser";
import Delay from "./Delay";
import Sample from "./Sample";
import ConstantSource from "./ConstantSource";
import WaveShaper from "./WaveShaper";
import Bitcrusher from "./Bitcrusher";

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
};
const { output: _, ...safeNodeTypes } = {
  ...ALL_NODE_TYPES,
};
export const ALL_SAFE_NODE_TYPES = safeNodeTypes;

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
};

export type CustomNodeTypesNames = keyof typeof ALL_SAFE_NODE_TYPES;

export default ALL_NODE_TYPES;
