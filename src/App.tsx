import {
  Background,
  Controls,
  ReactFlow,
  type ConnectionState,
  type Edge,
  type OnConnectEnd,
} from "@xyflow/react";
import { useNodeStore, type NodeStoreState } from "./store/nodes";
import ALL_NODE_TYPES from "./nodes";
import Sidebar from "./components/Sidebar/Sidebar";
import Hotkeys from "./components/Hotkeys";
import TrackMouse from "./components/TrackMouse";
import NodePopup from "./components/NodePopup/NodePopup";
import { useCallback } from "react";
import { useAppStore } from "./store/app";
import Footer from "./components/Footer/Footer";
import MenuBar from "./components/MenuBar/MenuBar";
import Modal from "./components/Modal/Modal";
import type { Vector2D } from "./utils/types";
import Toaster from "./components/ui/Toaster";

// const selector = (store: NodeStoreState) => ({
//   nodes: store.nodes,
//   edges: store.edges,
//   onNodesChange: store.onNodesChange,
//   onEdgesChange: store.onEdgesChange,
//   addEdge: store.addEdge,
// });

function App() {
  const { setNodePopup, setConnectionPending } = useAppStore();
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    setSelectedEdge,
  } = useNodeStore();

  const onConnectEnd: OnConnectEnd = useCallback((event, connectionState) => {
    // when a connection is dropped on the pane it's not valid
    if (!connectionState.isValid) {
      // Open popup menu
      setNodePopup(true);

      // Save last node info so we can connect later
      console.log("connectionState", connectionState);
      if (!connectionState.fromNode || !connectionState.fromHandle) return;
      setConnectionPending({
        node: connectionState.fromNode.id,
        handleId: connectionState.fromHandle.id,
        handleType: connectionState.fromHandle.type,
        position: { ...connectionState.to } as Vector2D,
      });
    }
  }, []);

  const onEdgesClick = (event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
  };

  const onEdgesDelete = (edges: Edge[]) => {
    console.log("edges deleted", edges);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={addEdge}
        onConnectEnd={onConnectEnd}
        nodeTypes={ALL_NODE_TYPES}
        onEdgeClick={onEdgesClick}
        onEdgesDelete={onEdgesDelete}
      >
        <Background color="#555" />
      </ReactFlow>
      {/* <Sidebar /> */}
      <MenuBar />
      <Hotkeys />
      <TrackMouse />
      <NodePopup />
      <Footer />
      <Modal />
      <Toaster />
    </>
  );
}

export default App;
