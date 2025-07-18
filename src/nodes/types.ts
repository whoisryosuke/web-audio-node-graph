import { type Node } from "@xyflow/react";

export type BaseNode = {
  id: string;
  data: Partial<Node>;
};

export type NodeIO = {
  inputs: string[];
  outputs: string[];
};
