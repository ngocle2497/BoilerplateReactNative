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

import {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { sharedTiming } from '@animated';
import { execFunc } from '@common/method';
import { useDisableBackHandler } from '@hooks';
import { AnimatedView } from '@rn-core';

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
    }: ReOmit<ModalProps, 'isVisible'> & { onSetClose: () => void },
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
          <AnimatedView style={[backDropStyle, reBackdropStyle]}>
            {customBackDrop}
          </AnimatedView>
        </TouchableWithoutFeedback>
      );
    };

    const onBackButtonPress = () => {
      execFunc(onBackAndroidPress);

      return true;
    };

    const contentView = () => {
      return (
        <AnimatedView pointerEvents="box-none" style={[styles.content, style]}>
          <AnimatedView
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            entering={(entering as any)?.withCallback(onEndAnimatedOpen)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            exiting={(exiting as any)?.withCallback(onEndAnimatedClose)}>
            {children}
          </AnimatedView>
        </AnimatedView>
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
      openModal();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // props
    const modalViewProps = useAnimatedProps<ReOmit<ViewProps, 'style'>>(() => ({
      pointerEvents:
        reBackdropOpacity.value === backdropOpacity ? 'auto' : 'none',
    }));

    // render
    return (
      <AnimatedView animatedProps={modalViewProps} style={styles.modal}>
        {renderBackdrop()}
        {contentView()}
      </AnimatedView>
    );
  },
);

export type ModalContent = {
  dismiss: () => void;
};
