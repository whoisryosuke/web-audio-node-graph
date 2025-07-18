import type { Edge } from "@xyflow/react";
import type { CustomNodeTypesNames } from "../../nodes";
import { useNodeStore } from "../../store/nodes";
import { generateWaveShaperCurve } from "../../utils/audio/wave-shaper";
import {
  createBitcrusherNode,
  createPinkNoiseNode,
  createMoogNode,
  type BitcrusherNode,
  type PinkNoiseNode,
  type MoogNode,
} from "clawdio";
import { createWhiteNoiseBufferNode } from "./noise";

type CustomNodes = BitcrusherNode | PinkNoiseNode;

type AudioSetup<T> = {
  node: AudioNode;
  instance?: T;
};

const context = new AudioContext();
const audioNodes = new Map<string, AudioSetup<CustomNodes>>();

const createOscillatorAudioNode = (id: string) => {
  const osc = context.createOscillator();
  osc.frequency.value = 220;
  osc.type = "sine";
  osc.start();

  audioNodes.set(id, { node: osc });
};

const createGainAudioNode = (id: string) => {
  const gain = context.createGain();
  gain.gain.value = 0.25;

  audioNodes.set(id, { node: gain });
};

const createAnalyserNode = (id: string) => {
  const analyser = context.createAnalyser();

  // Configure analyser
  analyser.fftSize = 1024;

  audioNodes.set(id, { node: analyser });
};

const createDelayNode = (id: string) => {
  const node = context.createDelay();

  audioNodes.set(id, { node });
};

const createSampleNode = (id: string) => {
  const node = context.createBufferSource();

  audioNodes.set(id, { node });
};

const createConstantSourceNode = (id: string) => {
  const node = context.createConstantSource();
  node.start();

  audioNodes.set(id, { node });
};

const createWaveShaperNode = (id: string) => {
  const node = context.createWaveShaper();
  node.curve = generateWaveShaperCurve("sigmoid", 400);
  node.oversample = "4x";

  audioNodes.set(id, { node });
};

const createBitcrusherWorklet = async (id: string) => {
  const bitcrusher = await createBitcrusherNode(context, 4, 0.1);

  audioNodes.set(id, { node: bitcrusher.node, instance: bitcrusher });
};

const createPinkNoiseWorklet = async (id: string) => {
  const pinkNoise = await createPinkNoiseNode(context, 4096);

  audioNodes.set(id, { node: pinkNoise.node, instance: pinkNoise });
};

const createMoogWorklet = async (id: string) => {
  const moog = await createMoogNode(context);

  audioNodes.set(id, { node: moog.node, instance: moog });
};

const createWhiteNoiseNode = (id: string) => {
  const node = createWhiteNoiseBufferNode(context);

  audioNodes.set(id, { node });
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
    case "arpeggio":
    case "sample":
    case "white-noise":
      createSampleNode(id);
      break;
    case "constant-source":
      createConstantSourceNode(id);
      break;
    case "wave-shaper":
      createWaveShaperNode(id);
      break;
    case "bitcrusher":
      createBitcrusherWorklet(id);
      break;
    case "pink-noise":
      createPinkNoiseWorklet(id);
      break;
    case "moog":
      createMoogWorklet(id);
      break;
    default:
      break;
  }
}

export function removeAudioNode(id: string) {
  audioNodes.delete(id);
}

function getAudioParamsFromHandles(
  targetNode: AudioNode,
  targetHandle?: string | null
) {
  let targetRef: AudioNode | AudioParam = targetNode;
  if (targetHandle && targetNode) {
    if (targetHandle in targetNode) {
      const audioParam = targetHandle as keyof AudioNode;
      // console.log(
      //   "target handle found",
      //   targetNode,
      //   targetHandle,
      //   targetNode[audioParam]
      // );
      targetRef = targetNode[audioParam] as unknown as AudioParam;
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
  const sourceNode = audioNodes.get(source)?.node;
  const targetNode = audioNodes.get(target)?.node;
  // console.log("connecting nodes", "source:", source, "target:", target);
  // console.log("connecting nodes", "source:", sourceNode, "target:", targetNode);

  // Check if we have a source node - kinda critical for everything
  if (!sourceNode) return;

  // If we connect to an output node, connect to the audio context output
  if (target == "output") {
    // This should never be an input, since audio params don't output properly
    return sourceNode.connect(context.destination);
  }

  // Check if we have a target node - also critical for everything else past this point
  if (!targetNode) return;
  // console.log("connecting nodes - past checkpoint!", source, target);

  // Handle connections to node parameters vs nodes (aka "handles")
  const targetRef = getAudioParamsFromHandles(targetNode, targetHandle);

  // Check if we have a target node
  if (!targetNode) return;
  // Connect to target node
  // @ts-expect-error - We use generic AudioNode type, which doesn't handle connecting to AudioParams (which some nodes do)
  sourceNode.connect(targetRef);
}

export function updateAudioNode(id: string, data: any) {
  const audioNode = audioNodes.get(id)?.node;
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
  const sourceNode = audioNodes.get(source)?.node;
  const targetNode = audioNodes.get(target)?.node;

  if (!sourceNode || !targetNode) return;

  // Handle connections to node parameters vs nodes (aka "handles")
  const targetRef = getAudioParamsFromHandles(targetNode, targetHandle);

  // @ts-expect-error - TS can't grab the right overload in this case, asks for a number in my case
  sourceNode.disconnect(targetRef);
}

export function recreateSampleNode(id: string, data?: any) {
  const oldNode = audioNodes.get(id)?.node as AudioBufferSourceNode | undefined;
  const newNode = context.createBufferSource();
  newNode.buffer = data.buffer;

  // Copy over any existing properties (like playback time)
  if (oldNode) {
    newNode.playbackRate.value = oldNode.playbackRate.value;
    newNode.loop = oldNode.loop;
  }

  audioNodes.set(id, { node: newNode });
}

export function reconnectNode(audioNodeKey: string) {
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

export function resetAudioNodes() {
  for (const node in audioNodes) {
    audioNodes.delete(node);
    // Maybe close audio context and re-open to stop any lingering audio signals
  }
}

export function playAudio() {
  // Resume the audio context if needed
  context.resume();

  // Nodes like oscillators play by default since we start them initially

  // But samples need to be played individually
  audioNodes.forEach(({ node: audioNode }, audioNodeKey) => {
    // Check if it's a sample and play it
    if (audioNode instanceof AudioBufferSourceNode) {
      audioNode.start();

      // Now it get's complicated, we need to re-create this node
      // Audio buffers don't allow for replay, so we recreate each playback
      const newNode = context.createBufferSource();
      newNode.buffer = audioNode.buffer;

      // Update the cache with new audio node
      audioNodes.set(audioNodeKey, { node: newNode });

      reconnectNode(audioNodeKey);
    }
  });
}

export function getAudioNode(id: string) {
  return audioNodes.get(id)?.node;
}

export function getAudioSetup(id: string) {
  return audioNodes.get(id);
}

export function getCurrentTime() {
  return context.currentTime;
}
