import { alpha, Theme, Components } from '@mui/material/styles';
import { brand, gray } from '../ThemePrimitives';
import { toggleButtonGroupClasses } from '@mui/material/ToggleButtonGroup';
import { toggleButtonClasses } from '@mui/material/ToggleButton';
import { outlinedInputClasses } from '@mui/material';
import { svgIconClasses } from '@mui/material/SvgIcon';

export const inputsCustomizations: Components<Theme> = {
    MuiIconButton: {
        styleOverrides: {
        root: ({ theme }) => ({
            boxShadow: 'none',
            borderRadius: (theme.vars || theme).shape.borderRadius,
            textTransform: 'none',
            fontWeight: theme.typography.fontWeightMedium,
            letterSpacing: 0,
            color: (theme.vars || theme).palette.text.primary,
            // border: '1px solid ',
            borderColor: brand[25],
            backgroundColor: alpha(gray[50], 0.3),
            '&:hover': {
            backgroundColor: brand[25],
            borderColor: brand[300],
            },
            '&:active': {
            backgroundColor: gray[200],
            },
            ...theme.applyStyles('dark', {
            backgroundColor: brand[800],
            borderColor: brand[700],
            '&:hover': {
                backgroundColor: gray[900],
                borderColor: brand[500],
            },
            '&:active': {
                backgroundColor: brand[900],
            },
            }),
            variants: [
            {
                props: {
                size: 'small',
                },
                style: {
                width: '2.25rem',
                height: '2.25rem',
                padding: '0.25rem',
                [`& .${svgIconClasses.root}`]: { fontSize: '1rem' },
                },
            },
            {
                props: {
                size: 'medium',
                },
                style: {
                width: '2.5rem',
                height: '2.5rem',
                },
            },
            ],
        }),
        },
    },
//     MuiOutlinedInput: {
//     styleOverrides: {
//       input: {
//         padding: 0,
//       },
//       root: ({ theme }) => ({
//         padding: '8px 12px',
//         color: (theme.vars || theme).palette.text.primary,
//         borderRadius: (theme.vars || theme).shape.borderRadius,
//         // border: `1px solid ${(theme.vars || theme).palette.divider}`,
//         backgroundColor: (theme.vars || theme).palette.background.default,
//         // transition: 'border 120ms ease-in',
//         borderColor: brand[400],
//         '&:hover': {
//           borderColor: gray[400],
//         },
//         [`&.${outlinedInputClasses.focused}`]: {
//           outline: `3px solid ${alpha('hsl(308, 50%, 40%)', 0.5)}`,
//           borderColor: brand[400],
//         },
//         ...theme.applyStyles('dark', {
//             borderColor: brand[700],
//           '&:hover': {
//             borderColor: brand[500],
//           },
//         }),
//         variants: [
//           {
//             props: {
//               size: 'small',
//             },
//             style: {
//               height: '2.25rem',
//             },
//           },
//           {
//             props: {
//               size: 'medium',
//             },
//             style: {
//               height: '2.5rem',
//             },
//           },
//         ],
//       }),
//       notchedOutline: {
//         border: 'none',
//       },
//     },
//   },
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: 'none',
        borderRadius: (theme.vars || theme).shape.borderRadius,
        textTransform: 'none',
        variants: [
          {
            props: {
              size: 'small',
            },
            style: {
              height: '2.25rem',
              padding: '8px 12px',
            },
          },
          {
            props: {
              size: 'medium',
            },
            style: {
              height: '2.5rem', // 40px
            },
          },
          {
            props: {
              color: 'primary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: brand[500],
              '&:hover': {
                backgroundImage: 'none',
                backgroundColor: brand[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: gray[800],
              },
              ...theme.applyStyles('dark', {
                color: gray[50],
                backgroundColor: brand[500],
                // border: `1px solid ${gray[50]}`,
                '&:hover': {
                  backgroundColor: brand[700],
                },
                '&:active': {
                  backgroundColor: gray[400],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'contained',
            },
            style: {
              color: 'white',
              backgroundColor: brand[300],
              backgroundImage: `linear-gradient(to bottom, ${alpha('hsl(309, 37%, 48%)', 0.8)}, ${brand[500]})`,
              boxShadow: `inset 0 2px 0 ${alpha('hsl(309, 36%, 69%)', 0.2)}, inset 0 -2px 0 ${alpha('hsl(299, 52%, 32%)', 0.4)}`,
              border: `1px solid ${brand[500]}`,
              '&:hover': {
                backgroundColor: brand[700],
                boxShadow: 'none',
              },
              '&:active': {
                backgroundColor: brand[700],
                backgroundImage: 'none',
              },
            },
          },
          {
            props: {
              variant: 'outlined',
            },
            style: {
              color: (theme.vars || theme).palette.text.primary,
              border: '1px solid',
              borderColor: brand[500],
              backgroundColor: alpha(brand[50], 0.3),
              '&:hover': {
                backgroundColor: brand[50],
                borderColor: brand[300],
              },
              '&:active': {
                backgroundColor: gray[200],
              },
              ...theme.applyStyles('dark', {
                backgroundColor: brand[800],
                borderColor: brand[700],

                '&:hover': {
                  backgroundColor: gray[900],
                  borderColor: brand[400],
                },
                '&:active': {
                  backgroundColor: gray[900],
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'outlined',
            },
            style: {
              color: brand[700],
              border: '1px solid',
              borderColor: brand[200],
              backgroundColor: brand[50],
              '&:hover': {
                backgroundColor: brand[100],
                borderColor: brand[400],
              },
              '&:active': {
                backgroundColor: alpha('hsl(309, 36%, 69%)', 0.7),
              },
              ...theme.applyStyles('dark', {
                color: brand[50],
                border: '1px solid',
                borderColor: brand[900],
                backgroundColor: alpha('hsl(286, 56%, 25%)', 0.3),
                '&:hover': {
                  borderColor: brand[700],
                  backgroundColor: alpha('hsl(286, 56%, 25%)', 0.6),
                },
                '&:active': {
                  backgroundColor: alpha('hsl(286, 56%, 25%)', 0.5),
                },
              }),
            },
          },
          {
            props: {
              variant: 'text',
            },
            style: {
              color: brand[500],
              '&:hover': {
                backgroundColor: brand[500],
                color: gray[50],
              },
              '&:active': {
                backgroundColor: brand[500],
              },
              ...theme.applyStyles('dark', {
                color: gray[50],
                '&:hover': {
                  backgroundColor: brand[500],
                },
                '&:active': {
                  backgroundColor: alpha('hsl(308, 50%, 40%)', 0.7),
                },
              }),
            },
          },
          {
            props: {
              color: 'secondary',
              variant: 'text',
            },
            style: {
              color: brand[700],
              '&:hover': {
                backgroundColor: alpha('hsl(309, 35%, 81%)', 0.5),
              },
              '&:active': {
                backgroundColor: alpha('hsl(309, 36%, 69%)', 0.7),
              },
              ...theme.applyStyles('dark', {
                color: brand[100],
                '&:hover': {
                  backgroundColor: alpha('hsl(286, 56%, 25%)', 0.5),
                },
                '&:active': {
                  backgroundColor: alpha('hsl(286, 56%, 25%)', 0.3),
                },
              }),
            },
          },
        ]
      })
    }
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: '10px',
        color: gray[900],
        boxShadow: 'none',
        [`& .${toggleButtonGroupClasses.selected}`]: {
          color: gray[50],
        },
        ...theme.applyStyles('dark', {
          [`& .${toggleButtonGroupClasses.selected}`]: {
            color: '#fff',
          },
          boxShadow: 'none',
        }),
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '12px 16px',
        textTransform: 'none',
        borderRadius: '10px',
        fontWeight: 500,
        borderColor: brand[500],
        [`&.${toggleButtonClasses.selected}`]: {
            color: gray[50],
            backgroundColor: brand[500],
        },
        [`&:hover`]: {
            color: gray[900],
            backgroundColor: brand[50],
        },
        [`&.${toggleButtonClasses.selected}:hover`]: {
            color: gray[50],
            backgroundColor: brand[700],
          },
        ...theme.applyStyles('dark', {
          color: gray[50],
          boxShadow: 'none',
          [`&.${toggleButtonClasses.selected}`]: {
            color: gray[50],
            backgroundColor: brand[500],
          },
          [`&.${toggleButtonClasses.selected}:hover`]: {
            color: gray[50],
            backgroundColor: brand[700],
          },
          [`&:hover`]: {
            color: gray[50],
            backgroundColor: brand[500],
            },
        }),
      }),
    },
  },
}
