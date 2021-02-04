/* eslint-disable no-undef */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {TextInput, Keyboard} from 'react-native';
import isEqual from 'react-fast-compare';
import {onCheckType} from '@common';

import {ChildProps, FormProps} from './Form.props';

const Child = ({
  child,
  Inputs,
  setValue,
  trigger,
  i,
  getValues,
  errors,
}: ChildProps) => {
  const _onSubmitEditing = useCallback(() => {
    const formatInput = Inputs.current.filter((x) => x);
    const index = formatInput.findIndex((x) => x === Inputs.current[i]);
    if (index < formatInput.length - 1) {
      formatInput[index + 1]
        ? formatInput[index + 1].focus()
        : formatInput[index].blur();
    } else {
      if (onCheckType(child.props.onSubmit, 'function')) {
        child.props.onSubmit();
      }
      Keyboard.dismiss();
    }
  }, [Inputs, child.props, i]);
  return React.createElement(child.type, {
    ...{
      returnKeyType: i + 1 < Inputs.current.length ? 'next' : 'send',
      ...child.props,
      ref: (e: TextInput) => {
        Inputs.current[i] = e;
      },
      key: i,
      defaultValue: getValues()[child.props.name],
      trigger: trigger,
      onSetValueHookForm: setValue,
      keyName: child.props.name,
      onSubmitEditing: _onSubmitEditing,
      //onBlur: () => triggerValidation(child.props.name),
      blurOnSubmit: false,
      //name: child.props.name,
      error: errors[child.props.name],
    },
  });
};

const FormComponent = ({
  register,
  errors,
  trigger,
  rules,
  setValue,
  getValues,
  children,
}: FormProps) => {
  const Inputs = React.useRef<Array<TextInput>>([]);
  const [, setOnLoad] = useState<boolean>(true);
  useEffect(() => {
    (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
      if (child.props.name) {
        register({name: child.props.name}, rules && rules[child.props.name]);
      }
    });
    // After load, the initial value will be add. so need to rerender this
    setOnLoad(false);
    // don't add children to dependency. if added, rules not working
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rules, register]);

  const _renderItem = (child: JSX.Element, i: number) => {
    if (child.props.name) {
      return (
        <Child
          key={i}
          {...{child, i, setValue, getValues, errors, Inputs, trigger}}
        />
      );
    }
    return child;
  };
  return (
    <>
      {(Array.isArray(children) ? [...children] : [children]).map(_renderItem)}
    </>
  );
};

export const Form = memo(FormComponent, isEqual);
