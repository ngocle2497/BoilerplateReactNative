import {useMix, useRadian, useSharedSpringTransition} from '@animated';
import {enhance, onCheckType} from '@common';
import {Text} from '@library/components/text';
import React, {memo, useCallback, useMemo, useState} from 'react';
import isEqual from 'react-fast-compare';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Icon} from '../../../icon';

import {ButtonGroup, SPACE_BETWEEN} from './button-group';
import {Actions, FABGroupProps} from './type';

export const SIZE_FAB = 60;
const styles = StyleSheet.create({
  wrap: {
    minWidth: SIZE_FAB,
    height: SIZE_FAB,
    borderRadius: SIZE_FAB / 2,
    backgroundColor: '#fe00f6',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    zIndex: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 'normal',
    fontFamily: undefined,
    paddingLeft: 5,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  wrapAction: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
const FABGroupComponent = (props: FABGroupProps) => {
  const {style, icon = 'plus', label, actions = []} = props;
  // state
  const window = useWindowDimensions();
  const [isShow, setIsShow] = useState(false);
  const progress = useSharedSpringTransition(isShow);
  const rotateIcon = useRadian(useMix(progress, 0, 45));
  const inset = useSafeAreaInsets();

  // function
  const _onToggle = useCallback(() => {
    setIsShow(v => !v);
  }, []);

  const _onHide = useCallback(() => {
    setIsShow(false);
  }, []);

  const onStartShouldSetResponder = useCallback(() => true, []);

  const onPressItem = useCallback((onPressAction?: () => void) => {
    setIsShow(false);
    if (onCheckType(onPressAction, 'function')) {
      onPressAction();
    }
  }, []);

  // style
  const styleBase = useMemo(
    () =>
      enhance([
        styles.wrap,
        {right: inset.right + 15, height: SIZE_FAB, bottom: inset.bottom + 5},
        style ?? {},
      ]),
    [inset, style],
  );

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: rotateIcon.value}],
  }));

  // render
  return (
    <>
      <TouchableOpacity
        onPress={_onToggle}
        activeOpacity={0.8}
        style={[styleBase]}>
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
            {width: window.width, height: window.height},
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
