import { createInertiaApp } from '@inertiajs/react';
import { initializeTheme } from '@/hooks/use-appearance';
import WWWLayout from './layouts/www-layout';
import RootLayout from './layouts/root-layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            default:
                return [RootLayout , WWWLayout];
        }
    },
    strictMode: true,
    // withApp(app) {
    //     return (
    //         <TooltipProvider delayDuration={0}>
    //             {app}
    //             <Toaster />
    //         </TooltipProvider>
    //     );
    // },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
