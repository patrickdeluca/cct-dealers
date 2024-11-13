# GitHub Actions Configuration Guide

## Workflow Overview

### CI Pipeline
Located in `.github/workflows/ci.yml`
- Runs on push to main/develop
- Runs on pull requests
- Validates code quality
- Runs tests
- Checks accessibility
- Verifies performance

### Deployment Pipeline
Located in `.github/workflows/deploy.yml`
- Deploys to staging on merge to develop
- Deploys to production on merge to main
- Handles AWS S3 and CloudFront
- Creates GitHub releases

### PR Preview Pipeline
Located in `.github/workflows/preview.yml`
- Creates preview deployments for PRs
- Posts preview URL as comment
- Uses Firebase Hosting

## Required Secrets

### AWS Credentials
```yaml
AWS_ACCESS_KEY_ID: AWS access key
AWS_SECRET_ACCESS_KEY: AWS secret key
STAGING_S3_BUCKET: Staging bucket name
PROD_S3_BUCKET: Production bucket name
STAGING_CF_DISTRIBUTION: Staging CloudFront ID
PROD_CF_DISTRIBUTION: Production CloudFront ID
```

### API Configuration
```yaml
STAGING_API_URL: https://api.staging.carcapital.com
PROD_API_URL: https://api.carcapital.com
PREVIEW_API_URL: https://api.preview.carcapital.com
```

### Firebase Configuration
```yaml
FIREBASE_SERVICE_ACCOUNT: Firebase service account JSON
```

## Environment Configuration

### Staging Environment
```yaml
name: staging
url: https://staging.carcapital.com
protection_rules:
  - required_reviewers: 1
  - deployment_branch: develop
```

### Production Environment
```yaml
name: production
url: https://carcapital.com
protection_rules:
  - required_reviewers: 2
  - deployment_branch: main
  - required_checks:
    - ci-validation
    - accessibility
    - performance
```

## Workflow Details

### CI Validation Steps
```yaml
steps:
  - Type checking
  - Linting
  - Unit tests
  - Build verification
  - Accessibility tests
  - Performance checks
```

### Deployment Steps
```yaml
steps:
  - Build application
  - Upload to S3
  - Invalidate CloudFront
  - Create release (production only)
```

### Preview Steps
```yaml
steps:
  - Build application
  - Deploy to Firebase
  - Post preview URL
```

## Custom Scripts

### Build Scripts
```json
{
  "scripts": {
    "build:staging": "REACT_APP_ENV=staging react-scripts build",
    "build:prod": "REACT_APP_ENV=production react-scripts build",
    "build:preview": "REACT_APP_ENV=preview react-scripts build"
  }
}
```

### Test Scripts
```json
{
  "scripts": {
    "test:ci": "react-scripts test --ci --coverage",
    "test:a11y": "jest -c jest.a11y.config.js",
    "typecheck": "tsc --noEmit"
  }
}
```

## Workflow Triggers

### CI Workflow
```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
```

### Deploy Workflow
```yaml
on:
  push:
    branches: [ main ]
  workflow_dispatch:
```

### Preview Workflow
```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

## Error Handling

### Build Failures
1. Check build logs
2. Verify environment variables
3. Check dependency issues
4. Review TypeScript errors

### Deployment Failures
1. Verify AWS credentials
2. Check S3 permissions
3. Validate CloudFront setup
4. Review deployment logs

## Monitoring

### Success Metrics
- Build success rate
- Deployment frequency
- Time to deploy
- Rollback frequency

### Failure Alerts
- Build failures
- Test failures
- Deployment issues
- Performance regressions

## Best Practices

### Workflow Organization
1. Keep workflows focused
2. Use reusable actions
3. Maintain clear naming
4. Document environment requirements

### Security
1. Use environment secrets
2. Limit permissions
3. Validate dependencies
4. Scan for vulnerabilities

### Performance
1. Cache dependencies
2. Optimize build steps
3. Use matrix builds
4. Clean up artifacts

## Troubleshooting

### Common Issues
1. Missing secrets
2. Permission errors
3. Build failures
4. Deployment timeouts

### Resolution Steps
1. Check workflow logs
2. Verify configurations
3. Test locally
4. Review permissions

## Resources

### Documentation
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [AWS S3 Deploy Action](https://github.com/marketplace/actions/s3-sync)
- [Firebase Deploy Action](https://github.com/marketplace/actions/deploy-to-firebase-hosting)

### Support
- GitHub Support
- AWS Support
- Firebase Support
- Development Team
