import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import { Field, Input } from "@chakra-ui/react";
import Slider from "../components/ui/Slider";
import NodeInputField from "../components/nodes/NodeInputField";
import Select from "../components/ui/select";
import NodeHandle from "../components/nodes/NodeHandle";

type Props = {
  id: string;
  data: Partial<Node>;
};

const Oscillator = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setFrequency = (e: any) => {
    updateNode(id, { frequency: +e.value });
  };
  const setType = (e: any) => {
    updateNode(id, { type: e.value });
  };

  const options = ["sine", "triangle", "sawtooth", "square"].map(
    (nodeType) => ({
      value: nodeType,
      label: nodeType,
    })
  );

  return (
    <NodeContainer>
      <NodeHeading>Oscillator Node</NodeHeading>
      <NodeContent>
        <NodeInputField label="Frequency" helper={`${data.frequency}Hz`}>
          <Slider
            className="nodrag"
            min={10}
            max={1000}
            value={[data.frequency]}
            onValueChange={setFrequency}
          />
        </NodeInputField>

        <NodeInputField label="Waveform">
          <Select
            className="nodrag"
            value={data.type}
            defaultValue={data.type}
            options={options}
            onValueChange={setType}
            placeholder="Select a waveform type..."
          />
        </NodeInputField>
      </NodeContent>

      <NodeHandle type="source" position={Position.Right} />
    </NodeContainer>
  );
};

export default Oscillator;
