import styled from "@emotion/styled";
import { Handle, type HandleProps } from "@xyflow/react";
import React from "react";
import {
  useBackgroundColor,
  useInputBg,
  useInputBorder,
} from "../../styles/colors";
import { Box } from "@chakra-ui/react";

type StyledProps = {
  bg: string;
};

const StyledHandle = styled(Handle)<StyledProps>`
  width: 16px;
  height: 16px;
  background: var(--chakra-colors-gray-700);
  border-color: var(--chakra-colors-gray-500);

  &:hover {
    background: var(--chakra-colors-blue-600);
  }

  transition: background 120ms ease-in;
`;

type Props = HandleProps & {};

const NodeHandle = (props: Props) => {
  const bg = useInputBg();
  const border = useInputBorder();
  return (
    <StyledHandle bg={bg} {...props}>
      {/* <Box
        className="nodrag"
        width={4}
        height={4}
        bg={bg}
        borderColor={border}
        borderWidth={1}
        borderStyle="solid"
        borderRadius="full"
        position="relative"
        left={-1.5}
        _hover={{
          bg: "blue.600",
        }}
        transition="background 120ms ease-in"
      /> */}
    </StyledHandle>
  );
};

export default NodeHandle;
