import { Box, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdClose } from "react-icons/md";
import { useAppStore } from "../../store/app";

type Props = {};

const NodePopupClose = (props: Props) => {
  const { setNodePopup } = useAppStore();

  const handleClosePopup = () => {
    setNodePopup(false);
  };
  return (
    <Box position="absolute" top={2} right={2}>
      <IconButton variant="ghost" size="2xs" onClick={handleClosePopup}>
        <MdClose />
      </IconButton>
    </Box>
  );
};

export default NodePopupClose;
