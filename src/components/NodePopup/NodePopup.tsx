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
    <Portal disabled={!showNodePopup}>
      <Stack
        position="absolute"
        top={popupPosition.y}
        left={popupPosition.x}
        width="400px"
        bg={bg}
        p={2}
        borderRadius="md"
        opacity={showNodePopup ? 1 : 0}
        display={showNodePopup ? "block" : "none"}
      >
        <Heading size="sm" mb={2} py={2} px={3}>
          Add a node
        </Heading>
        <NodeList />
        <NodePopupClose />
      </Stack>
    </Portal>
  );
};

export default NodePopup;
