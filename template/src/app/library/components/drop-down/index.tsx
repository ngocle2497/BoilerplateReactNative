import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  LayoutChangeEvent,
  ListRenderItemInfo,
  StyleProp,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useMix, useRadian, useSharedTransition } from '@animated';
import { onCheckType } from '@common';

import { DropDownItem } from './drop-down-item';
import { styles } from './styles';
import { DropDownProps, RowDropDown } from './type';

import { Icon } from '../icon';
import { Modal } from '../modal';

const setLayoutOnUI = (
  ref: React.RefObject<View>,
  wrapMeasured: Animated.SharedValue<{
    width: number;
    height: number;
    x: number;
    y: number;
  }>,
) => {
  'worklet';
  const measured = measure(ref);

  if (measured) {
    const { width, height, pageX, pageY } = measured;

    wrapMeasured.value = { width, height, x: pageX, y: pageY };
  }
};

export const DropDown = forwardRef((props: DropDownProps, _) => {
  const {
    data,
    style,
    disabled,
    labelStyle,
    defaultValue,
    dropDownStyle,
    containerStyle,
    activeItemStyle,
    placeholderStyle,
    activeLabelStyle,
    containerStyleItem,
    renderArrow,
    customTickIcon,
    onClose,
    onOpen,
    onChangeItem,
    multiple = false,
    showArrow = true,
    placeHolder = 'Select an item',
    multipleText = '%d items have been selected',
  } = props;

  // state
  const wrapMeasured = useSharedValue({ width: 0, height: 0, x: 0, y: 0 });

  const dropHeight = useSharedValue(0);

  const { height: deviceH } = useWindowDimensions();

  const inset = useSafeAreaInsets();

  const _refDrop = useAnimatedRef<View>();

  const [isVisible, setIsVisible] = useState(false);

  const [selectedValue, setSelectedValue] = useState<string | Array<string>>(
    '',
  );

  const isRenderOnBottom = useMemo(() => {
    return (
      deviceH - (wrapMeasured.value.y + inset.top + wrapMeasured.value.height) >
      dropHeight.value + 50
    );
  }, [deviceH, wrapMeasured.value, dropHeight, inset.top]);

  const wrapCustomStyle = useMemo<ViewStyle | undefined>(() => {
    if (isVisible) {
      if (isRenderOnBottom) {
        return styles.wrapViewBottomOpened;
      }

      return styles.wrapViewTopOpened;
    }
  }, [isRenderOnBottom, isVisible]);

  // function
  const hideDrop = useCallback(() => {
    setIsVisible(false);
  }, []);

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

      if (!multiple) {
        hideDrop();
      }
    },
    [hideDrop, multiple],
  );

  const onCheckSelected = (item: RowDropDown): boolean => {
    if (multiple && Array.isArray(selectedValue)) {
      const itemSelect = selectedValue.find(x => x === item.value);

      return itemSelect !== undefined;
    } else {
      return selectedValue === item.value;
    }
  };

  const _renderItem = ({ item }: ListRenderItemInfo<RowDropDown>) => {
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
          selected: onCheckSelected(item),
        }}
      />
    );
  };

  const keyExtractor = (item: RowDropDown) => item.value;

  const onLayoutDrop = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;

    dropHeight.value = height;
  };

  const onToggle = useCallback(() => {
    runOnUI(setLayoutOnUI)(_refDrop, wrapMeasured);

    setTimeout(() => {
      setIsVisible(val => !val);
    }, 0);
  }, [_refDrop, wrapMeasured]);

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
          // eslint-disable-next-line max-params
          data.reduce((prev, current, _index, arr) => {
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
  const contentModalStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.dropStyle,
      dropDownStyle,
      isRenderOnBottom ? styles.dropBottomOpened : styles.dropTopOpened,
      { width: wrapMeasured.value.width, left: wrapMeasured.value.x },
      isRenderOnBottom
        ? { top: wrapMeasured.value.y + wrapMeasured.value.height }
        : {
            bottom: -wrapMeasured.value.y,
          },
    ],
    [dropDownStyle, isRenderOnBottom, wrapMeasured.value],
  );

  // reanimated style
  const arrowStyle = useAnimatedStyle(
    () => ({
      transform: [{ rotate: rotate.value }],
    }),
    [],
  );

  // render
  return (
    <>
      <View ref={_refDrop} style={[styles.wrapView, wrapCustomStyle, style]}>
        <TouchableOpacity onPress={onToggle} disabled={disabled}>
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
        backdropOpacity={0.3}
        backdropColor="transparent"
        onBackButtonPress={hideDrop}
        onBackdropPress={hideDrop}
        onModalShow={onOpen}
        onModalHide={onClose}
        entering={FadeIn.duration(0)}
        exiting={FadeOut.duration(0)}
        style={[styles.modal]}
        isVisible={isVisible}>
        <View onLayout={onLayoutDrop} style={contentModalStyle}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            renderItem={_renderItem}
          />
        </View>
      </Modal>
    </>
  );
});
