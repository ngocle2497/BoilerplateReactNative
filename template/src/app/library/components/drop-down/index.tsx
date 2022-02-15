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
  Text,
  TouchableOpacity,
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

import {Icon} from '../icon';
import {Modal} from '../modal';

import {DropDownItem} from './drop-down-item';
import {styles} from './styles';
import {DropDownProps, RowDropDown} from './type';

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
    if (onCheckType(onChangeItem, 'function')) {
      if (Array.isArray(selectedValue)) {
        onChangeItem(
          selectedValue,
          data.reduce((prev, current, i, arr) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <View ref={_refDrop} style={wrapStyle}>
        <TouchableOpacity onPress={_onToggle} disabled={disabled}>
          <View style={[styles.wrapPlaceholder, containerStyle]}>
            <Text
              style={[styles.placeHolder, placeholderStyle]}
              numberOfLines={1}>
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
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        backdropOpacity={0}
        animatedInDuration={300}
        animatedOutDuration={300}
        onBackButtonPress={_onHideDrop}
        onBackdropPress={_onHideDrop}
        onModalShow={onOpen}
        onModalHide={onClose}
        hasGesture={false}
        animatedIn={'fadeIn'}
        animatedOut={'fadeOut'}
        style={[styles.modal]}
        isVisible={isVisible}>
        <View onLayout={_onLayoutDrop} style={contentModalStyle}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
          />
        </View>
      </Modal>
    </>
  );
});

export const DropDown = memo(DropDownComponent, isEqual);
