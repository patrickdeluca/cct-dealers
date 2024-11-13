# Hero Component Documentation

## Overview
The Hero component serves as the main landing section for the DEALS 2.0 dealer page, featuring key messaging and value propositions.

## Implementation

```typescript
import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children?: React.ReactNode;
}

const Hero: React.FC = () => {
  return (
    <Container>
      <Content>
        <Title>
          Your Digital Finance Advantage: DEALS 2.0
        </Title>
        <Subtitle>
          Transform your dealership's profitability with our innovative end-to-end financing platform...
        </Subtitle>
        <Button>Become a Dealer Partner</Button>
        <FeatureGrid>...</FeatureGrid>
      </Content>
    </Container>
  );
};
```

## Styling

### Container
- Full-width background image
- Dark overlay with gradient
- Responsive padding

### Content
- Centered layout
- Maximum width constraint
- Responsive text sizing

### Feature Grid
- 4-column desktop layout
- 2-column tablet layout
- 1-column mobile layout

## Props

| Prop | Type | Description |
|------|------|-------------|
| backgroundImage | string | Hero background image URL |
| title | string | Main headline text |
| subtitle | string | Supporting copy |
| features | Feature[] | Array of feature items |

## Content Guidelines

### Headlines
Current: "Your Digital Finance Advantage: DEALS 2.0"
Alternatives tested:
- "Maximize F&I Profits with DEALS 2.0"
- "Redefine F&I with DEALS 2.0"
- "Transform Subprime Financing into Profit"

### Feature Items
- Revenue Sharing
- Instant Decisions
- Digital Documentation
- Mobile Platform

## Responsive Behavior

### Desktop (>992px)
- Large hero height
- 4-column feature grid
- Large typography

### Tablet (768px-992px)
- Medium hero height
- 2-column feature grid
- Adjusted typography

### Mobile (<768px)
- Reduced hero height
- Single column layout
- Optimized typography

## Performance Considerations

1. Image Optimization
- Compress background image
- Use responsive images
- Lazy load where appropriate

2. Animation
- Use CSS transitions
- Optimize for performance
- Consider reduced motion

## Accessibility

1. Semantic HTML
2. ARIA labels
3. Keyboard navigation
4. Color contrast
5. Screen reader support

## Testing

1. Responsive breakpoints
2. Content variations
3. Browser compatibility
4. Performance metrics
5. Accessibility compliance
