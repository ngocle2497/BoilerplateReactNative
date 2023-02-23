/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';

import { UseFormTrigger } from 'react-hook-form';
import Animated from 'react-native-reanimated';

import { Colors } from '@theme';
import { I18nKeys } from '@utils/i18n/locales';

export type ErrorLineProps = {
  error: Animated.SharedValue<boolean>;
  disabled: Animated.SharedValue<boolean>;
};

export type FocusedLineProps = {
  focused: Animated.SharedValue<boolean>;
  disabled: Animated.SharedValue<boolean>;
};

export type TextInputProps = RNTextInputProps & {
  /**
   * Format text before call onChangeText function
   * @default undefined
   */
  rxFormat?: RegExp;

  /**
   * Trigger name field of react hook form
   * @default undefined
   */
  nameTrigger?: string;

  /**
   * Call trigger react hook form
   * @default undefined
   */
  trigger?: UseFormTrigger<any>;

  /**
   * Translate placeholder by I18n
   * @default undefined
   */
  placeholderI18n?: I18nKeys;

  /**
   * Fill placeholder color by Theme
   * @default undefined
   */
  placeholderTextColorTheme?: keyof Colors;

  /**
   * Children right input.(ex:Icon show/hide password)
   */
  rightChildren?: React.ReactNode;

  /**
   * Invalid input or not
   * @default false
   */
  error?: boolean;
} & LabelProps;

export type LabelProps = {
  /**
   * Label of text input
   */
  label?: string;

  /**
   * Translate label by I18n
   * @default undefined
   */
  labelI18n?: I18nKeys;

  /**
   * Add red dot right label or not
   * @default false
   */
  required?: boolean;
};
