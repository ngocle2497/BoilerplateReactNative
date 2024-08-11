/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomTextProps, MatchedPart, ParsedText, Pattern } from './type';

type Parsed = Array<Partial<MatchedPart & ParsedText>>;

export const textExtraction = (
  text: string,
  patterns: Array<ReOmit<Pattern, 'lastIndex'> & CustomTextProps>,
) => {
  let parsedTexts: Parsed = [{ children: text ?? '' }];
  patterns.forEach((pattern: any) => {
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
        const previousText = textLeft.substring(0, matches.index);

        indexOfMatchedString = matches.index;

        parts.push({ children: previousText });

        parts.push(
          getMatchedPart(pattern, matches[0], matches, indexOfMatchedString),
        );

        textLeft = textLeft.substring(matches.index + matches[0].length);

        indexOfMatchedString += matches[0].length - 1;

        pattern.pattern.lastIndex = 0;
      }

      parts.push({ children: textLeft });

      newParts.push(...parts);
    });

    parsedTexts = newParts;
  });

  parsedTexts.forEach(parsedText => delete parsedText._matched);

  return parsedTexts.filter(t => !!t.children);
};

// eslint-disable-next-line max-params
function getMatchedPart(
  pattern: Record<string, unknown>,
  text: string,
  _match: Array<string>,
  index: number,
): MatchedPart & { children: string } {
  const props: MatchedPart = {} as MatchedPart;

  Object.keys(pattern).forEach((key: string) => {
    if (key === 'pattern') {
      return;
    }

    if (key === 'onPress' || key === 'onLongPress') {
      // Support onPress / onLongPress functions
      props[key] = () => {
        (pattern as any)[key](text, index);
      };
    } else {
      // Set a prop with an arbitrary name to the value in the match-config
      (props as any)[key] = pattern[key];
    }
  });

  let customChildren = text;
  if (pattern.renderText && typeof pattern.renderText === 'function') {
    customChildren = pattern.renderText(text);
  }

  return {
    ...props,
    _matched: true,
    children: customChildren,
  };
}
