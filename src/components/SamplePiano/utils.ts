import { NOTES_ALL_IN_ORDER } from "./constants";

export function calculateDetune(note: string) {
  const noteIndex = NOTES_ALL_IN_ORDER.findIndex(
    (searchNote) => searchNote == note
  );
  return noteIndex * 100;
}
