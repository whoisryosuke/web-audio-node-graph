import React from "react";
import ALL_NODE_TYPES, {
  ALL_SAFE_NODE_TYPES,
  type CustomNodeTypesNames,
} from "../../nodes";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useNodeStore } from "../../store/nodes";
import { useAppStore } from "../../store/app";

type Props = {};

const NodeList = (props: Props) => {
  const { mousePosition, setNodePopup } = useAppStore();
  const { addNode } = useNodeStore();
  const handleAddNode = (type: CustomNodeTypesNames) => {
    addNode(type, mousePosition, {});

    // Close popup
    setNodePopup(false);
  };

  const keys = Object.keys(ALL_SAFE_NODE_TYPES) as CustomNodeTypesNames[];
  const buttons = keys.map((nodeType) => (
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
