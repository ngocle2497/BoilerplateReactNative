import React, { memo, useEffect, useRef, useState } from 'react';
import { Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

import equals from 'react-fast-compare';

import { styles } from './styles';
import { OtpProps } from './type';

import { Spacer } from '../spacer';

const OtpComponent = (props: OtpProps) => {
  // state
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
  const _inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // function
  const _onOtpChange = (text: string) => {
    const textTrim = text.trim().toString();
    if (textTrim.length <= length) {
      setOtp(text.trim().toString());
    }
  };

  const _setFocus = () => {
    if (_inputRef.current) {
      _inputRef.current.focus();
    }
  };

  const _onFocus = () => {
    setIsFocused(true);
  };

  const _onBlur = () => {
    setIsFocused(false);
  };

  // effect
  useEffect(() => {
    if (defaultOtp) {
      setOtp(
        defaultOtp.length > length ? defaultOtp.slice(0, length) : defaultOtp,
      );
    }
  }, [defaultOtp, length]);

  useEffect(() => {
    if (otp.length === length) {
      onOtpValid && onOtpValid();
    } else {
      onOtpInValid && onOtpInValid();
    }
  }, [length, onOtpInValid, onOtpValid, otp]);

  // render
  return (
    <TouchableWithoutFeedback onPress={_setFocus}>
      <View style={[styles.wrap, styles.row, containerStyle]}>
        <TextInput
          ref={_inputRef}
          value={otp}
          onFocus={_onFocus}
          onBlur={_onBlur}
          autoCapitalize={'none'}
          autoFocus={false}
          underlineColorAndroid={'transparent'}
          onChangeText={_onOtpChange}
          selectionColor={'transparent'}
          style={styles.input}
          {...rest}
        />
        {length &&
          Array(length)
            .fill(0)
            .map((item, index) => {
              return (
                <View key={index} style={styles.row}>
                  <View
                    style={[
                      styles.otpView,
                      wrapInputStyle,
                      (index === otp.length ||
                        (length === otp.length && index === otp.length - 1)) &&
                        isFocused && [
                          styles.otpViewActive,
                          wrapInputActiveStyle,
                        ],
                    ]}>
                    <Text
                      children={
                        index <= otp.length - 1
                          ? textEntry?.charAt(0) ?? otp.charAt(index)
                          : ''
                      }
                      style={[styles.otpText, textStyle]}
                    />
                  </View>
                  <Spacer width={15} />
                </View>
              );
            })}
      </View>
    </TouchableWithoutFeedback>
  );
};
export const Otp = memo(OtpComponent, equals);
