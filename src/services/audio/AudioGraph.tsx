import React, { useEffect, useRef } from "react";
import { useNodeStore } from "../../store/nodes";

type Props = {};

const AudioGraph = (props: Props) => {
  const audioNodes = useRef(new Map());
  const { nodes } = useNodeStore();

  useEffect(() => {
    // Check for new nodes added
  }, [nodes]);

  return <div>AudioGraph</div>;
};

export default AudioGraph;
