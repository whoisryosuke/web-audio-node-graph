import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import { Field, Input } from "@chakra-ui/react";
import Slider from "../components/ui/Slider";
import NodeInputField from "../components/nodes/NodeInputField";
import Select from "../components/ui/Select";
import NodeHandle from "../components/nodes/NodeHandle";
import { ALL_SAFE_NODE_ICONS } from "./icons";
import NodeOutput from "../components/nodes/NodeOutput";

type OscillatorNodeData = {
  frequency: number;
  type: OscillatorNode["type"];
};

type Props = {
  id: string;
  data: OscillatorNodeData;
};

const Oscillator = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setFrequency = (e: { value: number[] }) => {
    updateNode(id, { frequency: +e.value });
  };
  const setType = (e: { value: string[] }) => {
    updateNode(id, { type: e.value[0] });
  };

  const options = ["sine", "triangle", "sawtooth", "square"].map(
    (nodeType) => ({
      value: nodeType,
      label: nodeType,
    })
  );

  return (
    <NodeContainer>
      <NodeHeading icon={ALL_SAFE_NODE_ICONS["osc"]}>
        Oscillator Node
      </NodeHeading>
      <NodeOutput />
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
            value={[data.type ?? ""]}
            options={options}
            onValueChange={setType}
            placeholder="Select a waveform type..."
          />
        </NodeInputField>
      </NodeContent>
    </NodeContainer>
  );
};

export default Oscillator;
