import Gain from "./Gain";
import Oscillator from "./Oscillator";
import Output from "./Output";

const ALL_NODE_TYPES = {
  osc: Oscillator,
  gain: Gain,
  output: Output,
};

export type CustomNodeTypesNames = keyof typeof ALL_NODE_TYPES;

export default ALL_NODE_TYPES;
