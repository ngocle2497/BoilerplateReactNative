/* eslint-disable react-hooks/exhaustive-deps */
import {useSharedTransition} from '@animated';
import {enhance, useAsyncState, useIsMounted, useMounted} from '@common';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import equals from 'react-fast-compare';
import {StyleProp, StyleSheet, View} from 'react-native';
import {Blurhash} from 'react-native-blurhash';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

import {ImageRemoteProps} from './type';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  viewError: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#bbb',
  },
  viewOnLoad: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#bbb',
  },
});

const ImageRemoteComponent = (props: ImageRemoteProps) => {
  // state
  const {
    style: styleOverride = {},
    source,
    blurHashOnLoad = 'LGFFaXYk^6#M@-5c,1J5@[or[Q6.',
    resizeMode = 'cover',
    containerStyle,
    childrenError,
    childrenOnload,
    ...rest
  } = props;
  const isMounted = useIsMounted();
  const [thumbBlurHash, setThumbBlurHash] = useState<string | undefined>(
    undefined,
  );
  const [loadSucceeded, setLoadSucceeded] = useState<boolean>(false);
  const [loadThumbSucceeded, setLoadThumbSucceeded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const opacityImg = useSharedTransition(loadSucceeded);
  const opacityBlur = useSharedTransition(loadThumbSucceeded);
  const opacityOnLoad = useSharedTransition(!loadThumbSucceeded);

  // function
  const _onLoadImageStart = useCallback(() => {
    setError(false);
  }, []);

  const _onLoadThumbSucceeded = useCallback(() => {
    setLoadThumbSucceeded(true);
  }, []);

  const _onLoadImageSucceeded = useCallback(() => {
    setError(false);
    setLoadSucceeded(true);
  }, []);

  const _onLoadError = useCallback(() => {
    setError(true);
  }, []);

  // style
  const container = useMemo(
    () => enhance([styles.container, containerStyle]),
    [containerStyle],
  );
  const imgStyle = useMemo<StyleProp<ImageStyle>>(
    () => enhance([styles.img, styleOverride as ImageStyle]),
    [styleOverride],
  );

  // reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    opacity: opacityImg.value,
  }));

  const imageOnloadStyle = useAnimatedStyle(() => ({
    opacity: opacityOnLoad.value,
  }));
  const imageBlurStyle = useAnimatedStyle(() => ({
    opacity: opacityBlur.value,
  }));

  // effect
  useEffect(() => {
    Blurhash.encode(source, 4, 3).then(res => {
      if (isMounted.current) {
        setThumbBlurHash(res);
      }
    });
  }, []);

  // render
  return (
    <View style={[container]}>
      <Animated.View style={[styles.viewOnLoad, imageOnloadStyle]}>
        {childrenOnload || (
          <Blurhash
            blurhash={blurHashOnLoad}
            style={[StyleSheet.absoluteFillObject]}
          />
        )}
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, imageBlurStyle]}>
        <Animated.View style={[StyleSheet.absoluteFillObject]}>
          {thumbBlurHash !== undefined && (
            <Blurhash
              onLoadEnd={_onLoadThumbSucceeded}
              blurhash={thumbBlurHash ?? ''}
              style={[StyleSheet.absoluteFillObject]}
            />
          )}
        </Animated.View>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, imageStyle]}>
        <FastImage
          onLoadStart={_onLoadImageStart}
          resizeMode={resizeMode}
          onError={_onLoadError}
          onLoad={_onLoadImageSucceeded}
          style={[imgStyle]}
          source={{uri: source}}
          {...rest}
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
export const ImageRemote = memo((props: ImageRemoteProps) => {
  const [isChange, setIsChange] = useAsyncState<boolean>(false);

  useMounted(() => {
    setIsChange(true, () => {
      setIsChange(false);
    });
  }, [props.source]);

  return isChange ? null : <ImageRemoteComponent {...props} />;
}, equals);
