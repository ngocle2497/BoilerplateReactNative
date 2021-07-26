import {useMix, useRadian, useSharedTransition} from '@animated';
import {enhance, isIos, onCheckType} from '@common';
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  StatusBar,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Modal} from '../Modal/Modal';
import {Block} from '../Block/Block';
import {Button} from '../Button/Button';
import {Icon} from '../Icon/Icon';
import {Text} from '../Text/Text';

import {DropDownProps, RowDropDown} from './DropDown.props';
import {DropDownItem} from './DropDownItem';

const styles = StyleSheet.create({
  placeHolder: {
    flex: 1,
    paddingRight: 5,
  },
  wrapView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    flex: 1,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  wrapViewBottomOpened: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: '#bbb',
  },
  wrapViewTopOpened: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopColor: '#bbb',
  },
  dropStyle: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    // minHeight: 50,
    maxHeight: 250,
    paddingHorizontal: 10,
  },
  dropTopOpened: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  dropBottomOpened: {
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  wrapPlaceholder: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  modal: {
    justifyContent: undefined,
  },
});

const setLayoutOnUI = (
  ref: React.RefObject<View>,
  updateFunc: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
      x: number;
      y: number;
    }>
  >,
) => {
  'worklet';
  const {width, height, pageX, pageY} = measure(ref);
  runOnJS(updateFunc)({width, height, x: pageX, y: pageY});
};

