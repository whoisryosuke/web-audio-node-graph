import { useColorModeValue } from "../components/ui/color-mode";

export const useBackgroundColor = () =>
  useColorModeValue("gray.100", "gray.900");

export const useBorderColor = () => useColorModeValue("gray.200", "gray.800");

export const useNodeHeaderBackground = (color: string) =>
  useColorModeValue(`${color}.400`, `${color}.600`);

export const useInputBg = () => useColorModeValue("gray.200", "gray.800");
export const useInputBorder = () => useColorModeValue("gray.300", "gray.700");
export const useInputText = () => useColorModeValue("gray.600", "gray.400");
