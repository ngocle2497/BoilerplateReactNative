import React, { useMemo } from 'react';
import { useWindowDimensions, View, ViewProps, ViewStyle } from 'react-native';

import Animated from 'react-native-reanimated';
import {
  Edge,
  SafeAreaView,
  SafeAreaViewProps,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { useTheme } from '@theme';

import { styles } from './styles';
import {
  InsetComponentProps,
  InsetProps,
  ScreenComponentProps,
  ScreenProps,
} from './type';

import { FocusAwareStatusBar } from '../focus-aware-status-bar';

const INSETS: Edge[] = ['top', 'bottom', 'left', 'right'];

const getEdges = (
  excludeEdges: ScreenProps['excludeEdges'],
  hiddenStatusBar: boolean,
) => {
  if (excludeEdges === 'all') {
    return [];
  }

  const actualEdges = INSETS.filter(x => !(excludeEdges ?? []).includes(x));

  if (hiddenStatusBar) {
    return actualEdges.filter(x => x !== 'top');
  }

  return actualEdges;
};

const Inset = ({
  color,
  height,
  width,
  bottom,
  left,
  right,
  top,
}: InsetProps) => {
  // state
  const style = useMemo<ViewStyle>(
    () => ({
      backgroundColor: color,
      width,
      height,
      top,
      left,
      bottom,
      right,
    }),
    [bottom, color, height, left, right, top, width],
  );

  // render
  return <View style={[styles.insets, style]} />;
};

const InsetComponent = ({
  edges,
  bottomInsetColor,
  hiddenStatusBar,
  leftInsetColor,
  rightInsetColor,
  statusColor,
  unsafe,
  statusBarStyle,
}: InsetComponentProps) => {
  // state
  const inset = useSafeAreaInsets();

  const { width: screenWidth, height: screenHeight } = useWindowDimensions();

  // render
  return (
    <>
      <FocusAwareStatusBar
        hidden={hiddenStatusBar}
        backgroundColor={'transparent'}
        translucent
        barStyle={statusBarStyle || 'light-content'}
      />
      {!unsafe && edges.includes('top') && (
        <Inset
          color={statusColor}
          top={0}
          height={inset.top}
          width={screenWidth}
        />
      )}
      {!unsafe && edges.includes('left') && (
        <Inset
          color={leftInsetColor}
          left={0}
          height={screenHeight}
          width={inset.left}
        />
      )}
      {!unsafe && edges.includes('right') && (
        <Inset
          color={rightInsetColor}
          right={0}
          height={screenHeight}
          width={inset.right}
        />
      )}
      {!unsafe && edges.includes('bottom') && (
        <Inset
          color={bottomInsetColor}
          bottom={0}
          height={inset.bottom}
          width={screenWidth}
        />
      )}
    </>
  );
};

function ScreenWithoutScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps,
) {
  // state
  const { colors } = useTheme();

  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.background,
    style = {},
    rightInsetColor = colors.background,
    leftInsetColor = colors.background,
  } = props;

  // render
  return (
    <>
      <Wrapper
        edges={edges}
        style={[
          styles.inner,
          style,
          backgroundColor ? { backgroundColor } : {},
        ]}>
        <View style={[styles.flex]} children={children} />
      </Wrapper>
      <InsetComponent
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
    </>
  );
}

function ScreenWithScrolling(
  Wrapper: React.ComponentType<ViewProps | SafeAreaViewProps>,
  props: ScreenComponentProps,
) {
  // state
  const { colors } = useTheme();

  const {
    statusBarStyle,
    backgroundColor,
    actualUnsafe,
    children,
    onScroll,
    edges,
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.background,
    style = {},
    leftInsetColor = colors.background,
    rightInsetColor = colors.background,
  } = props;

  // render
  return (
    <>
      <Wrapper edges={edges} style={[styles.outer]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          overScrollMode={'never'}
          style={[styles.inner, backgroundColor ? { backgroundColor } : {}]}
          contentContainerStyle={[style]}
          children={children}
        />
      </Wrapper>
      <InsetComponent
        edges={edges}
        bottomInsetColor={bottomInsetColor}
        statusColor={statusColor}
        statusBarStyle={statusBarStyle}
        hiddenStatusBar={hiddenStatusBar}
        leftInsetColor={leftInsetColor}
        rightInsetColor={rightInsetColor}
        unsafe={actualUnsafe}
      />
    </>
  );
}

export const Screen = (props: ScreenProps) => {
  // state
  const edges = useMemo<Edge[]>(
    () => getEdges(props.excludeEdges, props?.hiddenStatusBar ?? false),
    [props.excludeEdges, props.hiddenStatusBar],
  );

  const actualUnsafe = useMemo<boolean>(
    () => props.unsafe || edges.length <= 0,
    [edges.length, props.unsafe],
  );

  const Wrapper = useMemo(
    () => (actualUnsafe ? View : SafeAreaView),
    [actualUnsafe],
  );

  // render
  if (props.scroll) {
    return ScreenWithScrolling(Wrapper, { ...props, actualUnsafe, edges });
  } else {
    return ScreenWithoutScrolling(Wrapper, { ...props, actualUnsafe, edges });
  }
};
