'use client';

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { colorSchemes, typography, shadows, shape } from "./ThemePrimitives";
import { surfaceCustomizations } from "./customizations/surfaces";
import { inputsCustomizations } from "./customizations/input";

interface AppThemeProps {
    children: React.ReactNode;
    themeComponents?: ThemeOptions['components'];
}

export const themer = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    colorSchemes,
    typography,
    shadows,
    shape,
    components: {
        ...inputsCustomizations,
        ...surfaceCustomizations,
      }
})

export default function AppTheme(props: AppThemeProps) {
    const { children, themeComponents } = props

    const theme = useMemo(() => {
        return themer
    }, [])

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
