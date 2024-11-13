# DEALS 2.0 Theme System

## Theme Structure

### Core Theme Object
```typescript
// theme.ts
export const theme = {
  colors: {
    primary: '#008346',
    primaryDark: '#006d3a',
    textDark: '#1B1F22',
    textSecondary: '#4A5568',
    white: '#FFFFFF',
    lightBg: '#F8F8F8'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '4rem'
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px'
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 12px rgba(0,0,0,0.1)',
    large: '0 8px 24px rgba(0,0,0,0.15)'
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    sizes: {
      h1: '3.5rem',
      h2: '2.5rem',
      h3: '1.5rem',
      body: '1rem'
    }
  }
};
```

## TypeScript Integration

### Theme Types
```typescript
// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      textDark: string;
      textSecondary: string;
      white: string;
      lightBg: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    breakpoints: {
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
    typography: {
      fontFamily: string;
      sizes: {
        h1: string;
        h2: string;
        h3: string;
        body: string;
      };
    };
  }
}
```

## Usage Examples

### Basic Styling
```typescript
const Container = styled.div`
  color: ${props => props.theme.colors.textDark};
  padding: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.typography.fontFamily};
`;
```

### Responsive Design
```typescript
const ResponsiveComponent = styled.div`
  // Mobile first
  padding: ${props => props.theme.spacing.md};
  
  // Tablet
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.lg};
  }
  
  // Desktop
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing.xl};
  }
`;
```

### Component Variants
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

const Button = styled.button<ButtonProps>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  
  ${props => props.variant === 'primary' && css`
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.white};
  `}
  
  ${props => props.variant === 'secondary' && css`
    background: transparent;
    color: ${props.theme.colors.primary};
    border: 1px solid ${props.theme.colors.primary};
  `}
`;
```

## Best Practices

### Theme Setup
```typescript
// App.tsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {/* Components */}
  </ThemeProvider>
);
```

### Global Styles
```typescript
// globalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${props => props.theme.typography.fontFamily};
    color: ${props => props.theme.colors.textDark};
    line-height: 1.5;
  }
  
  h1, h2, h3 {
    margin: 0;
    line-height: 1.2;
  }
  
  h1 { font-size: ${props => props.theme.typography.sizes.h1}; }
  h2 { font-size: ${props => props.theme.typography.sizes.h2}; }
  h3 { font-size: ${props => props.theme.typography.sizes.h3}; }
`;
```

## Common Patterns

### Layout Components
```typescript
export const Section = styled.section`
  padding: ${props => props.theme.spacing.xl} 0;
`;

export const Container = styled.div`
  max-width: ${props => props.theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;
```

### Interactive Elements
```typescript
export const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.medium};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;
```

## Theme Customization

### Extending Theme
```typescript
const extendedTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    success: '#28a745',
    error: '#dc3545'
  }
};
```

### Component-Specific Theming
```typescript
interface CustomThemeProps {
  customBg?: string;
}

const CustomComponent = styled.div<CustomThemeProps>`
  background: ${props => props.customBg || props.theme.colors.primary};
`;
```

## Resources

### Documentation
- [Styled Components Docs](https://styled-components.com/docs)
- [TypeScript Integration](https://styled-components.com/docs/api#typescript)

### Tools
- VS Code Extensions
- Theme Generator
- Color Palette Tools

### Support
- GitHub Issues
- Styling Channel
- Technical Lead
