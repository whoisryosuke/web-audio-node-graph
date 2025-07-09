import React, { useRef } from "react";
import ALL_NODE_TYPES, { type CustomNodeTypesNames } from "../../../nodes";
import { useNodeStore } from "../../../store/nodes";

type Props = {};

const AddNodeWidget = (props: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { addNode } = useNodeStore();
  const handleAddNode = () => {
    if (!selectRef.current) return;
    addNode(selectRef.current.value as CustomNodeTypesNames, {});
  };
  return (
    <div>
      <h2>Add Node</h2>
      <select ref={selectRef}>
        {Object.keys(ALL_NODE_TYPES).map((nodeType) => (
          <option value={nodeType}>{nodeType}</option>
        ))}
      </select>
      <button onClick={handleAddNode}>Add Node</button>
    </div>
  );
};

export default AddNodeWidget;
