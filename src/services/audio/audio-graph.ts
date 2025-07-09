import type { CustomNodeTypesNames } from "../../nodes";

const context = new AudioContext();
const audioNodes = new Map<string, AudioNode>();

const createOscillatorAudioNode = (id: string) => {
  const osc = context.createOscillator();
  osc.frequency.value = 220;
  osc.type = "square";
  osc.start();

  audioNodes.set(id, osc);
};

const createGainAudioNode = (id: string) => {
  const gain = context.createGain();
  gain.gain.value = 0.25;

  audioNodes.set(id, gain);
};

export function createAudioNode(type: CustomNodeTypesNames, id: string) {
  switch (type) {
    case "osc":
      createOscillatorAudioNode(id);
      break;
    case "gain":
      createGainAudioNode(id);
      break;
    case "output":
      break;
  }
}

export function removeAudioNode(id: string) {
  audioNodes.delete(id);
}

export function connectAudioNodes(source: string, target: string) {
  const sourceNode = audioNodes.get(source);
  const targetNode = audioNodes.get(target);
  console.log("connecting nodes", "source:", source, "target:", target);
  console.log("connecting nodes", "source:", sourceNode, "target:", targetNode);

  if (!sourceNode) return;
  // If we connect to an output node, connect to the audio context output
  if (target == "output") {
    return sourceNode.connect(context.destination);
  }

  if (!targetNode) return;
  sourceNode.connect(targetNode);
}

export function playAudio() {
  context.resume();
}
