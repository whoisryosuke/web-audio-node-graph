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
import { createNode } from "../nodes/utils";
import type { CustomNodeTypesNames } from "../nodes";
import {
  connectAudioNodes,
  createAudioNode,
  removeAudioNode,
  updateAudioNode,
} from "../services/audio/audio-graph";

export interface NodeStoreState {
  nodes: Node[];
  edges: Edge[];

  addNode: (type: CustomNodeTypesNames, node: Partial<Node>) => void;
  onNodesDelete: (deleted: Node[]) => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  addEdge: (data: Partial<Edge>) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
}

export const useNodeStore = create<NodeStoreState>()(
  devtools((set) => ({
    nodes: [
      // {
      //   id: "a",
      //   type: "osc",
      //   data: { label: "oscillator" },
      //   position: { x: 0, y: 0 },
      // },
      // {
      //   id: "b",
      //   type: "gain",
      //   data: { label: "gain" },
      //   position: { x: 50, y: 50 },
      // },
      {
        id: "output",
        type: "output",
        data: { label: "output" },
        position: { x: -50, y: 100 },
      },
    ],
    edges: [],

    addNode: (type: CustomNodeTypesNames, node: Partial<Node>) => {
      const newNode = createNode(type) as Node;

      // Create the audio node
      createAudioNode(type, newNode.id);

      set((state) => ({
        nodes: [...state.nodes, newNode],
      }));
    },

    onNodesDelete: (deleted: Node[]) => {
      for (const { id } of deleted) {
        removeAudioNode(id);
      }
    },

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

      console.log("connecting nodes", edge.source, edge.target);

      connectAudioNodes(edge.source, edge.target);

      set((state) => ({ edges: [edge, ...state.edges] }));
    },

    updateNode: (id: string, data: Partial<Node>) => {
      updateAudioNode(id, data);
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node
        ),
      }));
    },
  }))
);
