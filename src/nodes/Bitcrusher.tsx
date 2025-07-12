import { Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import Slider from "../components/ui/Slider";
import NodeInputField from "../components/nodes/NodeInputField";
import NodeHandle from "../components/nodes/NodeHandle";
import NodeInput from "../components/nodes/NodeInput";
import NodeOutput from "../components/nodes/NodeOutput";

export type ConstantSourceData = {
  offset: number;
};

type Props = {
  id: string;
  data: ConstantSourceData;
};

const Bitcrusher = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  //   const setOffset = (e: { value: number[] }) => {
  //     updateNode<ConstantSourceData>(id, { offset: +e.value });
  //   };

  return (
    <NodeContainer>
      <NodeHeading color="purple">Bitcrusher Node</NodeHeading>
      <NodeInput />
      <NodeOutput />
      <NodeContent>
        {/* <NodeInputField label="Offset" helper={`${data.offset}`}>
          <Slider
            className="nodrag"
            min={0}
            max={1}
            step={0.01}
            value={[data.offset]}
            onValueChange={setOffset}
          />
        </NodeInputField> */}
      </NodeContent>
    </NodeContainer>
  );
};

export default Bitcrusher;
