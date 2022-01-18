import {sharedClamp, sharedTiming} from '@animated';
import {
  AppModule,
  CustomOmit,
  enhance,
  isIos,
  onCheckType,
  useDisableBackHandler,
} from '@common';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
} from 'react';
import isEqual from 'react-fast-compare';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  ANIMATED_IN_DURATION,
  ANIMATED_OUT_DURATION,
  BACK_DROP_OPACITY,
  MAX_TRANSLATE,
  SWIPE_THRESHOLD,
} from './constants';
import {ModalProps} from './type';
import {styles} from './styles';
import {withAnimated} from './untils';

const ModalContentComponent = forwardRef(
  (
    {
      customBackDrop,
      swipingDirection,
      backdropOpacity = BACK_DROP_OPACITY,
      animatedInDuration = ANIMATED_IN_DURATION,
      backdropInDuration = ANIMATED_IN_DURATION,
      animatedOutDuration = ANIMATED_OUT_DURATION,
      backdropOutDuration = ANIMATED_OUT_DURATION,
      animatedIn = 'fadeIn',
      animatedOut = 'fadeOut',
      backdropColor = 'black',
      moveContentWhenDrag = false,
      swipeThreshold = SWIPE_THRESHOLD,
      hasGesture = true,
      children,
      style,
      onBackdropPress,
      customGesture,
      onSwipeComplete,
      onBackButtonPress: onBackAndroidPress,
      onModalHide,
      onModalShow,
      onModalWillHide,
      onModalWillShow,
      onSetClose,
    }: CustomOmit<ModalProps, 'isVisible'> & {onSetClose: () => void},
    ref,
  ) => {
    // state
    const {height: screenHeight, width: screenWidth} = useWindowDimensions();
    const modalStyle = useMemo<ViewStyle>(
      () =>
        enhance<ViewStyle>([
          styles.modal,
          {
            width: screenWidth,
            height: screenHeight + (isIos ? 0 : 25),
          },
        ]),
      [screenHeight, screenWidth],
    );
    // reanimated state
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const isOut = useSharedValue(false);
    const progressIn = useSharedValue(0);
    const reBackdropOpacity = useSharedValue(0);

    // style
    const backDropStyle = useMemo<ViewStyle>(
      () =>
        enhance([
          StyleSheet.absoluteFillObject,
          {
            width: '100%',
            height: '100%',
            backgroundColor: backdropColor,
          },
        ]),
      [backdropColor],
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
    }, [animatedIn, animatedOut]);

    const wrapContentStyle = useAnimatedStyle(
      () => ({
        transform: [
          {translateY: translateY.value},
          {translateX: translateX.value},
        ],
      }),
      [],
    );

    // function
    const onEndAnimatedClose = useCallback(
      (isFinished?: boolean) => {
        'worklet';
        if (isFinished) {
          progressIn.value = 0;
          if (typeof onSetClose === 'function') {
            runOnJS(onSetClose)();
          }
          if (typeof onModalHide === 'function') {
            runOnJS(onModalHide)();
          }
        }
      },
      [onModalHide, onSetClose, progressIn],
    );

    const onEndAnimatedOpen = useCallback(
      (isFinished?: boolean) => {
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

    const onGesture = useAnimatedGestureHandler({
      onActive: ({translationY, translationX}) => {
        if (swipingDirection && moveContentWhenDrag) {
          translateY.value = sharedClamp(
            translationY,
            swipingDirection.includes('up') ? -MAX_TRANSLATE : 0,
            swipingDirection.includes('down') ? MAX_TRANSLATE : 0,
          );
          translateX.value = sharedClamp(
            translationX,
            swipingDirection.includes('left') ? -MAX_TRANSLATE : 0,
            swipingDirection.includes('right') ? MAX_TRANSLATE : 0,
          );
        }
      },
      onEnd: ({translationY, translationX}) => {
        if (swipingDirection) {
          const actualDx = Math.abs(
            sharedClamp(
              translationX,
              swipingDirection.includes('left') ? -MAX_TRANSLATE : 0,
              swipingDirection.includes('right') ? MAX_TRANSLATE : 0,
            ),
          );
          const actualDy = Math.abs(
            sharedClamp(
              translationY,
              swipingDirection.includes('up') ? -MAX_TRANSLATE : 0,
              swipingDirection.includes('down') ? MAX_TRANSLATE : 0,
            ),
          );
          if (actualDy > swipeThreshold || actualDx > swipeThreshold) {
            if (typeof onSwipeComplete === 'function') {
              runOnJS(onSwipeComplete)();
            }
          }
        }

        translateY.value = sharedTiming(0, {duration: 150});
        translateX.value = sharedTiming(0, {duration: 150});
      },
    });

    const renderBackdrop = useCallback(() => {
      return (
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <Animated.View style={[backDropStyle, reBackdropStyle]}>
            {customBackDrop && customBackDrop}
          </Animated.View>
        </TouchableWithoutFeedback>
      );
    }, [onBackdropPress, backDropStyle, reBackdropStyle, customBackDrop]);

    const onBackButtonPress = useCallback(() => {
      if (onCheckType(onBackAndroidPress, 'function')) {
        onBackAndroidPress();
      }
      return true;
    }, [onBackAndroidPress]);

    const contentView = useCallback(() => {
      return (
        <Animated.View
          pointerEvents="box-none"
          style={[styles.content, style, reContentStyle]}>
          <Animated.View style={[wrapContentStyle]}>
            {hasGesture && (
              <PanGestureHandler onGestureEvent={onGesture}>
                <Animated.View>
                  {customGesture ? (
                    customGesture()
                  ) : (
                    <View style={[styles.wrapGesture]}>
                      <View style={[styles.anchor]} />
                    </View>
                  )}
                </Animated.View>
              </PanGestureHandler>
            )}
            {children}
          </Animated.View>
        </Animated.View>
      );
    }, [
      children,
      customGesture,
      hasGesture,
      onGesture,
      reContentStyle,
      style,
      wrapContentStyle,
    ]);

    // effect
    useImperativeHandle(
      ref,
      () => ({
        dismiss: () => {
          closeModal();
        },
      }),
      [closeModal],
    );

    useDisableBackHandler(true, onBackButtonPress);

    useEffect(() => {
      AppModule.setEnableIQKeyboard(false);
      openModal();
      return () => {
        AppModule.setEnableIQKeyboard(true);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // render
    return (
      <View style={[modalStyle]}>
        {renderBackdrop()}
        {contentView()}
      </View>
    );
  },
);

export const ModalContent = memo(ModalContentComponent, isEqual);
export type ModalContent = {
  dismiss: () => void;
};
