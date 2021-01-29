import React, {memo, forwardRef} from "react";
import {TextField} from "@components";
import isEqual from "react-fast-compare";
import {FieldError} from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  error?: FieldError | undefined;
  onSubmit?: () => void;
  nameTrigger?: string;
}

const InputComponent = forwardRef<any, InputProps>(
  ({onSubmit, label, name, nameTrigger, error, ...rest}, ref) => {
    return (
      <TextField
        onSubmit={onSubmit}
        ref={ref}
        nameTrigger={nameTrigger}
        error={error?.message !== undefined}
        label={label}
        name={name}
        typeInput={"flat"}
        {...rest}
      />
    );
  },
);

export const Input = memo(InputComponent, isEqual);
