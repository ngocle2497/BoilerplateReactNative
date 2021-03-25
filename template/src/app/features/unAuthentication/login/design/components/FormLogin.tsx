import {ValidationMap} from '@config/type';
import {FormLoginType} from '@model/login';
import React, {memo, useCallback, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {FormProvider, useForm} from 'react-hook-form';
import {Button} from 'react-native';

import {Input} from './Input';

interface FormLoginProps {
  onSubmit: (data: FormLoginType) => void;
}

const FormLoginComponent = ({onSubmit}: FormLoginProps) => {
  // state
  const formMethod = useForm<FormLoginType>({mode: 'all'});
  const {password} = formMethod.watch();
  const isDirty = formMethod.formState.dirtyFields.rePassword;

  const rules = useMemo(
    () =>
      ({
        name: {required: {value: true, message: 'Name is required'}},
        password: {required: {value: true, message: 'Password is required'}},
        rePassword: {
          required: {value: true, message: 'Password is required'},
          validate: (val: string | undefined) => {
            return !isDirty || val === password
              ? undefined
              : 'Passwords do not match';
          },
        },
      } as ValidationMap<FormLoginType>),
    [isDirty, password],
  );

  // function
  const onSubmitKey = useCallback(() => {
    formMethod.handleSubmit(onSubmit)();
  }, [formMethod, onSubmit]);

  // render
  return (
    <FormProvider {...formMethod}>
      <Input rules={rules.name} name={'name'} label={'Name'} />
      <Input
        rules={rules.password}
        nameTrigger={'rePassword'}
        name={'password'}
        label={'Password'}
      />
      <Input
        rules={rules.rePassword}
        onSubmit={onSubmitKey}
        name={'rePassword'}
        label={'Confirm Password'}
      />
      <Button title={'Submit'} onPress={onSubmitKey} />
    </FormProvider>
  );
};

export const FormLogin = memo(FormLoginComponent, isEqual);
