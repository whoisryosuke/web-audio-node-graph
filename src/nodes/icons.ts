import { MdAudioFile, MdGraphicEq, MdVolumeUp, MdWaves } from "react-icons/md";
import type { ALL_SAFE_NODE_TYPES } from ".";
import type { IconType } from "react-icons";
import { SlGraph } from "react-icons/sl";
import { TbCircleNumber4, TbClock, TbWaveSine } from "react-icons/tb";
import { PiStepsBold, PiWaveSineBold } from "react-icons/pi";

export const ALL_SAFE_NODE_ICONS: Record<
  keyof typeof ALL_SAFE_NODE_TYPES,
  IconType
> = {
  osc: TbWaveSine,
  gain: MdVolumeUp,
  analyser: SlGraph,
  delay: TbClock,
  sample: MdAudioFile,
  "constant-source": TbCircleNumber4,
  "wave-shaper": PiWaveSineBold,
  bitcrusher: PiStepsBold,
};
