import React, { useEffect, useRef, useState } from "react";
import { getAudioNode } from "../../services/audio/audio-graph";
import map from "../../utils/map";
import LineGraph from "../ui/viz/LineGraph";
import BarGraph from "../ui/viz/BarGraph";

const DEFAULT_AUDIO_HEIGHT = 128;

type Props = {
  id: string;
};

const Waveform = ({ id }: Props) => {
  const analyser = getAudioNode(id) as AnalyserNode;
  const dataArray = useRef<Uint8Array>(new Uint8Array(0));
  const [time, setTime] = useState(0);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  // Animate waveform
  const animate = (delta: number) => {
    if (!analyser || !dataArray.current) return;

    // Update waveform data as a ref
    if (dataArray.current.length == 0) {
      // Set initial config
      // We don't need a lot of samples. 256 = how many bars we'll have
      analyser.fftSize = 256;
      const newBufferLength = analyser.frequencyBinCount;
      dataArray.current = new Uint8Array(newBufferLength);
    }
    analyser.getByteFrequencyData(dataArray.current);
    // Force React update
    setTime(delta);

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const graph: number[] = [];
  dataArray.current.forEach((data) => graph.push(data));

  return <BarGraph data={graph} color={"blue"} width={400} height={300} />;
};

export default Waveform;
