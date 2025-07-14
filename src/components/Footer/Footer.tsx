import { Box, Link, Text } from "@chakra-ui/react";
import React from "react";
import { useBackgroundColor, useBorderColor } from "../../styles/colors";

type Props = {};

const Footer = (props: Props) => {
  const bg = useBackgroundColor();
  const borderColor = useBorderColor();
  return (
    <Box
      position="fixed"
      bottom={2}
      right={2}
      px={3}
      py={2}
      bg={bg}
      borderColor={borderColor}
      borderWidth={2}
      borderStyle="solid"
      borderRadius={4}
    >
      <Text fontSize="2xs">
        Created with 💙 by{" "}
        <Link
          href="https://whoisryosuke.com"
          color="blue.500"
          fontWeight="bold"
          target="_blank"
        >
          Ryosuke
        </Link>{" "}
        with{" "}
        <Link href="https://reactflow.dev/" color="gray.400">
          Reactflow
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
