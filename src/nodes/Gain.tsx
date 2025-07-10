import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeInputField from "../components/nodes/NodeInputField";
import Slider from "../components/ui/Slider";
import NodeHandle from "../components/nodes/NodeHandle";

type Props = {
  id: string;
  data: Partial<Node>;
};

const Gain = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setGain = (e: any) => updateNode(id, { gain: +e.value });

  return (
    <NodeContainer>
      <NodeHeading color="purple">Gain Node</NodeHeading>
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
        </NodeInputField>
      </NodeContent>

      <NodeHandle type="source" position={Position.Right} />
      <NodeHandle type="target" position={Position.Left} />
    </NodeContainer>
  );
};

export default Gain;
