import NodeSlotContainer from "./NodeSlotContainer";

type Props = {
  id?: string;
  name?: string;
};

const NodeOutput = ({ id = "node", name = "Node Output" }: Props) => {
  return <NodeSlotContainer id={id} name={name} type="source" right />;
};

export default NodeOutput;
