import { z } from 'zod';
import { messages } from '@/config/messages';

export const fileSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number(),
});

export type FileSchema = z.infer<typeof fileSchema>;

export const validateEmail = z
  .string()
  .min(1, { message: messages.emailIsRequired })
  .email({ message: messages.invalidEmail });

export const validatePassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
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
  })

export const validateNewPassword = z
  .string()
  .min(1, { message: messages.passwordRequired })
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
  })

export const validateConfirmPassword = z
  .string()
  .min(1, { message: messages.confirmPasswordRequired })
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
  })

  export const validateContactNumber = z 
  .string()
  .min(1, { message: messages.contactRequired })
  .min(10, { message: messages.contactLengthMin })
  .max(13, { message: messages.contactLengthMin })
  .regex( new RegExp(/^[0-9+-]+$/),{
    message : messages.contactLengthMin,
  })