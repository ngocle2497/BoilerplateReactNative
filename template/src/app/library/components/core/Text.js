import React, { forwardRef } from 'react';

import { NativeText } from 'react-native/Libraries/Text/TextNativeComponent';

export const Text = forwardRef((props, ref) => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <NativeText
      allowFontScaling={false}
      ellipsizeMode="tail"
      {...props}
      ref={ref}
    />
  );
});
