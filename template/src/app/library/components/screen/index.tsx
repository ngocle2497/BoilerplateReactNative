import React, { memo, useMemo } from 'react';
import { StatusBar, useWindowDimensions, View, ViewStyle } from 'react-native';

import isEqual from 'react-fast-compare';
import Animated from 'react-native-reanimated';
import {
  Edge,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Block } from '@components';
import { useTheme } from '@theme';

import { styles } from './styles';
import { InsetComponentProps, InsetProps, ScreenProps } from './type';

const INSETS: Edge[] = ['top', 'bottom', 'left', 'right'];

const Inset = memo(
  ({ color, height, width, bottom, left, right, top }: InsetProps) => {
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
  },
  isEqual,
);

const InsetComponent = memo(
  ({
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
        <StatusBar
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
  },
  isEqual,
);

function ScreenWithoutScrolling(props: ScreenProps) {
  // state
  const { colors } = useTheme();
  const {
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.background,
    style = {},
    rightInsetColor = colors.background,
    leftInsetColor = colors.background,
    statusBarStyle,
    backgroundColor,
    excludeEdges,
    unsafe = false,
    children,
  } = props;

  const edges = useMemo<Edge[]>(() => {
    if (excludeEdges === 'all') {
      return [];
    }
    const actualEdges = INSETS.filter(x => !(excludeEdges ?? []).includes(x));
    if (hiddenStatusBar) {
      return actualEdges.filter(x => x !== 'top');
    }
    return actualEdges;
  }, [excludeEdges, hiddenStatusBar]);

  const actualUnsafe = useMemo<boolean>(
    () => unsafe || edges.length <= 0,
    [edges.length, unsafe],
  );

  const Wrapper = useMemo(
    () => (actualUnsafe ? Block : SafeAreaView),
    [actualUnsafe],
  );

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

function ScreenWithScrolling(props: ScreenProps) {
  // state
  const { colors } = useTheme();
  const {
    hiddenStatusBar = false,
    statusColor = undefined,
    bottomInsetColor = colors.background,
    style = {},
    leftInsetColor = colors.background,
    rightInsetColor = colors.background,
    statusBarStyle,
    backgroundColor,
    excludeEdges,
    unsafe = false,
    children,
    onScroll,
  } = props;
  const edges = useMemo<Edge[]>(() => {
    if (excludeEdges === 'all') {
      return [];
    }
    const actualEdges = INSETS.filter(x => !(excludeEdges ?? []).includes(x));
    if (hiddenStatusBar) {
      return actualEdges.filter(x => x !== 'top');
    }
    return actualEdges;
  }, [excludeEdges, hiddenStatusBar]);

  const actualUnsafe = useMemo<boolean>(
    () => unsafe || edges.length <= 0,
    [edges.length, unsafe],
  );

  const Wrapper = useMemo(
    () => (actualUnsafe ? Block : SafeAreaView),
    [actualUnsafe],
  );

  // render
  return (
    <>
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
    </>
  );
}

function ScreenComponent(props: ScreenProps) {
  const { scroll = false } = props;
  if (scroll) {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
}
export const Screen = memo(ScreenComponent, isEqual);
