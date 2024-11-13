# Bundle Analysis Guide

## Overview
This guide explains how to analyze and optimize the application's bundle size using webpack-bundle-analyzer.

## Setup

### Installation
```bash
npm install --save-dev webpack-bundle-analyzer
```

### Configuration
The `webpack.analyze.js` file contains the bundle analyzer configuration:
```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// ... configuration details
```

## Running Analysis

### Local Analysis
```bash
# Generate bundle analysis
npm run analyze

# View report
open dist/bundle-analysis.html
```

### CI Integration
```yaml
- name: Analyze Bundle
  run: npm run analyze
  
- name: Check Bundle Size
  run: node scripts/check-bundle-size.js
```

## Bundle Size Limits

### Main Bundle
```json
{
  "maxSize": {
    "javascript": "200KB",
    "css": "50KB",
    "initial": "250KB",
    "total": "1MB"
  }
}
```

### Chunk Limits
- Vendor chunks: 100KB
- Route chunks: 50KB
- Dynamic imports: 30KB

## Optimization Techniques

### Code Splitting
```javascript
// Route-based splitting
const DealersPage = lazy(() => import('./pages/Dealers'));

// Component splitting
const FeatureModal = lazy(() => 
  import(/* webpackChunkName: "feature-modal" */ './components/FeatureModal')
);
```

### Tree Shaking
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: true
  }
};
```

### Dynamic Imports
```typescript
// Async component loading
const loadComponent = async () => {
  const module = await import('./HeavyComponent');
  return module.default;
};
```

## Monitoring

### Size Tracking
```bash
# Track bundle size changes
npm run size-tracking

# Compare with main branch
npm run size-compare
```

### Alerts
```javascript
// size-limits.js
module.exports = {
  limits: [
    {
      path: 'dist/*.js',
      limit: '200 KB',
      warning: '150 KB'
    }
  ]
};
```

## Common Issues

### Large Dependencies
1. Identify large packages
2. Find alternatives
3. Use dynamic imports
4. Implement tree shaking

### Duplicate Code
1. Check for duplicates
2. Use deduplication
3. Optimize imports
4. Share common code

## Best Practices

### Code Organization
1. Proper chunking
2. Lazy loading
3. Route splitting
4. Component splitting

### Dependencies
1. Regular audits
2. Version control
3. Peer dependencies
4. Optional dependencies

## Performance Impact

### Loading Time
- Initial bundle size
- Chunk loading
- Caching strategy
- Compression

### Runtime Performance
- Code execution
- Memory usage
- Network requests
- Asset loading

## Optimization Steps

### 1. Analysis
```bash
# Generate detailed report
npm run analyze:detailed

# Check specific chunks
npm run analyze:chunk vendor
```

### 2. Optimization
```bash
# Optimize images
npm run optimize:images

# Minify assets
npm run optimize:assets

# Tree shake
npm run optimize:tree-shake
```

### 3. Verification
```bash
# Test performance
npm run test:performance

# Check bundle size
npm run check:size
```

## Tools & Resources

### Analysis Tools
- webpack-bundle-analyzer
- source-map-explorer
- bundlesize
- size-limit

### Documentation
- [Webpack Guide](https://webpack.js.org/guides/code-splitting/)
- [React Code-Splitting](https://reactjs.org/docs/code-splitting.html)
- [Bundle Analysis](https://survivejs.com/webpack/optimizing/analyzing-build-statistics/)

### Support
- Webpack Issues
- Bundle Analyzer Docs
- Performance Team
- Technical Lead
