import { Background, Controls, ReactFlow } from "@xyflow/react";
import { useNodeStore, type NodeStoreState } from "./store/nodes";
import ALL_NODE_TYPES from "./nodes";
import Sidebar from "./components/Sidebar/Sidebar";
import Hotkeys from "./components/Hotkeys";
import TrackMouse from "./components/TrackMouse";
import NodePopup from "./components/NodePopup/NodePopup";
import { useCallback } from "react";
import { useAppStore } from "./store/app";

// const selector = (store: NodeStoreState) => ({
//   nodes: store.nodes,
//   edges: store.edges,
//   onNodesChange: store.onNodesChange,
//   onEdgesChange: store.onEdgesChange,
//   addEdge: store.addEdge,
// });

function App() {
  const { setNodePopup } = useAppStore();
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge } =
    useNodeStore();

  const onConnectEnd = useCallback((event, connectionState) => {
    // when a connection is dropped on the pane it's not valid
    if (!connectionState.isValid) {
      setNodePopup(true);
    }
  }, []);

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
      >
        <Background color="#555" />
      </ReactFlow>
      {/* <Sidebar /> */}
      <Hotkeys />
      <TrackMouse />
      <NodePopup />
    </>
  );
}

export default App;
