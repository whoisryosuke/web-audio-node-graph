import { type ComponentProps, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useColorMode, useColorModeValue } from "../color-mode";
import { Box, type BoxProps, type ColorPalette } from "@chakra-ui/react";
import map from "../../../utils/map";

// Assuming numbers are 0-1
type GraphData = number[];
const DEFAULT_AUDIO_HEIGHT = 128;

type Props = BoxProps & {
  analyser: AnalyserNode;
  animated?: boolean;
  color?: ColorPalette;
};

const LineGraph = ({ analyser, animated, color = "blue", ...props }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#111" : "#EEE";
  const lineColor = colorMode === "dark" ? "blue" : "blue";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<Uint8Array>(new Uint8Array(0));
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  const draw = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Get audio data
    if (!analyser || !data.current) return;

    // Update waveform data as a ref
    if (data.current.length == 0) {
      const newBufferLength = analyser.frequencyBinCount;
      data.current = new Uint8Array(newBufferLength);
    }
    analyser.getByteTimeDomainData(data.current);

    // Clear drawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = lineColor;
    for (let i = 0; i < canvasWidth; i++) {
      const index = Math.floor(map(i, 0, canvasWidth, 0, data.current.length));
      const x = i;
      // We scale the audio values to 0-1 to make it easier
      const amplitude = map(
        data.current[index],
        DEFAULT_AUDIO_HEIGHT - 20,
        DEFAULT_AUDIO_HEIGHT + 20,
        0,
        1
      );
      const y = (amplitude * canvasHeight) / 2 + canvasHeight / 4;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();

    if (animated) animationRef.current = requestAnimationFrame(draw);
  }, [data, lineColor, bgColor, animated]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw, lineColor, bgColor]);

  return <Box as="canvas" ref={canvasRef} {...props} />;
};

export default LineGraph;
