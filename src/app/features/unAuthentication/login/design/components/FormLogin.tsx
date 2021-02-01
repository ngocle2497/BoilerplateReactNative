/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {memo, useMemo} from "react";
import {Button} from "react-native";
import isEqual from "react-fast-compare";
import {Form} from "@components";
// eslint-disable-next-line import/extensions
import {ValidationMap} from "@library/components/Form/Form.props";
import {useForm} from "react-hook-form";

import {Input} from "./Input";

export type FormValue = {
  name: string;
  password: string;
  repassword: string;
};

interface FormLoginProps {
  onSubmit: (data: FormValue) => void;
}

const FormLoginComponent = ({onSubmit}: FormLoginProps) => {
  const {
    register,
    setValue,
    trigger,
    getValues,
    errors,
    handleSubmit,
  } = useForm<FormValue>();
  const rules = useMemo(
    () =>
      ({
        name: {required: {value: true, message: "Name is required"}},
        password: {required: {value: true, message: "Password is required"}},
        repassword: {
          required: {value: true, message: "Confirm is required"},
          validate: (val: any) =>
            val === getValues().password || "Passwords do not match",
        },
      } as ValidationMap<FormValue>),
    [getValues],
  );
  const onSubmitKey = () => {
    handleSubmit(onSubmit)();
  };
  return (
    <>
      <Form {...{register, getValues, setValue, trigger, rules, errors}}>
        <Input name={"name"} label={"Name"} />
        <Input
          nameTrigger={"repassword"}
          name={"password"}
          label={"Password"}
        />
        <Input
          onSubmit={onSubmitKey}
          nameTrigger={"password"}
          name={"repassword"}
          label={"Confirm Password"}
        />
        <Button title={"Submit"} onPress={handleSubmit(onSubmit)} />
      </Form>
    </>
  );
};

export const FormLogin = memo(FormLoginComponent, isEqual);
