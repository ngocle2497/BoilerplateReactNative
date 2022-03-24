/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
import { Text } from '@library/components/text';

import { styles } from './styles';
import { InputOutlineProps } from './type';

const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ACTIVE_COLOR = 'rgb(0,87,231)';
const ERROR_COLOR = 'rgb(214,45,32)';

export const InputOutline = forwardRef<any, InputOutlineProps>((props, ref) => {
  // props
  const {
    defaultValue,
    label,
    labelTx,
    placeholder,
    trigger,
    nameTrigger,
    placeholderColor = UN_ACTIVE_COLOR,
    rxRemove,
    placeholderTx,
    inputStyle: inputStyleOverwrite = {},
    errorBorderColor = ERROR_COLOR,
    errorLabelColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    containerStyle: containerStyleOverwrite = {},
    rightChildren,
    disabled = false,
    error = undefined,
    onChangeText,
    onFocus,
    onBlur,
    onSubmit,
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
  const onLayoutContainerInput = useCallback((e: LayoutChangeEvent) => {
    setHeightContainerInput(e.nativeEvent.layout.height);
  }, []);

  const _onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (onCheckType(onFocus, 'function')) {
        onFocus(e);
      }
      setFocused(true);
    },
    [onFocus],
  );

  const _onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      if (onCheckType(onBlur, 'function')) {
        onBlur(e);
      }
      setFocused(false);
    },
    [onBlur],
  );

  const _onChangeText = useCallback(
    (text: string) => {
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
    },
    [nameTrigger, onChangeText, rxRemove, trigger],
  );

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
    () => (placeholderTx && t(placeholderTx)) || placeholder || '',
    [placeholder, placeholderTx, t],
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
        {(placeholderTx || placeholder) && value.length === 0 && (
          <View style={[styles.wrapPlaceHolder]} pointerEvents={'none'}>
            <Text
              tx={placeholderTx}
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
