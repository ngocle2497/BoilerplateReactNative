import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  ViewStyle,
} from 'react-native';
import { ScreenProps } from './Screen.props';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Block } from '../Block/Block';
import equals from 'react-fast-compare';
import { enhance } from '@common';

export const presets = {
  root: {
    flex: 1,
    backgroundColor: 'transparent',
  } as ViewStyle,
  fixed: {
    outer: {
      backgroundColor: 'transparent',
      flex: 1,
    } as ViewStyle,
    outer0: {
      flex: 0,
    } as ViewStyle,
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flex: 1,
    } as ViewStyle,
  },

  scroll: {
    outer: {
      backgroundColor: 'transparent',
      flex: 1,
      height: '100%',
    } as ViewStyle,
    outer0: {
      flex: 0,
    } as ViewStyle,
    inner: { justifyContent: 'flex-start', alignItems: 'stretch' } as ViewStyle,
  },
};

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets.fixed;
  const style = props.style || {};
  const {
    hidden = false,
    statusColor = undefined,
    draw = false,
    customInsetBottom = false,
    bottomIPXColor = '#ffffff',
  } = props;
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const Wrapper = props.unsafe ? Block : SafeAreaView;
  return (
    <KeyboardAvoidingView
      style={[preset.outer]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={props.statusBar || 'dark-content'}
      />
      {draw === false && (
        <SafeAreaView style={[preset.outer0, { backgroundColor: statusColor }]} />
      )}

      <Wrapper
        edges={props.forceInset ?? undefined}
        style={[preset.inner, style, backgroundStyle]}>
        {props.children}
      </Wrapper>
      {customInsetBottom === true && (
        <SafeAreaView
          style={[preset.outer0, { backgroundColor: bottomIPXColor }]}
        />
      )}
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets.scroll;
  const {
    showHorizontal = false,
    showVertical = false,
    hidden = false,
    statusColor = undefined,
    draw = false,
    customInsetBottom = false,
    bottomIPXColor = '#ffffff',
    style = {},
  } = props;
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const Wrapper = props.unsafe ? Block : SafeAreaView;

  const actualStyle = React.useMemo(() => enhance([preset.inner, style]), [
    style,
  ]);
  return (
    <KeyboardAvoidingView
      style={[preset.outer]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={props.statusBar || 'dark-content'}
      />
      {draw === false && (
        <SafeAreaView style={[preset.outer0, { backgroundColor: statusColor }]} />
      )}
      <Wrapper
        edges={props.forceInset ?? undefined}
        style={[preset.outer]}>
        <ScrollView
          showsVerticalScrollIndicator={showVertical}
          showsHorizontalScrollIndicator={showHorizontal}
          keyboardShouldPersistTaps="handled"
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={actualStyle}>
          {props.children}
        </ScrollView>
      </Wrapper>
      {customInsetBottom === true && (
        <SafeAreaView
          style={[preset.outer0, { backgroundColor: bottomIPXColor }]}
        />
      )}
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
export const Screen = React.memo(ScreenComponent, equals);
