import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";

type Props = {
  id: string;
  data: Partial<Node>;
};

const Oscillator = ({ id, data }: Props) => {
  const { updateNode } = useNodeStore();

  const setFrequency = (e: React.ChangeEvent<HTMLInputElement>) =>
    updateNode(id, { frequency: +e.target.value });
  const setType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    updateNode(id, { type: e.target.value });

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>Oscillator Node</p>

        <label>
          <span>Frequency</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={data.frequency}
            onChange={setFrequency}
          />
          <span>{data.frequency}Hz</span>
        </label>

        <label>
          <span>Waveform</span>
          <select className="nodrag" value={data.type} onChange={setType}>
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default Oscillator;
