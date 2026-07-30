import { z } from 'zod';

export const registerSchema = z.object ({
    email: z.string().min(10, 'Email must be at least 10 characters long.'),
    password: z.string().min(4, 'Password should be at least 4 characters long'),
    rePassword: z.string(),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
});

export const loginSchema = z.object ({
    email: z.string().min(10, 'Email must be at least 10 characters long.'),
    password: z.string().min(4, 'Password should be at least 4 characters long')
})