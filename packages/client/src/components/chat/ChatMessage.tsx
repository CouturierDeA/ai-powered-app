import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils.ts';
import type { ClipboardEvent } from 'react';

const messageVariants = cva('px-3 py-1 rounded-x-large rounded-xl', {
    variants: {
        variant: {
            user: 'bg-blue-600 text-white self-end',
            bot: 'bg-gray-100 text-black self-start',
        },
    },
    defaultVariants: {
        variant: 'user',
    },
});

function trimSelection(event: ClipboardEvent) {
    const selection = window.getSelection()?.toString().trim();
    if (!selection) return;
    event.preventDefault();
    event.clipboardData.setData('text/plain', selection);
}

function ChatMessage({
    className,
    variant,
    ...props
}: React.ComponentProps<'p'> & VariantProps<typeof messageVariants>) {
    return (
        <div
            onCopy={trimSelection}
            className={cn(messageVariants({ variant, className }))}
            {...props}
        />
    );
}

export { ChatMessage, messageVariants };
