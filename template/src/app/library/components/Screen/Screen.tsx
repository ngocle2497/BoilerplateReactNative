import {enhance, isIos} from '@common';
import React, {memo, useMemo} from 'react';
import equals from 'react-fast-compare';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Block} from '../Block/Block';
import {ScreenProps} from './Screen.props';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  outer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  insetBottom: {
    bottom: 0,
  },
  insetLeft: {
    left: 0,
  },
  insetRight: {
    right: 0,
  },
  inner: {
    justifyContent: 'flex-start',
    flex: 1,
    width: '100%',
  },
});

function ScreenWithoutScrolling(props: ScreenProps) {
  // state
  const inset = useSafeAreaInsets();
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
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

  const backgroundStyle = useMemo(
    () => (backgroundColor ? {backgroundColor} : {}),
    [backgroundColor],
  );

  const Wrapper = unsafe ? Block : SafeAreaView;

  // render
  return (
    <>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={statusBar || 'dark-content'}
      />
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('top'))) &&
        isIos && (
          <Block
            color={statusColor}
            position={'absolute'}
            height={inset.top}
            width={screenWidth}
          />
        )}
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('left'))) &&
        isIos && (
          <Block
            color={leftInsetColor}
            position={'absolute'}
            style={[styles.insetLeft]}
            height={screenHeight}
            width={inset.left}
          />
        )}
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('right'))) &&
        isIos && (
          <Block
            color={rightInsetColor}
            position={'absolute'}
            style={[styles.insetRight]}
            height={screenHeight}
            width={inset.right}
          />
        )}
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('bottom'))) &&
        isIos && (
          <Block
            color={bottomInsetColor}
            style={[styles.insetBottom]}
            position={'absolute'}
            height={inset.bottom}
            width={screenWidth}
          />
        )}
      <Wrapper
        edges={forceInset ?? undefined}
        style={[styles.inner, style, backgroundStyle]}>
        {children}
      </Wrapper>
    </>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  // state
  const inset = useSafeAreaInsets();
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();
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

  const backgroundStyle = useMemo(
    () => (backgroundColor ? {backgroundColor} : {}),
    [backgroundColor],
  );

  const actualStyle = useMemo(() => enhance([style]), [style]);

  const Wrapper = unsafe ? Block : SafeAreaView;

  // render
  return (
    <>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={statusBar || 'dark-content'}
      />
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('top'))) &&
        isIos && (
          <Block
            color={statusColor}
            position={'absolute'}
            height={inset.top}
            width={screenWidth}
          />
        )}
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('left'))) &&
        isIos && (
          <Block
            color={leftInsetColor}
            position={'absolute'}
            style={[styles.insetLeft]}
            height={screenHeight}
            width={inset.left}
          />
        )}
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('right'))) &&
        isIos && (
          <Block
            color={rightInsetColor}
            position={'absolute'}
            style={[styles.insetRight]}
            height={screenHeight}
            width={inset.right}
          />
        )}
      {!unsafe &&
        (!forceInset || (forceInset && forceInset.includes('bottom'))) &&
        isIos && (
          <Block
            color={bottomInsetColor}
            style={[styles.insetBottom]}
            position={'absolute'}
            height={inset.bottom}
            width={screenWidth}
          />
        )}
      <Wrapper edges={forceInset ?? undefined} style={[styles.inner]}>
        <Block block>
          <ScrollView
            showsVerticalScrollIndicator={showVertical}
            showsHorizontalScrollIndicator={showHorizontal}
            keyboardShouldPersistTaps="handled"
            style={[styles.outer, backgroundStyle]}
            contentContainerStyle={[actualStyle]}>
            {children}
          </ScrollView>
        </Block>
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
export const Screen = memo(ScreenComponent, equals);
