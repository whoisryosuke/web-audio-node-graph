import {
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type Node,
  type EdgeChange,
  type Edge,
} from "@xyflow/react";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface NodeStoreState {
  nodes: Node[];
  edges: Edge[];

  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  addEdge: (data: Partial<Edge>) => void;
}

export const useNodeStore = create<NodeStoreState>()(
  devtools((set) => ({
    nodes: [
      { id: "a", data: { label: "oscillator" }, position: { x: 0, y: 0 } },
      { id: "b", data: { label: "gain" }, position: { x: 50, y: 50 } },
      { id: "c", data: { label: "output" }, position: { x: -50, y: 100 } },
    ],
    edges: [],

    onNodesChange: (changes) => {
      set((state) => ({
        nodes: applyNodeChanges(changes, state.nodes),
      }));
    },
    onEdgesChange: (changes) => {
      set((state) => ({
        edges: applyEdgeChanges(changes, state.edges),
      }));
    },

    addEdge: (data: Partial<Edge>) => {
      const id = nanoid(6);
      const edge = { id, ...data } as Edge;

      set((state) => ({ edges: [edge, ...state.edges] }));
    },
  }))
);
