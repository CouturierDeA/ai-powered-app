import { type ComponentProps, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import { ChatMessage } from '@/components/chat/ChatMessage.tsx';

export interface ChatMessage {
    message: string;
    type: 'user' | 'bot';
}

interface MessagesProps extends ComponentProps<'div'> {
    messages: ChatMessage[];
}

function ChatMessages({ messages, children }: MessagesProps) {
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col gap-3 flex-1">
            {messages.map((message, key) => (
                <ChatMessage
                    key={key}
                    variant={message.type}
                    ref={key === messages.length - 1 ? lastMessageRef : null}
                >
                    <ReactMarkdown>{message.message}</ReactMarkdown>
                </ChatMessage>
            ))}
            {children}
        </div>
    );
}

export default ChatMessages;
