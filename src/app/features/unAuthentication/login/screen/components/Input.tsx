import React, { memo } from 'react'
import { Block, TextField } from '@components';
import isEqual from 'react-fast-compare'
import { FieldError } from 'react-hook-form/dist/types/form';

interface InputProps {
    name: string;
    label: string;
    error?: FieldError | undefined;
    nameTrigger?: string;
}

const InputComponent = ({ label, name, nameTrigger, error, ...rest }: InputProps) => {
    return (
        <Block>
            <TextField nameTrigger={nameTrigger} error={error?.message !== undefined} label={label} name={name} typeInput={'flat'} {...rest} />
        </Block>
    )
}

export const Input = memo(InputComponent, isEqual)
