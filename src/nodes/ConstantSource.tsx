import { Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import Slider from "../components/ui/Slider";
import type { SliderRootProps } from "@chakra-ui/react";
import NodeInputField from "../components/nodes/NodeInputField";
import NodeHandle from "../components/nodes/NodeHandle";

export type ConstantSourceData = {
  offset: number;
};

type Props = {
  id: string;
  data: ConstantSourceData;
};

const ConstantSource = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setOffset = (e: { value: number[] }) => {
    updateNode<ConstantSourceData>(id, { offset: +e.value });
  };

  return (
    <NodeContainer>
      <NodeHeading>Constant Source Node</NodeHeading>
      <NodeContent>
        <NodeInputField label="Offset" helper={`${data.offset}`}>
          <Slider
            className="nodrag"
            min={0}
            max={1}
            step={0.01}
            value={[data.offset]}
            onValueChange={setOffset}
          />
        </NodeInputField>
      </NodeContent>

      <NodeHandle type="source" position={Position.Right} />
    </NodeContainer>
  );
};

export default ConstantSource;
