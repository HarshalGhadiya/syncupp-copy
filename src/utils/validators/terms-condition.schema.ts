import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const termsAndConditionSchema = z.object({
  title: z.string().min(1, { message: messages.titleIsRequired }).max(50, { message: messages.titleLength }),
  description: z.string().min(5, { message: messages.descriptionIsRequired }).max(400, { message:messages.descriptionLength }),
});

// generate form types from zod validation schema
export type TermsAndConditionSchema = z.infer<typeof termsAndConditionSchema>;
