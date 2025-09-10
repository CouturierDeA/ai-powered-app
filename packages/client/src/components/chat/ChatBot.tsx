import {type KeyboardEvent, useRef, useState} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {useForm} from 'react-hook-form';
import {FaArrowUp} from 'react-icons/fa';
import {Button} from '@/components/ui/button.tsx';

import type {ChatResponse} from '../../../shared.types.ts';

import {ChatMessage} from "@/components/ChatMessage.tsx";

interface FormData {
    prompt: string;
}

interface ChartData extends FormData {
    conversationId: string;
}

export interface UIChatResponse {
    message: string;
    type: 'user' | 'bot',
}

const postChartApi = (data: ChartData) =>
    axios
        .post<ChatResponse>('/api/chat', data)
        .then((response) => ({
            message: response.data.message,
            type: 'bot',
        } satisfies UIChatResponse));

const ChatBot = () => {
    const [messages, setMessages] = useState<UIChatResponse[]>([]);
    const conversationId = useRef(crypto.randomUUID());
    const {register, handleSubmit, reset, formState} = useForm<FormData>();

    const textareaRegister = register('prompt', {
        required: true,
        validate: (data) => !!data.trim().length,
    });

    const submitBinding = handleSubmit(async (data) => {
        setMessages(prev => [...prev, {type: 'user', message: data.prompt}]);
        reset();
        const res = await postChartApi({
            ...data,
            conversationId: conversationId.current,
        });
        setMessages(prev => [...prev, res]);
    });

    const onKeyDown = async (e: KeyboardEvent<HTMLFormElement>) => {
        if (!(e.key === 'Enter' && !e.shiftKey)) return;
        e.preventDefault();
        await submitBinding();
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
                {messages.map((message, key) =>
                    <ChatMessage
                        key={key}
                        variant={message.type}
                    >
                        <ReactMarkdown>{message.message}</ReactMarkdown>
                    </ChatMessage>
                )}
            </div>
            <form onSubmit={submitBinding} onKeyDown={onKeyDown}>
                <div className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl">
               <textarea
                   {...textareaRegister}
                   className="w-full focus:outline-0 resize-none"
                   placeholder="Ask anything"
                   maxLength={100}
               />
                    <Button
                        disabled={!formState.isValid}
                        className="rounded-full w-9 h-9"
                    >
                        <FaArrowUp/>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChatBot;
