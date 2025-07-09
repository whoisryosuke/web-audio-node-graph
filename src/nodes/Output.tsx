import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import type { BaseNode } from "./types";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";

type Props = BaseNode;

const Output = ({ id, data }: Props) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  return (
    <Box bg={bg} borderRadius={"sm"}>
      <Handle type="target" position={Position.Left} />
      <VStack>
        <Text>Output</Text>
        <Button>Play Audio</Button>
      </VStack>
    </Box>
  );
};

export default Output;
