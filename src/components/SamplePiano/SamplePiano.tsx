import React from "react";
import SamplePianoKeyWhite from "./SamplePianoKeyWhite";
import { Stack } from "@chakra-ui/react";
import { NOTES_WHITE } from "./constants";

type Props = {
  id: string;
  playSample: (note: string) => void;
};

const SamplePiano = ({ id, playSample }: Props) => {
  return (
    <Stack direction="row" gap="1">
      {NOTES_WHITE.map((note) => (
        <SamplePianoKeyWhite id={id} note={note} playSample={playSample} />
      ))}
    </Stack>
  );
};

export default SamplePiano;
