import { z } from 'zod';
import { validateEmail} from './common-rules';
import { messages } from '@/config/messages';

// form zod validation schema
export const teamMemberSchema = z.object({
  email: validateEmail,
  first_name: z.string().min(1, { message: messages.firstNameRequired }).max(15, { message: messages.firstNameLength }),
  last_name: z.string().min(1, { message: messages.lastNameRequired }).max(15, { message: messages.lastNameLength }),
  // name: z.string().min(1, { message: messages.nameRequired }).max(20, { message: messages.nameLength }),
  contact_number: z.string().trim().nullable().refine(value => {
    return !value || /^[0-9+-]{10,13}$/.test(value);
  }, {
    message: messages.contactLengthMin,
  }),
  role: z
  .string({ required_error: messages.roleNameIsRequired })
  .min(1, { message: messages.roleNameIsRequired })
});

// generate form types from zod validation schema
export type TeamMemberSchema = z.infer<typeof teamMemberSchema>;
