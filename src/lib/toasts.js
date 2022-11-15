import { writable } from 'svelte/store';
const toasts = writable([]);
let oldLength = 0;
toasts.subscribe((v)=>{
    if(oldLength != v.length) {
        setTimeout(() => {
            v.shift();
            toasts.set(v);
        }, 5000);
    }
})

export default toasts;