/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface OptionData {
  /**
   * (Required) Text to display
   */
  text: string;

  /**
   * Param pass to the call back function
   */
  itemCallback?: any;
}

export interface ActionSheetProps {
  /**
   * List option
   */
  option?: OptionData[];

  /**
   * Title of Action Sheet
   */
  title?: React.ReactNode | string;

  /**
   * Function call back when click option
   * @default undefined
   */
  onPressOption?: (item: OptionData, index: number) => void;

  /**
   * Function of cancel button
   * @default undefined
   */
  onPressCancel?: Function;

  /**
   * Text to display on cancel button
   * @default t('dialog:cancel')
   */
  textCancel?: string;

  /**
   * Background press function
   * @default undefined
   */
  onBackDropPress?: Function;

  /**
   * Enable to click backdrop to close
   * @default true
   */
  closeOnBackDrop?: boolean;

  /**
   * Overwrite style for text option
   * @default undefined
   */
  textOptionStyle?: StyleProp<TextStyle>;

  /**
   * Overwrite style for text of cancel option
   * @default undefined
   */
  textCancelStyle?: StyleProp<TextStyle>;

  /**
   * Overwrite style for container option item
   * @default undefined
   */
  wrapOptionStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite style for container cancel option
   * @default undefined
   */
  wrapCancelStyle?: StyleProp<ViewStyle>;

  /**
   * Overwrite style for action sheet
   * @default undefined
   */
  rootStyle?: StyleProp<ViewStyle>;

  /**
   * Color of backdrop when open
   * @default rgba(0,0,0,.5)
   */
  backDropColor?: string;
}
