# DEALS 2.0 Testing Guide

## Testing Strategy

### Test Types

1. **Unit Tests**
   - Individual components
   - Utility functions
   - Hooks
   - State management

2. **Integration Tests**
   - Component interactions
   - Data flow
   - Route changes
   - API integration

3. **E2E Tests**
   - User flows
   - Critical paths
   - Cross-browser testing
   - Mobile testing

4. **Performance Tests**
   - Load time
   - Bundle size
   - Memory usage
   - Animation performance

## Test Setup

### Unit Testing

```typescript
// Component test setup
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Component', () => {
  it('renders correctly', () => {
    renderWithTheme(<Component />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
// Integration test example
import { renderWithRouter } from '../test-utils';

describe('Integration', () => {
  it('navigates correctly', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Become a Dealer'));
    expect(screen.getByText('Dealer Form')).toBeInTheDocument();
  });
});
```

## Component Testing

### Hero Section

```typescript
describe('Hero', () => {
  it('displays main headline', () => {
    renderWithTheme(<Hero />);
    expect(screen.getByText(/Digital F&I/i)).toBeInTheDocument();
  });

  it('handles CTA click', () => {
    const onCTAClick = jest.fn();
    renderWithTheme(<Hero onCTAClick={onCTAClick} />);
    fireEvent.click(screen.getByText('Become a Dealer Partner'));
    expect(onCTAClick).toHaveBeenCalled();
  });
});
```

### Features Section

```typescript
describe('Features', () => {
  it('renders feature cards', () => {
    renderWithTheme(<Features />);
    expect(screen.getAllByTestId('feature-card')).toHaveLength(3);
  });

  it('displays coming soon badge', () => {
    renderWithTheme(<Features />);
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });
});
```

## Performance Testing

### Lighthouse Tests

```bash
# Run Lighthouse CI
npm run lighthouse

# Performance thresholds
{
  "performance": 90,
  "accessibility": 95,
  "best-practices": 95,
  "seo": 95
}
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run analyze

# Size limits
{
  "maxSize": "200kb",
  "gzipped": true
}
```

## Accessibility Testing

### A11y Tests

```typescript
import { axe } from 'jest-axe';

describe('Accessibility', () => {
  it('has no violations', async () => {
    const { container } = renderWithTheme(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Checks
- Keyboard navigation
- Screen reader testing
- Color contrast
- Focus management

## Test Coverage

### Coverage Requirements
```json
{
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
}
```

### Running Coverage
```bash
# Generate coverage report
npm run test:coverage

# View detailed report
npm run test:coverage:report
```

## Continuous Integration

### GitHub Actions

```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run E2E tests
        run: npm run test:e2e
```

## Best Practices

### Writing Tests
1. Arrange-Act-Assert pattern
2. Meaningful test descriptions
3. Test behavior, not implementation
4. Keep tests simple and focused

### Test Organization
1. Group related tests
2. Use describe blocks effectively
3. Maintain test hierarchy
4. Follow naming conventions

### Mocking
1. Mock external dependencies
2. Use test data factories
3. Avoid over-mocking
4. Keep mocks simple

## Resources

### Documentation
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Cypress Documentation](https://docs.cypress.io/)

### Tools
- Jest
- React Testing Library
- Cypress
- Lighthouse
- Bundle Analyzer

### Support
- GitHub Issues
- Testing Channel
- Technical Lead
