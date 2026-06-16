import { createInertiaApp } from '@inertiajs/react';
import { initializeTheme } from '@/hooks/use-appearance';
import WWWLayout from './layouts/www-layout';
import RootLayout from './layouts/root-layout';
import AdminLayout from './layouts/admin-layout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name.startsWith('login/'):
                return [RootLayout];
            default:
                return [RootLayout , AdminLayout];
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
