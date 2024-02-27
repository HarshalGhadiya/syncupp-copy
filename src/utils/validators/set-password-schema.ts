import { z } from "zod";
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateContactNumber,
} from '@/utils/validators/common-rules';


// form zod validation schema
export const setPasswordSchema = z.object({
    // firstName: z.string().min(1, { message: messages.firstNameRequired }),
    // lastName: z.string().min(1, { message: messages.lastNameRequired }),
    email: validateEmail,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    // isAgreed: z.boolean(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['confirmPassword'], // Correct path for the confirmedPassword field
  });
  
  // generate form types from zod validation schema
  export type SetPasswordSchema = z.infer<typeof setPasswordSchema>;