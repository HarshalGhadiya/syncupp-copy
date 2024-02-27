import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const agrementFormSchema = z.object({
    title: z.string().min(1, { message: messages.titleIsRequired }).max(100, { message: messages?.titleMaxlength }),  // string 
    recipient: z.string().min(1, { message: messages?.RecipientIsRequired }),      //  dropdown selection 
    due_date: z.string().min(1, { message: messages?.dueDateIsRequired }),          // date picker value
    description: z.string().min(1, { message: messages?.descriptionRequired }).max(4000, { message: messages.descriptionmaxLength }),                // react text box editor of react quill
});

export type AgrementFormTypes = z.infer<typeof agrementFormSchema>;