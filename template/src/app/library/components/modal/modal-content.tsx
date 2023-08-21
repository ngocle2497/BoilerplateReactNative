import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewProps,
  ViewStyle,
} from 'react-native';

import KeyboardManager from 'react-native-keyboard-manager';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import { execFunc } from '@common';
import { useDisableBackHandler } from '@hooks';

import { styles } from './styles';
import { ModalProps } from './type';

export const ModalContent = forwardRef(
  (
    {
      style,
      children,
      customBackDrop,
      entering,
      exiting,
      backdropColor = 'black',
      backdropOpacity = 0.3,
      onSetClose,
      onModalHide,
      onModalShow,
      onBackdropPress,
      onModalWillHide,
      onModalWillShow,
      onBackButtonPress: onBackAndroidPress,
    }: CustomOmit<ModalProps, 'isVisible'> & { onSetClose: () => void },
    ref,
  ) => {
    // reanimated state

    const reBackdropOpacity = useSharedValue(0);

    // style
    const backDropStyle = useMemo<StyleProp<ViewStyle>>(
      () => [
        StyleSheet.absoluteFillObject,
        {
          width: '100%',
          height: '100%',
          backgroundColor: backdropColor,
        },
      ],
      [backdropColor],
    );

    const reBackdropStyle = useAnimatedStyle(
      () => ({
        opacity: reBackdropOpacity.value,
      }),
      [],
    );

    // function
    const openEnd = () => {
      execFunc(onModalShow);
    };

    const closeEnd = () => {
      execFunc(onSetClose);

      execFunc(onModalHide);
    };

    const onEndAnimatedClose = (isFinished?: boolean) => {
      'worklet';
      if (isFinished) {
        runOnJS(closeEnd)();
      }
    };

    const onEndAnimatedOpen = (isFinished?: boolean) => {
      'worklet';

      if (isFinished) {
        runOnJS(openEnd)();
      }
    };

    const openModal = () => {
      execFunc(onModalWillShow);

      reBackdropOpacity.value = sharedTiming(
        backdropOpacity,
        undefined,
        isFinished => {
          'worklet';
          if (isFinished) {
            if (!entering) {
              onEndAnimatedOpen(isFinished);
            }
          }
        },
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const closeModal = () => {
      execFunc(onModalWillHide);

      if (exiting) {
        execFunc(onSetClose);
      }

      reBackdropOpacity.value = sharedTiming(
        0,
        { duration: exiting ? 300 : 0 },
        isFinished => {
          'worklet';
          if (isFinished) {
            if (!exiting) {
              onEndAnimatedClose(isFinished);
            }
          }
        },
      );
    };

    const renderBackdrop = () => {
      return (
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View style={[backDropStyle, reBackdropStyle]}>
            {customBackDrop}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    };

    const onBackButtonPress = () => {
      execFunc(onBackAndroidPress);

      return true;
    };

    const contentView = () => {
      return (
        <Animated.View pointerEvents="box-none" style={[styles.content, style]}>
          <Animated.View
            entering={(entering as any)?.withCallback(onEndAnimatedOpen)}
            exiting={(exiting as any)?.withCallback(onEndAnimatedClose)}>
            {children}
          </Animated.View>
        </Animated.View>
      );
    };

    // effect
    useImperativeHandle(
      ref,
      () => ({
        dismiss: () => {
          closeModal();

          Keyboard.dismiss();
        },
      }),
      [closeModal],
    );

    useDisableBackHandler(true, onBackButtonPress);

    useEffect(() => {
      KeyboardManager.setEnable(false);

      openModal();

      return () => {
        KeyboardManager.setEnable(true);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // props
    const modalViewProps = useAnimatedProps<CustomOmit<ViewProps, 'style'>>(
      () => ({
        pointerEvents:
          reBackdropOpacity.value === backdropOpacity ? 'auto' : 'none',
      }),
    );

    // render
    return (
      <Animated.View animatedProps={modalViewProps} style={styles.modal}>
        {renderBackdrop()}
        {contentView()}
      </Animated.View>
    );
  },
);

export type ModalContent = {
  dismiss: () => void;
};
