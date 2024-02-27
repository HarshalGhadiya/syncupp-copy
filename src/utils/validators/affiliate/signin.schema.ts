import { z } from 'zod';
import { validateEmail, validatePassword } from '../common-rules';

// form zod validation schema
export const loginSchema = z.object({
    email: validateEmail,
    password: validatePassword,
});

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
