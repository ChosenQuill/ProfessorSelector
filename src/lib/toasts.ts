import { writable } from 'svelte/store';

interface Toast {
    id?: number,
    type?: 'info' | 'success' | 'error' | 'warning',
    text: string,
    timeout?: number
}

export const toasts = writable([]);

export const addToast = (toast: Toast) : number => {
    const id = Math.floor(Math.random() * 10000);
    const defaults : Toast = {
        id,
        type: 'info',
        text: '',
        timeout: 5000
    }
    toast = {...defaults, ...toast}; 
    toasts.update((all) => [toast, ...all]);

    setTimeout(() => dismissToast(id), toast.timeout);
    return id;
}

export const dismissToast = (id: number) : void => {
    toasts.update((all) => all.filter(t => t.id !== id));
}