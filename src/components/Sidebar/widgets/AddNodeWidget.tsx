import React, { useRef } from "react";
import ALL_NODE_TYPES, { type CustomNodeTypesNames } from "../../../nodes";
import { useNodeStore } from "../../../store/nodes";
import { Button, Heading, Stack } from "@chakra-ui/react";
import Select from "../../ui/select";

type Props = {};

const AddNodeWidget = (props: Props) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const { addNode } = useNodeStore();
  const handleAddNode = () => {
    if (!selectRef.current) return;
    addNode(selectRef.current.value as CustomNodeTypesNames, {});
  };

  const options = Object.keys(ALL_NODE_TYPES).map((nodeType) => ({
    value: nodeType,
    label: nodeType,
  }));
  return (
    <Stack>
      <Heading size="md">Add Node</Heading>
      <Select
        ref={selectRef}
        options={options}
        placeholder="Select a node type..."
      />
      <Button onClick={handleAddNode}>Add Node</Button>
    </Stack>
  );
};

export default AddNodeWidget;
