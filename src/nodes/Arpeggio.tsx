import { Position, type Node } from "@xyflow/react";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeHandle from "../components/nodes/NodeHandle";
import { useNodeStore } from "../store/nodes";
import { useEffect, useState } from "react";
import SampleDropzone from "../components/SampleDropzone/SampleDropzone";
import SamplePiano from "../components/SamplePiano/SamplePiano";
import {
  getAudioNode,
  getCurrentTime,
  reconnectNode,
  recreateSampleNode,
} from "../services/audio/audio-graph";
import { calculateDetune } from "../components/SamplePiano/utils";
import Select from "../components/ui/Select";
import SampleDrumPad from "../components/SampleDrumPad/SampleDrumPad";
import { Stack } from "@chakra-ui/react";
import { ALL_SAFE_NODE_ICONS } from "./icons";
import ArpeggioSampler from "../components/audio/ArpeggioSampler/ArpeggioSampler";
import NodeOutput from "../components/nodes/NodeOutput";
import type { NodeIO } from "./types";

export type SampleData = {
  buffer: AudioBuffer;
};

type Props = {
  id: string;
  data: SampleData;
};

const Arpeggio = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setBuffer = (newAudioBuffer: AudioBuffer) => {
    updateNode(id, { buffer: newAudioBuffer });
  };

  const playSample = (note: string, octave: number, offsetTime: number = 0) => {
    const node = getAudioNode(id) as AudioBufferSourceNode;
    if (!node) return;

    node.detune.value = calculateDetune(note, octave);
    // Play the sound
    const now = getCurrentTime();
    const offset = offsetTime / 1000;
    node.start(now + offset);

    // Recreate the buffer node and reconnect it as needed
    recreateSampleNode(id, data);
    reconnectNode(id);
  };

  return (
    <NodeContainer maxWidth="375px">
      <NodeHeading icon={ALL_SAFE_NODE_ICONS["sample"]}>
        Arpeggio Node
      </NodeHeading>
      <NodeContent>
        <SampleDropzone buffer={data.buffer} setBuffer={setBuffer} />
        {data.buffer && <ArpeggioSampler playSample={playSample} />}
      </NodeContent>

      <NodeOutput />
    </NodeContainer>
  );
};

export const ArpeggioIO: NodeIO = {
  inputs: [],
  outputs: ["node"],
};

export default Arpeggio;
