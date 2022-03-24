import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import { Text, View } from 'react-native';

import equals from 'react-fast-compare';
import { useTranslation } from 'react-i18next';

import { styles } from './styles';
import { ActionSheetProps, OptionData } from './type';

import { Button } from '../button';
import { Divider } from '../divider';
import { Modal } from '../modal';

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
      <View style={[styles.wrap, rootStyle]}>
        <View style={[styles.wrapOption, wrapOptionStyle]}>
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
                  <Text style={[textOptionStyle]} children={item.text} />
                </View>
              </Button>
            );
          })}
        </View>
        <View style={[styles.wrapCancel, wrapCancelStyle]}>
          <Button onPress={_onCancel}>
            <View style={[styles.wrapTextCancel]}>
              <Text
                style={[styles.textCancel, textCancelStyleOverwrite]}
                children={textCancel}
              />
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
