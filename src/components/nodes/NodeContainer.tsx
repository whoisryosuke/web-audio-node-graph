import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { useBackgroundColor, useBorderColor } from "../../styles/colors";
import { useNodeStore } from "../../store/nodes";
import { animate, useMotionValue } from "framer-motion";
import map from "../../utils/map";

type Props = {
  id: string;
};

const NodeContainer = ({ id, ...props }: PropsWithChildren<Props>) => {
  const updateNodePosition = useNodeStore((state) => state.updateNodePosition);
  const bg = useBackgroundColor();
  const borderColor = useBorderColor();
  const containerRef = useRef<HTMLDivElement>(null);
  const initialPositionRef = useRef({
    x: 0,
    y: 0,
  });
  const y = useMotionValue(100);

  // Sync animation with store and element
  y.on("change", (latest) => {
    // Move node
    // We have a starting position that we add our movement to
    const newPosition = {
      x: initialPositionRef.current.x,
      y: initialPositionRef.current.y + latest,
    };
    updateNodePosition(id, newPosition);

    // Fade in node
    if (!containerRef.current) return;
    containerRef.current.style.opacity = map(latest, 100, 0, 0, 1).toString();
  });

  // Start animation when node initially loads
  useEffect(() => {
    if (!id) return;
    const { nodes } = useNodeStore.getState();
    const node = nodes.find((node) => node.id == id);
    if (!node) return;
    initialPositionRef.current = node.position;
    animate(y, 0, { duration: 0.42 });
  }, []);

  return (
    <Stack
      ref={containerRef}
      minWidth="300px"
      bg={bg}
      borderColor={borderColor}
      borderWidth={2}
      borderStyle="solid"
      borderRadius={"lg"}
      animation="ease-in"
      animationName="fade-in"
      {...props}
    />
  );
};

export default NodeContainer;
