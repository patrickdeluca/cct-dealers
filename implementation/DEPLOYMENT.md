# DEALS 2.0 Deployment Guide

## Environment Setup

### Environment Variables
```bash
# .env.production
REACT_APP_API_URL=https://api.carcapital.com
REACT_APP_DEALERCENTER_URL=https://dealercenter.api.com
REACT_APP_ENVIRONMENT=production
REACT_APP_FEATURES_LEADS=false
```

### Build Configuration
```typescript
// webpack.config.prod.js
module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            return `vendor.${module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]}`;
          }
        }
      }
    }
  }
};
```

## Build Process

### Production Build
```bash
# Clean previous build
rm -rf build/

# Install dependencies
npm ci

# Build application
npm run build

# Verify build
npm run serve:build
```

### Build Optimization
```bash
# Analyze bundle size
npm run analyze

# Optimize images
npm run optimize-assets

# Generate source maps
GENERATE_SOURCEMAP=true npm run build
```

## Deployment Environments

### Staging
```bash
# Deploy to staging
npm run deploy:staging

# Environment: staging.carcapital.com
# Features: LEADS enabled
# Purpose: QA and testing
```

### Production
```bash
# Deploy to production
npm run deploy:prod

# Environment: deals.carcapital.com
# Features: LEADS disabled
# Purpose: Live dealer access
```

## Deployment Checklist

### Pre-deployment
- [ ] Run all tests
- [ ] Check bundle size
- [ ] Verify environment variables
- [ ] Update version number
- [ ] Generate changelog

### Deployment Steps
1. Create deployment branch
2. Run production build
3. Execute deployment script
4. Verify deployment
5. Monitor metrics

### Post-deployment
- [ ] Run smoke tests
- [ ] Check error monitoring
- [ ] Verify analytics
- [ ] Monitor performance

## CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install
        run: npm ci
      - name: Test
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

### Deployment Scripts
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy:staging": "aws s3 sync build/ s3://staging-bucket --delete",
    "deploy:prod": "aws s3 sync build/ s3://production-bucket --delete",
    "postdeploy": "npm run notify-slack"
  }
}
```

## Monitoring

### Error Tracking
```typescript
// errorTracking.ts
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_ENVIRONMENT,
  release: process.env.REACT_APP_VERSION
});
```

### Performance Monitoring
```typescript
// monitoring.ts
import { init as initApm } from '@elastic/apm-rum';

const apm = initApm({
  serviceName: 'deals-frontend',
  serverUrl: process.env.REACT_APP_APM_SERVER
});
```

## Rollback Procedures

### Quick Rollback
```bash
# Revert to previous version
npm run rollback

# Verify rollback
npm run verify-deployment

# Monitor for issues
npm run monitor
```

### Manual Rollback Steps
1. Identify last stable version
2. Deploy previous build
3. Verify functionality
4. Monitor metrics
5. Investigate root cause

## Security Considerations

### Production Security
- SSL/TLS configuration
- Content Security Policy
- CORS settings
- Security headers

### Access Control
- API authentication
- Role-based access
- Rate limiting
- IP restrictions

## Documentation

### Release Notes
- Version changes
- New features
- Bug fixes
- Breaking changes

### Deployment Records
- Deployment date
- Version number
- Environment
- Deployer
- Status

## Support

### Monitoring Tools
- Sentry
- Elastic APM
- CloudWatch
- Datadog

### Contact Information
- DevOps Team
- On-call Support
- Technical Lead
- Security Team

## Troubleshooting

### Common Issues
1. Build failures
2. Deployment timeouts
3. Environment mismatches
4. Cache issues

### Resolution Steps
1. Check logs
2. Verify configuration
3. Test in staging
4. Rollback if needed

## Resources

### Documentation
- [AWS Deployment Guide](https://aws.amazon.com/getting-started/hands-on/deploy-react-app/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Sentry Documentation](https://docs.sentry.io/)

### Tools
- AWS CLI
- GitHub Actions
- Terraform
- Docker
