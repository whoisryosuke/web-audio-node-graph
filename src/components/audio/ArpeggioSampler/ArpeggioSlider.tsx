import React, { useMemo } from "react";
import { Slider as ChakraSlider, type SliderRootProps } from "@chakra-ui/react";
import { Note } from "tonal";

type Props = SliderRootProps & {
  index: number;
  handleNoteChange: (index: number, newNote: number) => void;
  pressed: boolean;
};

const ArpeggioSlider = ({
  pressed,
  handleNoteChange,
  index,
  ...props
}: Props) => {
  const pianoNote = useMemo(
    () => (props.value?.[0] ? Note.fromMidi(props.value[0]) : "C4"),
    [props.value]
  );

  const handleChange = (e: { value: number[] }) => {
    handleNoteChange(index, e.value[0]);
  };
  return (
    <ChakraSlider.Root
      flex={1}
      height={200}
      defaultValue={[60]}
      orientation="vertical"
      alignItems="stretch"
      min={12}
      max={119}
      onValueChange={handleChange}
      {...props}
    >
      <ChakraSlider.Control>
        <ChakraSlider.Track borderRadius={0} bg="gray.800">
          <ChakraSlider.Range bg={pressed ? "gray.400" : "transparent"} />
        </ChakraSlider.Track>
        <ChakraSlider.Thumbs
          className="nodrag"
          bg="blue.400"
          border="0"
          borderRadius="0"
          width="100%"
          height={2}
        />
      </ChakraSlider.Control>
      <ChakraSlider.Label textAlign="center">{pianoNote}</ChakraSlider.Label>
    </ChakraSlider.Root>
  );
};

export default ArpeggioSlider;
