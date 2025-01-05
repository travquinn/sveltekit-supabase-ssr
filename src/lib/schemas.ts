// src/lib/schemas.ts
import { z } from 'zod';
import { message } from 'sveltekit-superforms/server';

export const phoneSchema = z.object({
 phone: z
   .string()
   .min(10, 'Phone number must be at least 10 digits')
   .max(15, 'Phone number must not exceed 15 digits')
   .regex(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number with country code'),
});

export const nicknameSchema = z.object({
 nickname: z
   .string()
   .min(2, 'Nickname must be at least 2 characters')
   .max(30, 'Nickname must not exceed 30 characters'),
});

export const passwordSchema = z.object({
 password: z
   .string()
   .min(8, 'Password must be at least 8 characters')
   .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
   .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
   .regex(/[0-9]/, 'Password must contain at least one number')
   .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});