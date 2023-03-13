/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useController, useFormContext } from 'react-hook-form';

import { HelperText, TextInput } from '@components';
import { TextInputProps } from '@components/text-input/type';
import { useErrorMessageTranslation } from '@hooks';
import { FormLoginType } from '@model/authentication';

interface InputProps<T extends Record<string, any>>
  extends CustomOmit<TextInputProps, 'nameTrigger'>,
    React.RefAttributes<any> {
  name: keyof T;
  nameTrigger?: keyof T;
}

export const Input = <T extends Record<string, any>>({
  label,
  name,
  nameTrigger,
  defaultValue = '',
  ...rest
}: InputProps<T>) => {
  // state
  const { trigger, getValues } = useFormContext<FormLoginType>();

  const {
    field,
    fieldState: { error },
  } = useController({
    name: name as string,
    defaultValue,
  });

  const message = useErrorMessageTranslation(error?.message);

  // render
  return (
    <>
      <TextInput
        ref={field.ref}
        nameTrigger={nameTrigger as string}
        trigger={trigger}
        error={error?.message !== undefined}
        label={label}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        defaultValue={(getValues() as Record<string, string>)[name as string]}
        {...rest}
      />
      <HelperText
        visible={message !== undefined}
        msg={message ?? ''}
        type={'error'}
      />
    </>
  );
};
