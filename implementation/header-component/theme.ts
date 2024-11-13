import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    colors: {
        primary: '#008346',
        primaryDark: '#006d3a',
        secondary: '#1F1F1F',
        textDark: '#1B1F22',
        textSecondary: '#4A5568',
        lightBg: '#F8F8F8',
        white: '#FFFFFF',
    },
    breakpoints: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
    },
    spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
    },
    borderRadius: {
        small: '6px',
        medium: '12px',
        large: '24px',
    },
    shadows: {
        small: '0 2px 4px rgba(0,0,0,0.1)',
        medium: '0 4px 12px rgba(0,0,0,0.1)',
        large: '0 8px 24px rgba(0,0,0,0.1)',
    },
};
