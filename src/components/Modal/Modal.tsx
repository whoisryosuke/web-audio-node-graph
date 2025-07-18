import React from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useAppStore } from "../../store/app";
import KeyboardModal from "./KeyboardModal";

const MODALS = {
  keyboard: KeyboardModal,
};

type Props = {};

const Modal = (props: Props) => {
  const { modal, modalVisible, toggleModal } = useAppStore();
  const ModalComponent = MODALS[modal];

  const handleClose = () => {
    toggleModal(false);
  };

  return (
    <Dialog.Root
      lazyMount
      open={modalVisible}
      onOpenChange={(e) => toggleModal(e.open)}
      size="lg"
    >
      <Dialog.Trigger asChild>
        <Button variant="outline">Open</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <ModalComponent />
            <CloseButton
              position="absolute"
              top={2}
              right={2}
              onClick={handleClose}
            />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Modal;
