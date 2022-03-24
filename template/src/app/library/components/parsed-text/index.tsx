import React, { memo, useCallback } from 'react';

import isEqual from 'react-fast-compare';

import { onCheckType } from '@common';

import { ParsedTextProps } from './type';
import { PATTERNS, textExtraction } from './utils';

import { Text } from '../text';

const ParsedTextComponent = (props: ParsedTextProps) => {
  // state
  const { parse, ...rest } = props;

  // function
  const onGetPatterns = useCallback(() => {
    const res = parse.map(option => {
      const { type, ...patternOption } = option;
      if (type && PATTERNS[type]) {
        patternOption.pattern = PATTERNS[type];
      }

      return patternOption;
    });
    return res;
  }, [parse]);

  const onGetParsedText = useCallback(() => {
    if (!parse || !onCheckType(props.children, 'string')) {
      return props.children;
    }
    const text = textExtraction(props.children, onGetPatterns());
    return text.map((localProps, index) => {
      const { style, ...restText } = localProps;
      return <Text key={`parsedText-${index}`} style={[style]} {...restText} />;
    });
  }, [onGetPatterns, parse, props]);

  // render
  return <Text {...rest}>{onGetParsedText()}</Text>;
};

export const ParsedText = memo(ParsedTextComponent, isEqual);
