import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useInputBg, useInputBorder } from "../../styles/colors";
import { NOTES_BLACK } from "./constants";
import SamplePianoKeyBlack from "./SamplePianoKeyBlack";
import { getAudioNode } from "../../services/audio/audio-graph";
import { calculateDetune } from "./utils";

type Props = {
  id: string;
  note: string;
  playSample: (note: string) => void;
};

const SamplePianoKeyWhite = ({ note, id, playSample }: Props) => {
  const bg = useInputBg();
  const border = useInputBorder();

  // We also render a black key if needed
  const showBlackKey = NOTES_BLACK.find((blackNote) =>
    blackNote.includes(note)
  );

  const handlePlay = () => {
    playSample(note);
  };

  return (
    <Box
      // Layout
      position="relative"
      flex={1}
    >
      <Button
        variant="ghost"
        minHeight={100}
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        // Colors
        bg={bg}
        borderColor={border}
        borderWidth={1}
        borderStyle="solid"
        borderRadius="md"
        _hover={{
          bg: "blue.600",
        }}
        zIndex={420 / 2}
        onClick={handlePlay}
      >
        {note}
      </Button>
      {showBlackKey && (
        <SamplePianoKeyBlack note={note} playSample={playSample} />
      )}
    </Box>
  );
};

export default SamplePianoKeyWhite;
