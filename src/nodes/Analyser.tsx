import { Position, type Node } from "@xyflow/react";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeHandle from "../components/nodes/NodeHandle";
import Waveform from "../components/audio/Waveform";
import Select from "../components/ui/Select";
import { useState } from "react";
import FrequencyBars from "../components/audio/FrequencyBars";

type Props = {
  id: string;
  data: Partial<Node>;
};

const VIZ_COMPONENTS = {
  Waveform: Waveform,
  FrequencyBars: FrequencyBars,
};
const VIZ_OPTIONS = ["Waveform", "FrequencyBars"] as const;
type VizOptions = (typeof VIZ_OPTIONS)[number];

const Analyser = ({ id, data }: Props) => {
  const [currentViz, setCurrentViz] = useState<VizOptions>("Waveform");
  const options = VIZ_OPTIONS.map((nodeType) => ({
    value: nodeType,
    label: nodeType,
  }));

  const handleChange = (e: any) => {
    console.log("changing viz", e);
    setCurrentViz(e.value);
  };

  const VizComponent = VIZ_COMPONENTS[currentViz];

  return (
    <NodeContainer>
      <NodeHeading>Analyser</NodeHeading>
      <NodeInput />
      <NodeOutput />
      <NodeContent>
        <Select
          className="nodrag"
          value={[currentViz]}
          onValueChange={handleChange}
          options={options}
          placeholder="Select an visualization"
        />
        <VizComponent key={currentViz} id={id} />
      </NodeContent>
    </NodeContainer>
  );
};

export default Analyser;
