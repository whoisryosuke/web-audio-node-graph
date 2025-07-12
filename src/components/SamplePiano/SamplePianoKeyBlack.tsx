import { Button } from "@chakra-ui/react";
import React from "react";
import {
  useBackgroundColor,
  useBorderColor,
  useInputText,
} from "../../styles/colors";

type Props = {
  note: string;
  playSample: (note: string) => void;
};

const SamplePianoKeyBlack = ({ note, playSample }: Props) => {
  const bg = useBackgroundColor();
  const border = useBorderColor();
  const textColor = useInputText();
  const blackNote = `${note}#`;

  const handlePlay = () => {
    playSample(note);
  };
  return (
    <Button
      position="absolute"
      color={textColor}
      top={0}
      left={"50%"}
      width="50%"
      height={50}
      zIndex={420}
      // Colors
      bg={bg}
      borderColor={border}
      borderWidth={1}
      borderStyle="solid"
      borderRadius="md"
      _hover={{
        bg: "blue.600",
      }}
      onClick={handlePlay}
    >
      {blackNote}
    </Button>
  );
};

export default SamplePianoKeyBlack;
