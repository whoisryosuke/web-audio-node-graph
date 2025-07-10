import { type ComponentProps, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useColorMode, useColorModeValue } from "../color-mode";
import { Box, type BoxProps, type ColorPalette } from "@chakra-ui/react";
import map from "../../../utils/map";

// Assuming numbers are 0-1
type GraphData = number[];

type Props = BoxProps & {
  data: GraphData;
  color?: ColorPalette;
};

const LineGraph = ({ data = [], color = "blue", ...props }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#111" : "#EEE";
  const lineColor = colorMode === "dark" ? "blue" : "blue";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const draw = useCallback(
    (lineColor: string, bgColor: string) => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Clear drawing
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = lineColor;
      for (let i = 0; i < canvasWidth; i++) {
        const index = Math.floor(map(i, 0, canvasWidth, 0, data.length));
        const x = i;
        const y = (data[index] * canvasHeight) / 2 + canvasHeight / 4;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      // this.animationFrameRef = requestAnimationFrame(this.draw.bind(this));
    },
    [data]
  );

  useEffect(() => {
    draw(lineColor, bgColor);
  }, [draw, lineColor, bgColor]);

  return <Box as="canvas" ref={canvasRef} {...props} />;
};

export default LineGraph;
