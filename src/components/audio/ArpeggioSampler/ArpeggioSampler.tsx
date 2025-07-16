import { Button, HStack, Stack } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Chord, Midi, Note } from "tonal";
import ArpeggioSlider from "./ArpeggioSlider";

const CHECK_AHEAD_TIME_MS = 250;

type Props = {
  playSample: (note: string, octave: number, time?: number) => void;
};

const ArpeggioSampler = ({ playSample, ...props }: Props) => {
  const [rootNote, setRootNote] = useState("C");
  const [octave, setOctave] = useState("4");
  const [currentChord, setCurrentChord] = useState("maj7");
  // Notes in MIDI format. Makes it easier for the slider.
  const [notes, setNotes] = useState<number[]>([]);
  const [bpm, setBpm] = useState(60);
  // The currently playing note index (in the `notes` array)
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  // We keep a separate ref so the animation callback can keep track
  // This can be thought of as the next note index
  const currentNoteIndexRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const time = useRef(0);
  const startTime = useRef(0);
  const nextNoteTime = useRef(0);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame>>(0);

  const generateChord = () => {
    // Generate the chord notes
    const rawNotes = Chord.notes("maj7", `${rootNote}${octave}`);

    const midiNotes = rawNotes.map((note) => Midi.toMidi(note) ?? 0);

    setNotes(midiNotes);
  };

  // Generate a new chord when chord changes
  useEffect(() => {
    generateChord();
  }, [rootNote, octave, currentChord]);

  const handleNoteChange = (index: number, newNote: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note, noteIndex) => (noteIndex == index ? newNote : note))
    );
  };

  const handlePlay = () => {
    setPlaying((prev) => !prev);
  };

  const animate = (timestamp: number) => {
    if (!startTime.current) {
      startTime.current = timestamp;
    }

    // Increment time
    const currentTime = timestamp - startTime.current;
    time.current = currentTime;

    // Schedule audio
    const secondsPerBeat = 60.0 / bpm;
    const msPerBeat = secondsPerBeat * 1000;

    if (nextNoteTime.current < time.current + CHECK_AHEAD_TIME_MS) {
      const currentNote = notes[currentNoteIndexRef.current];
      const pianoNote = Note.fromMidi(currentNote);
      const rootNote = pianoNote.slice(0, -1);
      const octave = parseInt(pianoNote.slice(-1));
      const offset = nextNoteTime.current - time.current;
      playSample(rootNote, octave, offset);

      // Increment note index
      nextNoteTime.current += msPerBeat;
      setCurrentNoteIndex(currentNoteIndexRef.current);
      const nextIndex = (currentNoteIndexRef.current + 1) % notes.length;
      currentNoteIndexRef.current = nextIndex;
    }
    // If still playing, loop
    if (playingRef.current)
      animationRef.current = requestAnimationFrame(animate);
  };

  // Start/stop animation
  useEffect(() => {
    // Playing? Start animation
    if (playing) {
      playingRef.current = true;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Not playing? cancel any animations.
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      playingRef.current = false;

      // Reset time
      time.current = 0;
      startTime.current = 0;
      nextNoteTime.current = 0;
      currentNoteIndexRef.current = 0;
      setCurrentNoteIndex(0);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [playing]);

  const sliders = notes.map((note, index) => (
    <ArpeggioSlider
      index={index}
      value={[note]}
      handleNoteChange={handleNoteChange}
      pressed={index == currentNoteIndex}
    />
  ));

  return (
    <Stack>
      <HStack>{sliders}</HStack>
      <HStack>
        <Button size="2xs" variant="surface" onClick={handlePlay}>
          {playing ? "Stop" : "Play"}
        </Button>
        <Button size="2xs" variant="surface" onClick={generateChord}>
          Reset
        </Button>
      </HStack>
    </Stack>
  );
};

export default ArpeggioSampler;
