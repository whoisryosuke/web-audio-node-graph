import {
  Box,
  CloseButton,
  Heading,
  HStack,
  Kbd,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import React, { type KeyboardEvent, type PropsWithChildren } from "react";
import { useBorderColor } from "../../styles/colors";

const KeyboardButton = ({ children }: PropsWithChildren) => {
  const borderColor = useBorderColor();
  return (
    <Box
      borderRadius={3}
      p={4}
      pt={4}
      pb={2}
      borderWidth={1.5}
      borderStyle="solid"
      borderColor={borderColor}
    >
      {children}
    </Box>
  );
};

type HotkeyKeysProps = {
  keys: KeyboardEvent["key"][];
};

const HotkeyKeys = ({ keys }: HotkeyKeysProps) => {
  return (
    <Stack alignItems="flex-start">
      {keys.map((key) => (
        <Kbd key={key}>{key.toLocaleUpperCase()}</Kbd>
      ))}
    </Stack>
  );
};

type HotkeyListItemProps = {
  hotkey: HotkeyData;
};

const HotkeyListItem = ({ hotkey }: HotkeyListItemProps) => {
  return (
    <Table.Row>
      <Table.Cell>
        <HotkeyKeys keys={hotkey.keys} />
      </Table.Cell>
      <Table.Cell>
        <Text flex={1}>{hotkey.action}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="2xs" flex={1}>
          {hotkey.description}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
};

type HotkeyData = {
  keys: KeyboardEvent["key"][];
  // The title of the action
  action: string;
  // Longer description of action
  description: string;
};
const HOTKEYS: HotkeyData[] = [
  {
    keys: ["backspace", "delete"],
    action: "Delete Node/Edge",
    description: "Deletes currently selected node or edge",
  },
  {
    keys: ["tab"],
    action: "Toggle Node Popup Menu",
    description:
      "Opens and closes popup menu with list of nodes to add to graph",
  },
];

type Props = {};

const KeyboardModal = (props: Props) => {
  return (
    <Stack p={4}>
      <Heading size="lg">Keyboard Shortcuts</Heading>
      <Table.Root borderRadius={6} overflow="hidden">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>
              <Text fontSize="2xs">Keyboard Key</Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <Text fontSize="2xs">Action</Text>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <Text fontSize="2xs">Description</Text>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {HOTKEYS.map((hotkey) => (
            <HotkeyListItem hotkey={hotkey} />
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default KeyboardModal;
