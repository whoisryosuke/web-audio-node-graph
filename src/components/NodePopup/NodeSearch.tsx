import { Input } from "@chakra-ui/react";
import React, { useEffect, useRef, type ChangeEvent } from "react";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  focused: boolean;
};

const NodeSearch = ({ search, setSearch, focused }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("typing", e.currentTarget.value);
    setSearch(e.currentTarget.value);
  };

  useEffect(() => {
    if (focused) {
      console.log("focusing input");
      // We don't immediately focus because it'll accept hotkey as input
      // Which means typing -- or for tab, moving focus to next element
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset search when user closes
      // setSearch("")
    }
  }, [focused]);

  return (
    <Input
      ref={inputRef}
      value={search}
      placeholder="Search for nodes"
      onChange={handleChange}
      width="90%"
      mb={3}
    />
  );
};

export default NodeSearch;
