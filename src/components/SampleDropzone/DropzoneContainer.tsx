import { Box } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";
import {
  useBorderColor,
  useInputBg,
  useInputBorder,
} from "../../styles/colors";

type Props = {
  highlighted: boolean;
};

const DropzoneContainer = ({
  highlighted,
  ...props
}: PropsWithChildren<Props>) => {
  const bg = useInputBg();
  const borderColor = useInputBorder();
  return (
    <Box
      //   bg={bg}
      p={4}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={highlighted ? "green.400" : borderColor}
      borderRadius="md"
      textAlign="center"
      {...props}
    />
  );
};

export default DropzoneContainer;
