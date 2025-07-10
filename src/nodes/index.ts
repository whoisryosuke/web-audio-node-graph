import Gain from "./Gain";
import Oscillator from "./Oscillator";
import Output from "./Output";
import Analyser from "./Analyser";

const ALL_NODE_TYPES = {
  osc: Oscillator,
  gain: Gain,
  analyser: Analyser,
  output: Output,
};
const { output: _, ...safeNodeTypes } = {
  ...ALL_NODE_TYPES,
};
export const ALL_SAFE_NODE_TYPES = safeNodeTypes;

export type CustomNodeTypesNames = keyof typeof ALL_NODE_TYPES;

export default ALL_NODE_TYPES;
