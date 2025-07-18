import React from "react";
import ALL_NODE_TYPES, {
  ALL_SAFE_NODE_NAMES,
  ALL_SAFE_NODE_TYPES,
  type CustomNodeTypesNames,
} from "../../nodes";
import { Box, Button, Icon, Stack } from "@chakra-ui/react";
import { useNodeStore } from "../../store/nodes";
import { useAppStore } from "../../store/app";
import {
  useBackgroundColor,
  useBorderColor,
  useInputBg,
  useInputText,
} from "../../styles/colors";
import { ALL_SAFE_NODE_ICONS } from "../../nodes/icons";
import type { Edge } from "@xyflow/react";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

const NodeList = ({ search, setSearch }: Props) => {
  const {
    mousePosition,
    setNodePopup,
    connectionPending,
    clearConnectionPending,
  } = useAppStore();
  const { addNode, addEdge } = useNodeStore();
  const iconColor = useInputText();

  const handleAddNode = (type: CustomNodeTypesNames) => {
    const newNodeId = addNode(type, mousePosition, {});

    // Close popup
    setNodePopup(false);

    // Connect to node if necessary
    console.log("creating connection", connectionPending, newNodeId);
    const edge: Partial<Edge> = {
      source: connectionPending?.node,
      sourceHandle: null,
      target: newNodeId,
      targetHandle: connectionPending?.handleId,
    };
    addEdge(edge);
    clearConnectionPending();

    // Reset search
    setSearch("");
  };

  // We check all the names and see if any match
  // then return the keys
  const searchResults = Object.entries(ALL_SAFE_NODE_NAMES)
    .filter(([_, nodeName]) => nodeName.toLowerCase().includes(search))
    .map(([key]) => key) as CustomNodeTypesNames[];

  // We grab all the keys for the node types
  let keys = Object.keys(ALL_SAFE_NODE_TYPES) as CustomNodeTypesNames[];
  // and filter it by the search keys we found above
  keys = keys.filter((key) => searchResults.includes(key));

  const buttons = keys.map((nodeType) => {
    const NodeIcon = ALL_SAFE_NODE_ICONS[nodeType];
    return (
      <Button
        key={nodeType}
        variant="subtle"
        justifyContent="flex-start"
        onClick={() => handleAddNode(nodeType)}
      >
        <Icon color={iconColor}>
          <NodeIcon />
        </Icon>{" "}
        {ALL_SAFE_NODE_NAMES[nodeType]}
      </Button>
    );
  });
  return (
    <Stack maxHeight="300px" overflowY="scroll">
      {buttons}
    </Stack>
  );
};

export default NodeList;
