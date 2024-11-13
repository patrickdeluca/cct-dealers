import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string;
            primaryDark: string;
            secondary: string;
            textDark: string;
            textSecondary: string;
            lightBg: string;
            white: string;
        };
        breakpoints: {
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        spacing: {
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
        };
        borderRadius: {
            small: string;
            medium: string;
            large: string;
        };
        shadows: {
            small: string;
            medium: string;
            large: string;
        };
    }
}
