import { type ComponentProps, useRef, useState } from 'react';

import { getUid } from '@/utils';
import { chatService } from '@/components/chat/chatService.ts';
import { ChatLoader } from '@/components/chat/ChatLoader.tsx';
import ChatForm, { type FormData } from '@/components/chat/ChatForm.tsx';
import ChatMessages, {
    type ChatMessage,
} from '@/components/chat/ChatMessages.tsx';
import { useMutation } from '@tanstack/react-query';
import { useSound } from '@/components/chat/soundService.ts';

const sounds = useSound();

export const ChatBot = ({ className }: ComponentProps<'div'>) => {
    const conversationId = useRef(getUid());
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const chatQuery = useMutation({
        mutationFn: chatService.postChartApi,
    });

    const addMessage = (newMessage: ChatMessage) =>
        setMessages((prev) => [...prev, newMessage]);

    const askQuestion = async (data: FormData) => {
        addMessage({ type: 'user', message: data.prompt });
        sounds.pop();
        const answer = await chatQuery.mutateAsync({
            ...data,
            conversationId: conversationId.current,
        });
        addMessage({ type: 'bot', message: answer.text });
        sounds.notify();
    };

    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <ChatMessages messages={messages} className="overflow-y-auto">
                {chatQuery.isPending && <ChatLoader />}
                {chatQuery.error && (
                    <p className="text-red-500">{chatQuery.error.message}</p>
                )}
            </ChatMessages>
            <ChatForm onFormSubmit={askQuestion} />
        </div>
    );
};
