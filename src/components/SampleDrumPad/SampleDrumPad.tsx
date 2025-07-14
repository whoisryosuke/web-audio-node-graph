import { Button, Stack } from "@chakra-ui/react";
import React, { useMemo, type PropsWithChildren } from "react";
import { NOTES_ALL_IN_ORDER } from "../SamplePiano/constants";
import { useButtonHoverBg } from "../../styles/colors";

const gap = "8px";

type DrumPadButtonProps = {
  note: string;
  playSample: (note: string) => void;
};

const DrumPadButton = ({ note, playSample }: DrumPadButtonProps) => {
  const hoverBg = useButtonHoverBg();

  const handleClick = () => {
    playSample(note);
  };
  return (
    <Button
      height={75}
      flex={`1 0 calc(25% - ${gap})`}
      variant="outline"
      color="GrayText"
      _hover={{
        bg: hoverBg,
        color: "whiteAlpha.400",
      }}
      onClick={handleClick}
    >
      {note}
    </Button>
  );
};

type Props = {
  playSample: (note: string) => void;
};

const SampleDrumPad = ({ playSample }: Props) => {
  const buttons = useMemo(
    () =>
      NOTES_ALL_IN_ORDER.map((note) => (
        <DrumPadButton key={note} note={note} playSample={playSample} />
      )),
    []
  );
  return (
    <Stack wrap="wrap" flexDirection="row" gap={gap}>
      {buttons}
    </Stack>
  );
};

export default SampleDrumPad;
