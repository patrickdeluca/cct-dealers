# DEALS 2.0 Data Privacy Guide

## Privacy Overview

### Compliance Requirements
1. GDPR
2. CCPA
3. GLBA (Gramm-Leach-Bliley Act)
4. State Privacy Laws
5. Industry Standards

## Data Classification

### Sensitive Data Types
```typescript
// types/privacy.ts
enum DataSensitivity {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  RESTRICTED = 'RESTRICTED'
}

interface PersonalData {
  type: string;
  sensitivity: DataSensitivity;
  retention: number; // days
  encryption: boolean;
}

const DATA_TYPES: Record<string, PersonalData> = {
  SSN: {
    type: 'SSN',
    sensitivity: DataSensitivity.RESTRICTED,
    retention: 365,
    encryption: true
  },
  CREDIT_SCORE: {
    type: 'CREDIT_SCORE',
    sensitivity: DataSensitivity.CONFIDENTIAL,
    retention: 365,
    encryption: true
  },
  EMAIL: {
    type: 'EMAIL',
    sensitivity: DataSensitivity.INTERNAL,
    retention: 730,
    encryption: true
  }
};
```

## Data Handling

### Data Masking
```typescript
// utils/privacy.ts
const maskData = (data: string, type: string): string => {
  switch (type) {
    case 'SSN':
      return `***-**-${data.slice(-4)}`;
    case 'CREDIT_CARD':
      return `****-****-****-${data.slice(-4)}`;
    case 'EMAIL':
      const [local, domain] = data.split('@');
      return `${local[0]}***@${domain}`;
    default:
      return data;
  }
};
```

### Data Encryption
```typescript
// utils/encryption.ts
interface EncryptionConfig {
  algorithm: string;
  keySize: number;
  ivSize: number;
}

const encryptionConfig: EncryptionConfig = {
  algorithm: 'aes-256-gcm',
  keySize: 32,
  ivSize: 16
};

const encryptSensitiveData = async (data: string): Promise<string> => {
  const key = await getEncryptionKey();
  const iv = crypto.getRandomValues(new Uint8Array(encryptionConfig.ivSize));
  const cipher = crypto.createCipheriv(encryptionConfig.algorithm, key, iv);
  
  return Buffer.concat([
    iv,
    cipher.update(data, 'utf8'),
    cipher.final()
  ]).toString('base64');
};
```

## Consent Management

### User Consent
```typescript
// components/ConsentBanner.tsx
interface ConsentOptions {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

const ConsentBanner: React.FC = () => {
  const [consent, setConsent] = useState<ConsentOptions>({
    analytics: false,
    marketing: false,
    necessary: true
  });

  const handleConsent = async (options: ConsentOptions) => {
    await saveConsent(options);
    updateTrackingPreferences(options);
  };

  return (
    <div role="dialog" aria-labelledby="consent-title">
      <h2 id="consent-title">Privacy Preferences</h2>
      {/* Consent options UI */}
    </div>
  );
};
```

## Data Access

### Access Control
```typescript
// middleware/privacy.ts
interface DataAccessPolicy {
  role: string;
  dataTypes: string[];
  actions: ('read' | 'write' | 'delete')[];
}

const enforceDataAccess = (policy: DataAccessPolicy) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = getUserRole(req);
    const dataType = getDataType(req);
    
    if (!hasAccess(userRole, dataType, policy)) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Insufficient permissions'
      });
    }
    
    next();
  };
};
```

## Data Retention

### Retention Policy
```typescript
// services/retention.ts
interface RetentionPolicy {
  dataType: string;
  retentionPeriod: number; // days
  archivePolicy?: string;
  deletionStrategy: 'hard' | 'soft';
}

const retentionService = {
  scheduleDataDeletion: async (data: any, policy: RetentionPolicy) => {
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + policy.retentionPeriod);
    
    await scheduleDeletion({
      data,
      deletionDate,
      policy
    });
  }
};
```

## User Rights

### GDPR Rights
```typescript
// services/userRights.ts
interface UserRightsRequest {
  type: 'access' | 'rectification' | 'erasure' | 'portability';
  userId: string;
  data?: any;
}

const userRightsService = {
  handleRequest: async (request: UserRightsRequest) => {
    switch (request.type) {
      case 'access':
        return await getUserData(request.userId);
      case 'erasure':
        return await deleteUserData(request.userId);
      case 'portability':
        return await exportUserData(request.userId);
      // Handle other rights
    }
  }
};
```

## Privacy by Design

### Component Guidelines
```typescript
// components/PrivacyAware.tsx
interface PrivacyProps {
  dataType: string;
  sensitivity: DataSensitivity;
  children: React.ReactNode;
}

const PrivacyAwareComponent: React.FC<PrivacyProps> = ({
  dataType,
  sensitivity,
  children
}) => {
  const canAccess = usePrivacyCheck(dataType, sensitivity);
  
  if (!canAccess) {
    return <RestrictedAccess />;
  }
  
  return <>{children}</>;
};
```

## Audit Logging

### Privacy Logs
```typescript
// services/privacyLogs.ts
interface PrivacyLog {
  action: string;
  dataType: string;
  userId: string;
  timestamp: Date;
  details: any;
}

const privacyLogger = {
  log: async (entry: PrivacyLog) => {
    await logPrivacyEvent({
      ...entry,
      environment: process.env.NODE_ENV,
      version: process.env.APP_VERSION
    });
  }
};
```

## Implementation Checklist

### Development Phase
1. [ ] Identify sensitive data
2. [ ] Implement encryption
3. [ ] Set up access controls
4. [ ] Configure consent management
5. [ ] Implement data retention

### Testing Phase
1. [ ] Privacy impact assessment
2. [ ] Security testing
3. [ ] Consent flow testing
4. [ ] Rights request testing
5. [ ] Audit log verification

## Resources

### Documentation
- [Privacy Policy](./privacy-policy.md)
- [Data Handling Guide](./data-handling.md)
- [Compliance Checklist](./compliance-checklist.md)

### Support
- Privacy Officer
- Legal Team
- Security Team
- Compliance Team
