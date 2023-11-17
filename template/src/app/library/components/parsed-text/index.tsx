import React, { useCallback } from 'react';
import { Text } from 'react-native';

import { isTypeof } from '@common/method';

import { ParsedTextProps } from './type';
import { PATTERNS, textExtraction } from './utils';

export const ParsedText = ({ parse, children, ...rest }: ParsedTextProps) => {
  // function
  const getPatterns = useCallback(() => {
    return parse.map(option => {
      const { type, ...patternOption } = option;

      if (type && PATTERNS[type]) {
        patternOption.pattern = PATTERNS[type];
      }

      return patternOption;
    });
  }, [parse]);

  const renderTexts = useCallback(() => {
    if (!parse || !isTypeof(children, 'string')) {
      return children;
    }

    const text = textExtraction(children, getPatterns());

    return text.map((localProps, index) => {
      const { style, ...restText } = localProps;

      return <Text key={`parsedText-${index}`} style={style} {...restText} />;
    });
  }, [children, getPatterns, parse]);

  // render
  return <Text {...rest}>{renderTexts()}</Text>;
};
