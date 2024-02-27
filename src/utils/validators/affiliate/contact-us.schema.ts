import { z } from 'zod';
import { messages } from '@/config/messages';
import {
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateContactNumber,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const contactusSchema = z.object({
    first_name: z.string().min(1, { message: messages.firstNameRequired }).max(15, { message: messages.firstNameMaxLength }),
    last_name: z.string().min(1, { message: messages.lastNameRequired }).max(15, { message: messages.lastNameLength }),
    email: validateEmail,
    contact_number: validateContactNumber,
    country: z.string().optional(),
    no_of_people: z.string().optional(),
    thoughts: z.string().min(1, { message: messages.thoughtsRequired }).max(400, { message: messages.thoughtsMaxlength }),
    isAgreedtosyncup: z.boolean().refine(value => value === true, {
        message: "This field is required."
    }),
})

// generate form types from zod validation schema
export type ContactusSchema = z.infer<typeof contactusSchema>;




