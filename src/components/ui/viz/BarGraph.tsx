import { type ComponentProps, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Box, type BoxProps, type ColorPalette } from "@chakra-ui/react";
import { useColorMode } from "../color-mode";

// Assuming numbers are 0-1
type GraphData = number[];

type Props = BoxProps & {
  data: GraphData;
  color?: ColorPalette;
};

const BarGraph = ({ data = [], color = "blue", ...props }: Props) => {
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
      ctx.fillStyle = lineColor;
      const barWidth = (canvasWidth / data.length) * 2.5;
      for (let i = 0; i < data.length; i++) {
        const barHeight = data[i] / 2;
        const x = barWidth * i;

        ctx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight);
      }

      // this.animationFrameRef = requestAnimationFrame(this.draw.bind(this));
    },
    [data]
  );

  useEffect(() => {
    draw(lineColor, bgColor);
  }, [draw, lineColor, bgColor]);

  return <Box as="canvas" ref={canvasRef} {...props} />;
};

export default BarGraph;
