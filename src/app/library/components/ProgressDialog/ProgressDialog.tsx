import React, {memo, useState, forwardRef, useImperativeHandle} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import {Block} from '../Block/Block';
import {Text} from '../Text/Text';
import Modal from 'react-native-modal';
import equals from 'react-fast-compare';
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
        setVisible(true);
      },
    }),
    [],
  );
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const _onModalHide = () => {
    setMessage('');
  };
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0}
      onModalHide={_onModalHide}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}>
      <Block style={[styles.contentModal]}>
        <Block
          style={[
            Platform.OS === 'android'
              ? styles.wrapDialogRow
              : styles.wrapDialogColumn,
          ]}>
          <ActivityIndicator
            color={Platform.OS === 'android' ? undefined : '#ffffff'}
          />
          {message && (
            <Text
              style={[
                Platform.OS === 'android' ? styles.textMsg : styles.textMsgIOS,
              ]}>
              {message}
            </Text>
          )}
        </Block>
      </Block>
    </Modal>
  );
});
export const ProgressDialog = memo(
  ProgressDialogComponent,
  (prevProps, nextProps) => equals(prevProps, nextProps),
);
export interface ProgressDialogRef {
  show(msg: string): void;
  hide(): void;
}
