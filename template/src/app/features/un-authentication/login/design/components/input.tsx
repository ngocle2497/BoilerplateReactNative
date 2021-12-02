import {HelperText, TextField} from '@components';
import {HookFormRules} from '@config/type';
import {FormLoginType} from '@model/login';
import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {useController, useFormContext} from 'react-hook-form';
import {TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {
  name: keyof FormLoginType;
  label: string;
  onSubmit?: () => void;
  nameTrigger?: keyof FormLoginType;
  rules?: HookFormRules;
}

const InputComponent = ({
  onSubmit,
  label,
  name,
  rules,
  nameTrigger,
  defaultValue = '',
  ...rest
}: InputProps) => {
  // state
  const {trigger, getValues} = useFormContext<FormLoginType>();
  const {
    field,
    fieldState: {invalid, error},
  } = useController({
    name,
    rules,
    defaultValue,
  });
  // render
  return (
    <>
      <TextField
        onSubmit={onSubmit}
        ref={field.ref}
        nameTrigger={nameTrigger}
        trigger={trigger}
        error={invalid}
        label={label}
        name={name}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        defaultValue={getValues()[name]}
        typeInput={'flat'}
        {...rest}
      />
      <HelperText visible={invalid} msg={error?.message ?? ''} type={'error'} />
    </>
  );
};

export const Input = memo(InputComponent, isEqual);
