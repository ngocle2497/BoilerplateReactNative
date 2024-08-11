import React, { useCallback } from 'react';
import { Text } from 'react-native';

import { ParsedTextProps } from './type';
import { textExtraction } from './utils';

export const ParsedText = ({ parse, children, ...rest }: ParsedTextProps) => {
  // function
  const renderTexts = useCallback(() => {
    if (!parse || !isTypeof(children, 'string')) {
      return children;
    }

    const text = textExtraction(children, parse);

    return text.map((localProps, index) => {
      const { style, ...restText } = localProps;

      return (
        <Text key={`parsedText-${index + 1}`} style={style} {...restText} />
      );
    });
  }, [children, parse]);

  // render
  return <Text {...rest}>{renderTexts()}</Text>;
};
