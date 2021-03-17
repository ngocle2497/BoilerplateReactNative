import {sharedTiming, useSharedTransition} from '@animated';
import React, {memo, useCallback, useState} from 'react';
import isEqual from 'react-fast-compare';
import {
  View,
  Text,
  StyleSheet,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import {CollapsibleProps} from './Collapsible.props';

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  hiddenView: {
    position: 'absolute',
    zIndex: -999,
    opacity: 0,
  },
  header: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
  const height = useDerivedValue(() =>
    sharedTiming(isShow ? measured.height : 0),
  );

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
