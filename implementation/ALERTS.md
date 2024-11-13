# Bundle Size Alerts Guide

## Overview
This guide explains the automated alert system for monitoring bundle size changes and notifying the team of significant changes.

## Alert Thresholds

### Default Thresholds
```javascript
const ALERT_THRESHOLDS = {
  TOTAL_INCREASE: 50 * 1024,  // 50KB
  CHUNK_INCREASE: 20 * 1024,  // 20KB
  PERCENTAGE_INCREASE: 10,    // 10%
};
```

## Setup

### Environment Variables
```bash
# .env
SLACK_TOKEN=xoxb-your-token
SLACK_CHANNEL=#bundle-alerts
```

### Installation
```bash
npm install @slack/web-api filesize chalk
```

## Alert Types

### Total Bundle Size
- Triggers when total bundle size increases by:
  - More than 50KB
  - More than 10% of previous size

### Chunk Size
- Triggers when any chunk increases by:
  - More than 20KB
  - More than 10% of previous size

### New Chunks
- Triggers when new chunks are added

## Slack Integration

### Message Format
```javascript
{
  type: 'section',
  text: {
    type: 'mrkdwn',
    text: '🚨 *Bundle Size Alerts*\n2 issue(s) detected'
  }
}
```

### Alert Data
```javascript
{
  type: 'Total Bundle Size Increase',
  change: '+52KB (+12.5%)',
  current: '468KB',
  previous: '416KB'
}
```

## Usage

### Manual Check
```bash
npm run check:alerts
```

### CI Integration
```yaml
- name: Check Bundle Size
  run: npm run check:alerts
  env:
    SLACK_TOKEN: ${{ secrets.SLACK_TOKEN }}
    SLACK_CHANNEL: '#bundle-alerts'
```

## Monitoring

### Trend Analysis
- Tracks size changes over time
- Stores historical data
- Generates trend reports

### Alert History
```json
{
  "timestamp": "2024-01-20T10:00:00Z",
  "totalSize": 468000,
  "changes": [
    {
      "type": "Total Bundle Size Increase",
      "change": "+52KB (+12.5%)"
    }
  ]
}
```

## Best Practices

### Alert Management
1. Review alerts promptly
2. Investigate significant changes
3. Document findings
4. Take corrective action
5. Update thresholds if needed

### Size Optimization
1. Code splitting
2. Tree shaking
3. Dependency audit
4. Image optimization
5. Chunk consolidation

## Troubleshooting

### Common Issues
1. False positives
2. Missing alerts
3. Slack integration
4. Threshold tuning

### Resolution Steps
1. Check configurations
2. Verify thresholds
3. Test notifications
4. Review history

## Resources

### Documentation
- [Bundle Analysis](./BUNDLE_ANALYSIS.md)
- [Performance Guide](./PERFORMANCE.md)
- [Slack API Docs](https://api.slack.com/)
