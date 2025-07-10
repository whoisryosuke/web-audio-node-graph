import { nanoid } from "nanoid";
import type { CustomNodeTypesNames } from ".";
import { type Node } from "@xyflow/react";

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
  return { label: "Analyser", gain: 0.42 };
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
  }
  newNode.data = {
    ...baseData,
    ...data,
  };

  return newNode;
}
