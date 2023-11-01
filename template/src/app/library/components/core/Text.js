import React from 'react';

import NativeText from 'react-native/Libraries/Text/TextNativeComponent';

const Text = forwardRef((props, ref) => {
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

Text.displayName = 'Text';

export { Text };
