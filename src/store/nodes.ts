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
import type { Vector2D } from "../utils/types";

export interface NodeStoreState {
  nodes: Node[];
  edges: Edge[];

  addNode: (
    type: CustomNodeTypesNames,
    position?: Vector2D,
    data?: Partial<Node>
  ) => void;
  onNodesDelete: (deleted: Node[]) => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  deleteEdge: (edgeId: Edge["id"]) => void;
  addEdge: (data: Partial<Edge>) => void;
  updateNode: <T>(id: string, data: T) => void;

  selectedEdge: Edge;
  setSelectedEdge: (edge: Edge) => void;
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

    addNode: (
      type: CustomNodeTypesNames,
      position?: Vector2D,
      data?: Partial<Node>
    ) => {
      const newNode = createNode(type, position, data) as Node;

      // Create the audio node
      createAudioNode(type, newNode.id);

      set((state) => ({
        nodes: [...state.nodes, newNode],
      }));
    },

    // @TODO: Remove from store - move to audio graph
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

    deleteEdge: (edgeId: Edge["id"]) => {
      set((state) => ({
        edges: state.edges.filter((stateEdge) => stateEdge.id != edgeId),
      }));
    },

    addEdge: (data: Partial<Edge>) => {
      const id = nanoid(6);
      const edge = { id, ...data } as Edge;

      console.log(
        "connecting nodes",
        edge.source,
        edge.target,
        edge.sourceHandle,
        edge.targetHandle
      );

      connectAudioNodes(
        edge.source,
        edge.target,
        edge.sourceHandle,
        edge.targetHandle
      );

      set((state) => ({ edges: [edge, ...state.edges] }));
    },

    updateNode: <T>(id: string, data: T) => {
      updateAudioNode(id, data);
      set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node
        ),
      }));
    },

    selectedEdge: null,
    setSelectedEdge: (edge: Edge) => {
      set({
        selectedEdge: edge,
      });
    },
  }))
);
