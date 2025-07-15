import { useAppStore } from "../../store/app";
import { useNodeStore } from "../../store/nodes";

const handleNewFile = () => {
  const { newFile } = useNodeStore.getState();

  const userConfirmed = window.confirm(
    "Are you sure you want to delete all nodes and connections?"
  );

  if (userConfirmed) newFile();
};

const handleKeyboardPopup = () => {
  const { setModal } = useAppStore.getState();

  setModal("keyboard");
};

export const FILE_OPTIONS = [
  {
    value: "new",
    title: "New Graph",
    onClick: handleNewFile,
  },
  {
    value: "export",
    title: "Export Graph",
    onClick: () => alert("coming soon"),
  },
];

export const SETTINGS_OPTIONS = [
  {
    value: "keyboard",
    title: "Keyboard Shortcuts",
    onClick: handleKeyboardPopup,
  },
];
