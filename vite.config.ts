import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';

import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        wayfinder({
            formVariants: true,
        }),
    ],
    server: {
        host: "www.localhost.com",
        port: 5173,
        strictPort: true,
        // origin: `${import.meta.env.VITE_APP_DOMAIN.replace(/:\d+$/, "")}:5173`,
        cors: { origin: /^https?:\/\/([A-Za-z0-9-.]+)?(aqademic|localhost)(\.com)?(?::\d+)?$/ }
    }
});
