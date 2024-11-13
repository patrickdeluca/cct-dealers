# DEALS 2.0 Accessibility Guide

## WCAG 2.1 Compliance

### Level AA Requirements

1. **Perceivable**
   - Color contrast (4.5:1 minimum)
   - Text resizing (200% without loss)
   - Images of text (avoid unless necessary)
   - Alternative text for images

2. **Operable**
   - Keyboard navigation
   - Focus management
   - Skip links
   - Sufficient timing

3. **Understandable**
   - Consistent navigation
   - Error identification
   - Labels and instructions
   - Language declaration

4. **Robust**
   - Valid HTML
   - ARIA implementation
   - Name, Role, Value

## Implementation Guidelines

### Semantic HTML
```tsx
// Prefer semantic elements
const GoodExample = () => (
  <article>
    <h1>Main Heading</h1>
    <nav>
      <ul>
        <li><a href="#section1">Section 1</a></li>
      </ul>
    </nav>
    <main>
      <section aria-labelledby="section1">
        <h2 id="section1">Section Heading</h2>
        <p>Content...</p>
      </section>
    </main>
  </article>
);

// Avoid generic containers
const BadExample = () => (
  <div>
    <div>Main Heading</div>
    <div>
      <div>
        <div>Section 1</div>
      </div>
    </div>
  </div>
);
```

### Focus Management
```tsx
// Focus trap for modals
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements?.[0]) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
```

### ARIA Attributes
```tsx
// Form inputs
const FormField = () => (
  <div role="group" aria-labelledby="group-label">
    <span id="group-label">Contact Information</span>
    <label htmlFor="name">Name</label>
    <input
      id="name"
      type="text"
      aria-required="true"
      aria-invalid={hasError}
      aria-describedby="name-error"
    />
    {hasError && (
      <span id="name-error" role="alert">
        Please enter a valid name
      </span>
    )}
  </div>
);
```

## Component-Specific Guidelines

### Hero Section
```tsx
const Hero = () => (
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">
      Transform Your F&I with DEALS 2.0
    </h1>
    <p>
      <span className="visually-hidden">
        Key benefits:
      </span>
      Maximize profitability with our innovative platform
    </p>
    <button
      aria-label="Become a dealer partner"
      onClick={handleCTA}
    >
      Get Started
    </button>
  </section>
);
```

### Feature Cards
```tsx
const FeatureCard = ({ title, description, icon, comingSoon }) => (
  <article
    className="feature-card"
    aria-labelledby={`feature-${title}`}
  >
    <h3 id={`feature-${title}`}>
      {title}
      {comingSoon && (
        <span className="badge" aria-label="Coming soon feature">
          Coming Soon
        </span>
      )}
    </h3>
    <img src={icon} alt="" aria-hidden="true" />
    <p>{description}</p>
  </article>
);
```

## CSS Considerations

### Hidden Content
```css
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.visually-hidden:focus {
  position: static;
  width: auto;
  height: auto;
}
```

### Focus Styles
```css
/* Never remove focus outlines without replacement */
:focus {
  outline: 2px solid ${props => props.theme.colors.primary};
  outline-offset: 2px;
}

/* Custom focus styles */
.custom-focus:focus {
  box-shadow: 0 0 0 2px ${props => props.theme.colors.primary};
  outline: none;
}
```

## Testing Accessibility

### Automated Testing
```typescript
import { axe } from 'jest-axe';

describe('Component Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist
1. Keyboard Navigation
   - Tab order is logical
   - Focus is visible
   - No keyboard traps
   
2. Screen Readers
   - Content is announced correctly
   - Images have alt text
   - Forms are properly labeled
   
3. Color and Contrast
   - Text meets contrast requirements
   - Color is not sole indicator
   - Focus states are visible

## Tools and Resources

### Development Tools
- WAVE Browser Extension
- axe DevTools
- Lighthouse
- Color Contrast Analyzer

### Screen Readers
- NVDA (Windows)
- VoiceOver (Mac)
- JAWS (Windows)
- TalkBack (Android)

### Documentation
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Support

### Testing Support
- Accessibility audit tools
- Screen reader testing
- Keyboard navigation testing
- Color contrast verification

### Documentation
- Component accessibility docs
- ARIA implementation guides
- Testing procedures
- Best practices
