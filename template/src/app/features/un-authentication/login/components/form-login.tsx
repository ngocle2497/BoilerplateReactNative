import React from 'react';
import { Button } from 'react-native';

import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginType } from '@model/authentication';
import { loginValidation } from '@validate/login';

import { Input } from './input';

import { FormLoginProps } from '../type';

export const FormLogin = ({ onSubmit }: FormLoginProps) => {
  // state
  const formMethod = useForm<FormLoginType>({
    mode: 'all',
    resolver: yupResolver(loginValidation),
  });

  // function
  const onSubmitKey = () => {
    formMethod.handleSubmit(onSubmit)();
  };
  // render
  return (
    <FormProvider {...formMethod}>
      <Input<FormLoginType> name={'email'} label={'Email'} />
      <Input<FormLoginType> name={'password'} label={'Password'} />

      <Button title={'Submit'} onPress={onSubmitKey} />
    </FormProvider>
  );
};
