# DEALS 2.0 API Integration Guide

## API Overview

### Available Services
1. DealerCenter Integration
2. LEADS System (Coming Soon)
3. Authentication Service
4. Document Processing

## Authentication

### JWT Implementation
```typescript
// auth.ts
interface AuthToken {
  token: string;
  expires: number;
}

const getAuthToken = async (): Promise<AuthToken> => {
  const response = await fetch(`${API_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      clientId: process.env.REACT_APP_CLIENT_ID,
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
    }),
  });
  
  return response.json();
};
```

### API Client Setup
```typescript
// apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## DealerCenter Integration

### Deal Submission
```typescript
interface DealSubmission {
  dealerId: string;
  customerInfo: CustomerInfo;
  vehicleInfo: VehicleInfo;
  financingDetails: FinancingDetails;
}

const submitDeal = async (deal: DealSubmission): Promise<DealResponse> => {
  try {
    const response = await apiClient.post('/deals', deal);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
```

### Real-time Updates
```typescript
// websocket.ts
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_WS_URL, {
  auth: {
    token: await getAuthToken(),
  },
});

socket.on('deal_update', (data) => {
  // Handle real-time deal updates
});

socket.on('approval_status', (data) => {
  // Handle approval status changes
});
```

## Error Handling

### API Error Types
```typescript
enum ApiErrorType {
  AUTH_ERROR = 'AUTH_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
}

interface ApiError {
  type: ApiErrorType;
  message: string;
  code: number;
  details?: any;
}
```

### Error Handler
```typescript
const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      return {
        type: ApiErrorType.AUTH_ERROR,
        message: 'Authentication failed',
        code: 401,
      };
    }
    // Handle other error types
  }
  
  return {
    type: ApiErrorType.SERVER_ERROR,
    message: 'Unknown error occurred',
    code: 500,
  };
};
```

## Data Models

### Customer Information
```typescript
interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  creditScore?: number;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
```

### Vehicle Information
```typescript
interface VehicleInfo {
  vin: string;
  make: string;
  model: string;
  year: number;
  trim: string;
  mileage: number;
  price: number;
}
```

## API Endpoints

### Deals API
```typescript
const DEALS_ENDPOINTS = {
  submit: '/api/v1/deals',
  status: '/api/v1/deals/:id/status',
  update: '/api/v1/deals/:id',
  documents: '/api/v1/deals/:id/documents',
};
```

### LEADS API (Coming Soon)
```typescript
const LEADS_ENDPOINTS = {
  create: '/api/v1/leads',
  update: '/api/v1/leads/:id',
  status: '/api/v1/leads/:id/status',
};
```

## Rate Limiting

### Implementation
```typescript
const rateLimiter = {
  maxRequests: 100,
  windowMs: 60000, // 1 minute
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests',
      retryAfter: 60,
    });
  },
};
```

## Caching

### Cache Implementation
```typescript
import { cacheAdapter } from './cache';

const getCachedData = async (key: string) => {
  const cached = await cacheAdapter.get(key);
  if (cached) return cached;
  
  const fresh = await fetchFreshData();
  await cacheAdapter.set(key, fresh, 3600); // 1 hour
  return fresh;
};
```

## Testing

### API Tests
```typescript
describe('API Integration', () => {
  it('submits deal successfully', async () => {
    const deal = mockDealData();
    const response = await submitDeal(deal);
    expect(response.status).toBe('SUBMITTED');
  });
  
  it('handles validation errors', async () => {
    const invalidDeal = {};
    await expect(submitDeal(invalidDeal)).rejects.toThrow();
  });
});
```

## Security

### Request Signing
```typescript
const signRequest = (payload: any): string => {
  const timestamp = Date.now();
  const signature = createHmac('sha256', SECRET_KEY)
    .update(`${timestamp}.${JSON.stringify(payload)}`)
    .digest('hex');
    
  return `t=${timestamp},sig=${signature}`;
};
```

## Monitoring

### API Metrics
```typescript
const trackApiMetrics = (endpoint: string, duration: number, status: number) => {
  metrics.record({
    endpoint,
    duration,
    status,
    timestamp: new Date(),
  });
};
```

## Resources

### Documentation
- [API Reference](../api-reference/README.md)
- [Error Codes](../api-reference/errors.md)
- [Integration Examples](../examples/api-integration/)

### Support
- API Support Team
- Integration Specialists
- Technical Documentation
- Status Page
