import React from "react";
import { Slider as ChakraSlider, type SliderRootProps } from "@chakra-ui/react";
import {
  useBorderColor,
  useButtonHoverBg,
  useInputBg,
  useInputBorder,
  useInputText,
} from "../../styles/colors";

type Props = SliderRootProps & {};

const Slider = (props: Props) => {
  const bg = useInputBg();
  const border = useInputBorder();
  const trackBg = useInputText();
  const buttonHoverBg = useButtonHoverBg();
  return (
    <ChakraSlider.Root width="100%" defaultValue={[40]} {...props}>
      <ChakraSlider.Control>
        <ChakraSlider.Track bg={bg}>
          <ChakraSlider.Range bg={trackBg} />
        </ChakraSlider.Track>
        <ChakraSlider.Thumbs
          className="nodrag"
          borderColor={border}
          bg={bg}
          _hover={{ bg: buttonHoverBg }}
          _active={{ bg: buttonHoverBg }}
        />
      </ChakraSlider.Control>
    </ChakraSlider.Root>
  );
};

export default Slider;
