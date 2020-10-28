import React, { memo, useMemo } from 'react';
import { StyleSheet, Button } from 'react-native';
import isEqual from 'react-fast-compare';
import { Form } from '@components';
import { ValidationMap } from '@library/components/Form/Form.props';
import { useForm } from 'react-hook-form';
import { Input } from './Input';
import { onCheckType } from '@common';

type FormValue = {
  name: string;
  password: string;
  repassword: string;
};

interface FormLoginProps {
  onSubmit: (data: FormValue) => void;
}

const FormLoginComponent = ({ onSubmit }: FormLoginProps) => {
  const {
    register,
    setValue,
    trigger,
    getValues,
    errors,
    handleSubmit,
  } = useForm<FormValue>({});
  const rules = useMemo(
    () =>
      ({
        name: { required: { value: true, message: 'Name is required' } },
        repassword: {
          required: { value: true, message: 'Confirm is required' },
          validate: (val: any) =>
            onCheckType(getValues().password, 'undefined') ||
            onCheckType(getValues().repassword, 'undefined') ||
            val === getValues().password ||
            'Passwords do not match',
        },
      } as ValidationMap<FormValue>),
    [],
  );
  const onSubmitKey = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <>
      <Form {...{ register, setValue, trigger, rules, errors }}>
        <Input name={'name'} label={'Name'} />
        <Input
          nameTrigger={'repassword'}
          name={'password'}
          label={'Password'}
        />
        <Input
          onSubmit={onSubmitKey}
          nameTrigger={'password'}
          name={'repassword'}
          label={'Confirm Password'}
        />
        <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
      </Form>
    </>
  );
};

export const FormLogin = memo(FormLoginComponent, isEqual);


