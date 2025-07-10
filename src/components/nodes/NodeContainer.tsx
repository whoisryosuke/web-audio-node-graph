import { Box, Stack } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";
import { useBackgroundColor, useBorderColor } from "../../styles/colors";

type Props = {};

const NodeContainer = (props: PropsWithChildren) => {
  const bg = useBackgroundColor();
  const borderColor = useBorderColor();
  return (
    <Stack
      minWidth="300px"
      bg={bg}
      borderColor={borderColor}
      borderWidth={2}
      borderStyle="solid"
      borderRadius={"lg"}
      overflow="hidden"
      {...props}
    />
  );
};

export default NodeContainer;
