import { FormLoginType } from '@model/login';

export interface FormLoginProps {
  onSubmit: (data: FormLoginType) => void;
}
