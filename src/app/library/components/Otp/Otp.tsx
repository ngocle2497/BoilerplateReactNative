import React, {useState, useEffect, useMemo, memo} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {OtpProps} from './Otp.props';
import {Text} from '../Text/Text';
import {Block} from '../Block/Block';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {ColorDefault} from '@theme/color';
import {FontSizeDefault} from '@theme/fontSize';

const WIDTH_OTP = 32;
const HEIGHT_OTP = 40;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpView: {
    width: WIDTH_OTP,
    height: HEIGHT_OTP,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: ColorDefault.border,
  },
  otpViewActive: {
    borderColor: ColorDefault.primaryDarker,
  },
  otpText: {
    fontSize: FontSizeDefault.FONT_14,
    color: ColorDefault.primary,
    textAlignVertical: 'bottom',
  },
  sizeBoxW15: {
    width: 15,
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    height: HEIGHT_OTP,
    backgroundColor: 'transparent',
    color: 'transparent',
    opacity: 0,
  },
});

const OtpComponent = (props: OtpProps) => {
  const {
    length,
    defaultOtp = '',
    onOtpValid,
    onOtpInValid,
    textEntry,
    wrapInputActiveStyle = {},
    wrapInputStyle = {},
    containerStyle = {},
    textStyle = {},
    ...rest
  } = props;
  const [otp, setOtp] = useState('');
  const _onOtpChange = (text: string) => {
    const textTrim = text.trim().toString();
    if (textTrim.length <= length) {
      setOtp(text.trim().toString());
    }
  };
  useEffect(() => {
    if (defaultOtp) {
      setOtp(
        defaultOtp.length > length ? defaultOtp.slice(0, length) : defaultOtp,
      );
    }
  }, [defaultOtp]);
  useEffect(() => {
    if (otp.length === length) {
      onOtpValid && onOtpValid();
    } else {
      onOtpInValid && onOtpInValid();
    }
  }, [otp]);
  const container = useMemo(
    () => enhance([styles.wrap, styles.row, containerStyle]),
    [],
  );
  const wrapInput = useMemo(
    () => enhance([styles.otpView, wrapInputStyle]),
    [],
  );
  const wrapInputActive = useMemo(
    () => enhance([styles.otpViewActive, wrapInputActiveStyle]),
    [],
  );
  const text = useMemo(() => enhance([styles.otpText, textStyle]), []);
  const sizeBoxW15 = useMemo(() => enhance([styles.sizeBoxW15]), []);
  const input = useMemo(() => enhance([styles.input]), []);
  const row = useMemo(() => enhance([styles.row]), []);

  return (
    <Block style={container}>
      {length &&
        Array(length)
          .fill(0)
          .map((item, index) => {
            return (
              <Block key={index} style={row}>
                <Block
                  style={[wrapInput, index === otp.length && wrapInputActive]}>
                  <Text
                    text={
                      index <= otp.length - 1
                        ? textEntry?.charAt(0) ?? otp.charAt(index)
                        : ''
                    }
                    style={text}
                  />
                </Block>
                <Block style={sizeBoxW15} />
              </Block>
            );
          })}
      <TextInput
        value={otp}
        autoCapitalize={'none'}
        autoFocus={false}
        underlineColorAndroid={'transparent'}
        onChangeText={_onOtpChange}
        selectionColor={'transparent'}
        style={input}
        {...rest}
      />
    </Block>
  );
};
export const Otp = memo(OtpComponent, (prevProps, nextProps) =>
  equals(prevProps, nextProps),
);
