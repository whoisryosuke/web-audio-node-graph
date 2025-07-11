import type { Edge } from "@xyflow/react";
import type { CustomNodeTypesNames } from "../../nodes";
import { useNodeStore } from "../../store/nodes";

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

const createSampleNode = (id: string) => {
  const node = context.createBufferSource();

  audioNodes.set(id, node);
};

const createConstantSourceNode = (id: string) => {
  const node = context.createConstantSource();
  node.start();

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
    case "sample":
      createSampleNode(id);
      break;
    case "constant-source":
      createConstantSourceNode(id);
      break;
    default:
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
  sourceHandle: string | null,
  targetHandle: string | null | undefined
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

  // Check if we're doing a sample and handle this edge case
  // You can't update the audio buffer, you have to create a new node
  if (audioNode instanceof AudioBufferSourceNode && "buffer" in data) {
    return recreateSampleNode(id, data);
  }

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

function recreateSampleNode(id: string, data: any) {
  const newNode = context.createBufferSource();
  newNode.buffer = data.buffer;
  // @TODO: Copy over any existing properties (like playback time)

  audioNodes.set(id, newNode);
}

export function playAudio() {
  // Resume the audio context if needed
  context.resume();

  // Nodes like oscillators play by default since we start them initially

  // But samples need to be played individually
  const updateNodes = [];
  audioNodes.forEach((audioNode, audioNodeKey) => {
    // Check if it's a sample and play it
    if (audioNode instanceof AudioBufferSourceNode) {
      audioNode.start();

      // Now it get's complicated, we need to re-create this node
      // Audio buffers don't allow for replay, so we recreate each playback
      const newNode = context.createBufferSource();
      newNode.buffer = audioNode.buffer;

      // Update the cache with new audio node
      audioNodes.set(audioNodeKey, newNode);

      // Reconnect node
      // Find all edges and reconnect this node to any targets
      const { edges } = useNodeStore.getState();
      const foundEdges = edges.filter((edge) => edge.source == audioNodeKey);
      foundEdges.forEach((foundEdge) => {
        // Connect new node to target from existing edge
        connectAudioNodes(
          audioNodeKey,
          foundEdge.target,
          null,
          foundEdge.targetHandle
        );
      });
    }
  });
}

export function getAudioNode(id: string) {
  return audioNodes.get(id);
}
