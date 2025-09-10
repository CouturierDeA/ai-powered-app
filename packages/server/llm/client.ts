import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { Ollama } from 'ollama';

dotenv.config();

interface GenerateTextOptions {
    model?: string;
    prompt: string;
    temperature?: number;
    maxTokens?: number;
    previousResponseId?: string;
    instructions?: string | null | undefined;
}

export interface LLMTextResponse {
    /**
     * @description Response id
     */
    id: string;
    /**
     * @description Generated text
     */
    text: string;
}

const openAIClient = new OpenAI({
    /**
     * Your public OpenAI key
     */
    apiKey: process.env.OPENAI_API_KEY,
    /**
     * Provie OPENAI_BASE_URL only if you have LLM server running on your local machine
     * otherwise it will use the OpenAI global networking.
     * @example http://localhost:1234/v1
     */
    baseURL: process.env.OPENAI_BASE_URL,
    timeout: 30_000,
});

const ollamaClient = new Ollama();

export const llmClient = {
    async makeChat(options: GenerateTextOptions) {
        const {
            model = 'gpt-4o-mini',
            prompt,
            temperature = 0.2,
            maxTokens = 100,
        } = options;
        const response = await openAIClient.responses.create({
            model,
            input: prompt,
            instructions: options.instructions,
            temperature,
            max_output_tokens: maxTokens,
            previous_response_id: options.previousResponseId,
        });

        return {
            id: response.id,
            text: response.output_text,
        } satisfies LLMTextResponse;
    },
    async summarizeReviews(options: GenerateTextOptions) {
        const {
            temperature,
            prompt,
            instructions,
            model = 'tinyllama',
        } = options;
        const messages = [
            {
                role: 'user',
                content: prompt,
            },
        ];
        if (instructions) {
            messages.push({
                role: 'system',
                content: instructions,
            });
        }
        const response = await ollamaClient.chat({
            model,
            messages,
            options: {
                temperature,
            },
        });
        return response.message.content;
    },
};
