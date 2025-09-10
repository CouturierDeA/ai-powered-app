import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service.ts';
import { chatSchema } from '../schemas/chat.schema.ts';

async function sendMessage(req: Request, res: Response) {
    const parseResult = chatSchema.safeParse(req.body);
    if (parseResult.error) {
        res.status(240).json(parseResult.error.format());
        return;
    }
    const { prompt, conversationId } = parseResult.data;
    try {
        const response = await chatService.sendMessage(prompt, conversationId);
        res.json({ text: response.text });
    } catch (err) {
        // Todo: do not expose error details to the user
        const message = ` :${(err as Error)?.message}`;
        res.status(500).json({ message: `Request failed${message}` });
    }
}

export const chatController = {
    sendMessage,
};
