import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  memo,
  useMemo,
} from 'react';
import {useTranslation} from 'react-i18next';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import Modal from 'react-native-modal';

import {Block} from '../Block/Block';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';
import {Divider} from '../Divider/Divider';

import {ActionSheetProps, OptionData} from './ActionSheet.props';
import {styles} from './ActionSheet.presets';

const ActionSheetComponent = forwardRef((props: ActionSheetProps, ref) => {
  const [t] = useTranslation();
  const {
    onPressCancel,
    textCancelStyle,
    rootStyle,
    wrapCancelStyle,
    textOptionStyle,
    wrapOptionStyle,
    title,
    onPressOption,
    onBackDropPress,
    textCancel = t('dialog:cancel'),
    backDropColor = 'rgba(0,0,0,.5)',
    closeOnBackDrop = true,
    option = [],
  } = props;
  const [actionVisible, setActionVisible] = useState(false);
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setActionVisible(true);
      },
      hide: () => {
        setActionVisible(false);
      },
    }),
    [],
  );
  const _onPress = useCallback(
    (item: OptionData, index: number) => {
      return () => {
        setActionVisible(false);
        onPressOption && onPressOption(item, index);
      };
    },
    [onPressOption],
  );
  const _onCancel = useCallback(() => {
    onPressCancel && onPressCancel();
    setActionVisible(false);
  }, [onPressCancel]);

  const _onBackDropPress = useCallback(() => {
    typeof onBackDropPress === 'function' && onBackDropPress();
    closeOnBackDrop === true && setActionVisible(false);
  }, [closeOnBackDrop, onBackDropPress]);

  const textOption = useMemo(() => enhance([textOptionStyle]), [
    textOptionStyle,
  ]);
  const textCancelS = useMemo(
    () => enhance([styles.textCancel, textCancelStyle]),
    [textCancelStyle],
  );
  const wrapOption = useMemo(
    () => enhance([styles.wrapOption, wrapOptionStyle]),
    [wrapOptionStyle],
  );
  const wrapCancel = useMemo(
    () => enhance([styles.wrapCancel, wrapCancelStyle]),
    [wrapCancelStyle],
  );
  const root = useMemo(() => enhance([styles.wrap, rootStyle]), [rootStyle]);
  return (
    <Modal
      style={[styles.modal]}
      useNativeDriver={true}
      backdropOpacity={1}
      onBackdropPress={_onBackDropPress}
      onBackButtonPress={_onCancel}
      isVisible={actionVisible}
      backdropColor={backDropColor}>
      <Block style={[root]}>
        <Block style={wrapOption}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <Block style={[styles.wrapTitle]}>
                  <Text style={[styles.title]} text={title + ''} />
                </Block>
                <Divider />
              </>
            ))}
          {option.map((item: OptionData, index: number) => {
            return (
              <Button
                style={[styles.option]}
                onPress={_onPress(item, index)}
                key={item.text}>
                <Text style={textOption} text={item.text} />
              </Button>
            );
          })}
        </Block>
        <Block style={wrapCancel}>
          <Button onPress={_onCancel} style={[styles.buttonCancel]}>
            <Text style={textCancelS} text={textCancel} />
          </Button>
        </Block>
      </Block>
    </Modal>
  );
});
export const ActionSheet = memo(ActionSheetComponent, equals);
export interface ActionSheetRef {
  show(): void;
  hide(): void;
}
