import type { ComponentProps } from 'react';

const Dot = ({ className }: ComponentProps<'div'>) => (
    <div
        className={`w-2 h-2 rounded-full bg-gray-800 animate-pulse ${className}`}
    />
);

export const ChatLoader = () => (
    <div className="flex self-start gap-1 px-3 py-3">
        <Dot />
        <Dot className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]" />
        <Dot className="w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]" />
    </div>
);
