import type { IconProps } from "@chakra-ui/react";
import { type JSX, type SVGProps } from "react";
export type CustomIconProps = SVGProps<SVGSVGElement> & {
  // size: IconProps["size"];
  // color: IconProps["color"];
};

export type CustomIconType = (props: CustomIconProps) => JSX.Element;
