import React, { memo, useCallback, useEffect, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle, Text, View } from 'react-native';

import isEqual from 'react-fast-compare';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedTiming, useSharedTransition } from '@animated';

import { styles } from './styles';
import { CollapsibleProps } from './type';

const CollapsibleComponent = ({
  renderContent,
  renderMasterView,
  children,
}: CollapsibleProps) => {
  // state
  const [measured, setMeasured] = useState<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const [isShow, setIsShow] = useState(false);

  // reanimated
  const progress = useSharedTransition(isShow);
  const height = useSharedValue(0);

  // function
  const _onPress = useCallback(() => {
    setIsShow(v => !v);
  }, []);

  const _onLayoutContent = useCallback((e: LayoutChangeEvent) => {
    setMeasured(e.nativeEvent.layout);
  }, []);

  // reanimated style
  const contentStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  // effect
  useEffect(() => {
    if (isShow) {
      height.value = sharedTiming(measured.height);
    } else {
      height.value = sharedTiming(0);
    }
  }, [height, isShow, measured.height]);

  // render
  return (
    <View>
      <Animated.View
        pointerEvents={'none'}
        onLayout={_onLayoutContent}
        style={[styles.base, styles.hiddenView]}>
        {renderContent ? renderContent(progress) : children}
      </Animated.View>
      <TouchableOpacity onPress={_onPress}>
        {renderMasterView ? (
          renderMasterView(progress)
        ) : (
          <View style={styles.header}>
            <Text>Toggle</Text>
          </View>
        )}
      </TouchableOpacity>

      <Animated.View style={[styles.base, contentStyle]}>
        {renderContent ? renderContent(progress) : children}
      </Animated.View>
    </View>
  );
};

export const Collapsible = memo(CollapsibleComponent, isEqual);
