import React from "react";
import Menu from "../ui/Menu";
import { FILE_OPTIONS, SETTINGS_OPTIONS } from "./menu-items";
import { Stack, Text } from "@chakra-ui/react";
import { useBackgroundColor, useBorderColor } from "../../styles/colors";

type Props = {};

const MenuBar = (props: Props) => {
  const bg = useBackgroundColor();
  const borderColor = useBorderColor();
  return (
    <Stack
      direction="row"
      position="fixed"
      top={2}
      left={2}
      alignItems="center"
      px={6}
      py={2}
      bg={bg}
      borderColor={borderColor}
      borderBottomWidth={2}
      borderStyle="solid"
      borderRadius={4}
    >
      <Text fontSize="2xs" fontWeight={800} textTransform="uppercase" mr={4}>
        Web Audio Node Graph
      </Text>
      <Menu title="File" options={FILE_OPTIONS} />
      <Menu title="Settings" options={SETTINGS_OPTIONS} />
    </Stack>
  );
};

export default MenuBar;
