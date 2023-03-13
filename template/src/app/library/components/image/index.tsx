import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Blurhash } from 'react-native-blurhash';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import { useSharedTransition } from '@animated';
import { execFunc, onCheckType } from '@common';
import { useAsyncState, useMounted } from '@hooks';

import { styles } from './styles';
import { ImageProps } from './type';

const ImageComponent = ({
  style: styleOverride = {},
  source,
  blurHashOnLoad = 'L9AB*A%LPqys8_H=yDR5nMMeVXR5',
  resizeMode = 'cover',
  containerStyle,
  childrenError,
  onLoad,
  onLoadStart,
  onError,
  ...rest
}: ImageProps) => {
  // state

  const [error, setError] = useState<boolean>(false);

  const [loadImageEnded, setLoadImageEnded] = useState<boolean>(false);

  const opacityBlur = useSharedTransition(
    !loadImageEnded,
    { duration: 1000 },
    1,
  );

  // function
  const handleLoadStart = () => {
    setError(false);

    execFunc(onLoadStart);
  };

  const handleLoadImageEnd = () => {
    setLoadImageEnded(true);
  };

  const handleSucceeded = (event: OnLoadEvent) => {
    setTimeout(() => {
      setError(false);
    }, 200);

    execFunc(onLoad, event);
  };

  const handleLoadError = () => {
    setError(true);

    execFunc(onError);
  };

  // reanimated style
  const imageBlurStyle = useAnimatedStyle(() => ({
    opacity: opacityBlur.value,
    zIndex: 999,
  }));

  // render
  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={[StyleSheet.absoluteFillObject]}>
        <FastImage
          {...rest}
          onLoadStart={handleLoadStart}
          resizeMode={resizeMode}
          onError={handleLoadError}
          onLoad={handleSucceeded}
          onLoadEnd={handleLoadImageEnd}
          style={[styles.img, styleOverride]}
          source={
            onCheckType(source, 'string')
              ? { uri: source as string }
              : (source as number | Record<string, unknown>)
          }
        />
      </Animated.View>
      <Animated.View
        pointerEvents={'none'}
        style={[StyleSheet.absoluteFillObject, imageBlurStyle]}>
        <Blurhash
          blurhash={blurHashOnLoad ?? ''}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>
      {error && (
        <Animated.View style={[styles.viewError]}>
          {childrenError}
        </Animated.View>
      )}
    </View>
  );
};

export const Image = (props: ImageProps) => {
  const [isChange, setIsChange] = useAsyncState<boolean>(false);

  useMounted(() => {
    setIsChange(true, () => {
      setIsChange(false);
    });
  }, [props.source]);

  return isChange ? null : <ImageComponent {...props} />;
};
