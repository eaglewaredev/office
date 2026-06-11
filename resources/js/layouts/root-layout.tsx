import AppTheme from '@/theme/Theme';
import { InitColorSchemeScript } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppTheme>
            <InitColorSchemeScript attribute="class"/>
            <CssBaseline/>
            {children}
        </AppTheme>
    );
}
