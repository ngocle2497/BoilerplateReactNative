import {IconTypes} from '@assets/icon';
import {R} from '@assets/value';
import {dispatch, sizeScale, useSelector} from '@common';
import {APP_MODE} from '@config/api';
import {AppModeType} from '@networking';
import {onSetAppMode} from '@store/app-redux/reducer';
import {saveString} from '@utils';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import isEqual from 'react-fast-compare';
import {StyleSheet} from 'react-native';

import {Block} from '../block';
import {Button} from '../button';
import {Divider} from '../divider';
import {Icon} from '../icon';
import {Modal} from '../modal';
import {Spacer} from '../spacer';
import {Text} from '../text';

const styles = StyleSheet.create({
  contentModal: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 0,
    paddingVertical: 15,
  },
  textMode: {
    flex: 1,
    fontSize: sizeScale(12),
  },
  title: {
    fontSize: sizeScale(13),
    paddingVertical: 0,
    alignSelf: 'center',
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
  // function
  const _onPress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(mode);
    }
  }, [mode, onPress]);

  // render
  return (
    <Button onPress={_onPress}>
      <Block
        direction={'row'}
        paddingHorizontal={10}
        justifyContent={'center'}
        middle>
        <Icon {...{icon}} />
        <Spacer width={10} />
        <Text numberOfLines={1} style={[styles.textMode]} {...{tx}} />
        {selected && <Icon icon={'check'} />}
      </Block>
    </Button>
  );
};

const Spacing = () => {
  return (
    <>
      <Spacer height={10} />
      <Divider />
      <Spacer height={10} />
    </>
  );
};
const ModalAppModeComponent = forwardRef((_, ref) => {
  // state
  const {appMode} = useSelector(x => x.app);
  const [isVisible, setIsVisible] = useState(false);

  // function
  const _hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const _onButtonPress = useCallback(
    async (mode: AppModeType) => {
      _hideModal();
      await saveString(R.strings.APP_MODE, mode);
      dispatch(onSetAppMode(mode));
    },
    [_hideModal],
  );

  // effect
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
    [_hideModal],
  );

  // render
  return (
    <Modal
      animatedIn={'slideInUp'}
      animatedOut={'slideOutDown'}
      onBackdropPress={_hideModal}
      onBackButtonPress={_hideModal}
      style={{justifyContent: 'flex-end'}}
      isVisible={isVisible}>
      <Block color={'red'}>
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
export interface ModalAppMode {
  show(): void;
  hide(): void;
}
