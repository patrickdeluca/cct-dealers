# DEALS 2.0 Performance Guide

## Performance Metrics

### Core Web Vitals
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Custom Metrics
- TTI (Time to Interactive): < 3.5s
- Bundle Size: < 200KB (initial)
- API Response Time: < 200ms

## Code Optimization

### Component Optimization
```typescript
// Memoization
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering */}</div>;
}, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});

// Lazy Loading
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

const Component = () => (
  <Suspense fallback={<Loader />}>
    <LazyComponent />
  </Suspense>
);
```

### Hook Optimization
```typescript
// Optimized Hooks
const useOptimizedCallback = (callback: () => void, deps: any[]) => {
  return useCallback(() => {
    // Expensive computation
    callback();
  }, deps);
};

// Memoized Values
const useMemoizedValue = (value: any, deps: any[]) => {
  return useMemo(() => {
    // Expensive computation
    return computeExpensiveValue(value);
  }, deps);
};
```

## Bundle Optimization

### Code Splitting
```typescript
// Route-based splitting
const routes = [
  {
    path: '/dealers',
    component: lazy(() => import('./pages/Dealers'))
  },
  {
    path: '/finance',
    component: lazy(() => import('./pages/Finance'))
  }
];

// Component-based splitting
const FeatureModal = lazy(() => 
  import(/* webpackChunkName: "feature-modal" */ './components/FeatureModal')
);
```

### Tree Shaking
```typescript
// webpack.config.js
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: true,
    minimize: true
  }
};
```

## Image Optimization

### Image Loading
```typescript
// Responsive Images
const ResponsiveImage = ({ src, alt }: ImageProps) => (
  <picture>
    <source
      media="(min-width: 768px)"
      srcSet={`${src}-large.webp`}
      type="image/webp"
    />
    <source
      media="(min-width: 768px)"
      srcSet={`${src}-large.jpg`}
    />
    <img
      src={`${src}-small.jpg`}
      alt={alt}
      loading="lazy"
      width="300"
      height="200"
    />
  </picture>
);
```

### Image Processing
```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    domains: ['assets.carcapital.com']
  }
};
```

## CSS Optimization

### Critical CSS
```typescript
// Extract critical CSS
const criticalCSS = new CriticalPlugin({
  base: 'src/',
  src: 'index.html',
  target: {
    css: 'styles/critical.css',
    html: 'index-critical.html',
    uncritical: 'styles/async.css'
  },
  dimensions: [
    {
      width: 375,
      height: 812
    },
    {
      width: 1366,
      height: 768
    }
  ]
});
```

### CSS-in-JS Optimization
```typescript
// Styled Components optimization
const StyledComponent = styled.div.withConfig({
  shouldComponentUpdate: (props, nextProps) => props.theme !== nextProps.theme,
  componentId: 'optimized-component'
})`
  // Styles
`;
```

## State Management

### Redux Optimization
```typescript
// Selectors
const selectOptimizedData = createSelector(
  [selectRawData],
  (rawData) => {
    // Memoized computation
    return processData(rawData);
  }
);

// Action Batching
const batchedActions = batch(() => {
  dispatch(action1());
  dispatch(action2());
  dispatch(action3());
});
```

## API Optimization

### Data Caching
```typescript
// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 3
    }
  }
});
```

### Request Optimization
```typescript
// API request batching
const batchRequests = async (requests: Request[]) => {
  const batchId = uuid();
  return axios.post('/batch', {
    batchId,
    requests: requests.map(req => ({
      url: req.url,
      method: req.method,
      data: req.data
    }))
  });
};
```

## Performance Monitoring

### Metrics Collection
```typescript
// Performance monitoring
const trackMetrics = () => {
  const metrics = {
    lcp: getLCP(),
    fid: getFID(),
    cls: getCLS(),
    tti: getTTI()
  };

  sendToAnalytics(metrics);
};
```

### Error Tracking
```typescript
// Error boundary with performance tracking
class PerformanceErrorBoundary extends React.Component {
  componentDidCatch(error: Error) {
    trackError({
      error,
      performance: getPerformanceMetrics()
    });
  }
}
```

## Testing Performance

### Lighthouse CI
```yaml
# .github/workflows/lighthouse.yml
name: Performance Testing
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v3
        with:
          urls: |
            https://staging.carcapital.com/
          budgetPath: ./budget.json
          uploadArtifacts: true
```

### Load Testing
```typescript
// k6 load test script
import http from 'k6/http';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('https://api.carcapital.com/deals');
}
```

## Best Practices

### Development
1. Use production builds
2. Enable source maps
3. Implement code splitting
4. Optimize images
5. Minimize dependencies

### Monitoring
1. Track Core Web Vitals
2. Monitor API performance
3. Track error rates
4. Measure TTI
5. Monitor bundle size

### Testing
1. Run performance tests
2. Check bundle analysis
3. Test on real devices
4. Monitor metrics
5. Set performance budgets

## Resources

### Tools
- Lighthouse
- WebPageTest
- Chrome DevTools
- Bundle Analyzer

### Documentation
- [Web Vitals](https://web.dev/vitals/)
- [Performance Budgets](./performance-budgets.md)
- [Optimization Guide](./optimization-guide.md)

### Support
- Performance Team
- DevOps Support
- Technical Lead
- Monitoring Tools
