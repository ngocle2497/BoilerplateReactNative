import React from 'react';
import { TouchableWithoutFeedbackProps } from 'react-native';

import { IconTypes } from '@assets/icon';
import { I18nKeys } from '@utils/i18n/locales';

export type ButtonProps = RequireAtLeastOne<
  {
    /**
     * Button size
     * @default normal
     */
    size?: 'normal' | 'small' | 'extraSmall';

    /**
     * Children for button
     * @default undefined
     */
    children?: React.ReactNode;

    /**
     * Left Icon
     */
    leftIcon?: IconTypes;

    /**
     * Right Icon
     */
    rightIcon?: IconTypes;

    /**
     * Disable button when press
     */
    throttleMs?: number;

    text: string;

    t18n: I18nKeys;
  },
  't18n' | 'text'
> &
  TouchableWithoutFeedbackProps;
