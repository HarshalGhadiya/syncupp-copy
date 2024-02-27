import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const resetPasswordSchema = z
  .object({
    // email: validateEmail,
    password: z
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
    confirmPassword: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: messages.newPasswordsDidNotMatch,
    path: ['confirmPassword'], // Correct path for the confirmedPassword field
  });

// generate form types from zod validation schema
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
