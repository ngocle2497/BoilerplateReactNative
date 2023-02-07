import { FormLoginType } from '@model/authentication';
import { z } from 'zod';

import { stringifyObjectValidate } from '../string/index';

export const loginValidation = z.object<ZodShape<FormLoginType>>({
  email: z
    .string()
    .min(
      1,
      stringifyObjectValidate({
        keyT: 'validation:email_required',
      }),
    )
    .email(),
  password: z.string().min(1, 'Password is required'),
});
