import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateContactNumber,
} from '@/utils/validators/common-rules';




// form zod validation schema
export const clientSchema = z.object({
    first_name: z.string().min(1, { message: messages.firstNameRequired }).max(15, { message: messages.firstNameLength }),
    last_name: z.string().min(1, { message: messages.lastNameRequired }).max(15, { message: messages.lastNameLength }),
    // name: z.string().min(1, { message: messages.nameRequired }).max(20, { message: messages.nameLength }),
    email: validateEmail,
    contact_number: z.string().trim().nullable().refine(value => {
        return !value || /^[0-9+-]{10,13}$/.test(value);
    }, {
        message: messages.contactLengthMin,
    }),
    // titleOption: z.string().min(1, { message: messages.companyNameRequired }),
    company_name: z.string().min(1, { message: messages.companyNameRequired }).max(30, { message: messages.companyNameMaxLength }),
    company_website: z.string().trim().nullable().refine(value => {
        return !value || /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/[^\s]*)?$/.test(value);
    }, {
        message: messages.companyUrlInvalid,
    }),
    address: z.string().min(5, { message: messages.AddressRequired }),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    title: z.string().max(30, { message: messages.titleLength }).optional(),
    pincode: z.string().trim().nullable().refine(value => {
        return !value || /^[0-9]{0,6}$/.test(value);
    }, {
        message: 'Pin code must be a numeric value with a maximum length of 6.',
    }),
  })
  
  // generate form types from zod validation schema
  export type ClientSchema = z.infer<typeof clientSchema>;