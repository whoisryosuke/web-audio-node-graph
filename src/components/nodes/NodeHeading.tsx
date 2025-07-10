import { Box, Heading, type ColorPalette } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";
import {
  useBackgroundColor,
  useBorderColor,
  useNodeHeaderBackground,
} from "../../styles/colors";

type Props = {
  color?: ColorPalette;
};

const NodeHeading = ({
  children,
  color = "blue",
  ...props
}: PropsWithChildren<Props>) => {
  const bg = useNodeHeaderBackground(color);
  return (
    <Box bg={bg} py={2} px={4} {...props}>
      <Heading size="sm">{children}</Heading>
    </Box>
  );
};

export default NodeHeading;
