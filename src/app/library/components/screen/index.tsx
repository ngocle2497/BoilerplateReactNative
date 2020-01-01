import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {ScreenProps} from './screen.props';

export const offsets = {
  none: 0,
};
export const presets = {
  fixed: {
    outer: {
      backgroundColor: '#FFFFFF',
      flex: 1,
      height: '100%',
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
      backgroundColor: '#FFFFFF',
      flex: 1,
      height: '100%',
    } as ViewStyle,
    outer0: {
      flex: 0,
    } as ViewStyle,
    inner: {justifyContent: 'flex-start', alignItems: 'stretch'} as ViewStyle,
  },
};

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets['fixed'];
  const style = props.style || {};
  const {
    hidden = false,
    statusColor = '#ECA96A',
    draw = false,
    bottomIPX = '#ffffff',
  } = props;
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={props.statusBar || 'light-content'}
      />
      {draw === false && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: statusColor}]} />
      )}
      <Wrapper style={[preset.inner, style, backgroundStyle]}>
        {props.children}
      </Wrapper>
      {draw === false && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: bottomIPX}]} />
      )}
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets['scroll'];
  const style = props.style || {};
  const {
    showHorizontal = false,
    showVertical = false,
    hidden = false,
    statusColor = '#ECA96A',
    draw = false,
    bottomIPX = '#ffffff',
  } = props;
  const backgroundStyle = props.backgroundColor
    ? {backgroundColor: props.backgroundColor}
    : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
      <StatusBar
        hidden={hidden}
        backgroundColor={statusColor}
        translucent={draw}
        barStyle={props.statusBar || 'light-content'}
      />
      {draw === false && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: statusColor}]} />
      )}
      <Wrapper style={[preset.outer, backgroundStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={showVertical}
          showsHorizontalScrollIndicator={showHorizontal}
          keyboardShouldPersistTaps="handled"
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}>
          {props.children}
        </ScrollView>
      </Wrapper>
      {props.draw === false && (
        <SafeAreaView style={[preset.outer0, {backgroundColor: bottomIPX}]} />
      )}
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  const {isScroll = false} = props;
  if (isScroll) {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
}
