import React, {memo, useMemo} from 'react';
import {View} from 'react-native';
import {styles} from './style';
import {TabBarItemProps} from '../../type';
import equals from 'react-fast-compare';
import {
  useValues,
  withTransition,
  interpolateColor,
  onGestureEvent,
} from 'react-native-redash';
import {DEFAULT_ITEM_INNER_SPACE, DEFAULT_ITEM_OUTER_SPACE} from '../constant';
import Animated, {
  add,
  cond,
  eq,
  interpolate,
  useCode,
  set,
} from 'react-native-reanimated';
import {
  State,
  createNativeWrapper,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const AnimatedRawButton = createNativeWrapper(
  Animated.createAnimatedComponent(TouchableWithoutFeedback),
  {
    shouldActivateOnStart: false,
    shouldCancelWhenOutside: true,
  },
);

const gestureHandler = (state: Animated.Value<State>) =>
  onGestureEvent({state});

const BubbleTabBarItemComponent = (props: TabBarItemProps) => {
  // props
  const {
    index,
    selectedIndex,
    label,
    icon,
    background,
    labelStyle: labelStyleOverride,
    duration,
    easing,
    itemInnerSpace,
    itemOuterSpace,
    iconSize,
  } = props;
  const {
    itemInnerHorizontalSpace,
    itemInnerVerticalSpace,
    itemOuterHorizontalSpace,
    itemOuterVerticalSpace,
  } = useMemo(() => {
    let _itemInnerVerticalSpace,
      _itemInnerHorizontalSpace,
      _itemOuterVerticalSpace,
      _itemOuterHorizontalSpace = 0;
    if (typeof itemInnerSpace === 'number') {
      _itemInnerHorizontalSpace = itemInnerSpace;
      _itemInnerVerticalSpace = itemInnerSpace;
    } else {
      _itemInnerVerticalSpace =
        itemInnerSpace?.vertical || DEFAULT_ITEM_INNER_SPACE;
      _itemInnerHorizontalSpace =
        itemInnerSpace?.horizontal || DEFAULT_ITEM_INNER_SPACE;
    }

    if (typeof itemOuterSpace === 'number') {
      _itemOuterHorizontalSpace = itemOuterSpace;
      _itemOuterVerticalSpace = itemOuterSpace;
    } else {
      _itemOuterVerticalSpace =
        itemOuterSpace?.vertical || DEFAULT_ITEM_OUTER_SPACE;
      _itemOuterHorizontalSpace =
        itemOuterSpace?.horizontal || DEFAULT_ITEM_OUTER_SPACE;
    }
    return {
      itemInnerVerticalSpace: _itemInnerVerticalSpace,
      itemInnerHorizontalSpace: _itemInnerHorizontalSpace,
      itemOuterVerticalSpace: _itemOuterVerticalSpace,
      itemOuterHorizontalSpace: _itemOuterHorizontalSpace,
    };
  }, [itemInnerSpace, itemOuterSpace]);

  const [labelWidth] = useValues([0], []);
  const [state] = useValues([State.UNDETERMINED], [index]);
  const minWidth = useMemo(() => {
    return itemInnerVerticalSpace * 2 + iconSize + itemInnerHorizontalSpace * 2;
  }, [itemInnerHorizontalSpace, itemOuterHorizontalSpace, iconSize]);
  const maxWidth = add(labelWidth, itemInnerHorizontalSpace, minWidth);
  const animatedFocused = withTransition(cond(eq(selectedIndex, index), 1, 0), {
    duration,
    easing,
  });
  const animatedIconFocused = interpolateColor(animatedFocused, {
    inputRange: [0, 1],
    outputRange: [icon.inactiveColor, icon.activeColor],
  });
  const colorTintIcon = cond(
    eq(selectedIndex, index),
    icon.activeColor,
    icon.inactiveColor,
  );

  // style
  const containerStyle = [
    styles.container,
    {
      paddingHorizontal: itemOuterHorizontalSpace,
      paddingVertical: itemOuterVerticalSpace,
      width: interpolate(animatedFocused, {
        inputRange: [0, 1],
        outputRange: [minWidth, maxWidth],
      }),
    },
  ];
  const contentContainerStyle = [
    styles.contentContainer,
    {
      flexDirection: 'row',
      paddingHorizontal: itemInnerHorizontalSpace,
      paddingVertical: itemInnerHorizontalSpace,
      borderRadius: itemInnerVerticalSpace * 2 + iconSize,
      backgroundColor: interpolateColor(
        animatedFocused,
        {
          inputRange: [0, 1],
          outputRange: [background.inactiveColor, background.activeColor],
        },
        'rgb',
      ),
    },
  ];
  const labelContainerStyle = [
    styles.labelContainer,
    {
      opacity: interpolate(animatedFocused, {
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      right: interpolate(animatedFocused, {
        inputRange: [0, 1],
        outputRange: [0, itemInnerHorizontalSpace + itemOuterHorizontalSpace],
      }),
    },
  ];
  const iconContainerStyle = [
    styles.iconContainer,
    {
      minWidth: iconSize,
      minHeight: iconSize,
    },
  ];
  const labelStyle = [styles.label, labelStyleOverride];

  // function
  const handleTextLayout = ({
    nativeEvent: {
      layout: {width},
    },
  }) => requestAnimationFrame(() => labelWidth.setValue(width));
  const renderIcon = () => {
    return typeof icon.component === 'function'
      ? icon.component({
          color: animatedIconFocused,
          size: iconSize,
          colorTintIcon: colorTintIcon,
        })
      : icon.component;
  };
  useCode(
    () =>
      cond(eq(state, State.END), [
        set(selectedIndex, index),
        set(state, State.UNDETERMINED),
      ]),
    [selectedIndex, state, index],
  );
  return (
    <AnimatedRawButton {...gestureHandler(state)}>
      <Animated.View style={containerStyle}>
        <Animated.View style={contentContainerStyle}>
          <View style={iconContainerStyle}>{renderIcon()}</View>
        </Animated.View>
        <Animated.View style={labelContainerStyle}>
          <Animated.Text
            onLayout={handleTextLayout}
            style={labelStyle}
            numberOfLines={1}>
            {label}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </AnimatedRawButton>
  );
};
const BubbleTabBarItem = memo(
  BubbleTabBarItemComponent,
  (prevProps, nextProps) => equals(prevProps, nextProps),
);
export default BubbleTabBarItem;
