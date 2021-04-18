import {TextField} from '@components';
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
  const {
    formState: {errors},
    control,
    trigger,
    getValues,
  } = useFormContext<FormLoginType>();
  const {field} = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  // render
  return (
    <TextField
      onSubmit={onSubmit}
      ref={field.ref}
      nameTrigger={nameTrigger}
      trigger={trigger}
      error={errors[name]?.message !== undefined}
      label={label}
      name={name}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      defaultValue={getValues()[name]}
      typeInput={'flat'}
      {...rest}
    />
  );
};

export const Input = memo(InputComponent, isEqual);
