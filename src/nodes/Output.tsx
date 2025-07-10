import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import type { BaseNode } from "./types";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeContent from "../components/nodes/NodeContent";
import NodeHeading from "../components/nodes/NodeHeading";

type Props = BaseNode;

const Output = ({ id, data }: Props) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  return (
    <NodeContainer>
      <NodeHeading color="gray">Output</NodeHeading>
      <NodeContent>
        <Handle type="target" position={Position.Left} />
        <VStack>
          <Button>Play Audio</Button>
        </VStack>
      </NodeContent>
    </NodeContainer>
  );
};

export default Output;
