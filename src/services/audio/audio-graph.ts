import type { Edge } from "@xyflow/react";
import type { CustomNodeTypesNames } from "../../nodes";

const context = new AudioContext();
const audioNodes = new Map<string, AudioNode>();

const createOscillatorAudioNode = (id: string) => {
  const osc = context.createOscillator();
  osc.frequency.value = 220;
  osc.type = "sine";
  osc.start();

  audioNodes.set(id, osc);
};

const createGainAudioNode = (id: string) => {
  const gain = context.createGain();
  gain.gain.value = 0.25;

  audioNodes.set(id, gain);
};

const createAnalyserNode = (id: string) => {
  const analyser = context.createAnalyser();

  // Configure analyser
  analyser.fftSize = 1024;

  audioNodes.set(id, analyser);
};

const createDelayNode = (id: string) => {
  const node = context.createDelay();

  audioNodes.set(id, node);
};

export function createAudioNode(type: CustomNodeTypesNames, id: string) {
  switch (type) {
    case "osc":
      createOscillatorAudioNode(id);
      break;
    case "gain":
      createGainAudioNode(id);
      break;
    case "analyser":
      createAnalyserNode(id);
      break;
    case "delay":
      createDelayNode(id);
      break;
    case "output":
      break;
  }
}

export function removeAudioNode(id: string) {
  audioNodes.delete(id);
}

function getAudioParamsFromHandles(
  targetNode: AudioNode | undefined,
  targetHandle?: string | null
) {
  let targetRef: AudioNode | AudioParam = targetNode;
  if (targetHandle && targetNode) {
    if (targetHandle in targetNode) {
      const audioParam = targetHandle as keyof AudioNode;
      console.log(
        "target handle found",
        targetNode,
        targetHandle,
        targetNode[audioParam]
      );
      targetRef = targetNode[audioParam];
    }
  }

  return targetRef;
}

export function connectAudioNodes(
  source: string,
  target: string,
  sourceHandle: string,
  targetHandle: string
) {
  const sourceNode = audioNodes.get(source);
  const targetNode = audioNodes.get(target);
  console.log("connecting nodes", "source:", source, "target:", target);
  console.log("connecting nodes", "source:", sourceNode, "target:", targetNode);

  // Check if we have a source node - kinda critical for everything
  if (!sourceNode) return;

  // Handle connections to node parameters vs nodes (aka "handles")
  const targetRef = getAudioParamsFromHandles(targetNode, targetHandle);

  // If we connect to an output node, connect to the audio context output
  if (target == "output") {
    // This should never be an input, since audio params don't output properly
    return sourceNode.connect(context.destination);
  }

  // Check if we have a target node
  if (!targetNode) return;
  // Connect to target node
  sourceNode.connect(targetRef);
}

export function updateAudioNode(id: string, data: any) {
  const audioNode = audioNodes.get(id);
  if (!audioNode) return;

  // Loop through all the node properties we want to sync
  for (const param in data) {
    // Check if the audio node contains the property
    if (param in audioNode) {
      // Massage the types to make Typescript happy
      const audioParam = param as keyof AudioNode;
      // And then handle AudioParam vs regular property
      if (audioNode[audioParam] instanceof AudioParam) {
        audioNode[audioParam].value = data[param];
      } else {
        // @ts-ignore We literally check above here
        audioNode[param] = data[param];
      }
    }
  }
}

export function disconnectNodes(
  source: string,
  target: string,
  targetHandle?: string | null
) {
  const sourceNode = audioNodes.get(source);
  const targetNode = audioNodes.get(target);

  if (!sourceNode) return;

  // Handle connections to node parameters vs nodes (aka "handles")
  const targetRef = getAudioParamsFromHandles(targetNode, targetHandle);

  sourceNode.disconnect(targetRef);
}

export function playAudio() {
  context.resume();
}

export function getAudioNode(id: string) {
  return audioNodes.get(id);
}
