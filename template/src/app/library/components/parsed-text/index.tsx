import React, { useCallback } from 'react';

import { isTypeof } from '@common/method';
import { Text } from '@rn-core';

import { ParsedTextProps } from './type';
import { PATTERNS, textExtraction } from './utils';

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
    if (!parse || !isTypeof(children, 'string')) {
      return children;
    }

    const text = textExtraction(children, onGetPatterns());

    return text.map((localProps, index) => {
      const { style, ...restText } = localProps;

      return <Text key={`parsedText-${index}`} style={style} {...restText} />;
    });
  }, [children, onGetPatterns, parse]);

  // render
  return <Text {...rest}>{onGetParsedText()}</Text>;
};
