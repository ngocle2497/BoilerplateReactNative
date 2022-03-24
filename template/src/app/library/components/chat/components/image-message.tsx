import React, { memo } from 'react';

import isEqual from 'react-fast-compare';

import { Block } from '../../block';
import { LightBox } from '../../light-box';
import { ImageMessageProps } from '../type';

const ImageMessageComponent = ({ sourceImage = '' }: ImageMessageProps) => {
  // render
  return (
    <Block width={150} height={180}>
      <LightBox source={{ uri: sourceImage }} />
    </Block>
  );
};

export const ImageMessage = memo(ImageMessageComponent, isEqual);
