import React, { useCallback } from 'react';

import { onCheckType } from '@common';

import { ParsedTextProps } from './type';
import { PATTERNS, textExtraction } from './utils';

import { Text } from '../text';

export const ParsedText = ({ parse, children, ...rest }: ParsedTextProps) => {
  // function
  const onGetPatterns = useCallback(() => {
    return parse.map(option => {
      const { type, ...patternOption } = option;

      if (type && PATTERNS[type]) {
        patternOption.pattern = PATTERNS[type];
      }

      return patternOption;
    });
  }, [parse]);

  const onGetParsedText = useCallback(() => {
    if (!parse || !onCheckType(children, 'string')) {
      return children;
    }

    const text = textExtraction(children, onGetPatterns());

    return text.map((localProps, index) => {
      const { style, ...restText } = localProps;

      return <Text key={`parsedText-${index}`} style={[style]} {...restText} />;
    });
  }, [children, onGetPatterns, parse]);

  // render
  return <Text {...rest}>{onGetParsedText()}</Text>;
};
