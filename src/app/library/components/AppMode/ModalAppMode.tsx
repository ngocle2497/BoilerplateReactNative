import React, {
  memo,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';
import {StyleSheet} from 'react-native';
import isEqual from 'react-fast-compare';
import Modal from 'react-native-modal';
import {Block} from '../Block/Block';
import {Button} from '../Button/Button';
import {Text} from '../Text/Text';
import {SizeBox} from '../SizeBox/SizeBox';
import {useSelector, useDispatch} from '@common';
import {onSetAppMode} from '@store/app_redux/action';
import {saveString} from '@utils';
import {R} from '@assets/value';
import {IconTypes} from '@assets/icon';
import {Icon} from '../Icon/Icon';
import {Divider} from '../Divider/Divider';
import {FontSizeDefault} from '@theme/fontSize';
import {AppModeType} from '@networking';
import {APP_MODE} from '@config';

const styles = StyleSheet.create({
  modal: {
    marginVertical: 0,
    marginHorizontal: 0,
  },
  contentModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textMode: {
    flex: 1,
    fontSize: FontSizeDefault.FONT_12,
  },
  title: {
    fontSize: FontSizeDefault.FONT_13,
    paddingVertical: 0,
  },
});
interface ButtonSelectProps {
  tx: string;
  mode: AppModeType;
  onPress?: (mode: AppModeType) => void;
  icon: IconTypes;
  selected: boolean;
}
const ButtonSelect = ({
  tx,
  mode,
  icon,
  onPress,
  selected = false,
}: ButtonSelectProps) => {
  const _onPress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(mode);
    }
  }, [mode, onPress]);
  return (
    <Button onPress={_onPress} preset={'link'}>
      <Block
        direction={'row'}
        paddingHorizontal={10}
        justifyContent={'center'}
        middle>
        <Icon {...{icon}} />
        <SizeBox width={10} />
        <Text numberOfLines={1} style={[styles.textMode]} {...{tx}} />
        {selected && <Icon icon={'check'} />}
      </Block>
    </Button>
  );
};

const Spacing = () => {
  return (
    <>
      <SizeBox height={10} />
      <Divider />
      <SizeBox height={10} />
    </>
  );
};
const ModalAppModeComponent = forwardRef((_: any, ref: any) => {
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setIsVisible(true);
      },
      hide: () => {
        _hideModal();
      },
    }),
    [],
  );
  const dispatch = useDispatch();
  const {appMode} = useSelector(x => x.app);
  const [isVisible, setIsVisible] = useState(false);
  const _hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);
  const _onButtonPress = useCallback(
    async (mode: AppModeType) => {
      _hideModal();
      await saveString(R.strings.APP_MODE, mode);
      dispatch(onSetAppMode(mode));
    },
    [_hideModal, dispatch],
  );
  return (
    <Modal
      style={[styles.modal]}
      useNativeDriver={true}
      onBackdropPress={_hideModal}
      onBackButtonPress={_hideModal}
      isVisible={isVisible}>
      <Block block justifyContent={'flex-end'}>
        <Block style={[styles.contentModal]}>
          <Text style={[styles.title]} tx={'common:textAppMode'} />
          <ButtonSelect
            selected={appMode === APP_MODE.DEV}
            icon={'app_dev'}
            onPress={_onButtonPress}
            mode={APP_MODE.DEV as AppModeType}
            tx={'common:textAppDev'}
          />
          <Spacing />
          <ButtonSelect
            selected={appMode === APP_MODE.STAGING}
            icon={'app_test'}
            onPress={_onButtonPress}
            mode={APP_MODE.STAGING as AppModeType}
            tx={'common:textAppTest'}
          />
          <Spacing />
          <ButtonSelect
            selected={appMode === APP_MODE.PROD}
            icon={'app_prod'}
            onPress={_onButtonPress}
            mode={APP_MODE.PROD as AppModeType}
            tx={'common:textAppProd'}
          />
        </Block>
      </Block>
    </Modal>
  );
});

export const ModalAppMode = memo(ModalAppModeComponent, isEqual);
export interface ModalAppModeRef {
  show(): void;
  hide(): void;
}
