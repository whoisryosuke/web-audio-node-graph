import React from "react";
import { Slider as ChakraSlider, type SliderRootProps } from "@chakra-ui/react";

type Props = SliderRootProps & {};

const Slider = (props: Props) => {
  return (
    <ChakraSlider.Root width="100%" defaultValue={[40]} {...props}>
      <ChakraSlider.Control>
        <ChakraSlider.Track>
          <ChakraSlider.Range />
        </ChakraSlider.Track>
        <ChakraSlider.Thumbs className="nodrag" />
      </ChakraSlider.Control>
    </ChakraSlider.Root>
  );
};

export default Slider;
