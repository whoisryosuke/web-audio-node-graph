import React, { useEffect, useState } from "react";
import { useAppStore } from "../store/app";
import { useNodeStore } from "../store/nodes";
import { disconnectNodes } from "../services/audio/audio-graph";

const KEY_MAP: Record<KeyboardEvent["key"], string> = {
  a: "C3",
  s: "D3",
  d: "E3",
  f: "F3",
  g: "G3",
  h: "A3",
  j: "B3",
};

type Props = {};

const Hotkeys = (props: Props) => {
  const { toggleNodePopup, setNodePopup } = useAppStore();
  const keys = Object.keys(KEY_MAP);

  // If pressed key is our target key then set to true
  function downHandler({ key, target }: KeyboardEvent): void {
    // Always close node popup
    if (key == "Escape") {
      setNodePopup(false);
    }

    // Check if the event target is an input field, textarea, or select element
    // Otherwise hotkeys would fire as user types
    const tagName = (target as HTMLElement).tagName;
    if (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") {
      // If it is, do nothing (don't trigger the hotkey)
      return;
    }

    // Node popup
    if (key == "Tab") {
      toggleNodePopup();
    }

    // Edge hotkeys
    if (key == "Delete" || key == "Backspace") {
      const { selectedEdge, deleteEdge } = useNodeStore.getState();
      console.log("deleting selected edge", selectedEdge);
      deleteEdge(selectedEdge.id);

      // Disconnect any audio nodes/sources
      disconnectNodes(
        selectedEdge.source,
        selectedEdge.target,
        selectedEdge.targetHandle
      );
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent): void => {
    if (keys.includes(key)) {
      //   const noteKey = KEY_MAP[key];
    }
  };

  // Add event listeners for keypress
  useEffect(() => {
    if (typeof window == "undefined") return;

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [upHandler, downHandler]); // Empty array ensures that effect is only run on mount and unmount

  return <></>;
};

export default Hotkeys;
