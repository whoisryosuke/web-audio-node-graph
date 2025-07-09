import React from "react";
import AddNodeWidget from "./widgets/AddNodeWidget";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        minWidth: "420px",
        top: 0,
        right: 0,
        background: "blue",
      }}
    >
      <div style={{ padding: "2rem" }}>
        <h1>Audio Node Graph</h1>

        <AddNodeWidget />
      </div>
    </div>
  );
};

export default Sidebar;
