import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";

type Props = {
  id: string;
  data: Partial<Node>;
};

const Gain = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setGain = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateNode(id, { gain: +e.target.value });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Gain Node</p>

        <label>
          <span>Gain</span>
          <input
            className="nodrag"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={data.gain}
            onChange={setGain}
          />
          <span>{data.gain}</span>
        </label>
      </div>

      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default Gain;
