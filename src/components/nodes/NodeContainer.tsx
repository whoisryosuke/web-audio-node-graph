import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { useBackgroundColor, useBorderColor } from "../../styles/colors";
import { useNodeStore } from "../../store/nodes";
import { animate, useMotionValue } from "framer-motion";

type Props = {};

const NodeContainer = ({ id, ...props }: PropsWithChildren) => {
  const { updateNodePosition } = useNodeStore();
  const bg = useBackgroundColor();
  const borderColor = useBorderColor();
  const initialPositionRef = useRef({
    x: 0,
    y: 0,
  });
  const y = useMotionValue(100);
  y.on("change", (latest) => {
    const newPosition = {
      x: initialPositionRef.current.x,
      y: initialPositionRef.current.y + latest,
    };
    updateNodePosition(id, newPosition);
  });

  useEffect(() => {
    const { nodes } = useNodeStore.getState();
    const node = nodes.find((node) => node.id == id);
    if (!node) return;
    initialPositionRef.current = node.position;
    console.log("node position", node.position);
    animate(y, 0);
  }, []);

  return (
    <Stack
      minWidth="300px"
      bg={bg}
      borderColor={borderColor}
      borderWidth={2}
      borderStyle="solid"
      borderRadius={"lg"}
      {...props}
    />
  );
};

export default NodeContainer;
