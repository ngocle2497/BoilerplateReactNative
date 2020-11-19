import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleProp, StyleSheet } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { ImageRemoteProps } from './ImageRemote.props';
import { enhance } from '@common';
import equals from 'react-fast-compare';
import { Block } from '../Block/Block';
import Animated, { set, useCode, useValue } from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur'
import { mix, timing, useTimingTransition } from '@animated';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
  },
  viewError: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#bbb'
  },
  viewOnLoad: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#bbb'
  }
})
const ImageRemoteComponent = (props: ImageRemoteProps) => {
  const {
    style: styleOverride = {},
    source,
    sourceThumb = source,
    resizeMode = 'cover',
    containerStyle,
    childrenError,
    childrenOnload,
    ...rest
  } = props;


  const [loadSucceeded, setLoadSucceeded] = useState<boolean>(false)
  const [loadThumbSucceeded, setLoadThumbSucceeded] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const opacityImg = useValue(0)
  const opacityBlur = mix(opacityImg, 1, 0)
  const opacityOnLoad = useTimingTransition(!loadThumbSucceeded)

  const _onLoadImageStart = useCallback(() => {
    setError(false)
  }, [])

  const _onLoadThumbSucceeded = useCallback(() => {
    setLoadThumbSucceeded(true)
  }, [])

  const _onLoadImageSucceeded = useCallback(() => {
    setError(false)
    setLoadSucceeded(true)
  }, [])

  const _onLoadError = useCallback(() => {
    setError(true)
  }, [])

  const container = useMemo(
    () => enhance([styles.container, containerStyle]),
    [containerStyle],
  );
  const imgStyle = useMemo<StyleProp<ImageStyle>>(
    () => enhance([styles.img, styleOverride]),
    [styleOverride],
  );
  useCode(() => loadSucceeded && [
    set(opacityImg, timing({ from: opacityImg, to: 1 }))
  ], [loadSucceeded])

  return (
    <Block style={container}>
      <Animated.View style={[styles.viewOnLoad, { opacity: opacityOnLoad }]}>
        {childrenOnload}
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: opacityBlur }]}>
        <Animated.View style={[StyleSheet.absoluteFillObject]}>
          <FastImage resizeMode={resizeMode} onLoad={_onLoadThumbSucceeded} style={[imgStyle]} source={{ uri: sourceThumb }} {...rest} />
        </Animated.View>
        <BlurView blurType={'light'} style={[StyleSheet.absoluteFillObject]} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFillObject, { opacity: opacityImg }]}>
        <FastImage onLoadStart={_onLoadImageStart} resizeMode={resizeMode} onError={_onLoadError} onLoad={_onLoadImageSucceeded} style={[imgStyle]} source={{ uri: source }} {...rest} />
      </Animated.View>
      {error && <Animated.View style={[styles.viewError]}>
        {childrenError}
      </Animated.View>}
    </Block>
  );
};
export const ImageRemote = memo(ImageRemoteComponent, equals);
