import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const agencyTeamClientTeamAgencyFormSchema = z.object({
  email: validateEmail,
  first_name: z.string().min(1, { message: messages.firstNameRequired }).max(15, { message: messages.firstNameLength }),
  last_name: z.string().min(1, { message: messages.lastNameRequired }),
  contact_number: z.string().trim().nullable().refine(value => {
    return !value || /^[0-9]{10,13}$/.test(value);
}, {
    message: messages.contactLengthMin,
}),
})
export type AgencyTeamClientTeamAgencyFormSchema = z.infer<typeof agencyTeamClientTeamAgencyFormSchema>;