import type { Components, Theme } from "@mui/material";
import { alpha } from "@mui/material"
import { brand } from "../ThemePrimitives";

export const surfaceCustomizations: Components<Theme> = {
  MuiCard: {
    styleOverrides: {
      root: ({theme}) => ({
        padding: 16,
        gap: 15,
        borderRadius: 10,
        backgroundColor: brand[50],
        ...theme.applyStyles('dark', {
            backgroundColor: brand[800],
        }),
        variants: [
            {
              props: {
                variant: 'outlined',
              },
              style: {
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                boxShadow: 'none',
                // background: brand[25],
                // ...theme.applyStyles('dark', {
                //   background: alpha(brand[700], 0.4),
                // }),
              },
            },
          ]
      })
    }
  },
}
