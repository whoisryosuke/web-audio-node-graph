import type { NodeBase } from "@xyflow/system";
import { useAppStore } from "../../store/app";
import { useNodeStore } from "../../store/nodes";
import type { CustomNodeTypesNames } from "../../nodes";
import type { Edge } from "@xyflow/react";

const handleNewFile = () => {
  const { newFile } = useNodeStore.getState();

  const userConfirmed = window.confirm(
    "Are you sure you want to delete all nodes and connections?"
  );

  if (userConfirmed) newFile();
};

const handleKeyboardPopup = () => {
  const { setModal } = useAppStore.getState();

  setModal("keyboard");
};

function getFormattedDateForExport(date: Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed, add 1
  const year = date.getFullYear().toString(); // Get last two digits of the year
  const day = date.getDate().toString().padStart(2, "0");
  const secs = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}_${secs}s`;
}

const handleExport = () => {
  const { nodes, edges } = useNodeStore.getState();

  const fileContents = {
    nodes,
    edges,
  };

  // Data -> JSON -> Blob for file
  const json = JSON.stringify(fileContents, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  // Generate timestamp
  const date = new Date(); // Get the current date
  const formattedDate = getFormattedDateForExport(date);
  console.log("date", formattedDate);
  downloadLink.download = `web-audio-node-graph-${formattedDate}.json`;

  // Simulate download
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Cleanup
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(downloadLink.href);
};

function openFilePicker(): void {
  const inputElement = document.createElement("input");
  inputElement.type = "file";
  inputElement.style.display = "none"; // Hide the input element

  // Get files
  inputElement.onchange = (event: Event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      console.log("Selected file:", selectedFile.name, selectedFile.type);

      if (selectedFile.type != "application/json") {
        // @TODO: notify user it wasn't JSON
        return;
      }

      // Process the selected file (e.g., upload, read content)
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          // Process files
          try {
            const json = JSON.parse(content);

            const { nodes = [], edges = [] } = json;
            const { addNode, addEdge, newFile } = useNodeStore.getState();

            newFile();

            nodes.forEach((node: NodeBase & { type: CustomNodeTypesNames }) =>
              addNode(node.type, node.position, node.data, node.id)
            );

            edges.forEach((edge: Edge) => addEdge(edge));
          } catch (e) {
            console.error("Error parsing JSON", e);
          }
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      // Read the file as text (or other formats like ArrayBuffer, DataURL)
      reader.readAsText(selectedFile);
    }
  };

  // Append input
  document.body.appendChild(inputElement);
  // Simulate click
  inputElement.click();
  // Cleanup
  document.body.removeChild(inputElement);
}

const handleImport = () => {
  openFilePicker();
};

export const FILE_OPTIONS = [
  {
    value: "new",
    title: "New Graph",
    onClick: handleNewFile,
  },
  {
    value: "import",
    title: "Import Graph",
    onClick: handleImport,
  },
  {
    value: "export",
    title: "Export Graph",
    onClick: handleExport,
  },
];

export const SETTINGS_OPTIONS = [
  {
    value: "keyboard",
    title: "Keyboard Shortcuts",
    onClick: handleKeyboardPopup,
  },
];
