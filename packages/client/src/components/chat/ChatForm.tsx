import { type KeyboardEvent, type ComponentProps } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowUp } from 'react-icons/fa';
import { Button } from '@/components/ui/button.tsx';

export interface FormData {
    prompt: string;
}

interface FormProps extends ComponentProps<'form'> {
    onFormSubmit: (data: FormData) => void;
}

function ChatForm({ onFormSubmit }: FormProps) {
    const { register, handleSubmit, reset, formState } = useForm<FormData>();
    const submit = handleSubmit((data) => {
        reset({ prompt: '' });
        onFormSubmit(data);
    });

    const onKeyDown = async (e: KeyboardEvent<HTMLFormElement>) => {
        if (!(e.key === 'Enter' && !e.shiftKey)) return;
        e.preventDefault();
        await submit();
    };

    const promptRules = register('prompt', {
        required: true,
        validate: (data) => !!data.trim().length,
    });

    return (
        <form onSubmit={submit} onKeyDown={onKeyDown}>
            <div className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl">
                <textarea
                    {...promptRules}
                    autoFocus
                    className="w-full focus:outline-0 resize-none"
                    placeholder="Ask anything"
                    maxLength={100}
                />
                <Button
                    disabled={!formState.isValid}
                    className="rounded-full w-9 h-9"
                >
                    <FaArrowUp />
                </Button>
            </div>
        </form>
    );
}

export default ChatForm;
