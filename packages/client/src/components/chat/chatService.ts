import axios from 'axios';

import type { FormData } from '@/components/chat/ChatForm.tsx';
import type { LLMTextResponse } from 'server/llm/client.ts';

export interface ChartData extends FormData {
    conversationId: string;
}

const postChartApi = (data: ChartData) =>
    axios
        .post<LLMTextResponse>('/api/chat', data)
        .then((response) => response.data);

export const chatService = {
    postChartApi,
};
