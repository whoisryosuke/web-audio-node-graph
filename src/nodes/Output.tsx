import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import type { BaseNode } from "./types";

type Props = BaseNode;

const Output = ({ id, data }: Props) => {
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Output</p>
        <button>Play Audio</button>
      </div>
    </div>
  );
};

export default Output;
