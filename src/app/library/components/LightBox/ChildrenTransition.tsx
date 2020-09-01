import React, {useState, useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Modal,
  Animated,
  StatusBar,
  PanResponder,
  Dimensions,
  Platform,
} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';
import {ChildrenTransitionProps} from './LightBox.props';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const DRAG_DISMISS_THRESHOLD = 150;
const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  textClose: {
    color: '#FFFFFF',
  },
  buttonClose: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  open: {
    position: 'absolute',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Android pan handlers crash without this declaration:
    backgroundColor: 'transparent',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    backgroundColor: 'transparent',
  },
  closeButton: {
    fontSize: 35,
    color: 'white',
    lineHeight: 40,
    width: 40,
    textAlign: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1.5,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
});

export const ChildrenTransition = (props: ChildrenTransitionProps) => {
  const inset = useSafeArea();
  const [target, setTarget] = useState({
    x: 0,
    y: 0,
    opacity: 1,
  });
  const openVal = useRef(new Animated.Value(0)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const panX = useRef(new Animated.Value(0)).current;
  const [animatedRunning, setAnimatedRunning] = useState(true);
  const [onDrag, setOnDrag] = useState(false);
  const {
    origin,
    renderHeader,
    swipeToDismiss,
    backgroundColor,
    children,
    onClose,
    viewRef,
  } = props;
  const openStyle = [
    styles.open,
    {
      left: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.x, target.x],
      }),
      top: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.y - inset.top, target.y - inset.top],
      }),
      width: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.width, WINDOW_WIDTH],
      }),
      height: openVal.interpolate({
        inputRange: [0, 1],
        outputRange: [origin.height, WINDOW_HEIGHT],
      }),
    },
  ];
  const open = () => {
    Platform.OS === 'ios' && StatusBar.setHidden(true, 'slide');
    if (viewRef) {
      viewRef.setNativeProps({
        style: {
          opacity: 0,
        },
      });
    }
    panY.setValue(0);
    panX.setValue(0);
    setAnimatedRunning(true);
    setTarget({
      x: 0,
      y: 0,
      opacity: 1,
    });
    Animated.spring(openVal, {toValue: 1, useNativeDriver: false}).start(() => {
      setAnimatedRunning(false);
    });
  };
  const close = () => {
    setAnimatedRunning(true);
    Platform.OS === 'ios' && StatusBar.setHidden(false, 'slide');
    Animated.spring(openVal, {toValue: 0, useNativeDriver: false}).start(() => {
      if (viewRef) {
        viewRef.setNativeProps({
          style: {
            opacity: 1,
          },
        });
      }
      setAnimatedRunning(true);
      onClose();
    });
  };
  useEffect(() => {
    open();
  }, []);
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => !animatedRunning,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
          !animatedRunning,
        onMoveShouldSetPanResponder: (evt, gestureState) => !animatedRunning,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
          !animatedRunning,

        onPanResponderGrant: (evt, gestureState) => {
          panY.setValue(0);
          panX.setValue(0);
          setOnDrag(true);
        },
        onPanResponderMove: Animated.event([null, {dy: panY, dx: panX}]),
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          if (Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
            setOnDrag(false);
            setTarget({
              y: gestureState.dy,
              x: gestureState.dx,
              opacity: 1 - Math.abs(gestureState.dy / WINDOW_HEIGHT),
            });
            close();
          } else {
            Animated.parallel([
              Animated.spring(panY, {toValue: 0, useNativeDriver: false}),
              Animated.spring(panX, {toValue: 0, useNativeDriver: false}),
            ]).start(() => {
              setOnDrag(false);
            });
          }
        },
      }),
    [animatedRunning],
  );
  const bgOpacity = onDrag
    ? panY.interpolate({
        inputRange: [-WINDOW_HEIGHT, 0, WINDOW_HEIGHT],
        outputRange: [0, 1, 0],
      })
    : openVal.interpolate({inputRange: [0, 0.5, 1], outputRange: [0, 0, 1]});

  return (
    <Modal transparent={true} visible={true}>
      <Animated.View
        style={[
          styles.background,
          {opacity: bgOpacity, backgroundColor: backgroundColor},
        ]}></Animated.View>
      <Animated.View
        style={[openStyle, onDrag && {top: panY, left: panX}]}
        {...(swipeToDismiss && panResponder.panHandlers)}>
        {children}
      </Animated.View>
      {renderHeader ? (
        renderHeader()
      ) : (
        <Button
          onPress={close}
          style={[
            styles.buttonClose,
            {top: inset.top + 20, left: inset.left + 20},
          ]}>
          <Animated.View style={{opacity: bgOpacity}}>
            <Text style={[styles.textClose]} text={'X'} />
          </Animated.View>
        </Button>
      )}
    </Modal>
  );
};
