import React, { useEffect, useRef, useState } from "react";
import { getAudioNode } from "../../services/audio/audio-graph";
import map from "../../utils/map";
import LineGraph from "../ui/LineGraph";

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
      const newBufferLength = analyser.frequencyBinCount;
      dataArray.current = new Uint8Array(newBufferLength);
    }
    analyser.getByteTimeDomainData(dataArray.current);
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
  dataArray.current.forEach((data) =>
    graph.push(
      map(data, DEFAULT_AUDIO_HEIGHT - 20, DEFAULT_AUDIO_HEIGHT + 20, 0, 1)
    )
  );

  return <LineGraph data={graph} color={"blue"} width={400} height={300} />;
};

export default Waveform;
