import { Position, type Node } from "@xyflow/react";
import React, { useState } from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import Slider from "../components/ui/Slider";
import NodeInputField from "../components/nodes/NodeInputField";
import NodeHandle from "../components/nodes/NodeHandle";
import NodeInput from "../components/nodes/NodeInput";
import NodeOutput from "../components/nodes/NodeOutput";
import { getAudioSetup } from "../services/audio/audio-graph";
import { ALL_SAFE_NODE_ICONS } from "./icons";

export type ConstantSourceData = {
  offset: number;
};

type Props = {
  id: string;
  data: ConstantSourceData;
};

const PinkNoise = ({ id, data }: Props) => {
  return (
    <NodeContainer>
      <NodeHeading color="purple" icon={ALL_SAFE_NODE_ICONS["bitcrusher"]}>
        Pink Noise Node
      </NodeHeading>
      <NodeOutput />
      <NodeContent></NodeContent>
    </NodeContainer>
  );
};

export default PinkNoise;
