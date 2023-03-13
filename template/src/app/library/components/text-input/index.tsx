import React, { ForwardedRef, forwardRef } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { execFunc } from '@common';
import { useTheme } from '@theme';

import { ErrorLine } from './error-line';
import { FocusedLine } from './focused-line';
import { Label } from './label';
import { styles } from './styles';
import { TextInputProps } from './type';

export const TextInput = forwardRef(
  (
    {
      error,
      label,
      required,
      editable,
      rxFormat,
      labelI18n,
      multiline,
      placeholder,
      nameTrigger,
      rightChildren,
      placeholderI18n,
      placeholderTextColor,
      placeholderTextColorTheme,
      onBlur,
      trigger,
      onFocus,
      onChangeText,
      ...rest
    }: TextInputProps,
    ref: ForwardedRef<RNTextInput>,
  ) => {
    // state
    const [t] = useTranslation();

    const { colors } = useTheme();

    const focusedValue = useSharedValue(false);

    const errorValue = useDerivedValue(() => error === true, [error]);

    const disabled = useDerivedValue(() => editable === false, [editable]);

    const borderColor = useDerivedValue(() => {
      switch (true) {
        case disabled.value:
          return colors.border;
        case errorValue.value:
          return colors.error;
        case focusedValue.value:
          return colors.primary;

        default:
          return colors.line;
      }
    }, [colors.primary, colors.error, colors.card, colors.border]);

    // func
    const handleTextChange = (text: string) => {
      const actualText =
        rxFormat !== undefined ? text.replace(rxFormat, '') : text;

      execFunc(onChangeText, actualText);

      if (nameTrigger) {
        execFunc(trigger, nameTrigger);
      }
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      focusedValue.value = true;

      execFunc(onFocus, e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      focusedValue.value = false;

      execFunc(onBlur, e);
    };

    // style
    const containerRestyle = useAnimatedStyle(
      () => ({
        borderColor: borderColor.value,
      }),
      [],
    );

    // render
    return (
      <>
        <Label label={label} labelI18n={labelI18n} required={required} />
        <Animated.View style={[styles.containerInput, containerRestyle]}>
          <RNTextInput
            {...rest}
            ref={ref}
            editable={editable}
            autoCorrect={false}
            clearButtonMode={'never'}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={
              editable === false
                ? colors.border
                : placeholderTextColor ||
                  (placeholderTextColorTheme &&
                    colors[placeholderTextColorTheme])
            }
            placeholder={placeholder || (placeholderI18n && t(placeholderI18n))}
            selectionColor={colors.primary}
            style={[styles.input, multiline && styles.multiline]}
            multiline={multiline}
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {rightChildren}
          <FocusedLine focused={focusedValue} disabled={disabled} />
          <ErrorLine error={errorValue} disabled={disabled} />
        </Animated.View>
      </>
    );
  },
);
