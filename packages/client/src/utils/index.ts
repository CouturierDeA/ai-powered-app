import { v4 } from 'uuid';

export const getUid = v4;

export async function asyncTimeout(delay = 0) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, delay);
    });
}
