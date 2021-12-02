import {CustomOmit} from '../../../common/type/index';

import {MatchedPart, ParsedText, Pattern, CustomTextProps} from './type';

export const PATTERNS = {
  // eslint-disable-next-line max-len
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._+~#=]{1,256}\.(xn--)?[a-z0-9-]{2,20}\b([-a-zA-Z0-9@:%_+[\],.~#?&/=]*[-a-zA-Z0-9@:%_+\]~#?&/=])*/i,
  phone: /[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}/,
  email: /\S+@\S+\.\S+/,
};
type Parsed = Array<Partial<MatchedPart & ParsedText>>;
export const textExtraction = (
  text: string,
  patterns: Array<CustomOmit<Pattern, 'lastIndex'> & CustomTextProps>,
) => {
  let parsedTexts: Parsed = [{children: text ?? ''}];
  patterns.forEach(pattern => {
    const newParts: Parsed = [];
    parsedTexts.forEach(parsedText => {
      if (parsedText._matched) {
        newParts.push(parsedText);
        return;
      }
      const parts: Parsed = [];
      let textLeft = parsedText.children as string;
      let indexOfMatchedString = 0;
      let matches;
      pattern.pattern.lastIndex = 0;
      while (textLeft && (matches = pattern.pattern.exec(textLeft))) {
        const previousText = textLeft.substr(0, matches.index);
        indexOfMatchedString = matches.index;
        parts.push({children: previousText});
        parts.push(
          getMatchedPart(pattern, matches[0], matches, indexOfMatchedString),
        );
        textLeft = textLeft.substr(matches.index + matches[0].length);
        indexOfMatchedString += matches[0].length - 1;
        pattern.pattern.lastIndex = 0;
      }
      parts.push({children: textLeft});
      newParts.push(...parts);
    });
    parsedTexts = newParts;
  });
  parsedTexts.forEach(parsedText => delete parsedText._matched);

  return parsedTexts.filter(t => !!t.children);
};
function getMatchedPart(
  pattern: Pattern & CustomTextProps,
  text: string,
  matches: RegExpExecArray,
  index: number,
): MatchedPart & {children: string} {
  const props: MatchedPart = {} as MatchedPart;
  Object.keys(pattern).forEach(key => {
    if (key === 'pattern') {
      return;
    }

    if (key === 'onPress' || key === 'onLongPress') {
      // Support onPress / onLongPress functions
      props[key] = () => {
        pattern[key](text, index);
      };
    } else {
      // Set a prop with an arbitrary name to the value in the match-config
      props[key] = pattern[key];
    }
  });
  return {
    ...props,
    children: text,
    _matched: true,
  };
}
