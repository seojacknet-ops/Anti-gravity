import * as z from 'zod';

export const OnboardingDataSchema = z.object({
  vibe: z.object({
    colors: z.string().min(1, 'Brand Colors are required'),
    style: z.string().min(1, 'Style Preference is required'),
    examples: z.string().url('Please enter a valid URL').optional(),
  }),
  content: z.object({
    logo: z.any().optional(), // Zod's file validation is tricky on the client-side
    bio: z.string().min(20, 'Please provide a longer bio (min 20 chars)'),
  }),
  goal: z.string().min(1, 'Please select a goal'),
});

export const UserProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  plan: z.enum(['free', 'pro', 'enterprise']),
  avatarUrl: z.string().url().optional(),
});