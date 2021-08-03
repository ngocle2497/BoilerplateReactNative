/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
} from 'react';
import {
  StyleSheet,
  TextInput,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {useInterpolate, useSharedTransition} from '@animated';
import {useTranslation} from 'react-i18next';
import {enhance, onCheckType} from '@common';
import {Block} from '@library/components/Block/Block';
import {Text} from '@library/components/Text/Text';

import {InputFlatProps} from './InputFlat.props';

const VERTICAL_PADDING = 5;
const UN_ACTIVE_COLOR = 'rgb(159,152,146)';
const ACTIVE_COLOR = 'rgb(0,87,231)';
const ERROR_COLOR = 'rgb(214,45,32)';

const styles = StyleSheet.create({
  container: {
    paddingVertical: VERTICAL_PADDING,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    padding: 0,
    marginTop: 10,
    borderBottomColor: 'transparent',
  },
  text: {
    position: 'absolute',
    alignSelf: 'flex-start',
    zIndex: 2,
  },
  wrapLabel: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});

export const InputFlat = forwardRef<any, InputFlatProps>((props, ref) => {
  // props
  const {
    defaultValue,
    label,
    labelTx,
    placeholder,
    placeholderTx,
    placeholderColor = UN_ACTIVE_COLOR,
    onTextChange,
    trigger,
    nameTrigger,
    inputStyle: inputStyleOverwrite = {},
    name = '',
    errorBorderColor = ERROR_COLOR,
    errorLabelColor = ERROR_COLOR,
    disabledLabelColor = UN_ACTIVE_COLOR,
    activeTintBorderColor = ACTIVE_COLOR,
    activeTintLabelColor = ACTIVE_COLOR,
    unActiveTintBorderColor = UN_ACTIVE_COLOR,
    unActiveTintLabelColor = UN_ACTIVE_COLOR,
    disabledBorderColor = UN_ACTIVE_COLOR,
    disabled = false,
    error = undefined,
    rightChildren = undefined,
    containerStyle: containerStyleOverwrite = {},
    onChangeText,
    onFocus,
    onBlur,
    rxRemove,
    ...rest
  } = props;

  // state
  const [t] = useTranslation();
  const [heightContainerInput, setHeightContainerInput] = useState(0);
  const [focused, setFocused] = useState(false);
  const [localDefaultValue, setLocalDefaultValue] = useState('');
  const [value, setValue] = useState('');

  // reanimated
  const progress = useSharedTransition(focused || value.length > 0, {
    duration: 150,
  });

  const bottom = useInterpolate(
    progress,
    [0, 1],
    [0, heightContainerInput - 10],
  );

  const fontLabel = useInterpolate(progress, [0, 1], [14, 12]);

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
      if (onCheckType(onTextChange, 'function')) {
        onTextChange(name, actualText);
      }
      if (onCheckType(onChangeText, 'function')) {
        onChangeText(actualText);
      }
      if (
        trigger &&
        onCheckType(trigger, 'function') &&
        nameTrigger &&
        onCheckType(nameTrigger, 'string')
      ) {
        setTimeout(() => {
          trigger(nameTrigger);
        }, 0);
      }
      setValue(actualText);
    },
    [name, nameTrigger, onChangeText, onTextChange, rxRemove, trigger],
  );

  // effect
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setLocalDefaultValue(String(defaultValue));
    }
  }, [defaultValue]);

  // style
  const labelText = useMemo(
    () => (labelTx && t(labelTx)) || label || undefined,
    [labelTx, label, t],
  );

  const placeHolder = useMemo(
    () => (placeholderTx && t(placeholderTx)) || placeholder || '',
    [placeholder, placeholderTx, t],
  );

  const inputStyle = useMemo(
    () => enhance([styles.input, inputStyleOverwrite]),
    [inputStyleOverwrite],
  );

  const containerStyle = useMemo(
    () => enhance([styles.container, containerStyleOverwrite]),
    [containerStyleOverwrite],
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
    <Animated.View style={[containerStyle, containerAnimatedStyle]}>
      <Block direction={'row'} alignItems={'flex-start'}>
        {(placeholderTx || placeholder) && value.length === 0 && (
          <Block
            position={'absolute'}
            alignSelf={'flex-end'}
            pointerEvents={'none'}>
            <Text
              tx={placeholderTx}
              text={placeHolder}
              color={placeholderColor}
            />
          </Block>
        )}
        {labelText && (
          <Animated.View
            pointerEvents={'none'}
            style={[styles.wrapLabel, wrapLabelStyle]}>
            <Animated.Text style={[labelStyle]}>
              {labelText ?? ''}
            </Animated.Text>
          </Animated.View>
        )}
        <Block block onLayout={onLayoutContainerInput}>
          <TextInput
            defaultValue={localDefaultValue}
            autoCorrect={false}
            selectionColor={activeTintBorderColor}
            underlineColorAndroid={'transparent'}
            clearButtonMode={'never'}
            editable={!disabled}
            style={[inputStyle]}
            ref={ref}
            {...rest}
            onChangeText={_onChangeText}
            onFocus={_onFocus}
            onBlur={_onBlur}
          />
        </Block>
        {rightChildren && rightChildren}
      </Block>
    </Animated.View>
  );
});
