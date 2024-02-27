import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addTaskSchema = z.object({
  title: z.string().min(1, { message: messages.titleIsRequired }).max(50, { message: messages.taskTitleLength }),
  description: z.string().optional(),
  // due_date: z.date({
  //   required_error: messages.dueDateTimeIsRequired,
  // }), 
  due_date: z.date().refine((value) => value !== null, 'Due Date is required'), 
  due_time: z.date({
    required_error: messages.dueDateTimeIsRequired,
  }).optional(), 
  client: z
  .string({ required_error: messages.clientRequired })
  .min(1, { message: messages.clientRequired }),
  assigned: z
  .string({ required_error: messages.teamMemberRequired })
  .min(1, { message: messages.teamMemberRequired }),
  done: z.boolean().optional(),
});

// generate form types from zod validation schema
export type AddTaskSchema = z.infer<typeof addTaskSchema>;
