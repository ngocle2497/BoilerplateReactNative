import { TextProps } from 'react-native';

import { PATTERNS } from './utils';

export type ParsedText = { children: string; _matched?: boolean };

export type ParsedTexts = Array<ParsedText>;

export type CustomTextProps = TextProps;

export type MatchedPart = TextProps & {
  _matched: boolean;
};

export type Pattern = {
  pattern?: RegExp;
  lastIndex?: number;
  renderText?: (text: string) => string;
};

export type Parse = {
  type?: keyof typeof PATTERNS;
  pattern?: RegExp;
} & CustomTextProps & {
    onPress?: (text: string, index: number) => void;
    renderText?: (text: string) => string;
  };

export interface ParsedTextProps extends TextProps {
  parse: Array<Parse>;
}
