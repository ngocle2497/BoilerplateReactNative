import React, { memo, useMemo } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import isEqual from 'react-fast-compare'
import { Form } from '@components'
import { useForm, SubmitHandler, Resolver } from 'react-hook-form'

import { Input } from './Input';
import { onCheckType } from '@common'

type FormValue = {
    name: string;
    password: string;
    repassword: string;
}

interface FormLoginProps {
    onSubmit: (data: FormValue) => void
}


const FormLoginComponent = ({ onSubmit }: FormLoginProps) => {
    const { register, setValue, trigger, getValues, formState, errors, handleSubmit } = useForm<FormValue>({})
    const rules = useMemo(() => ({
        name: { required: { value: true, message: 'Name is required' } },
        repassword: {
            validate: (val: any) => onCheckType(getValues().password, 'undefined') || onCheckType(getValues().repassword, 'undefined') || val === getValues().password || "Passwords do not match"
        }
    }), [])
    return (
        <>
            <Form {...{ register, setValue, trigger, rules, errors }}>
                <Input name={'name'} label={'Name'} />
                <Input nameTrigger={'repassword'} name={'password'} label={'Password'} />
                <Input nameTrigger={'password'} name={'repassword'} label={'Confirm Password'} />
                <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
            </Form>
        </>
    )
}

export const FormLogin = memo(FormLoginComponent, isEqual)

const styles = StyleSheet.create({})