const DropDownComponent = forwardRef((props: DropDownProps, _) => {
  const {
    data,
    defaultValue,
    style,
    containerStyleItem,
    customTickIcon,
    activeItemStyle,
    activeLabelStyle,
    renderArrow,
    placeholderStyle,
    containerStyle,
    dropDownStyle,
    placeHolder = 'Select an item',
    multiple = false,
    multipleText = '%d items have been selected',
    onClose,
    onOpen,
    onChangeItem,
    disabled,
    showArrow = true,
    labelStyle,
  } = props;

  // state
  const {height: deviceH} = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const _refDrop = useAnimatedRef<View>();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | Array<string>>(
    '',
  );
  const [viewLayout, setViewLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [dropHeight, setDropHeight] = useState(0);

  // function
  const onPressItem = useCallback(
    (value: string) => {
      setSelectedValue(d => {
        if (multiple && Array.isArray(d)) {
          const item = d.find(x => x === value);
          if (item) {
            return d.filter(x => x !== value);
          } else {
            return d.concat(value);
          }
        } else {
          return value === d ? '' : value;
        }
      });
    },
    [multiple],
  );

  const _onCheckSelected = useCallback(
    (item: RowDropDown): boolean => {
      if (multiple && Array.isArray(selectedValue)) {
        const itemSelect = selectedValue.find(x => x === item.value);
        return itemSelect !== undefined;
      } else {
        return selectedValue === item.value;
      }
    },
    [multiple, selectedValue],
  );

  const _renderItem = useCallback(
    ({item}: ListRenderItemInfo<RowDropDown>) => {
      return (
        <DropDownItem
          {...{
            item,
            onPressItem,
            activeItemStyle,
            containerStyleItem,
            activeLabelStyle,
            customTickIcon,
            labelStyle,
            selected: _onCheckSelected(item),
          }}
        />
      );
    },
    [
      onPressItem,
      activeItemStyle,
      containerStyleItem,
      activeLabelStyle,
      customTickIcon,
      labelStyle,
      _onCheckSelected,
    ],
  );

  const _keyExtractor = useCallback((item: RowDropDown) => item.value, []);

  const _onLayoutDrop = useCallback((e: LayoutChangeEvent) => {
    const {height: DropH} = e.nativeEvent.layout;
    setDropHeight(DropH);
  }, []);

  const _onCheckRenderBottom = useCallback((): boolean => {
    const statusbarHeight = !isIos ? StatusBar.currentHeight ?? 24 : inset.top;
    return (
      deviceH - (viewLayout.y + statusbarHeight + viewLayout.height) >
      dropHeight + 50
    );
  }, [deviceH, viewLayout, dropHeight, inset]);

  const _onToggle = useCallback(() => {
    runOnUI(setLayoutOnUI)(_refDrop, setViewLayout);
    setIsVisible(val => !val);
  }, [_refDrop]);

  const _onHideDrop = useCallback(() => {
    setIsVisible(false);
  }, []);

  const getTextPlaceHolder = useCallback((): string => {
    if (multiple) {
      if (selectedValue.length <= 0) {
        return placeHolder;
      }
      if (selectedValue.length === 1) {
        const item = data.find(x => x.value === selectedValue[0]);
        if (item) {
          return item.label;
        }
        return placeHolder;
      }
      return multipleText.replace('%d', selectedValue.length + '');
    } else {
      if (selectedValue.length <= 0) {
        return placeHolder;
      }
      const item = data.find(x => x.value === selectedValue);
      if (item) {
        return item.label;
      }
      return placeHolder;
    }
  }, [multiple, selectedValue, multipleText, placeHolder, data]);

  // animated
  const progress = useSharedTransition(isVisible);
  const rotate = useRadian(useMix(progress, 0, -180));

  // effect
  useEffect(() => {
    if (typeof defaultValue === 'string') {
      setSelectedValue(defaultValue);
    } else if (
      Array.isArray(defaultValue) &&
      defaultValue.every(x => typeof x === 'string')
    ) {
      setSelectedValue(defaultValue);
    } else {
      setSelectedValue(multiple ? [] : '');
    }
  }, [defaultValue, multiple]);

  useEffect(() => {
    if (onChangeItem && onCheckType(onChangeItem, 'function')) {
      if (Array.isArray(selectedValue)) {
        onChangeItem(
          selectedValue,
          data.reduce((prev, current, _, arr) => {
            const index = arr.findIndex(x => x.value === current.value);
            if (index >= 0) {
              prev.push(index);
            }
            return prev;
          }, [] as number[]),
        );
      } else {
        onChangeItem(
          selectedValue,
          data.findIndex(x => x.value === selectedValue),
        );
      }
    }
  }, [selectedValue]);

  // style
  const wrapStyle = useMemo(
    () =>
      enhance([
        styles.wrapView,
        isVisible &&
          (_onCheckRenderBottom()
            ? styles.wrapViewBottomOpened
            : styles.wrapViewTopOpened),
        style,
      ]) as StyleProp<ViewStyle>,
    [isVisible, _onCheckRenderBottom, style],
  );

  const container = useMemo(
    () =>
      enhance([styles.wrapPlaceholder, containerStyle]) as StyleProp<ViewStyle>,
    [containerStyle],
  );

  const textPlaceHolderStyle = useMemo(
    () =>
      enhance([styles.placeHolder, placeholderStyle]) as StyleProp<ViewStyle>,
    [placeholderStyle],
  );

  const contentModalStyle = useMemo(
    () =>
      enhance([
        styles.dropStyle,
        dropDownStyle,
        _onCheckRenderBottom() ? styles.dropBottomOpened : styles.dropTopOpened,
        {width: viewLayout.width, left: viewLayout.x},
        _onCheckRenderBottom()
          ? {top: viewLayout.y + viewLayout.height}
          : {
              bottom:
                deviceH -
                viewLayout.y -
                (!isIos ? StatusBar.currentHeight ?? 24 : 0),
            },
      ]) as StyleProp<ViewStyle>,
    [dropDownStyle, _onCheckRenderBottom, viewLayout, deviceH],
  );

  // reanimated style
  const arrowStyle = useAnimatedStyle(
    () => ({
      transform: [{rotate: rotate.value}],
    }),
    [],
  );

  // render
  return (
    <>
      <Block ref={_refDrop} style={wrapStyle}>
        <Button onPress={_onToggle} disabled={disabled}>
          <Block style={container} direction={'row'}>
            <Text style={textPlaceHolderStyle} numberOfLines={1}>
              {getTextPlaceHolder()}
            </Text>
            {showArrow &&
              (renderArrow ? (
                renderArrow(progress)
              ) : (
                <Animated.View style={[arrowStyle]}>
                  <Icon icon={'arrow_down'} />
                </Animated.View>
              ))}
          </Block>
        </Button>
      </Block>
      <Modal
        backdropOpacity={0}
        animatedInDuration={100}
        animatedOutDuration={100}
        onBackButtonPress={_onHideDrop}
        onBackdropPress={_onHideDrop}
        onModalShow={onOpen}
        onModalHide={onClose}
        hasGesture={false}
        animatedIn={'fadeIn'}
        animatedOut={'fadeOut'}
        style={[styles.modal]}
        isVisible={isVisible}>
        <Block
          shadow
          shadowConfig={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}
          onLayout={_onLayoutDrop}
          style={contentModalStyle}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
          />
        </Block>
      </Modal>
    </>
  );
});

export const DropDown = memo(DropDownComponent, isEqual);
