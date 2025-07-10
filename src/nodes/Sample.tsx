import { Position, type Node } from "@xyflow/react";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeHandle from "../components/nodes/NodeHandle";
import { useNodeStore } from "../store/nodes";
import { useEffect } from "react";

type Props = {
  id: string;
  data: Partial<Node>;
};

const Sample = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const loadSample = async (file: string) => {
    console.log("loading sample");
    const audioCtx = new window.OfflineAudioContext(2, 44100 * 40, 44100);

    console.log("creating audio ctx");
    if (!audioCtx) return;
    // Load data into a generic buffer
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();

    // Use context to decode into an audio buffer
    const newAudioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    console.log("got audio buffer", newAudioBuffer);

    updateNode(id, { buffer: newAudioBuffer });
  };

  useEffect(() => {
    console.log("loading sample...");
    loadSample("/music/ff8-magic.mp3");
  }, []);

  return (
    <NodeContainer>
      <NodeHeading>Sample Node</NodeHeading>
      <NodeContent>Drag and drop sample here</NodeContent>

      <NodeHandle type="source" position={Position.Right} />
    </NodeContainer>
  );
};

export default Sample;
