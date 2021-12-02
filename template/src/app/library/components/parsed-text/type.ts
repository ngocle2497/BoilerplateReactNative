import {TextProps} from '../text/type';
import {CustomOmit} from '../../../common/type/index';

import {PATTERNS} from './ultil';

export type ParsedText = {children: string; _matched?: boolean};
export type ParsedTexts = Array<ParsedText>;
export type CustomTextProps = CustomOmit<
  TextProps,
  'tx' | 'txOptions' | 'children' | 'text' | 'onPress' | 'onLongPress'
>;
export type MatchedPart = CustomOmit<TextProps, 'tx' | 'txOptions' | 'text'> & {
  _matched: boolean;
};
export type Pattern = {pattern?: RegExp; lastIndex?: number};
export type Parse = {
  type?: keyof typeof PATTERNS;
  pattern?: RegExp;
} & CustomTextProps & {
    onPress: (text: string, index: number) => void;
  };

export interface ParsedTextProps extends TextProps {
  parse: Array<Parse>;
}
