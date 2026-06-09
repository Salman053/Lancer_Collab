import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import Echo from 'laravel-echo';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Pusher from 'pusher-js';
import { createRoot } from 'react-dom/client';
import { route as routeFn } from 'ziggy-js';
import { initializeTheme } from './hooks/use-appearance';

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080, // Explicitly use 8080
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    forceTLS: false, // Set to false for local development
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
});

console.log('Laravel Echo initialized with Reverb');

declare global {
    const route: typeof routeFn;
    interface Window {
        Echo: any;
        Pusher: any;
    }
}

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
       color: '#2563EB', 
    },
});

// This will set light / dark mode on load...
initializeTheme();
