import {isIos} from '@common';
import {AppTheme} from '@config/type';
import {useTheme} from '@react-navigation/native';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import equals from 'react-fast-compare';
import {ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Block} from '../Block/Block';
import {Text} from '../Text/Text';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  contentModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMsg: {
    color: '#333333',
    fontSize: 14,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  textMsgIOS: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 10,
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  row: {flexDirection: 'row'},
  column: {
    flexDirection: 'column',
  },
  wrapDialogRow: {
    width: width - 32,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  wrapDialogColumn: {
    padding: 20,
    overflow: 'hidden',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.87)',
  },
});

const ProgressDialogComponent = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: (msg: string) => {
        setMessage(msg);
        setVisible(true);
      },
      hide: () => {
        setVisible(false);
      },
    }),
    [],
  );
  // state
  const theme: AppTheme = useTheme();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  // function
  const _onModalHide = useCallback(() => {
    setMessage('');
  }, []);

  // render
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      onModalHide={_onModalHide}
      animationIn={'fadeIn'}
      style={[styles.modal]}
      animationOut={'fadeOut'}>
      <Block style={[styles.contentModal]}>
        <Block
          style={[!isIos ? styles.wrapDialogRow : styles.wrapDialogColumn]}>
          <ActivityIndicator
            color={!isIos ? theme.colors.primary : '#ffffff'}
          />
          {message && (
            <Text style={[!isIos ? styles.textMsg : styles.textMsgIOS]}>
              {message}
            </Text>
          )}
        </Block>
      </Block>
    </Modal>
  );
});
export const ProgressDialog = memo(ProgressDialogComponent, equals);
export interface ProgressDialogRef {
  show(msg: string): void;
  hide(): void;
}
