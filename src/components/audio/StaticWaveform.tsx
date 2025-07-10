import map from "../../utils/map";
import StaticLineGraph from "../ui/viz/StaticLineGraph";

type Props = {
  buffer?: AudioBuffer;
};

const StaticWaveform = ({ buffer, ...props }: Props) => {
  console.log("static waveform", buffer);
  // Get the waveform data
  const waveformData = buffer ? buffer.getChannelData(0) : [];

  const graph: number[] = [];

  // Map the waveform data form -1 to 1 to the graphs Y axis
  // Default is 0,1 for graph (lowest scale) - but we might scale up for zooming
  waveformData.forEach((data) => graph.push(map(data, -1, 1, -4, 5)));

  return (
    <StaticLineGraph data={graph} color={"blue"} width={300} height={200} />
  );
};

export default StaticWaveform;
