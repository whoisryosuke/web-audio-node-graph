import React, { useEffect, useState } from "react";
import { useAppStore } from "../../store/app";
import { Box, Heading, Portal, Stack } from "@chakra-ui/react";
import NodeList from "./NodeList";
import { useBackgroundColor } from "../../styles/colors";
import NodePopupClose from "./NodePopupClose";

type Props = {};

const NodePopup = (props: Props) => {
  const { showNodePopup, mousePosition } = useAppStore();
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const bg = useBackgroundColor();

  useEffect(() => {
    if (showNodePopup) setPopupPosition(mousePosition);
  }, [showNodePopup]);

  return (
    <Portal>
      <Stack
        position="absolute"
        top={popupPosition.y}
        left={popupPosition.x}
        width="400px"
        bg={bg}
        p={4}
        borderRadius="md"
        opacity={showNodePopup ? 1 : 0}
      >
        <Heading size="sm">Add a node</Heading>
        <NodeList />
        <NodePopupClose />
      </Stack>
    </Portal>
  );
};

export default NodePopup;
