import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeInputField from "../components/nodes/NodeInputField";
import Slider from "../components/ui/Slider";
import NodeHandle from "../components/nodes/NodeHandle";
import { Box, Text } from "@chakra-ui/react";
import NodeInput from "../components/nodes/NodeInput";
import NodeOutput from "../components/nodes/NodeOutput";
import { ALL_SAFE_NODE_ICONS } from "./icons";

export type GainData = {
  gain: number;
};

type Props = {
  id: string;
  data: GainData;
};

const Gain = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setGain = (e: { value: number[] }) =>
    updateNode<GainData>(id, { gain: +e.value });

  return (
    <NodeContainer>
      <NodeHeading color="purple" icon={ALL_SAFE_NODE_ICONS["gain"]}>
        Gain Node
      </NodeHeading>
      <NodeInput />
      <NodeOutput />
      <NodeContent>
        <NodeInputField label="Gain" helper={`${data.gain}`}>
          <Slider
            className="nodrag"
            min={0}
            max={1}
            step={0.01}
            defaultValue={[data.gain]}
            value={[data.gain]}
            onValueChange={setGain}
          />
          <NodeHandle type="target" position={Position.Left} id="gain" />
        </NodeInputField>
      </NodeContent>
    </NodeContainer>
  );
};

export default Gain;
