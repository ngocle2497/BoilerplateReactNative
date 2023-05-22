import { FormLoginType } from '@model/authentication';

export interface FormLoginProps {
  onSubmit: (data: FormLoginType) => void;
}
