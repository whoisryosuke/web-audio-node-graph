import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeOutput from "../components/nodes/NodeOutput";
import { ALL_SAFE_NODE_ICONS } from "./icons";
import type { NodeIO } from "./types";

export type ConstantSourceData = {
  offset: number;
};

type Props = {
  id: string;
  data: ConstantSourceData;
};

const PinkNoise = ({ id, data }: Props) => {
  return (
    <NodeContainer>
      <NodeHeading color="purple" icon={ALL_SAFE_NODE_ICONS["bitcrusher"]}>
        Pink Noise Node
      </NodeHeading>
      <NodeOutput />
      <NodeContent></NodeContent>
    </NodeContainer>
  );
};

export const PinkNoiseIO: NodeIO = {
  inputs: [],
  outputs: ["node"],
};

export default PinkNoise;
