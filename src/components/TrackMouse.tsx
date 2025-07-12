import React, { useEffect } from "react";
import { useAppStore } from "../store/app";

type Props = {};

const TrackMouse = (props: Props) => {
  const { setMousePosition } = useAppStore();

  const syncMouse = (e: MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePosition({
      x,
      y,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", syncMouse);

    return () => {
      document.removeEventListener("mousemove", syncMouse);
    };
  }, [syncMouse]);

  return <></>;
};

export default TrackMouse;
