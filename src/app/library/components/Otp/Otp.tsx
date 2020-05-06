import React, { useState, useEffect, useMemo, memo } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { OtpProps } from './Otp.props'
import { Text } from '../Text/Text'
import { Block } from '../Block/Block';
import { mergeAll, flatten, equals } from 'ramda';
import { AppTheme } from '@config/type';
import { useTheme } from '@react-navigation/native';

const WIDTH_OTP = 32;
const HEIGHT_OTP = 40;

const styles = () => {
    const theme: AppTheme = useTheme();
    return useMemo(() => StyleSheet.create({
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
            borderWidth: 1,
            borderColor: theme.colors.border
        },
        otpViewActive: {
            borderColor: theme.colors.primaryDarker
        },
        otpText: {
            fontSize: theme.fontSize.FONT_14,
            color: theme.colors.primary,
            textAlignVertical: 'bottom'
        },
        sizeBoxW15: {
            width: 15,
        },
        row: {
            flexDirection: 'row'
        },
        input: {
            width: '100%',
            position: 'absolute',
            textAlign: 'center',
            height: HEIGHT_OTP,
            backgroundColor: 'transparent',
            color: 'transparent',
            opacity: 0
        }
    }), [theme])
}

const OtpComponent = (props: OtpProps) => {
    const { length, defaultOtp = '', onOtpValid, onOtpInValid,
        textEntry, wrapInputActiveStyle = {}, wrapInputStyle = {}, containerStyle = {}, textStyle = {}, ...rest } = props;
    const [otp, setOtp] = useState('')
    const _onOtpChange = (text: string) => {
        const textTrim = text.trim().toString()
        if (textTrim.length <= length) {
            setOtp(text.trim().toString())
        }
    }
    useEffect(() => {
        if (defaultOtp) {
            setOtp(defaultOtp.length > length ? defaultOtp.slice(0, length) : defaultOtp)
        }
    }, [defaultOtp])
    useEffect(() => {
        if (otp.length === length) {
            onOtpValid && onOtpValid()
        } else {
            onOtpInValid && onOtpInValid()
        }
    }, [otp])
    const container = mergeAll(
        flatten([styles().wrap, styles().row, containerStyle]),
    );
    const wrapInput = mergeAll(
        flatten([styles().otpView, wrapInputStyle]),
    );
    const wrapInputActive = mergeAll(
        flatten([styles().otpViewActive, wrapInputActiveStyle]),
    );
    const text = mergeAll(
        flatten([styles().otpText, textStyle]),
    );
    const sizeBoxW15 = mergeAll(
        flatten([styles().sizeBoxW15]),
    );
    const input = mergeAll(
        flatten([styles().input]),
    );
    const row = mergeAll(
        flatten([styles().row]),
    );

    return (
        <Block style={container}>
            {length && Array(length).fill(0).map((item, index) => {
                return (
                    <Block key={index} style={row}>
                        <Block style={[wrapInput, index === otp.length && wrapInputActive]}>
                            <Text text={index <= otp.length - 1 ? textEntry?.charAt(0) ?? otp.charAt(index) : ''} style={text} />
                        </Block>
                        <Block style={sizeBoxW15} />
                    </Block>

                )
            })}
            <TextInput
                value={otp}
                autoCapitalize={'none'}
                autoFocus={false}
                underlineColorAndroid={'transparent'}
                onChangeText={_onOtpChange}
                selectionColor={'transparent'}
                style={input}
                {...rest} />
        </Block>
    )
}
export const Otp = memo(OtpComponent, (prevProps, nextProps) => equals(prevProps, nextProps))