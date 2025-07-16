import { Button, HStack, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Chord, Midi } from "tonal";
import ArpeggioSlider from "./ArpeggioSlider";

type Props = {};

const ArpeggioSampler = (props: Props) => {
  const [rootNote, setRootNote] = useState("C");
  const [octave, setOctave] = useState("4");
  const [currentChord, setCurrentChord] = useState("maj7");
  const [notes, setNotes] = useState<number[]>([]);
  const [playing, setPlaying] = useState(false);
  const time = useRef(0);

  const generateChord = () => {
    // Generate the chord notes
    const rawNotes = Chord.notes("maj7", `${rootNote}${octave}`);

    const midiNotes = rawNotes.map((note) => Midi.toMidi(note) ?? 0);

    setNotes(midiNotes);
  };

  useEffect(() => {
    generateChord();
  }, [currentChord]);
  console.log("notes", notes);

  const handleNoteChange = (index: number, newNote: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, noteIndex) => (noteIndex == index ? newNote : note))
    );
  };

  const handlePlay = () => {};

  const sliders = notes.map((note, index) => (
    <ArpeggioSlider
      index={index}
      value={[note]}
      handleNoteChange={handleNoteChange}
    />
  ));

  return (
    <Stack>
      <HStack>{sliders}</HStack>
      <HStack>
        <Button size="2xs" variant="surface" onClick={handlePlay}>
          Play
        </Button>
        <Button size="2xs" variant="surface" onClick={generateChord}>
          Reset
        </Button>
      </HStack>
    </Stack>
  );
};

export default ArpeggioSampler;
