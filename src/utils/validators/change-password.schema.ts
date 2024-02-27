import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validatePassword,
  validateNewPassword,
  validateConfirmPassword,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const changePasswordSchema = z
  .object({
    oldPassword: z
    .string()
    .min(1, { message: messages.currentPasswordRequired })
    .min(8, { message: messages.passwordvalidation })
    .regex(new RegExp('.*[A-Z].*'), {
      message: messages.passwordvalidation,
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: messages.passwordvalidation,
    })
    .regex(new RegExp('.*\\d.*'), { message: messages.passwordvalidation })
    .regex(new RegExp('.*[!@#$%^&*()_+\\-=\\[\\]{};:\'\\",.<>/?`~\\\\].*'), {
      message: messages.passwordvalidation,
    }),
    newPassword: z
    .string()
    .min(1, { message: messages.newPasswordRequired })
    .min(8, { message: messages.passwordvalidation })
    .regex(new RegExp('.*[A-Z].*'), {
      message: messages.passwordvalidation,
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: messages.passwordvalidation,
    })
    .regex(new RegExp('.*\\d.*'), { message: messages.passwordvalidation })
    .regex(new RegExp('.*[!@#$%^&*()_+\\-=\\[\\]{};:\'\\",.<>/?`~\\\\].*'), {
      message: messages.passwordvalidation,
    }),
    confirmedPassword: z
    .string()
    .min(1, { message: messages.confirmNewPasswordRequired })
    .min(8, { message: messages.passwordvalidation })
    .regex(new RegExp('.*[A-Z].*'), {
      message: messages.passwordvalidation,
    })
    .regex(new RegExp('.*[a-z].*'), {
      message: messages.passwordvalidation,
    })
    .regex(new RegExp('.*\\d.*'), { message: messages.passwordvalidation })
    .regex(new RegExp('.*[!@#$%^&*()_+\\-=\\[\\]{};:\'\\",.<>/?`~\\\\].*'), {
      message: messages.passwordvalidation,
    }),
  })
  .refine((data) => data.newPassword === data.confirmedPassword, {
    message: messages.newPasswordsDidNotMatch,
    path: ['confirmedPassword'], // Correct path for the confirmedPassword field
  });

// generate form types from zod validation schema
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
