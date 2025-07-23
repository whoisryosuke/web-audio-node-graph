import { NOTES_ALL_IN_ORDER } from "./constants";

export function calculateDetune(note: string, octave: number = 4) {
  const noteIndex = NOTES_ALL_IN_ORDER.findIndex(
    (searchNote) => searchNote == note
  );
  const octaveOffset = (octave - 4) * 1200;
  return noteIndex * 100 + octaveOffset;
}
