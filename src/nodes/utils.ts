import { nanoid } from "nanoid";
import type { CustomNodeTypesNames } from ".";
import { type Node } from "@xyflow/react";

const DEFAULT_NODE_PROPERTIES = {
  position: { x: 0, y: 0 },
};

function createOscillatorNode() {
  return { label: "Oscillator" };
}
function createGainNode() {
  return { label: "Gain" };
}

export function createNode(type: CustomNodeTypesNames) {
  const id = nanoid();
  const newNode = {
    id,
    type,
    ...DEFAULT_NODE_PROPERTIES,
  } as Partial<Node>;

  let data;
  switch (type) {
    case "osc":
      data = createOscillatorNode();
      break;
    case "gain":
      data = createGainNode();
      break;
  }
  newNode.data = data;

  return newNode;
}
