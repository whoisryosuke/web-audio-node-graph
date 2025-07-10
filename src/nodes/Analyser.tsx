import { Position, type Node } from "@xyflow/react";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeHandle from "../components/nodes/NodeHandle";
import Waveform from "../components/audio/Waveform";

type Props = {
  id: string;
  data: Partial<Node>;
};

const Analyser = ({ id, data }: Props) => {
  return (
    <NodeContainer>
      <NodeHeading>Analyser</NodeHeading>
      <NodeContent>
        <Waveform id={id} />
      </NodeContent>

      <NodeHandle type="source" position={Position.Right} />
      <NodeHandle type="target" position={Position.Left} />
    </NodeContainer>
  );
};

export default Analyser;
