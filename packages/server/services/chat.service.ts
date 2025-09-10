import { conversationRepository } from '../repositories/conversation.repository.ts';
import { parkInfoInstructions } from '../llm/prompts/instructions.ts';
import { llmClient } from '../llm/client.ts';

export const chatService = {
    async sendMessage(prompt: string, conversationId: string) {
        const response = await llmClient.makeChat({
            prompt,
            temperature: 0.2,
            maxTokens: 100,
            previousResponseId: conversationId,
            instructions: parkInfoInstructions,
        });
        conversationRepository.setLastResponseId(conversationId, response.id);
        return response;
    },
};
