import {R} from '@assets/value';
import {dispatch, useSelector} from '@common';
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

import {Block} from '../block';
import {Button} from '../button';
import {Divider} from '../divider';
import {Icon} from '../icon';
import {Modal} from '../modal';
import {Spacer} from '../spacer';
import {Text} from '../text';

import {styles} from './styles';
import {ButtonSelectProps} from './type';

const ButtonSelect = memo(
  ({tx, mode, icon, onPress, selected = false}: ButtonSelectProps) => {
    // function
    const onPressMode = useCallback(() => {
      if (typeof onPress === 'function') {
        onPress(mode);
      }
    }, [mode, onPress]);

    // render
    return (
      <Button onPress={onPressMode}>
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
  },
  isEqual,
);

const Spacing = memo(() => {
  return (
    <>
      <Spacer height={10} />
      <Divider />
      <Spacer height={10} />
    </>
  );
}, isEqual);

const ModalAppModeComponent = forwardRef((_, ref) => {
  // state
  const {appMode} = useSelector(x => x.app);
  const [isVisible, setIsVisible] = useState(false);

  // function
  const hideModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onButtonPress = useCallback(
    async (mode: AppModeType) => {
      hideModal();
      await saveString(R.strings.APP_MODE, mode);
      dispatch(onSetAppMode(mode));
    },
    [hideModal],
  );

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setIsVisible(true);
      },
      hide: () => {
        hideModal();
      },
    }),
    [hideModal],
  );

  // render
  return (
    <Modal
      animatedIn={'slideInUp'}
      animatedOut={'slideOutDown'}
      onBackdropPress={hideModal}
      onBackButtonPress={hideModal}
      style={{justifyContent: 'flex-end'}}
      isVisible={isVisible}>
      <Block color={'red'}>
        <Block style={[styles.contentModal]}>
          <Text style={[styles.title]} tx={'common:textAppMode'} />
          <ButtonSelect
            selected={appMode === APP_MODE.DEV}
            icon={'app_dev'}
            onPress={onButtonPress}
            mode={APP_MODE.DEV}
            tx={'common:textAppDev'}
          />
          <Spacing />
          <ButtonSelect
            selected={appMode === APP_MODE.STAGING}
            icon={'app_test'}
            onPress={onButtonPress}
            mode={APP_MODE.STAGING}
            tx={'common:textAppTest'}
          />
          <Spacing />
          <ButtonSelect
            selected={appMode === APP_MODE.PROD}
            icon={'app_prod'}
            onPress={onButtonPress}
            mode={APP_MODE.PROD}
            tx={'common:textAppProd'}
          />
        </Block>
      </Block>
    </Modal>
  );
});

export const ModalAppMode = memo(ModalAppModeComponent, isEqual);
export type ModalAppMode = {
  show(): void;
  hide(): void;
};
