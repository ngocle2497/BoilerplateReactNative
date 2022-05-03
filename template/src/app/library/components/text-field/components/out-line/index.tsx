/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { useInterpolate, useSharedTransition } from '@animated';
import { onCheckType } from '@common';

import { styles } from './styles';
import { InputOutlineProps } from './type';

import { Text } from '../../../text';

const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ACTIVE_COLOR = 'rgb(0,87,231)';
const ERROR_COLOR = 'rgb(214,45,32)';

export const InputOutline = forwardRef<any, InputOutlineProps>((props, ref) => {
  // props
  const {
    label,
    labelTx,
    rxRemove,
    placeholder,
    nameTrigger,
    defaultValue,
    rightChildren,
    placeholderT18n,
    trigger,
    onBlur,
    onFocus,
    onSubmit,
    onChangeText,
    error = undefined,
    disabled = false,
    inputStyle: inputStyleOverwrite = {},
    containerStyle: containerStyleOverwrite = {},
    errorLabelColor = ERROR_COLOR,
    placeholderColor = UN_ACTIVE_COLOR,
    errorBorderColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    ...rest
  } = props;

  // state
  const [t] = useTranslation();
  const [heightContainerInput, setHeightContainerInput] = useState(0);
  const [localDefaultValue, setLocalDefaultValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: 150,
  });

  const bottom = useInterpolate(progress, [0, 1], [0, heightContainerInput]);

  const fontLabel = useInterpolate(progress, [0, 1], [14, 11]);

  const labelColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledLabelColor;
      case error:
        return errorLabelColor;
      case focused:
        return activeTintLabelColor;
      default:
        return unActiveTintLabelColor;
    }
  });

  const borderColor = useDerivedValue(() => {
    switch (true) {
      case disabled:
        return disabledBorderColor;
      case error:
        return errorBorderColor;
      case focused:
        return activeTintBorderColor;
      default:
        return unActiveTintBorderColor;
    }
  });

  // function
  const onLayoutContainerInput = (e: LayoutChangeEvent) => {
    setHeightContainerInput(e.nativeEvent.layout.height);
  };

  const _onFocus = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (onCheckType(onFocus, 'function')) {
      onFocus(e);
    }
    setFocused(true);
  };

  const _onBlur = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (onCheckType(onBlur, 'function')) {
      onBlur(e);
    }
    setFocused(false);
  };

  const _onChangeText = (text: string) => {
    const actualText =
      rxRemove !== undefined ? text.replace(rxRemove, '') : text;
    setValue(actualText);
    if (onCheckType(onChangeText, 'function')) {
      onChangeText(actualText);
    }
    if (
      onCheckType(trigger, 'function') &&
      onCheckType(nameTrigger, 'string')
    ) {
      setTimeout(() => {
        trigger(nameTrigger);
      }, 0);
    }
  };

  // effect
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setLocalDefaultValue(String(defaultValue));
    }
  }, [defaultValue]);

  // string
  const labelText = useMemo(
    () => (labelTx && t(labelTx)) || label || undefined,
    [labelTx, label, t],
  );

  const placeHolder = useMemo(
    () => (placeholderT18n && t(placeholderT18n)) || placeholder || '',
    [placeholder, placeholderT18n, t],
  );

  // reanimated style
  const wrapLabelStyle = useAnimatedStyle(() => ({
    bottom: bottom.value,
  }));

  const labelStyle = useAnimatedStyle(() => ({
    fontSize: fontLabel.value,
    color: labelColor.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  // render
  return (
    <Animated.View
      style={[
        styles.container,
        containerStyleOverwrite,
        containerAnimatedStyle,
      ]}>
      <View style={[styles.content]}>
        {(placeholderT18n || placeholder) && value.length === 0 && (
          <View style={[styles.wrapPlaceHolder]} pointerEvents={'none'}>
            <Text
              t18n={placeholderT18n}
              text={placeHolder}
              color={placeholderColor}
            />
          </View>
        )}
        {labelText && (
          <Animated.View
            pointerEvents={'none'}
            style={[styles.wrapLabel, wrapLabelStyle]}>
            <Animated.Text style={[styles.text, labelStyle]}>
              {labelText ?? ''}
            </Animated.Text>
          </Animated.View>
        )}
        <View style={[styles.flex]} onLayout={onLayoutContainerInput}>
          <TextInput
            defaultValue={localDefaultValue}
            autoCorrect={false}
            editable={!disabled}
            clearButtonMode={'never'}
            selectionColor={activeTintBorderColor}
            style={[styles.input, inputStyleOverwrite]}
            ref={ref}
            onSubmitEditing={onSubmit}
            {...rest}
            onChangeText={_onChangeText}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
        </View>
        {rightChildren}
      </View>
    </Animated.View>
  );
});
