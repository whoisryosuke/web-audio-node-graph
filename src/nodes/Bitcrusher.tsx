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

export type ConstantSourceData = {
  offset: number;
};

type Props = {
  id: string;
  data: ConstantSourceData;
};

const Bitcrusher = ({ id, data }: Props) => {
  // This uses a AudioWorklet that uses WASM under the hood
  // So we need to access the wrapper instance to use it's methods to set properties
  // @TODO: Maybe leverage direct port messages in `updateNode()`?
  const bitcrusherInstance = getAudioSetup(id)?.instance;
  const [bits, setBits] = useState(4);
  const [normfreq, setNormfreq] = useState(0.1);

  const handleBits = (e: { value: number[] }) => {
    const newValue = +e.value;
    bitcrusherInstance?.setBits(newValue);
    setBits(newValue);
  };

  const handleNormfreq = (e: { value: number[] }) => {
    const newValue = +e.value;
    bitcrusherInstance?.setNormfreq(newValue);
    setNormfreq(newValue);
  };

  return (
    <NodeContainer>
      <NodeHeading color="purple">Bitcrusher Node</NodeHeading>
      <NodeInput />
      <NodeOutput />
      <NodeContent>
        <NodeInputField
          label="Bits"
          helper={`${bits}`}
          tooltip="The resolution. Lower = Crunchier"
        >
          <Slider
            className="nodrag"
            min={0}
            max={16}
            step={1}
            value={[bits]}
            onValueChange={handleBits}
          />
        </NodeInputField>
        <NodeInputField
          label="Normfreq"
          helper={`${normfreq}`}
          tooltip="0 = more effect, 1 = less effect"
        >
          <Slider
            className="nodrag"
            min={0}
            max={1}
            step={0.01}
            value={[normfreq]}
            onValueChange={handleNormfreq}
          />
        </NodeInputField>
      </NodeContent>
    </NodeContainer>
  );
};

export default Bitcrusher;
