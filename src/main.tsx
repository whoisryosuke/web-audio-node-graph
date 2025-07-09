import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@xyflow/react/dist/style.css";
import "./styles/flow-reset.css";
import App from "./App.tsx";
import { ReactFlowProvider } from "@xyflow/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./components/ui/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlowProvider>
          <App />
        </ReactFlowProvider>
      </div>
    </Provider>
  </StrictMode>
);
