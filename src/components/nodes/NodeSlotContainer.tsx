import { Position, type HandleType } from "@xyflow/react";
import React from "react";
import NodeHandle from "./NodeHandle";
import { Box, Text } from "@chakra-ui/react";

type Props = {
  id: string;
  name: string;
  right?: boolean;
  type: HandleType;
};

const NodeSlotContainer = ({ id, name, right, type }: Props) => {
  return (
    <Box position="relative" minHeight={8}>
      <Text fontSize="sm" py={2} px={4} textAlign={right ? "right" : "left"}>
        {name}
      </Text>
      <NodeHandle
        type={type}
        position={right ? Position.Right : Position.Left}
        id={id}
      />
    </Box>
  );
};

export default NodeSlotContainer;
