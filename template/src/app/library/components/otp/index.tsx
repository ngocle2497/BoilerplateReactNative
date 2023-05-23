import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { execFunc } from '@common';

import { styles } from './styles';
import { OtpProps } from './type';

import { Spacer } from '../spacer';

export const Otp = ({
  length,
  textEntry,
  onOtpFilled,
  defaultOtp = '',
  ...rest
}: OtpProps) => {
  // state
  const [otp, setOtp] = useState('');

  const _inputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  // function
  const onOtpChange = (text: string) => {
    const textTrim = text.trim().toString();

    if (textTrim.length <= length) {
      setOtp(text.trim().toString());
    }
  };

  const setFocus = () => {
    if (_inputRef.current) {
      _inputRef.current.focus();
    }
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
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
      execFunc(onOtpFilled, otp);

      Keyboard.dismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  // render
  return (
    <TouchableWithoutFeedback onPress={setFocus}>
      <View style={[styles.wrap, styles.row]}>
        <TextInput
          ref={_inputRef}
          value={otp}
          onFocus={onFocus}
          onBlur={onBlur}
          autoCapitalize={'none'}
          autoFocus={false}
          underlineColorAndroid={'transparent'}
          onChangeText={onOtpChange}
          selectionColor={'transparent'}
          style={styles.input}
          {...rest}
        />
        {length &&
          Array(length)
            .fill(0)
            .map((_, index) => {
              return (
                <View key={index} style={styles.row}>
                  <View
                    style={[
                      styles.otpView,
                      (index === otp.length ||
                        (length === otp.length && index === otp.length - 1)) &&
                        isFocused && [styles.otpViewActive],
                    ]}>
                    <Text
                      children={
                        index <= otp.length - 1
                          ? textEntry?.charAt(0) ?? otp.charAt(index)
                          : ''
                      }
                      style={[styles.otpText]}
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
