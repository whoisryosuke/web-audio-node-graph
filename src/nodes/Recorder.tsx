import type { BaseNode, NodeIO } from "./types";
import { Button, Link, VStack } from "@chakra-ui/react";
import NodeContainer from "../components/nodes/NodeContainer";
import NodeContent from "../components/nodes/NodeContent";
import NodeHeading from "../components/nodes/NodeHeading";
import NodeInput from "../components/nodes/NodeInput";
import { MdSpeaker } from "react-icons/md";
import { getAudioSetup } from "../services/audio/audio-graph";
import { useEffect, useRef, useState } from "react";

type Props = BaseNode;

const Recorder = ({ id, data }: Props) => {
  const [playing, setPlaying] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const nodeSetup = getAudioSetup(id);
  const recorder = nodeSetup?.instance as MediaRecorder;
  const recordingData = useRef<Blob[]>([]);

  const handleRecord = () => {
    if (!recorder) return;

    if (playing) {
      console.log("Stopping recording...");
      recorder.stop();
      setPlaying(false);
    } else {
      // Clear previous cache
      setDownloadLink("");

      console.log("Recording...");
      recorder.start();
      setPlaying(true);
    }
  };

  // Attach callbacks to capture data from recorder
  useEffect(() => {
    if (!recorder) return;
    recorder.ondataavailable = (evt) => {
      // Push each chunk (blobs) in an array
      recordingData.current.push(evt.data);
    };

    recorder.onstop = () => {
      // Make blob out of our blobs, and open it.
      const blob = new Blob(recordingData.current, {
        type: "audio/ogg; codecs=opus",
      });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);

      // Done with the data, let it go
      recordingData.current = [];
      console.log("Generated OGG file", url);
    };
  }, [recorder]);

  return (
    <NodeContainer>
      <NodeHeading color="gray" icon={MdSpeaker}>
        Recorder
      </NodeHeading>
      <NodeInput name="" />
      <NodeContent>
        <VStack>
          <Button variant="surface" width="100%" onClick={handleRecord}>
            {playing ? "Stop" : "Record"}
          </Button>
          {downloadLink != "" && (
            <Button
              as="a"
              colorPalette="blue"
              href={downloadLink}
              target="_blank"
              width="100%"
              download
            >
              Download
            </Button>
          )}
        </VStack>
      </NodeContent>
    </NodeContainer>
  );
};

export const RecorderIO: NodeIO = {
  inputs: ["node"],
  outputs: [],
};

export default Recorder;
