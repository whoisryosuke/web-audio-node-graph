import { Box, Heading, Stack, type ColorPalette } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";
import {
  useBackgroundColor,
  useBorderColor,
  useNodeHeaderBackground,
} from "../../styles/colors";
import type { IconType } from "react-icons";
import { BiMusic } from "react-icons/bi";

type Props = {
  color?: ColorPalette;
  icon?: IconType;
};

const NodeHeading = ({
  children,
  color = "blue",
  icon,
  ...props
}: PropsWithChildren<Props>) => {
  const bg = useNodeHeaderBackground(color);
  const IconComponent = icon ? icon : BiMusic;
  return (
    <Stack
      bg={bg}
      py={2}
      px={4}
      borderTopLeftRadius={"lg"}
      borderTopRightRadius={"lg"}
      flexDirection="row"
      alignItems="center"
      {...props}
    >
      {icon && <IconComponent />}
      <Heading size="sm">{children}</Heading>
    </Stack>
  );
};

export default NodeHeading;
