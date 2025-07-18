/**
 * This file aggregrates all the possible I/O (input and output) for nodes.
 * This is used for determine if a node can even be connected to - and how.
 */

import type { AllSafeNodeTypes } from ".";
import { ConstantSourceIO } from "./ConstantSource";
import type { NodeIO } from "./types";

const NODE_CONNECTION_MAP: Record<AllSafeNodeTypes, NodeIO> = {
  "constant-source": ConstantSourceIO,
  osc: {
    inputs: [],
    outputs: [],
  },
  gain: {
    inputs: [],
    outputs: [],
  },
  analyser: {
    inputs: [],
    outputs: [],
  },
  delay: {
    inputs: [],
    outputs: [],
  },
  sample: {
    inputs: [],
    outputs: [],
  },
  "wave-shaper": {
    inputs: [],
    outputs: [],
  },
  bitcrusher: {
    inputs: [],
    outputs: [],
  },
  arpeggio: {
    inputs: [],
    outputs: [],
  },
  "white-noise": {
    inputs: [],
    outputs: [],
  },
  "pink-noise": {
    inputs: [],
    outputs: [],
  },
  moog: {
    inputs: [],
    outputs: [],
  },
};

export default NODE_CONNECTION_MAP;
