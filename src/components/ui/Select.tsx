import {
  Portal,
  Select as ChakraSelect,
  type ListCollection,
  createListCollection,
} from "@chakra-ui/react";
import { useMemo } from "react";

type Props = {
  options: {
    value: string;
    label: string;
  }[];
  name: string;
  placeholder: string;
};

const Select = ({ options, name, placeholder }: Props) => {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
      }),
    [options]
  );

  return (
    <ChakraSelect.Root collection={collection} size="sm" width="320px">
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Label>{name}</ChakraSelect.Label>
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder={placeholder} />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {collection.items.map((framework) => (
              <ChakraSelect.Item item={framework} key={framework.value}>
                {framework.label}
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};
export default Select;
