import { z } from 'zod';
import { messages } from '@/config/messages';

// Call meeting form zod validation schema
export const addCallMeetingSchema = z.object({
  title: z.string().min(1, { message: messages.titleIsRequired }).max(50, { message: messages.taskTitleLength }),
  description: z.string().optional(),
  due_date: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }), 
  start_time: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }).optional(), 
  end_time: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }).optional(), 
  client: z
  .string({ required_error: messages.clientRequired })
  .min(1, { message: messages.clientRequired }),
  assigned: z
  .string({ required_error: messages.teamMemberRequired })
  .min(1, { message: messages.teamMemberRequired }),
  notes: z.string().optional(),
  done: z.boolean().optional(),
});

// generate form types from zod validation schema
export type AddCallMeetingSchema = z.infer<typeof addCallMeetingSchema>;





// Other form zod validation schema

export const addOtherFormSchema = z.object({
  title: z.string().min(1, { message: messages.titleIsRequired }).max(50, { message: messages.taskTitleLength }),
  description: z.string().optional(),
  due_date: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }), 
  recurring_date: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }),
  start_time: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }).optional(), 
  end_time: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }).optional(),
  client: z
  .string({ required_error: messages.clientRequired })
  .min(1, { message: messages.clientRequired }),
  assigned: z
  .string({ required_error: messages.teamMemberRequired })
  .min(1, { message: messages.teamMemberRequired }),
  notes: z.string().optional(),
  done: z.boolean().optional(),
});

// generate form types from zod validation schema
export type AddOtherFormSchema = z.infer<typeof addOtherFormSchema>;