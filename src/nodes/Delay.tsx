import { Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeInputField from "../components/nodes/NodeInputField";
import Slider from "../components/ui/Slider";
import NodeHandle from "../components/nodes/NodeHandle";
import NodeInput from "../components/nodes/NodeInput";
import NodeOutput from "../components/nodes/NodeOutput";
import { ALL_SAFE_NODE_ICONS } from "./icons";
import type { NodeIO } from "./types";

type DelayNodeData = {
  delayTime: number;
};

type Props = {
  id: string;
  data: DelayNodeData;
};

const Delay = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setDelayTime = (e: any) => updateNode(id, { delayTime: +e.value });

  return (
    <NodeContainer>
      <NodeHeading color="purple" icon={ALL_SAFE_NODE_ICONS["delay"]}>
        Delay Node
      </NodeHeading>
      <NodeInput />
      <NodeOutput />
      <NodeContent>
        <NodeInputField label="Delay" helper={`${data.delayTime}`}>
          <Slider
            className="nodrag"
            min={0}
            max={1}
            step={0.01}
            defaultValue={[data.delayTime]}
            value={[data.delayTime]}
            onValueChange={setDelayTime}
          />
          <NodeHandle type="target" position={Position.Left} id="delayTime" />
        </NodeInputField>
      </NodeContent>
    </NodeContainer>
  );
};

export const DelayIO: NodeIO = {
  inputs: ["node", "delayTime"],
  outputs: ["node"],
};

export default Delay;
