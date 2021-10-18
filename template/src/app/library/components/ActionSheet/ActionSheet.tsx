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
import {Text, View} from 'react-native';

import {Button} from '../Button/Button';
import {Divider} from '../Divider/Divider';
import {Modal} from '../Modal/Modal';

import {ActionSheetProps, OptionData} from './ActionSheet.props';
import {styles} from './styles';

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
      hasGesture={false}
      backdropOpacity={1}
      animatedIn={'slideInUp'}
      animatedOut={'slideOutDown'}
      onBackdropPress={_onBackDropPress}
      onBackButtonPress={_onCancel}
      isVisible={actionVisible}
      backdropColor={backDropColor}>
      <View style={[root]}>
        <View style={[wrapOption]}>
          {title &&
            (React.isValidElement(title) ? (
              title
            ) : (
              <>
                <View style={[styles.wrapTitle]}>
                  <Text style={[styles.title]} children={title + ''} />
                </View>
                <Divider />
              </>
            ))}
          {option.map((item: OptionData, index: number) => {
            return (
              <Button onPress={_onPress(item, index)} key={item.text}>
                <View style={[styles.wrapTextOption]}>
                  <Text style={[textOption]} children={item.text} />
                </View>
              </Button>
            );
          })}
        </View>
        <View style={[wrapCancel]}>
          <Button onPress={_onCancel}>
            <View style={[styles.wrapTextCancel]}>
              <Text style={[textCancelStyle]} children={textCancel} />
            </View>
          </Button>
        </View>
      </View>
    </Modal>
  );
});
export const ActionSheet = memo(ActionSheetComponent, equals);
export interface ActionSheet {
  show(): void;
  hide(): void;
}
