import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const ckeditorsSchema = z.object({
  description: z.string().refine(
    (value) => {
      if (value !== '<p><br></p>' && value !== '') {
        return true;
      } else {
        return false;
      }
    },
    {
      message: messages.descriptionIsRequired,
    }
  ),
});

// generate form types from zod validation schema
export type CkeditorSchema = z.infer<typeof ckeditorsSchema>;
