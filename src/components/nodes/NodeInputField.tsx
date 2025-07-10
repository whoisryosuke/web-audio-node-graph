import { Field } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";
import { useInputBg, useInputBorder } from "../../styles/colors";

type Props = {
  label: string;
  helper?: string;
};

const NodeInputField = ({
  children,
  label,
  helper,
}: PropsWithChildren<Props>) => {
  const bg = useInputBg();
  const border = useInputBorder();
  return (
    <Field.Root
      bg={bg}
      borderColor={border}
      borderWidth={1}
      borderStyle="solid"
      borderRadius="md"
      p={4}
    >
      <Field.Label>{label}</Field.Label>
      {children}
      {helper && <Field.HelperText color="gray.400">{helper}</Field.HelperText>}
    </Field.Root>
  );
};

export default NodeInputField;
