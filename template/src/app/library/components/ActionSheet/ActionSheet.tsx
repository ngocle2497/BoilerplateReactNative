import {enhance} from '@common';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import equals from 'react-fast-compare';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';

import {Block} from '../Block/Block';
import {Button} from '../Button/Button';
import {Divider} from '../Divider/Divider';
import {Text} from '../Text/Text';

import {styles} from './ActionSheet.presets';
import {ActionSheetProps, OptionData} from './ActionSheet.props';

const ActionSheetComponent = forwardRef((props: ActionSheetProps, ref) => {
  // state
  const [t] = useTranslation();
  const {
    onPressCancel,
    textCancelStyle: textCancelStyleOverwrite,
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
  // function
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

  // style
  const textOption = useMemo(
    () => enhance([textOptionStyle]),
    [textOptionStyle],
  );
  const textCancelStyle = useMemo(
    () => enhance([styles.textCancel, textCancelStyleOverwrite]),
    [textCancelStyleOverwrite],
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

  // render
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
        <Block style={[wrapOption]}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <Block paddingVertical={5}>
                  <Text style={[styles.title]} text={title + ''} />
                </Block>
                <Divider />
              </>
            ))}
          {option.map((item: OptionData, index: number) => {
            return (
              <Button onPress={_onPress(item, index)} key={item.text}>
                <Block padding={10}>
                  <Text style={[textOption]} text={item.text} />
                </Block>
              </Button>
            );
          })}
        </Block>
        <Block style={[wrapCancel]}>
          <Button onPress={_onCancel}>
            <Block paddingVertical={15} middle>
              <Text style={[textCancelStyle]} text={textCancel} />
            </Block>
          </Button>
        </Block>
      </Block>
    </Modal>
  );
});
export const ActionSheet = memo(ActionSheetComponent, equals);
export interface ActionSheet {
  show(): void;
  hide(): void;
}
