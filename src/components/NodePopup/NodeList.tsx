import React from "react";
import ALL_NODE_TYPES from "../../nodes";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useNodeStore } from "../../store/nodes";

type Props = {};

const NodeList = (props: Props) => {
  const { addNode } = useNodeStore();
  const handleAddNode = (type: CustomNodeTypesNames) => {
    addNode(type, {});
  };

  const buttons = Object.keys(ALL_NODE_TYPES).map((nodeType) => (
    <Button
      key={nodeType}
      variant="ghost"
      justifyContent="flex-start"
      onClick={() => handleAddNode(nodeType)}
    >
      {nodeType}
    </Button>
  ));
  return (
    <Stack maxHeight="300px" overflowY="scroll">
      {buttons}
    </Stack>
  );
};

export default NodeList;
