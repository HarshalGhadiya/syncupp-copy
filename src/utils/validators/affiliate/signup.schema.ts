import { z } from 'zod';
import { messages } from '@/config/messages';
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateContactNumber,
} from '@/utils/validators/common-rules';

// form zod validation schema
// Define the schema
export const signUpSchema = z.object({
    name: z.string().min(1, { message: messages.firstNameRequired }).max(15, { message: messages.firstNameMaxLength }),
    email: validateEmail,
    company_name: z.string().min(1, { message: messages.companynameRequired }).max(30, { message: messages.companyNameMaxLength }),
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    isAgreedtoemail: z.boolean().refine(value => value === true, {
        message: "This field is required."
    }),
    isAgreedtotems: z.boolean().refine(value => value === true, {
        message: "This field is required."
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: messages.passwordsDidNotMatch,
    path: ['confirmPassword']
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;




