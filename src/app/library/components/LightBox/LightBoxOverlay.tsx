import React, { useState, useEffect, useRef, useMemo } from 'react'
import { StyleSheet, Modal, Animated, StatusBar, PanResponder, Dimensions, Platform } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-view'
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const DRAG_DISMISS_THRESHOLD = 150;
const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? - StatusBar.currentHeight ?? -25 : 0);
const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  textClose: {
    color: '#FFFFFF'
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
})

interface LightboxOverlayProps {
  isOpen: boolean;
  origin: any;
  renderHeader?: () => React.ReactNode;
  swipeToDismiss: boolean;
  backgroundColor: string;
  children: any;
  onClose: () => void;
}
export const LightBoxOverlay = (props: LightboxOverlayProps) => {
  const inset = useSafeArea()
  const [target, setTarget] = useState({
    x: 0,
    y: 0,
    opacity: 1,
  })
  const [openVal, setOpenVal] = useState(new Animated.Value(0))
  const [panY, setPanY] = useState(new Animated.Value(0))
  const [panX, setPanX] = useState(new Animated.Value(0))
  const [isAnimating, setIsAnimating] = useState(true)
  const [isPanning, setIsPanning] = useState(false)
  const {
    isOpen,
    origin,
    renderHeader,
    swipeToDismiss,
    backgroundColor,
    children,
    onClose,
  } = props;
  const openStyle = [styles.open, {
    left: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.x, target.x] }),
    top: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, target.y + STATUS_BAR_OFFSET] }),
    width: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.width, WINDOW_WIDTH] }),
    height: openVal.interpolate({ inputRange: [0, 1], outputRange: [origin.height, WINDOW_HEIGHT] }),
  }];
  const open = () => {
    StatusBar.setHidden(true, 'slide');
    panY.setValue(0);
    panX.setValue(0);
    setIsAnimating(true)
    setTarget({
      x: 0,
      y: 0,
      opacity: 1,
    });
    Animated.spring(
      openVal,
      { toValue: 1, useNativeDriver: false }
    ).start(() => {
      setIsAnimating(false)
    });
  }
  const close = () => {
    setIsAnimating(true)
    StatusBar.setHidden(false, 'slide');
    Animated.spring(
      openVal,
      { toValue: 0, useNativeDriver: false }
    ).start(() => {
      setIsAnimating(true)
      onClose();
    });
  }
  useEffect(() => {
    if (isOpen) {
      open()
    }
  }, [isOpen])
  const panResponder = useMemo(() => PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => !isAnimating,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => !isAnimating,
    onMoveShouldSetPanResponder: (evt, gestureState) => !isAnimating,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => !isAnimating,

    onPanResponderGrant: (evt, gestureState) => {
      panY.setValue(0);
      panX.setValue(0);
      setIsPanning(true)
    },
    onPanResponderMove: Animated.event([
      null,
      { dy: panY, dx: panX },
    ]),
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dy) > DRAG_DISMISS_THRESHOLD) {
        setIsPanning(false)
        setTarget({
          y: gestureState.dy,
          x: gestureState.dx,
          opacity: 1 - Math.abs(gestureState.dy / WINDOW_HEIGHT)
        })
        close();
      } else {
        Animated.parallel([
          Animated.spring(
            panY,
            { toValue: 0, useNativeDriver: false }
          ),
          Animated.spring(
            panX,
            { toValue: 0, useNativeDriver: false }
          )
        ]).start(() => { setIsPanning(false) });
      }
    },
  }), [isAnimating])
  const bgOpacity = isPanning ? panY.interpolate({ inputRange: [-WINDOW_HEIGHT, 0, WINDOW_HEIGHT], outputRange: [0, 1, 0] }) : openVal.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] })
  return (
    <Modal transparent={true} visible={isOpen}>
      <Animated.View style={[styles.background, { opacity: bgOpacity, backgroundColor: backgroundColor }]}></Animated.View>
      <Animated.View style={[openStyle, isPanning && { top: panY, left: panX }]} {...swipeToDismiss && panResponder.panHandlers}>
        {children}
      </Animated.View>
      {renderHeader ? renderHeader() : <Button onPress={close} style={[styles.buttonClose, { top: inset.top + 20, left: inset.left + 20 }]}>
        <Animated.View style={{ opacity: bgOpacity }}>
          <Text style={[styles.textClose]} text={'X'} />
        </Animated.View>
      </Button>}
    </Modal>
  )
}

