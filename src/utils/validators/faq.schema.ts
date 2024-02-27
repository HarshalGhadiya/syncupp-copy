import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const faqSchema = z.object({
  title: z.string().min(1, { message: messages.titleIsRequired }).max(100, { message: messages.titleLength }),
  description: z.string().min(5, { message: messages.descriptionIsRequired }).max(400, { message:messages.descriptionLength }),
});

// generate form types from zod validation schema
export type FaqSchema = z.infer<typeof faqSchema>;
