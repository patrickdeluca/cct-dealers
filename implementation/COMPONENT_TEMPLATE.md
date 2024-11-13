# DEALS 2.0 Component Template Guide

## Basic Component Structure

```typescript
import React from 'react';
import styled from 'styled-components';

// Types
interface ComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

// Styled Components
const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
`;

const Title = styled.h2`
  font-size: ${props => props.theme.typography.sizes.h2};
  color: ${props => props.theme.colors.textDark};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

// Component Implementation
const Component: React.FC<ComponentProps> = ({
  title,
  description,
  onAction,
  children
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {children}
    </Container>
  );
};

export default Component;
```

## Component with Hooks

```typescript
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// Types
interface ComponentProps {
  initialData?: any;
  onDataChange?: (data: any) => void;
}

interface State {
  loading: boolean;
  error: string | null;
  data: any;
}

// Styled Components
const Container = styled.div`
  // Styles
`;

// Component Implementation
const Component: React.FC<ComponentProps> = ({ initialData, onDataChange }) => {
  // State
  const [state, setState] = useState<State>({
    loading: false,
    error: null,
    data: initialData
  });

  // Callbacks
  const handleDataUpdate = useCallback((newData: any) => {
    setState(prev => ({ ...prev, data: newData }));
    onDataChange?.(newData);
  }, [onDataChange]);

  // Effects
  useEffect(() => {
    // Effect implementation
    return () => {
      // Cleanup
    };
  }, []);

  // Render methods
  const renderContent = () => {
    if (state.loading) return <LoadingSpinner />;
    if (state.error) return <ErrorMessage error={state.error} />;
    return <Content data={state.data} />;
  };

  return (
    <Container>
      {renderContent()}
    </Container>
  );
};

export default Component;
```

## Component with Context

```typescript
import React, { createContext, useContext, useReducer } from 'react';
import styled from 'styled-components';

// Types
interface State {
  // State types
}

type Action = 
  | { type: 'ACTION_ONE'; payload: any }
  | { type: 'ACTION_TWO'; payload: any };

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Context
const ComponentContext = createContext<ContextValue | undefined>(undefined);

// Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ACTION_ONE':
      return { ...state, /* updates */ };
    case 'ACTION_TWO':
      return { ...state, /* updates */ };
    default:
      return state;
  }
};

// Provider Component
export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ComponentContext.Provider value={{ state, dispatch }}>
      {children}
    </ComponentContext.Provider>
  );
};

// Hook
const useComponent = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error('useComponent must be used within ComponentProvider');
  }
  return context;
};
```

## Component with Animation

```typescript
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Container = styled.div`
  animation: ${fadeIn} 0.3s ease-out;
`;

const AnimatedComponent: React.FC = () => {
  return (
    <Container>
      {/* Content */}
    </Container>
  );
};
```

## Component with Testing

```typescript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import Component from './Component';

describe('Component', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {ui}
      </ThemeProvider>
    );
  };

  it('renders correctly', () => {
    renderWithTheme(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles interactions', () => {
    const onAction = jest.fn();
    renderWithTheme(<Component onAction={onAction} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalled();
  });
});
```

## Component Documentation

```typescript
/**
 * Component description and usage information.
 *
 * @example
 * ```tsx
 * <Component
 *   title="Example"
 *   description="Description"
 *   onAction={() => {}}
 * />
 * ```
 */
interface ComponentProps {
  /** Title of the component */
  title: string;
  /** Optional description */
  description?: string;
  /** Callback for actions */
  onAction?: () => void;
}
```

## Best Practices

1. **File Organization**
   ```
   ComponentName/
   ├── index.tsx
   ├── styles.ts
   ├── types.ts
   ├── hooks.ts
   └── ComponentName.test.tsx
   ```

2. **Props Interface**
   - Use descriptive names
   - Document with JSDoc
   - Mark optional props with ?
   - Use specific types

3. **Styled Components**
   - Use theme values
   - Follow naming conventions
   - Implement responsive styles
   - Handle props properly

4. **Testing**
   - Test rendering
   - Test interactions
   - Test accessibility
   - Test edge cases

5. **Performance**
   - Use memo when needed
   - Optimize re-renders
   - Handle cleanup
   - Manage dependencies
