import { Background, ReactFlow } from "@xyflow/react";
import { useNodeStore, type NodeStoreState } from "./store/nodes";
import ALL_NODE_TYPES from "./nodes";
import Sidebar from "./components/Sidebar/Sidebar";

// const selector = (store: NodeStoreState) => ({
//   nodes: store.nodes,
//   edges: store.edges,
//   onNodesChange: store.onNodesChange,
//   onEdgesChange: store.onEdgesChange,
//   addEdge: store.addEdge,
// });

function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, addEdge } =
    useNodeStore();

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={addEdge}
        nodeTypes={ALL_NODE_TYPES}
      >
        <Background />
      </ReactFlow>
      <Sidebar />
    </>
  );
}

export default App;
