# DEALS 2.0 Code Review Checklist

## General Guidelines

### Code Quality
- [ ] Code follows TypeScript best practices
- [ ] No any types used without justification
- [ ] Proper error handling implemented
- [ ] No console.log statements in production code
- [ ] No commented-out code
- [ ] Code is DRY (Don't Repeat Yourself)

### Component Structure
```typescript
// ✅ Good
const Component: React.FC<Props> = ({ prop1, prop2 }) => {
  // Implementation
};

// ❌ Bad
function Component(props: any) {
  const { prop1, prop2 } = props;
  // Implementation
}
```

## TypeScript

### Type Definitions
- [ ] Props interfaces are defined and documented
- [ ] Enums used for finite sets of values
- [ ] Generic types used appropriately
- [ ] No implicit any types
- [ ] Type assertions minimized

```typescript
// ✅ Good
interface ComponentProps {
  /** Description of title prop */
  title: string;
  /** Optional description */
  description?: string;
  /** Callback when action occurs */
  onAction: (id: string) => void;
}

// ❌ Bad
type Props = {
  title: any;
  description: any;
  onAction: Function;
};
```

## Styling

### Styled Components
- [ ] Theme values used consistently
- [ ] Responsive design implemented
- [ ] Props properly typed
- [ ] No hardcoded values
- [ ] Proper CSS property order

```typescript
// ✅ Good
const Container = styled.div`
  padding: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textDark};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

// ❌ Bad
const Container = styled.div`
  padding: 20px;
  color: #333;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;
```

## Performance

### Optimization
- [ ] React.memo used appropriately
- [ ] useCallback/useMemo used correctly
- [ ] No unnecessary re-renders
- [ ] Large lists virtualized
- [ ] Images optimized

```typescript
// ✅ Good
const MemoizedComponent = React.memo(({ data }) => (
  <div>{data.map(renderItem)}</div>
), (prev, next) => prev.data === next.data);

// ❌ Bad
const Component = ({ data }) => (
  <div>{data.map(item => <ExpensiveComponent {...item} />)}</div>
);
```

## Accessibility

### A11y Requirements
- [ ] Proper ARIA attributes used
- [ ] Semantic HTML elements
- [ ] Keyboard navigation supported
- [ ] Color contrast meets WCAG
- [ ] Screen reader friendly

```typescript
// ✅ Good
<button
  aria-label="Close dialog"
  onClick={onClose}
  type="button"
>
  <Icon aria-hidden="true" />
</button>

// ❌ Bad
<div onClick={onClose}>
  <img src="close.png" />
</div>
```

## Testing

### Test Coverage
- [ ] Component rendering tested
- [ ] User interactions tested
- [ ] Edge cases covered
- [ ] Async operations tested
- [ ] Error states tested

```typescript
// ✅ Good
describe('Component', () => {
  it('renders successfully', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('handles errors', async () => {
    render(<Component />);
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
    });
  });
});

// ❌ Bad
test('it works', () => {
  const { container } = render(<Component />);
  expect(container).toBeTruthy();
});
```

## Security

### Security Checks
- [ ] User input sanitized
- [ ] XSS prevention implemented
- [ ] Sensitive data handled properly
- [ ] API endpoints secured
- [ ] Authentication checked

```typescript
// ✅ Good
const sanitizedContent = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;

// ❌ Bad
<div dangerouslySetInnerHTML={{ __html: userInput }} />;
```

## Documentation

### Code Documentation
- [ ] Components documented with JSDoc
- [ ] Complex logic explained
- [ ] Props documented
- [ ] Examples provided
- [ ] README updated if needed

```typescript
/**
 * Component description
 * @param {ComponentProps} props - Component props
 * @returns {JSX.Element} Rendered component
 * @example
 * <Component title="Example" onAction={() => {}} />
 */
```

## Git

### Commit Standards
- [ ] Meaningful commit messages
- [ ] Single responsibility per commit
- [ ] No merge conflicts
- [ ] Branch naming follows convention
- [ ] PR description complete

```bash
# ✅ Good
git commit -m "feat(hero): implement responsive design for mobile"

# ❌ Bad
git commit -m "updates"
```

## Review Process

### Before Review
1. Run all tests
2. Check console warnings
3. Verify build success
4. Test in all browsers
5. Check performance

### During Review
1. Read PR description
2. Review code changes
3. Run locally
4. Test functionality
5. Provide constructive feedback

### After Review
1. Verify changes implemented
2. Re-run tests
3. Check documentation
4. Approve or request changes
5. Update status

## Common Issues

### Code Smells
- Large components
- Duplicate code
- Complex conditions
- Magic numbers
- Unclear naming

### Performance Issues
- Unnecessary re-renders
- Large bundle size
- Unoptimized images
- Memory leaks
- Slow API calls

## Resources

### Documentation
- [TypeScript Guidelines](./implementation/TYPESCRIPT.md)
- [Component Templates](./implementation/COMPONENT_TEMPLATE.md)
- [Testing Guide](./implementation/TESTING.md)

### Tools
- ESLint
- Prettier
- Jest
- React Testing Library
- Lighthouse
