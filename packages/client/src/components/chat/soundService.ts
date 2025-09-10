import popSound from '@/assets/sounds/pop.mp3';
import notificationSound from '@/assets/sounds/notification.mp3';

export function useSound(volume = 0.2) {
    const popAudio = new Audio(popSound);
    const notificationAudio = new Audio(notificationSound);
    notificationAudio.volume = volume;
    popAudio.volume = volume;
    return {
        pop() {
            popAudio.play().catch();
        },
        notify() {
            notificationAudio.play().catch();
        },
    };
}
