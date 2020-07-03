import React, { memo, useEffect } from 'react'
import { TextInput, Keyboard } from 'react-native'
import isEqual from 'react-fast-compare'
import { FormProps } from './Form.props'
import { onCheckType } from '@common'

const FormComponent = ({ register, errors, trigger, rules, setValue, children, }: FormProps) => {
    const Inputs = React.useRef<Array<TextInput>>([]);

    useEffect(() => {
        (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
            if (child.props.name)
                register({ name: child.props.name }, rules && rules[child.props.name]);
        });
    }, [register])
    useEffect(() => {
        console.log('Inputs', Inputs)
        console.log('Inputs', children)
        return () => {

        }
    }, [Inputs])
    return (
        <>
            {(Array.isArray(children) ? [...children] : [children]).map(
                (child, i) => {
                    return child.props.name
                        ? React.createElement(child.type, {
                            ...{
                                returnKeyType: i + 1 < Inputs.current.length ? 'next' : 'send',
                                ...child.props,
                                ref: (e: TextInput) => {
                                    Inputs.current[i] = e;
                                },
                                key: i,
                                trigger: trigger,
                                onSetValueHookForm: setValue,
                                keyName: child.props.name,
                                onSubmitEditing: () => {
                                    if (Inputs.current.length > i + 1) {
                                        Inputs.current[i + 1]
                                            ? Inputs.current[i + 1].focus()
                                            : Inputs.current[i].blur();
                                    } else {
                                        if (onCheckType(child.props.onSubmit, 'function')) {
                                            child.props.onSubmit()
                                        }
                                        Keyboard.dismiss();
                                    }
                                },
                                //onBlur: () => triggerValidation(child.props.name),
                                blurOnSubmit: false,
                                //name: child.props.name,
                                error: errors[child.props.name],
                            },
                        })
                        : child;
                }
            )}
        </>
    )
}

export const Form = memo(FormComponent, isEqual)
