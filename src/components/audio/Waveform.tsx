import React, { useEffect, useRef, useState } from "react";
import { getAudioNode } from "../../services/audio/audio-graph";
import map from "../../utils/map";
import LineGraph from "../ui/viz/LineGraph";

const DEFAULT_AUDIO_HEIGHT = 128;

type Props = {
  id: string;
};

const Waveform = ({ id }: Props) => {
  const analyser = getAudioNode(id) as AnalyserNode;

  return (
    <LineGraph
      analyser={analyser}
      color={"blue"}
      width={400}
      height={300}
      animated
    />
  );
};

export default Waveform;
