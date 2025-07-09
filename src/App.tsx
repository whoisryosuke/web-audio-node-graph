import { Background, ReactFlow } from "@xyflow/react";
import { useNodeStore, type NodeStoreState } from "./store/nodes";

const selector = (store: NodeStoreState) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
});
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
      >
        <Background />
      </ReactFlow>
    </>
  );
}

export default App;
