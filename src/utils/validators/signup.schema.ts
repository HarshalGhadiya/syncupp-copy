import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateContactNumber,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameRequired }).max(15, { message: messages.firstNameMaxLength }),
  lastName: z.string().min(1, { message: messages.lastNameRequired }).max(15, { message: messages.lastNameLength }),
  email: validateEmail,
  contact: validateContactNumber,
  password: validatePassword,
  confirmPassword: validateConfirmPassword,
  // isAgreed: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  message: messages.passwordsDidNotMatch,
  path: ['confirmPassword'], // Correct path for the confirmedPassword field
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;


// form zod validation schema
export const companyDetailsSchema = z.object({
  companyName: z.string().min(1, { message: messages.companyNameRequired }).max(30, { message: messages.companyNameMaxLength }),
  companyWebsite: z.string().min(1, { message: messages.companyWebsiteRequired }).url({ message: messages.companyUrlInvalid }),
  peopleCount: z
    .string({ required_error: messages.peopleCountRequired })
    .min(1, { message: messages.peopleCountRequired }),
  industry: z
    .string({ required_error: messages.industryRequired })
    .min(1, { message: messages.industryRequired })
});

// generate form types from zod validation schema
export type CompanyDetailsSchema = z.infer<typeof companyDetailsSchema>;
