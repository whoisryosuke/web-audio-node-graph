import { useColorModeValue } from "../components/ui/color-mode";

export const useBackgroundColor = () =>
  useColorModeValue("gray.100", "gray.700");
