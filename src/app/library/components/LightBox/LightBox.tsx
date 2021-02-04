import {imageTransitionHolder} from '@utils';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Block} from '../Block/Block';
import {TouchableScale} from '../TouchScale/TouchScale';
import {ImageTransition} from './ImageTransition';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  img: {
    flex: 1,
  },
});

interface LightBoxProps {
  source: Source | number;
}

export type Measure = {
  x: number;
  y: number;
  width: number;
  height: number;
  px: number;
  py: number;
  targetHeight: number;
  targetWidth: number;
  imageOpacity: Animated.SharedValue<number>;
};

const LightBoxComponent = ({source}: LightBoxProps) => {
  // state
  const _refRoot = useRef<View>(null);
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const {width: widthDevice} = useWindowDimensions();
  const [image, setImage] = useState<Measure | null>(null);
  const imageOpacity = useSharedValue(1);

  // function
  const _onImagePress = useCallback(() => {
    _refRoot.current?.measure((x, y, width, height, px, py) => {
      const targetWidth = widthDevice;
      const scaleFactor = width / height;
      const targetHeight = targetWidth * scaleFactor;
      imageTransitionHolder.current?.show({
        image: {
          x,
          y,
          width,
          height,
          px,
          py,
          targetWidth,
          targetHeight,
          imageOpacity,
        },
        source,
      });
    });
  }, [widthDevice, imageOpacity, source]);

  const _onLoadedImage = useCallback(() => {
    setDisableButton(false);
  }, []);

  //reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  useEffect(() => {
    // alert(JSON.stringify(image));
  }, [image]);

  // render
  return (
    <>
      <TouchableScale disabled={disableButton} onPress={_onImagePress}>
        <View collapsable={false} ref={_refRoot} style={[styles.container]}>
          <AnimatedFastImage
            onLoad={_onLoadedImage}
            style={[styles.img, imageStyle]}
            source={source}
            resizeMode={'contain'}
          />
        </View>
      </TouchableScale>
    </>
  );
};

export const LightBox = memo(LightBoxComponent, isEqual);
