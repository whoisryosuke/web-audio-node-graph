import React, { useEffect, useRef, useState } from "react";
import DropzoneContainer from "./DropzoneContainer";
import { MdAudioFile, MdUpload, MdUploadFile } from "react-icons/md";
import { Icon, Stack, Text } from "@chakra-ui/react";
import { useInputBg, useInputBorder, useInputText } from "../../styles/colors";
import StaticWaveform from "../audio/StaticWaveform";

type Props = {
  buffer?: AudioBuffer;
  setBuffer: (buffer: AudioBuffer) => void;
};

const SampleDropzone = ({ buffer, setBuffer }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [highlighted, setHighlighted] = useState(false);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const iconColor = useInputBorder();
  const textColor = useInputText();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();

    fileReader.onload = async (e: ProgressEvent<FileReader>) => {
      if (!e.target) return;
      const arrayBuffer = e.target.result as ArrayBuffer;
      if (!arrayBuffer) return;

      // Convert file to audio buffer
      // We create an offline audio context to handle this
      const audioCtx = new window.OfflineAudioContext(2, 44100 * 40, 44100);
      if (!audioCtx) return;

      try {
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
        setBuffer(audioBuffer);
      } catch (error) {
        console.error("Error decoding audio data:", error);
      }
    };

    fileReader.readAsArrayBuffer(file);
  }, [file]);

  const highlight = () => {
    setHighlighted(true);
  };
  const unhighlight = () => {
    setHighlighted(false);
  };

  function preventDefaults(e: Event) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: DragEvent) {
    console.log("files dropped", e);
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  }

  function handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i];
      console.log("file", currentFile);
      setFile(currentFile);
    }
  }

  useEffect(() => {
    if (!dropzoneRef.current) return;
    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      if (!dropzoneRef.current) return;
      dropzoneRef.current.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false); // Prevent global default
    });

    // Highlight drop zone on dragenter/dragover
    ["dragenter", "dragover"].forEach((eventName) => {
      if (!dropzoneRef.current) return;
      dropzoneRef.current.addEventListener(eventName, highlight, false);
    });

    // Unhighlight drop zone on dragleave/drop
    ["dragleave", "drop"].forEach((eventName) => {
      if (!dropzoneRef.current) return;
      dropzoneRef.current.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropzoneRef.current.addEventListener("drop", handleDrop, false);

    // Handle file selection via input click
    dropzoneRef.current.addEventListener("click", () => {
      if (!inputRef.current) return;
      inputRef.current.click();
    });

    if (!inputRef.current) return;
    inputRef.current.addEventListener("change", (e) => {
      console.log("input change", e);
      handleFiles(e.target.files);
    });

    return () => {
      if (!dropzoneRef.current) return;
      // Prevent default drag behaviors
      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        if (!dropzoneRef.current) return;
        dropzoneRef.current.removeEventListener(
          eventName,
          preventDefaults,
          false
        );
        document.body.removeEventListener(eventName, preventDefaults, false); // Prevent global default
      });

      // Highlight drop zone on dragenter/dragover
      ["dragenter", "dragover"].forEach((eventName) => {
        if (!dropzoneRef.current) return;
        dropzoneRef.current.removeEventListener(eventName, highlight, false);
      });

      // Unhighlight drop zone on dragleave/drop
      ["dragleave", "drop"].forEach((eventName) => {
        if (!dropzoneRef.current) return;
        dropzoneRef.current.removeEventListener(eventName, unhighlight, false);
      });

      // Handle dropped files
      dropzoneRef.current.removeEventListener("drop", handleDrop, false);

      // Handle file selection via input click
      dropzoneRef.current.removeEventListener("click", () => {
        if (!inputRef.current) return;
        inputRef.current.click();
      });
    };
  }, []);

  return (
    <DropzoneContainer ref={dropzoneRef}>
      {buffer ? (
        <div>
          <StaticWaveform buffer={buffer} />
          {file && (
            <Stack direction="row" alignItems="center">
              <Text
                fontSize="xs"
                color={textColor}
                mt={2}
                mb={0}
                fontWeight={600}
              >
                {file.name}
              </Text>
              <Text fontSize="2xs" color={textColor} mt={2} mb={0}>
                {buffer.duration.toFixed(2)} secs
              </Text>
            </Stack>
          )}
        </div>
      ) : (
        <div>
          <Icon size="2xl" color={iconColor}>
            <MdAudioFile />
          </Icon>
          <Text fontSize="sm" color={textColor}>
            Drag and drop samples here
          </Text>
          <Text fontSize="xs" color={textColor}>
            or click to upload
          </Text>
        </div>
      )}
      <input ref={inputRef} type="file" style={{ display: "none" }} />
    </DropzoneContainer>
  );
};

export default SampleDropzone;
