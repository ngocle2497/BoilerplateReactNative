import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { ScreenProps } from './screen.props';
import SafeAreaView from 'react-native-safe-area-view';
import { Button } from '../button/button';

export const offsets = {
  none: 0,
};
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
      backgroundColor: 'transparent',
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
  const preset = presets['fixed'];
  const style = props.style || {};
  const {
    hidden = false,
    statusColor = undefined,
    draw = false,
    customInsetBottom = false,
    bottomIPX = '#ffffff',
    dismissKeyboard = true,
  } = props;
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;
  const onDismissKeyboard = () => {
    if (dismissKeyboard) {
      Keyboard.dismiss()
    }
  }
  return (
    <TouchableWithoutFeedback style={presets.root} onPress={onDismissKeyboard}>
      <KeyboardAvoidingView
        style={[preset.outer]}
        behavior={isIos ? 'padding' : undefined}
        keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>

        <StatusBar
          hidden={hidden}
          backgroundColor={statusColor}
          translucent={draw}
          barStyle={props.statusBar || 'light-content'}
        />
        {draw === false && (
          <SafeAreaView style={[preset.outer0, { backgroundColor: statusColor }]} />
        )}

        <Wrapper forceInset={props.forceInset ?? undefined} style={[preset.inner, style, backgroundStyle]}>
          {props.children}
        </Wrapper>
        {customInsetBottom === true && (
          <SafeAreaView style={[preset.outer0, { backgroundColor: bottomIPX }]} />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const preset = presets['scroll'];
  const style = props.style || {};
  const {
    showHorizontal = false,
    showVertical = false,
    hidden = false,
    statusColor = undefined,
    draw = false,
    customInsetBottom = false,
    bottomIPX = '#ffffff',
    dismissKeyboard = true,
  } = props;
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;
  const onDismissKeyboard = () => {
    if (dismissKeyboard) {
      Keyboard.dismiss()
    }
  }
  return (
    <TouchableWithoutFeedback style={presets.root} onPress={onDismissKeyboard}>
      <KeyboardAvoidingView
        style={[preset.outer]}
        behavior={isIos ? 'padding' : undefined}
        keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}>
        <StatusBar
          hidden={hidden}
          backgroundColor={statusColor}
          translucent={draw}
          barStyle={props.statusBar || 'light-content'}
        />
        {draw === false && (
          <SafeAreaView style={[preset.outer0, { backgroundColor: statusColor }]} />
        )}
          <Wrapper forceInset={props.forceInset ?? { top: 'always' }} style={[preset.outer]}>
            <ScrollView
              showsVerticalScrollIndicator={showVertical}
              showsHorizontalScrollIndicator={showHorizontal}
              keyboardShouldPersistTaps="handled"
              style={[preset.outer, backgroundStyle]}
              contentContainerStyle={[preset.inner, style]}>
              {props.children}
            </ScrollView>
          </Wrapper>
        {customInsetBottom === true && (
          <SafeAreaView style={[preset.outer0, { backgroundColor: bottomIPX }]} />
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export function Screen(props: ScreenProps) {
  const { isScroll = false } = props;
  if (isScroll) {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
}
