import React, { useEffect, useState } from "react";
import { useAppStore } from "../store/app";

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
  function downHandler({ key }: KeyboardEvent): void {
    if (key == "Escape") {
      setNodePopup(false);
    }
    if (key == "Tab") {
      toggleNodePopup();
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
