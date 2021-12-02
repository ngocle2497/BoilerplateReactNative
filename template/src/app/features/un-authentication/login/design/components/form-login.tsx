import {yupResolver} from '@common';
import {FormLoginType} from '@model/login';
import React, {memo, useCallback, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {FormProvider, useForm} from 'react-hook-form';
import {Button} from 'react-native';
import * as yup from 'yup';

import {Input} from './input';

interface FormLoginProps {
  onSubmit: (data: FormLoginType) => void;
}

const FormLoginComponent = ({onSubmit}: FormLoginProps) => {
  // state
  const validate = useMemo<yup.SchemaOf<FormLoginType>>(
    () =>
      yup.object().shape({
        name: yup.string().required('Name is required'),
        password: yup.string().required('Password is required'),
        rePassword: yup
          .string()
          .required('Confirm password is required')
          .oneOf([undefined, yup.ref('password')], 'Not Match'),
      }),
    [],
  );
  const formMethod = useForm<FormLoginType>({
    mode: 'all',
    resolver: yupResolver(validate),
  });

  // function
  const onSubmitKey = useCallback(() => {
    formMethod.handleSubmit(onSubmit)();
  }, [formMethod, onSubmit]);

  // render
  return (
    <FormProvider {...formMethod}>
      <Input name={'name'} label={'Name'} />
      <Input nameTrigger={'rePassword'} name={'password'} label={'Password'} />
      <Input
        onSubmit={onSubmitKey}
        name={'rePassword'}
        label={'Confirm Password'}
      />
      <Button title={'Submit'} onPress={onSubmitKey} />
    </FormProvider>
  );
};

export const FormLogin = memo(FormLoginComponent, isEqual);
