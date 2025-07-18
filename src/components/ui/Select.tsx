import {
  Portal,
  Select as ChakraSelect,
  type ListCollection,
  createListCollection,
  type SliderRootProps,
  type SelectRootProps,
} from "@chakra-ui/react";
import { useMemo } from "react";

export type SelectOption = {
  value: string | number;
  label: string | number;
};

type Props = Partial<SelectRootProps> & {
  options: SelectOption[];
  name?: string;
  placeholder: string;
};

const Select = ({ options, name, placeholder, ...props }: Props) => {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
      }),
    [options]
  );

  return (
    <ChakraSelect.Root
      collection={collection}
      size="sm"
      width="100%"
      {...props}
    >
      <ChakraSelect.HiddenSelect />
      {name && <ChakraSelect.Label>{name}</ChakraSelect.Label>}
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
