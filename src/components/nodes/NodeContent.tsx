import { Box, Stack } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";

type Props = {};

const NodeContent = (props: PropsWithChildren) => {
  return <Stack p={3} {...props} />;
};

export default NodeContent;
