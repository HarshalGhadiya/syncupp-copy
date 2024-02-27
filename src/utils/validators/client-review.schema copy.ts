import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const clientReviewSchema = z.object({
  client_review_image:z.string(),
  customer_name: z.string().min(1, { message: messages.customerNameRequired }).max(15, { message: messages.customerNameMaxLength }),
  company_name: z.string().min(5, { message: messages.companyNameRequired }).max(30, { message: messages.companyNameMaxLength }),
  review: z.string().min(5, { message: messages.reviewIsRequired }).max(150, { message:messages.reviewLength }).optional(),
});

// generate form types from zod validation schema
export type ClientReviewSchema = z.infer<typeof clientReviewSchema>;
