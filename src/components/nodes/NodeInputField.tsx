import { Field } from "@chakra-ui/react";
import React, { type PropsWithChildren } from "react";
import { useInputBg, useInputBorder } from "../../styles/colors";
import { Tooltip } from "../ui/Tooltip";

type Props = {
  label: string;
  helper?: string | number;
  tooltip?: string | React.ReactNode;
};

const NodeInputField = ({
  children,
  label,
  helper,
  tooltip,
}: PropsWithChildren<Props>) => {
  const bg = useInputBg();
  const border = useInputBorder();
  const labelContent = <Field.Label>{label}</Field.Label>;
  return (
    <Field.Root
      bg={bg}
      borderColor={border}
      borderWidth={1}
      borderStyle="solid"
      borderRadius="md"
      p={4}
      className="nodrag"
    >
      {tooltip ? (
        <Tooltip content={tooltip}>{labelContent}</Tooltip>
      ) : (
        labelContent
      )}
      {children}
      {helper && <Field.HelperText color="gray.400">{helper}</Field.HelperText>}
    </Field.Root>
  );
};

export default NodeInputField;
