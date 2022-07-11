import { FormLoginType } from '@model/authentication';
import * as yup from 'yup';

export const loginValidation: yup.SchemaOf<FormLoginType> = yup.object().shape({
  email: yup.string().required('Name is required').email(),
  password: yup.string().required('Password is required'),
});
