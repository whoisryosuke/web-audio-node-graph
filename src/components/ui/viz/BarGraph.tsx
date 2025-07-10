import { type ComponentProps, useCallback, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Box, type BoxProps, type ColorPalette } from "@chakra-ui/react";
import { useColorMode } from "../color-mode";

type Props = BoxProps & {
  analyser: AnalyserNode;
  color?: ColorPalette;
  animated?: boolean;
};

const BarGraph = ({ analyser, color = "blue", animated, ...props }: Props) => {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#111" : "#EEE";
  const lineColor = colorMode === "dark" ? "blue" : "blue";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef<Uint8Array>(new Uint8Array(0));
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  const draw = useCallback(() => {
    // Get Canvas and canvas specs
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Get audio data

    // Update waveform data as a ref
    if (data.current.length == 0) {
      // Set initial config
      // We don't need a lot of samples. 256 = how many bars we'll have
      analyser.fftSize = 256;
      const newBufferLength = analyser.frequencyBinCount;
      data.current = new Uint8Array(newBufferLength);
    }
    analyser.getByteFrequencyData(data.current);

    // Clear drawing
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.fillStyle = lineColor;
    const barWidth = (canvasWidth / data.current.length) * 2.5;
    for (let i = 0; i < data.current.length; i++) {
      const barHeight = data.current[i] / 2;
      const x = barWidth * i;

      ctx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight);
    }

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

export default BarGraph;
