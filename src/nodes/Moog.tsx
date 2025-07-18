import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeOutput from "../components/nodes/NodeOutput";
import { ALL_SAFE_NODE_ICONS } from "./icons";
import NodeInput from "../components/nodes/NodeInput";

export type MoogData = {
  resonance: number;
  cu: number;
};

type Props = {
  id: string;
  data: MoogData;
};

const Moog = ({ id, data }: Props) => {
  return (
    <NodeContainer>
      <NodeHeading color="purple" icon={ALL_SAFE_NODE_ICONS["bitcrusher"]}>
        Moog Node
      </NodeHeading>
      <NodeInput />
      <NodeOutput />
      <NodeContent></NodeContent>
    </NodeContainer>
  );
};

export default Moog;
