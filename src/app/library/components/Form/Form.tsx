import React, { memo, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import isEqual from 'react-fast-compare'
import { FormProps } from './Form.props'
import { useForm } from 'react-hook-form'

const FormComponent = ({ register, errors, trigger, rules, setValue, children, }: FormProps) => {
    const Inputs = React.useRef<Array<TextInput>>([]);

    useEffect(() => {
        (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
            if (child.props.name)
                register({ name: child.props.name }, rules && rules[child.props.name]);
        });
    }, [register])
    return (
        <>
            {(Array.isArray(children) ? [...children] : [children]).map(
                (child, i) => {
                    return child.props.name
                        ? React.createElement(child.type, {
                            ...{
                                ...child.props,
                                ref: (e: TextInput) => {
                                    Inputs.current[i] = e;
                                },
                                trigger: trigger,
                                onSetValueHookForm: setValue,
                                keyName: child.props.name,
                                onSubmitEditing: () => {
                                    Inputs.current[i + 1]
                                        ? Inputs.current[i + 1].focus()
                                        : Inputs.current[i].blur();
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
