import {useTheme} from '@theme';
import React, {memo, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {StatusBar, StyleSheet, useWindowDimensions} from 'react-native';
import Animated from 'react-native-reanimated';
import {
  Edge,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {Block} from '../block';

import {InsetComponentProps, ScreenProps} from './type';

const INSETS: Edge[] = ['top', 'bottom', 'left', 'right'];

const styles = StyleSheet.create({
  outer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  inner: {
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  },
});

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
    const {width: screenWidth, height: screenHeight} = useWindowDimensions();
    // render
    return (
      <>
        <StatusBar
          hidden={hiddenStatusBar}
          backgroundColor={'transparent'}
          translucent
          barStyle={statusBarStyle || 'dark-content'}
        />
        {!unsafe && edges.includes('top') && (
          <Block
            color={statusColor}
            position={'absolute'}
            top={0}
            height={inset.top}
            width={screenWidth}
          />
        )}
        {!unsafe && edges.includes('left') && (
          <Block
            color={leftInsetColor}
            position={'absolute'}
            left={0}
            height={screenHeight}
            width={inset.left}
          />
        )}
        {!unsafe && edges.includes('right') && (
          <Block
            color={rightInsetColor}
            position={'absolute'}
            right={0}
            height={screenHeight}
            width={inset.right}
          />
        )}
        {!unsafe && edges.includes('bottom') && (
          <Block
            color={bottomInsetColor}
            bottom={0}
            position={'absolute'}
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
  const {colors} = useTheme();
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

  const backgroundStyle = useMemo(
    () => (backgroundColor ? {backgroundColor} : {}),
    [backgroundColor],
  );

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
      <Wrapper
        edges={edges}
        style={[styles.inner, style, backgroundStyle]}
        children={children}
      />
    </>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  // state
  const {colors} = useTheme();
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

  const backgroundStyle = useMemo(
    () => (backgroundColor ? {backgroundColor} : {}),
    [backgroundColor],
  );

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
      <Wrapper edges={edges} style={[styles.inner]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          overScrollMode={'never'}
          style={[styles.outer, backgroundStyle]}
          contentContainerStyle={[style]}
          children={children}
        />
      </Wrapper>
    </>
  );
}

function ScreenComponent(props: ScreenProps) {
  const {scroll = false} = props;
  if (scroll) {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
}
export const Screen = memo(ScreenComponent, isEqual);
