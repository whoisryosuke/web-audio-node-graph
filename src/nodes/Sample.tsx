import { Position, type Node } from "@xyflow/react";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeContent from "../components/nodes/NodeContent";
import NodeHandle from "../components/nodes/NodeHandle";
import { useNodeStore } from "../store/nodes";
import { useEffect, useState } from "react";
import SampleDropzone from "../components/SampleDropzone/SampleDropzone";
import SamplePiano from "../components/SamplePiano/SamplePiano";
import {
  getAudioNode,
  reconnectNode,
  recreateSampleNode,
} from "../services/audio/audio-graph";
import { calculateDetune } from "../components/SamplePiano/utils";
import Select from "../components/ui/Select";
import SampleDrumPad from "../components/SampleDrumPad/SampleDrumPad";
import { Stack, Text } from "@chakra-ui/react";
import { ALL_SAFE_NODE_ICONS } from "./icons";
import NodeOutput from "../components/nodes/NodeOutput";
import type { NodeIO } from "./types";
import Slider from "../components/ui/Slider";
import NodeInputField from "../components/nodes/NodeInputField";

export type SampleData = {
  buffer: AudioBuffer;
};

type Props = {
  id: string;
  data: SampleData;
};

const VIZ_COMPONENTS = {
  Piano: SamplePiano,
  "Drum Pad": SampleDrumPad,
};

const VIZ_OPTIONS = ["Piano", "Drum Pad"] as const;
type VizOptions = (typeof VIZ_OPTIONS)[number];

const Sample = ({ id, data }: Props) => {
  const [currentViz, setCurrentViz] = useState<VizOptions>("Piano");
  const [octave, setOctave] = useState<number>(4);
  const { updateNode } = useNodeStore();

  // Load a sample from disk (good for debug)
  const loadSample = async (file: string) => {
    console.log("loading sample");
    const audioCtx = new window.OfflineAudioContext(2, 44100 * 40, 44100);

    console.log("creating audio ctx");
    if (!audioCtx) return;
    // Load data into a generic buffer
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();

    // Use context to decode into an audio buffer
    const newAudioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    console.log("got audio buffer", newAudioBuffer);

    updateNode(id, { buffer: newAudioBuffer });
  };

  const setBuffer = (newAudioBuffer: AudioBuffer) => {
    updateNode(id, { buffer: newAudioBuffer });
  };

  const playSample = (note: string) => {
    const node = getAudioNode(id) as AudioBufferSourceNode;
    if (!node) return;

    console.log("playinng note", note);
    node.detune.value = calculateDetune(note, octave);
    console.log("starting buffer node", node);
    // Play the sound
    node.start();

    // Recreate the buffer node and reconnect it as needed
    recreateSampleNode(id, data);
    reconnectNode(id);
  };

  // Load a debug sample locally
  // useEffect(() => {
  //   console.log("loading sample...");
  //   loadSample("/music/ff8-magic.mp3");
  // }, []);

  const handleChange = (e: { value: string[] }) => {
    const newViz = e.value[0] as VizOptions;
    setCurrentViz(newViz);
  };
  const handleOctaveChange = (e: { value: number[] }) => {
    setOctave(e.value[0]);
  };
  const options = VIZ_OPTIONS.map((nodeType) => ({
    value: nodeType,
    label: nodeType,
  }));
  const PianoComponent = VIZ_COMPONENTS[currentViz];

  return (
    <NodeContainer maxWidth="375px">
      <NodeHeading icon={ALL_SAFE_NODE_ICONS["sample"]}>
        Sample Node
      </NodeHeading>
      <NodeOutput />
      <NodeContent>
        <SampleDropzone buffer={data.buffer} setBuffer={setBuffer} />
        {data.buffer && (
          <Stack>
            <Select
              // name="Piano Type"
              value={[currentViz]}
              onValueChange={handleChange}
              options={options}
              placeholder="Select an piano type"
            />
            <NodeInputField label="Octave" helper={octave}>
              <Slider
                min={1}
                max={8}
                value={[octave]}
                onValueChange={handleOctaveChange}
              />
            </NodeInputField>
            <PianoComponent key={currentViz} id={id} playSample={playSample} />
          </Stack>
        )}
      </NodeContent>
    </NodeContainer>
  );
};

export const SampleIO: NodeIO = {
  inputs: [],
  outputs: ["node"],
};

export default Sample;
