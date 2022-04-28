import React, { memo, useMemo, useState } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import isEqual from 'react-fast-compare';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMix, useRadian, useSharedSpringTransition } from '@animated';
import { onCheckType } from '@common';

import { ButtonGroup } from './button-group';
import { SIZE_FAB, SPACE_BETWEEN } from './constants';
import { styles } from './styles';
import { Actions, FABGroupProps } from './type';

import { Icon } from '../../../icon';
import { Text } from '../../../text';

const FABGroupComponent = (props: FABGroupProps) => {
  const { style, icon = 'plus', label, actions = [] } = props;
  // state
  const window = useWindowDimensions();
  const [isShow, setIsShow] = useState(false);
  const progress = useSharedSpringTransition(isShow);
  const rotateIcon = useRadian(useMix(progress, 0, 45));
  const inset = useSafeAreaInsets();

  // function
  const _onToggle = () => {
    setIsShow(v => !v);
  };

  const _onHide = () => {
    setIsShow(false);
  };

  const onStartShouldSetResponder = () => true;

  const onPressItem = (onPressAction?: () => void) => {
    setIsShow(false);
    if (onCheckType(onPressAction, 'function')) {
      onPressAction();
    }
  };

  // style
  const styleBase = useMemo<StyleProp<ViewStyle>>(
    () => [
      { right: inset.right + 15, height: SIZE_FAB, bottom: inset.bottom + 5 },
    ],
    [inset],
  );

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotateIcon.value }],
  }));

  // render
  return (
    <>
      <TouchableOpacity
        onPress={_onToggle}
        activeOpacity={0.8}
        style={[styles.wrap, styleBase, style]}>
        <Animated.View style={iconAnimatedStyle}>
          <Icon icon={icon} />
        </Animated.View>
        {React.isValidElement(label)
          ? label
          : label && <Text style={[styles.label]} text={label as string} />}
      </TouchableOpacity>
      {isShow === true && (
        <View
          onStartShouldSetResponder={onStartShouldSetResponder}
          onResponderRelease={_onHide}
          style={[
            styles.background,
            { width: window.width, height: window.height },
          ]}
        />
      )}
      <View
        onStartShouldSetResponder={onStartShouldSetResponder}
        style={[
          styles.wrapAction,
          {
            right: inset.right + 25,
            bottom: inset.bottom + SIZE_FAB + SPACE_BETWEEN / 2,
          },
        ]}>
        {actions.map((item: Actions, index: number) => (
          <ButtonGroup
            key={index}
            index={index}
            icon={item.icon}
            label={item.label}
            onPressItem={item.onPress}
            progress={progress}
            onPress={onPressItem}
          />
        ))}
      </View>
    </>
  );
};
export const FABGroup = memo(FABGroupComponent, isEqual);
