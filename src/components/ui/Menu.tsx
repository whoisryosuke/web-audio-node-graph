import { Button, Menu as CMenu, Portal } from "@chakra-ui/react";

type MenuProps = {
  title: string;
  options: {
    value: string;
    title: string;
    onClick?: () => void;
  }[];
};

const Menu = ({ title, options }: MenuProps) => {
  return (
    <CMenu.Root>
      <CMenu.Trigger asChild>
        <Button variant="outline" size="xs">
          {title}
        </Button>
      </CMenu.Trigger>
      <Portal>
        <CMenu.Positioner>
          <CMenu.Content>
            {options.map((option) => (
              <CMenu.Item
                key={option.value}
                value={option.value}
                onClick={option.onClick}
                fontSize="xs"
              >
                {option.title}
              </CMenu.Item>
            ))}
          </CMenu.Content>
        </CMenu.Positioner>
      </Portal>
    </CMenu.Root>
  );
};

export default Menu;
