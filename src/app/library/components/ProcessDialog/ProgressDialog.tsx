import React from 'react';
import {
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { ProcessProps } from './Progress.props';
import { Block } from '../Block/Block';
const { width } = Dimensions.get('window');
export function ProcessDialog(props: ProcessProps) {
  const { visible = false, message = '' } = props;
  return (
    <Modal
      visible={visible}
      animated={true}
      animationType={'none'}
      transparent={true}>
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
          <Text
            style={[
              Platform.OS === 'android' ? styles.textMsg : styles.textMsgIOS,
            ]}>
            {message && message} ...
          </Text>
        </Block>
      </Block>
    </Modal>
  );
}
const styles = StyleSheet.create({
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
  row: { flexDirection: 'row' },
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
