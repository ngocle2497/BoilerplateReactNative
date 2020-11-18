import { FieldErrors, SetValueConfig, ValidationRules } from 'react-hook-form'
type FieldValues = Record<string, any>;

export type ValidationMap<T = any, Keys extends keyof T = keyof T> = {
  [K in Keys]-?: ValidationRules;
};

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
  trigger?: (name?: any) => Promise<boolean>;

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
  setValue: (name: any, value?: any, options?: SetValueConfig) => void;
}
