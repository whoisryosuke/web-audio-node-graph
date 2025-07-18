import { Position, type Node } from "@xyflow/react";
import React, { useEffect, useState } from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import Slider from "../components/ui/Slider";
import NodeInputField from "../components/nodes/NodeInputField";
import NodeHandle from "../components/nodes/NodeHandle";
import NodeInput from "../components/nodes/NodeInput";
import NodeOutput from "../components/nodes/NodeOutput";
import {
  getAudioNode,
  getAudioSetup,
  reconnectNode,
  recreateSampleNode,
} from "../services/audio/audio-graph";
import { ALL_SAFE_NODE_ICONS } from "./icons";
import Select from "../components/ui/Select";
import { Button } from "@chakra-ui/react";
import { createWhiteNoiseBuffer } from "../services/audio/noise";
import type { NodeIO } from "./types";

export type WhiteNoiseData = {
  buffer: AudioBuffer;
};

type Props = {
  id: string;
  data: WhiteNoiseData;
};

const WhiteNoise = ({ id, data }: Props) => {
  const [playing, setPlaying] = useState(false);
  const [noiseType, setNoiseType] = useState("random");
  const { updateNode } = useNodeStore();

  const playSample = () => {
    const node = getAudioNode(id) as AudioBufferSourceNode;
    if (!node) return;

    if (!playing) {
      console.log("starting buffer node", node);
      // Play the sound
      node.start();
      setPlaying(true);
    } else {
      node.stop();
      // Recreate the buffer node and reconnect it as needed
      recreateSampleNode(id, data);
      reconnectNode(id);
      setPlaying(false);
    }
  };

  useEffect(() => {
    const node = getAudioNode(id) as AudioBufferSourceNode;
    console.log("node buffer", node.buffer);
    if (!node || node.buffer) return;

    const audioCtx = new window.OfflineAudioContext(2, 44100 * 40, 44100);
    const buffer = createWhiteNoiseBuffer(audioCtx);

    node.buffer = buffer;
    node.loop = true;

    updateNode(id, { buffer });
  }, []);

  return (
    <NodeContainer>
      <NodeHeading color="purple" icon={ALL_SAFE_NODE_ICONS["white-noise"]}>
        White Noise Node
      </NodeHeading>
      <NodeOutput />
      <NodeContent>
        {/* <NodeInputField label="Noise Algorithm">
          <Select options={[]} placeholder="Select a noise type" />
          <Button>Generate Noise</Button>
        </NodeInputField> */}
        <Button
          onClick={playSample}
          variant="surface"
          _active={{ bg: "blue.600" }}
        >
          {playing ? "Stop" : "Play"}
        </Button>
      </NodeContent>
    </NodeContainer>
  );
};

export const WhiteNoiseIO: NodeIO = {
  inputs: [],
  outputs: ["node"],
};

export default WhiteNoise;
