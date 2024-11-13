# Lighthouse CI Configuration Guide

## Overview
This guide explains the Lighthouse CI configuration used in our project to ensure consistent performance, accessibility, and best practices.

## Performance Budgets

### Core Web Vitals
```json
{
  "first-contentful-paint": 2000,
  "interactive": 3500,
  "speed-index": 3000,
  "total-blocking-time": 300,
  "largest-contentful-paint": 2500,
  "cumulative-layout-shift": 0.1
}
```

### Category Scores
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## Running Locally

### Setup
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse CI
lhci autorun
```

### Configuration File
The `.lighthouserc.json` file in the root directory contains:
- Collection settings
- Assertion rules
- Upload configuration
- Server settings

## CI Integration

### GitHub Actions
```yaml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    configPath: './.lighthouserc.json'
    uploadArtifacts: true
    temporaryPublicStorage: true
```

### Automated Checks
1. Performance metrics
2. Accessibility compliance
3. Best practices
4. SEO optimization

## Assertions

### Performance
- First Contentful Paint < 2s
- Time to Interactive < 3.5s
- Speed Index < 3s
- Total Blocking Time < 300ms
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1

### Resource Optimization
- No render-blocking resources
- Minified CSS/JavaScript
- Optimized images
- Text compression
- Responsive images
- Efficient animations

### Accessibility
- ARIA attributes
- Color contrast
- Keyboard navigation
- Screen reader support
- Form labels
- Document structure

## Monitoring

### Dashboard Access
1. View results in GitHub Actions
2. Access temporary storage links
3. Track trends over time
4. Compare across branches

### Alert Configuration
```json
{
  "assertions": {
    "categories:performance": ["error", {"minScore": 0.9}],
    "categories:accessibility": ["error", {"minScore": 0.9}]
  }
}
```

## Troubleshooting

### Common Issues
1. Performance regressions
2. Accessibility violations
3. Resource optimization
4. Build configuration

### Resolution Steps
1. Review detailed reports
2. Identify bottlenecks
3. Optimize resources
4. Update configuration

## Best Practices

### Performance
1. Optimize images
2. Minimize JavaScript
3. Reduce CSS
4. Enable compression
5. Use caching

### Accessibility
1. Semantic HTML
2. ARIA labels
3. Color contrast
4. Keyboard navigation
5. Screen reader support

## Resources

### Documentation
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Performance Metrics](https://web.dev/metrics/)

### Tools
- Chrome DevTools
- Lighthouse CLI
- WebPageTest
- GTmetrix
