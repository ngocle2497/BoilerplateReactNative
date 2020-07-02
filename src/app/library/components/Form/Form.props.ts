import { } from 'react-hook-form'
import { DeepMap } from 'react-hook-form/dist/types/utils';
import { FieldErrors, FieldName, ValidationRules, SetValueConfig } from 'react-hook-form/dist/types/form';

type FieldValues = Record<string, any>;
export interface ValidationMap {
  [key: string]: ValidationRules;
}

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  /**
   * Children of Form
   */
  children: JSX.Element | JSX.Element[];

  /**
   * validate of react hook form
   */
  rules?: ValidationMap;

  /**
   * trigger function of useForm
   */
  trigger?: (name?: FieldName<TFieldValues> | FieldName<TFieldValues>[]) => Promise<boolean>;

  /**
   * register function of useForm
   */
  register: ({ name }: { name: string }, rules?: ValidationRules) => void;

  /**
   * List errors of useForm
   */
  errors: FieldErrors<TFieldValues>;

  /**
   * setValue function of useForm
   */
  setValue: (name: string, value?: string, options?: SetValueConfig) => void;
}