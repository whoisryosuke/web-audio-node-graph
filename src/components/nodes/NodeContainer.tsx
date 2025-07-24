import { Box, Stack } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";
import { useBackgroundColor, useBorderColor } from "../../styles/colors";
import { motion } from "framer-motion";

type Props = {};

const NodeContainer = (props: PropsWithChildren) => {
  const bg = useBackgroundColor();
  const borderColor = useBorderColor();
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.42 }}
    >
      <Stack
        minWidth="300px"
        bg={bg}
        borderColor={borderColor}
        borderWidth={2}
        borderStyle="solid"
        borderRadius={"lg"}
        {...props}
      />
    </motion.div>
  );
};

export default NodeContainer;
