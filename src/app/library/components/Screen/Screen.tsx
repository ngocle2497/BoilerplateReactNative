import React, { memo, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { ScreenProps } from './Screen.props';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Block } from '../Block/Block';
import equals from 'react-fast-compare';
import { enhance } from '@common';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  outer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  insetBottom: {
    bottom: 0
  },
  insetLeft: {
    left: 0
  },
  insetTop: {
    top: 0
  },
  insetRight: {
    right: 0
  },
  inner: {
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  }
})

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const inset = useSafeAreaInsets()
  const style = props.style || {};
  const {
    hidden = false,
    statusColor = undefined,
    draw = false,
    bottomInsetColor = '#ffffff',
    forceInset,
    unsafe,
    children,
    statusBar,
    backgroundColor,
    leftInsetColor = '#ffffff',
    rightInsetColor = '#ffffff',
  } = props;

  const backgroundStyle = useMemo(() => backgroundColor
    ? { backgroundColor }
    : {}, [backgroundColor]);

  const Wrapper = unsafe ? Block : SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[styles.outer]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={statusBar || 'dark-content'}
      />
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('top'))) && isIos && (
        <Block color={statusColor} position={'absolute'} height={inset.top} width={'100%'} />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('left'))) && isIos && (
        <Block color={leftInsetColor} position={'absolute'} style={[styles.insetLeft]} width={inset.left} height={'100%'} />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('right'))) && isIos && (
        <Block color={rightInsetColor} position={'absolute'} style={[styles.insetRight]} width={inset.right} height={'100%'} />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('bottom'))) && isIos && (
        <Block color={bottomInsetColor} style={[styles.insetBottom]} position={'absolute'} height={inset.bottom} width={'100%'} />
      )}
      <Wrapper
        edges={forceInset ?? undefined}
        style={[styles.inner, style, backgroundStyle]}>
        {children}
      </Wrapper>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const inset = useSafeAreaInsets()
  const {
    showHorizontal = false,
    showVertical = false,
    hidden = false,
    statusColor = undefined,
    statusBar,
    draw = false,
    bottomInsetColor = '#ffffff',
    backgroundColor,
    style = {},
    forceInset,
    unsafe = false,
    children,
    leftInsetColor = '#ffffff',
    rightInsetColor = '#ffffff',
  } = props;

  const backgroundStyle = useMemo(() => backgroundColor
    ? { backgroundColor }
    : {}, [backgroundColor]);

  const actualStyle = useMemo(() => enhance([styles.inner, style]), [
    style,
  ]);

  const Wrapper = unsafe ? Block : SafeAreaView;
  return (
    <KeyboardAvoidingView
      style={[styles.root]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={statusBar || 'dark-content'}
      />
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('top'))) && isIos && (
        <Block color={statusColor} position={'absolute'} height={inset.top} width={'100%'} />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('left'))) && isIos && (
        <Block color={leftInsetColor} position={'absolute'} style={[styles.insetLeft]} width={inset.left} height={'100%'} />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('right'))) && isIos && (
        <Block color={rightInsetColor} position={'absolute'} style={[styles.insetRight]} width={inset.right} height={'100%'} />
      )}
      {!unsafe && (!forceInset || (forceInset && forceInset.includes('bottom'))) && isIos && (
        <Block color={bottomInsetColor} style={[styles.insetBottom]} position={'absolute'} height={inset.bottom} width={'100%'} />
      )}
      <Wrapper edges={forceInset ?? undefined} style={[styles.inner]}>
        <Block block>
          <ScrollView
            showsVerticalScrollIndicator={showVertical}
            showsHorizontalScrollIndicator={showHorizontal}
            keyboardShouldPersistTaps="handled"
            style={[styles.outer, backgroundStyle]}
            contentContainerStyle={actualStyle}>
            {children}
          </ScrollView>
        </Block>
      </Wrapper>

    </KeyboardAvoidingView>
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
export const Screen = memo(ScreenComponent, equals);
