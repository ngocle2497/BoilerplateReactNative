import React, { memo, useCallback, useRef, useState } from 'react';
import { TouchableOpacity, useWindowDimensions, View } from 'react-native';

import isEqual from 'react-fast-compare';
import { OnLoadEvent, Source } from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { imageTransitionRef } from './image-transition';
import { styles } from './styles';

import { Image } from '../image';

interface LightBoxProps {
  source: Source | number;
}

const LightBoxComponent = ({ source }: LightBoxProps) => {
  // state
  const _refRoot = useRef<View>(null);

  const [disableButton, setDisableButton] = useState<boolean>(true);

  const [sizeImage, setSizeImage] = useState<{ width: number; height: number }>(
    {
      width: 0,
      height: 0,
    },
  );

  const { width: widthDevice } = useWindowDimensions();

  const imageOpacity = useSharedValue(1);

  // function
  const _onImagePress = useCallback(() => {
    // eslint-disable-next-line max-params
    _refRoot.current?.measure((x, y, width, height, px, py) => {
      const targetWidth = widthDevice;

      const scaleFactor = widthDevice / sizeImage.width;

      const targetHeight = sizeImage.height * scaleFactor;

      imageTransitionRef.current?.show({
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
  }, [widthDevice, imageOpacity, sizeImage, source]);

  const _onLoadedImage = useCallback((e: OnLoadEvent) => {
    setDisableButton(false);

    setSizeImage(e.nativeEvent);
  }, []);

  //reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    opacity: imageOpacity.value,
  }));

  // render
  return (
    <>
      <View ref={_refRoot} collapsable={false} style={[styles.container]}>
        <TouchableOpacity disabled={disableButton} onPress={_onImagePress}>
          <Animated.View style={imageStyle}>
            <Image
              onLoad={_onLoadedImage}
              style={[styles.img]}
              source={source}
              resizeMode={'cover'}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export const LightBox = memo(LightBoxComponent, isEqual);
