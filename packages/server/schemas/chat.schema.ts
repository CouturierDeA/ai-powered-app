import z from 'zod';

export const chatSchema = z.object({
    prompt: z
        .string()
        .trim()
        .min(1, 'Prompt is required')
        .max(1_000, 'Prompt is too long (max 100 characters)'),
    conversationId: z.string().uuid(),
});
