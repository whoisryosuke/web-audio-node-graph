import React from "react";
import AddNodeWidget from "./widgets/AddNodeWidget";
import { Heading } from "@chakra-ui/react";

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
        <Heading size="2xl">Audio Node Graph</Heading>

        <AddNodeWidget />
      </div>
    </div>
  );
};

export default Sidebar;
