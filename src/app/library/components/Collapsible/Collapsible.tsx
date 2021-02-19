import {sharedTiming, useInterpolate, useSharedTransition} from '@animated';
import React, {memo, useCallback, useEffect, useState} from 'react';
import isEqual from 'react-fast-compare';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {CollapsibleProps} from './Collapsible.props';

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
  hiddenView: {
    position: 'absolute',
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
  const _contentRef = useAnimatedRef<Animated.View>();
  const [isShow, setIsShow] = useState(false);

  // reanimated
  const progress = useSharedTransition(isShow);
  const height = useSharedValue(0);

  // function
  const _onPress = useCallback(() => {
    setIsShow((v) => !v);
  }, []);

  // reanimated style
  const contentStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  // effect
  useEffect(() => {
    if (isShow) {
      console.log('show');
      runOnUI(() => {
        'worklet';
        try {
          const measured = measure(_contentRef);
          console.log(measured);
          height.value = sharedTiming(measured.height);
        } catch (e) {
          console.log(e);
        }
      })();
    } else {
      height.value = sharedTiming(0);
    }
  }, [_contentRef, height, isShow]);

  return (
    <View>
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
      <Animated.View ref={_contentRef} style={[styles.base, styles.hiddenView]}>
        {renderContent ? renderContent(progress) : children}
      </Animated.View>
    </View>
  );
};

export const Collapsible = memo(CollapsibleComponent, isEqual);
