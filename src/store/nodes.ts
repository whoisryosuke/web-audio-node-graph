import {
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type Node,
  type EdgeChange,
  type Edge,
  Handle,
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
  resetAudioNodes,
  updateAudioNode,
} from "../services/audio/audio-graph";
import type { Vector2D } from "../utils/types";

const DEFAULT_NODES = [
  {
    id: "output",
    type: "output",
    data: { label: "output" },
    position: { x: -50, y: 100 },
  },
];

export type EdgeData = {
  source: string;
  sourceHandle: Handle["id"];
  target: string;
  targetHandle: Handle["id"];
};

export interface NodeStoreState {
  nodes: Node[];
  edges: Edge[];

  addNode: (
    type: CustomNodeTypesNames,
    position?: Vector2D,
    data?: Partial<Node>,
    id?: string
  ) => Promise<string>;
  onNodesDelete: (deleted: Node[]) => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  deleteEdge: (edgeId: Edge["id"]) => void;
  addEdge: (data: Partial<Edge>) => void;
  updateNode: <T>(id: string, data: T) => void;
  updateNodePosition: (id: string, position: Vector2D) => void;
  newFile: () => void;

  selectedEdge: Edge;
  setSelectedEdge: (edge: Edge) => void;
}

export const useNodeStore = create<NodeStoreState>()(
  devtools((set) => ({
    nodes: [...DEFAULT_NODES],
    edges: [],

    addNode: async (
      type: CustomNodeTypesNames,
      position?: Vector2D,
      data?: Partial<Node>,
      id?: string
    ) => {
      const newNode = createNode(type, position, data, id) as Node;

      // Create the audio node
      await createAudioNode(type, newNode.id);

      set((state) => ({
        nodes: [...state.nodes, newNode],
      }));

      return newNode.id;
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

    addEdge: (data: EdgeData) => {
      const id = nanoid(6);
      const edge = { id, type: "default", ...data } as Edge;

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

    updateNodePosition: (id: string, position: Vector2D) => {
      set((state) => {
        return {
          nodes: state.nodes.map((node) =>
            node.id == id ? { ...node, position } : node
          ),
        };
      });
    },

    newFile: () => {
      resetAudioNodes();
      set(() => ({
        edges: [],
        nodes: [...DEFAULT_NODES],
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
