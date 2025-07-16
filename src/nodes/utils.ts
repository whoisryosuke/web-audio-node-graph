import { nanoid } from "nanoid";
import type { CustomNodeTypesNames } from ".";
import { type Node } from "@xyflow/react";
import { generateWaveShaperCurve } from "../utils/audio/wave-shaper";

const DEFAULT_NODE_PROPERTIES = {
  position: { x: 0, y: 0 },
};

function createOscillatorNode() {
  return { label: "Oscillator", frequency: 420, type: "sine" };
}
function createGainNode() {
  return { label: "Gain", gain: 0.42 };
}
function createAnalyserNode() {
  return { label: "Analyser" };
}
function createDelayNode() {
  return { label: "Delay", delayTime: 0.42 };
}
function createConstantSourceNode() {
  return { label: "Constant Source", offset: 42.0 };
}
function createWaveShaperNode() {
  return {
    label: "Wave Shaper",
    curve: generateWaveShaperCurve("sigmoid", 400),
    oversample: "4x",
  };
}
function createBitcrusherNode() {
  return {
    label: "Bitcrusher",
    // bits
  };
}
function createArpeggioNode() {
  return {
    label: "Arpeggio",
  };
}

export function createNode(
  type: CustomNodeTypesNames,
  position = { x: 0, y: 0 },
  data: Record<string, unknown> = {}
) {
  const id = nanoid();
  const newNode = {
    id,
    type,
    position,
  } as Partial<Node>;

  let baseData;
  switch (type) {
    case "osc":
      baseData = createOscillatorNode();
      break;
    case "gain":
      baseData = createGainNode();
      break;
    case "analyser":
      baseData = createAnalyserNode();
      break;
    case "delay":
      baseData = createDelayNode();
      break;
    case "constant-source":
      baseData = createConstantSourceNode();
      break;
    case "wave-shaper":
      baseData = createWaveShaperNode();
      break;
    case "bitcrusher":
      baseData = createBitcrusherNode();
      break;
    case "arpeggio":
      baseData = createArpeggioNode();
      break;
  }
  newNode.data = {
    ...baseData,
    ...data,
  };

  return newNode;
}
