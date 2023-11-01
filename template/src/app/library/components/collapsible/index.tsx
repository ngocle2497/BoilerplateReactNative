import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { sharedTiming, useSharedTransition } from '@animated';
import { AnimatedView, Text, View } from '@rn-core';

import { styles } from './styles';
import { CollapsibleProps } from './type';

export const Collapsible = ({
  children,
  renderContent,
  renderMasterView,
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
  const onPress = () => {
    setIsShow(v => !v);
  };

  const onLayoutContent = (e: LayoutChangeEvent) => {
    setMeasured(e.nativeEvent.layout);
  };

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
      <AnimatedView
        pointerEvents={'none'}
        onLayout={onLayoutContent}
        style={[styles.base, styles.hiddenView]}>
        {renderContent ? renderContent(progress) : children}
      </AnimatedView>
      <TouchableOpacity onPress={onPress}>
        {renderMasterView ? (
          renderMasterView(progress)
        ) : (
          <View style={styles.header}>
            <Text>Toggle</Text>
          </View>
        )}
      </TouchableOpacity>

      <AnimatedView style={[styles.base, contentStyle]}>
        {renderContent ? renderContent(progress) : children}
      </AnimatedView>
    </View>
  );
};
