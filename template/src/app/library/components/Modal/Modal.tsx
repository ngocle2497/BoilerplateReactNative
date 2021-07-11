import {sharedTiming} from '@animated';
import {enhance, onCheckType} from '@common';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import isEqual from 'react-fast-compare';
import {
  BackHandler,
  Modal as RNModal,
  StyleSheet,
  TouchableNativeFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  ANIMATED_IN_DURATION,
  ANIMATED_OUT_DURATION,
  BACK_DROP_OPACITY,
} from './constants';
import {ModalProps} from './Modal.props';
import {styles} from './styles';
import {withAnimated} from './untils';

const ModalComponent = ({
  isVisible,
  customBackDrop,
  backdropOpacity = BACK_DROP_OPACITY,
  animatedInDuration = ANIMATED_IN_DURATION,
  backdropInDuration = ANIMATED_IN_DURATION,
  animatedOutDuration = ANIMATED_OUT_DURATION,
  backdropOutDuration = ANIMATED_OUT_DURATION,
  animatedIn = 'fadeIn',
  animatedOut = 'fadeOut',
  backdropColor = 'black',
  children,
  style,
  onBackdropPress,
  onBackButtonPress: onBackAndroidPress,
  onModalHide,
  onModalShow,
  onModalWillHide,
  onModalWillShow,
}: ModalProps) => {
  // state
  const {height: screenHeight, width: screenWidth} = useWindowDimensions();
  const [visible, setVisible] = useState<boolean>(isVisible);
  const [mounted, setMounted] = useState<boolean>(false);

  // reanimated state
  const isOut = useSharedValue(false);
  const progressIn = useSharedValue(0);
  const reBackdropOpacity = useSharedValue(0);

  // style
  const backDropStyle = useMemo<ViewStyle>(
    () =>
      enhance([
        StyleSheet.absoluteFillObject,
        {
          width: screenWidth,
          height: screenHeight,
          backgroundColor: backdropColor,
        },
      ]),
    [backdropColor, screenHeight, screenWidth],
  );
  const reBackdropStyle = useAnimatedStyle(
    () => ({
      opacity: reBackdropOpacity.value,
    }),
    [],
  );

  const reContentStyle = useAnimatedStyle(() => {
    return withAnimated({
      progress: progressIn,
      isOut,
      typeIn: animatedIn,
      typeOut: animatedOut,
      screenHeight,
      screenWidth,
    });
  });

  // function
  const onEndAnimatedClose = useCallback(
    (isFinished: boolean) => {
      'worklet';
      if (isFinished) {
        progressIn.value = 0;
        runOnJS(setVisible)(false);
        if (typeof onModalHide === 'function') {
          runOnJS(onModalHide)();
        }
      }
    },
    [onModalHide, progressIn],
  );
  const onEndAnimatedOpen = useCallback(
    (isFinished: boolean) => {
      'worklet';
      if (isFinished) {
        if (typeof onModalShow === 'function') {
          runOnJS(onModalShow)();
        }
      }
    },
    [onModalShow],
  );

  const openModal = useCallback(() => {
    isOut.value = false;
    if (onCheckType(onModalWillShow, 'function')) {
      onModalWillShow();
    }
    reBackdropOpacity.value = sharedTiming(backdropOpacity, {
      duration: backdropInDuration,
    });
    progressIn.value = 0;
    progressIn.value = sharedTiming(
      1,
      {
        duration: animatedInDuration,
      },
      onEndAnimatedOpen,
    );
  }, [
    animatedInDuration,
    backdropInDuration,
    backdropOpacity,
    isOut,
    onEndAnimatedOpen,
    onModalWillShow,
    progressIn,
    reBackdropOpacity,
  ]);

  const closeModal = useCallback(() => {
    isOut.value = true;
    if (onCheckType(onModalWillHide, 'function')) {
      onModalWillHide();
    }
    reBackdropOpacity.value = withTiming(0, {
      duration: backdropOutDuration,
    });
    progressIn.value = 1;
    progressIn.value = sharedTiming(
      0,
      {
        duration: animatedOutDuration,
      },
      onEndAnimatedClose,
    );
  }, [
    animatedOutDuration,
    backdropOutDuration,
    isOut,
    onEndAnimatedClose,
    onModalWillHide,
    progressIn,
    reBackdropOpacity,
  ]);

  const renderBackdrop = useCallback(() => {
    return (
      <TouchableNativeFeedback onPress={onBackdropPress}>
        <Animated.View style={[backDropStyle, reBackdropStyle]}>
          {customBackDrop && customBackDrop}
        </Animated.View>
      </TouchableNativeFeedback>
    );
  }, [onBackdropPress, backDropStyle, reBackdropStyle, customBackDrop]);

  const onBackButtonPress = useCallback(() => {
    if (isVisible && onCheckType(onBackAndroidPress, 'function')) {
      onBackAndroidPress();
      return true;
    }
    return false;
  }, [isVisible, onBackAndroidPress]);

  const contentView = useCallback(() => {
    return (
      <Animated.View
        pointerEvents="box-none"
        style={[styles.content, style, reContentStyle]}>
        {children}
      </Animated.View>
    );
  }, [children, reContentStyle, style]);

  // effect
  useEffect(() => {
    if (mounted) {
      if (isVisible) {
        setVisible(true);
        openModal();
      } else {
        closeModal();
      }
    }
  }, [isVisible]);

  useEffect(() => {
    setMounted(true);
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress);
    };
  }, []);

  // render
  return (
    <RNModal
      transparent
      visible={visible}
      onRequestClose={onBackButtonPress}
      animationType={'none'}>
      {renderBackdrop()}
      {contentView()}
    </RNModal>
  );
};

export const Modal = memo(ModalComponent, isEqual);
