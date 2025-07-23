import { MdAudioFile, MdGraphicEq, MdVolumeUp, MdWaves } from "react-icons/md";
import type { ALL_SAFE_NODE_TYPES } from ".";
import type { IconType } from "react-icons";
import { SlGraph } from "react-icons/sl";
import { TbCircleNumber4, TbClock, TbMusic, TbWaveSine } from "react-icons/tb";
import { PiStepsBold, PiWaveSineBold } from "react-icons/pi";
import { GiSoundWaves } from "react-icons/gi";
import ClawdioIcon from "../components/icons/Clawdio";
import type { CustomIconType } from "../components/icons/types";
import { BsRecordCircleFill } from "react-icons/bs";

export const ALL_SAFE_NODE_ICONS: Record<
  keyof typeof ALL_SAFE_NODE_TYPES,
  IconType | CustomIconType
> = {
  osc: TbWaveSine,
  gain: MdVolumeUp,
  analyser: SlGraph,
  delay: TbClock,
  sample: MdAudioFile,
  "constant-source": TbCircleNumber4,
  "wave-shaper": PiWaveSineBold,
  bitcrusher: PiStepsBold,
  arpeggio: TbMusic,
  "white-noise": GiSoundWaves,
  "pink-noise": GiSoundWaves,
  moog: ClawdioIcon,
  recorder: BsRecordCircleFill,
};
