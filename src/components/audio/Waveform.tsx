import React, { useEffect, useRef, useState } from "react";
import { getAudioNode } from "../../services/audio/audio-graph";
import map from "../../utils/map";
import LineGraph from "../ui/viz/LineGraph";
import { Stack } from "@chakra-ui/react";
import NodeInputField from "../nodes/NodeInputField";
import { useNodeStore } from "../../store/nodes";
import Slider from "../ui/Slider";

const DEFAULT_AUDIO_HEIGHT = 128;

type Props = {
  id: string;
};

const Waveform = ({ id }: Props) => {
  const [fps, setFps] = useState(0);
  const analyser = getAudioNode(id) as AnalyserNode;

  const handleFpsChange = (e: { value: number[] }) => setFps(+e.value);

  return (
    <Stack>
      <LineGraph
        analyser={analyser}
        color={"blue"}
        width={400}
        height={300}
        fps={fps}
        animated
      />

      <NodeInputField
        label="Animation Speed (fps)"
        helper={!fps ? "Unlimited" : `${fps} fps`}
      >
        <Slider
          className="nodrag"
          min={0}
          max={120}
          step={1}
          defaultValue={[fps]}
          value={[fps]}
          onValueChange={handleFpsChange}
        />
      </NodeInputField>
    </Stack>
  );
};

export default Waveform;
