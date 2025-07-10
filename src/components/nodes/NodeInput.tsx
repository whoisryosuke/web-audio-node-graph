import NodeSlotContainer from "./NodeSlotContainer";

type Props = {
  id?: string;
  name?: string;
};

const NodeInput = ({ id = "node", name = "Node Input" }: Props) => {
  return <NodeSlotContainer id={id} name={name} type="target" />;
};

export default NodeInput;
