import React, {memo} from 'react';
import isEqual from 'react-fast-compare';
import {Block} from '@library/components/Block/Block';

import {ImageMessageProps} from '../Chat.props';
import {LightBox} from '../../LightBox/LightBox';

const ImageMessageComponent = ({sourceImage = ''}: ImageMessageProps) => {
  // render
  return (
    <Block width={150} height={180}>
      <LightBox source={{uri: sourceImage}} />
    </Block>
  );
};

export const ImageMessage = memo(ImageMessageComponent, isEqual);
