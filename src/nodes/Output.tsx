import { Handle, Position, type Node } from "@xyflow/react";
import React from "react";
import { useNodeStore } from "../store/nodes";
import type { BaseNode } from "./types";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeContent from "../components/nodes/NodeContent";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeInput from "../components/nodes/NodeInput";
import { playAudio } from "../services/audio/audio-graph";
import { MdSpeaker } from "react-icons/md";

type Props = BaseNode;

const Output = ({ id, data }: Props) => {
  const bg = useColorModeValue("gray.100", "gray.700");

  const handlePlayAudio = () => {
    playAudio();
  };
  return (
    <NodeContainer>
      <NodeHeading color="gray" icon={MdSpeaker}>
        Output
      </NodeHeading>
      <NodeInput name="" />
      <NodeContent>
        <VStack>
          {/* <Button colorPalette="blue" width="100%" onClick={handlePlayAudio}>
            Play Audio
          </Button> */}
        </VStack>
      </NodeContent>
    </NodeContainer>
  );
};

export default Output;
