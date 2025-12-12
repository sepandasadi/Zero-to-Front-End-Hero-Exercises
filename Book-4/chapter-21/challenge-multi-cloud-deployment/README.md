# Challenge Project: Multi-Cloud Production Deployment

**Difficulty:** ⭐⭐⭐⭐ Expert
**Time Required:** 8-12 hours
**Prerequisites:** All Chapter 21 exercises completed

---

## 🎯 Project Overview

Build and deploy a production-ready full-stack application across multiple cloud providers, implementing best practices for scalability, security, and cost optimization.

---

## 📋 Project Requirements

### **Application: Cloud Task Manager**

A real-time collaborative task management application with:
- User authentication and authorization
- Real-time task updates
- File attachments
- Email notifications
- Analytics dashboard
- Mobile-responsive design

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│           MULTI-CLOUD ARCHITECTURE                       │
└─────────────────────────────────────────────────────────┘

Frontend (AWS):
├─ React App hosted on S3
├─ CloudFront CDN for global delivery
├─ Route 53 for DNS
└─ ACM for SSL certificates

Backend API (Google Cloud):
├─ Cloud Run for containerized API
├─ Cloud Load Balancing
├─ Cloud Armor for DDoS protection
└─ Secret Manager for credentials

Database & Auth (Firebase):
├─ Firestore for real-time data
├─ Firebase Authentication
├─ Cloud Functions for triggers
└─ Firebase Storage for files

Monitoring (AWS):
├─ CloudWatch for metrics
├─ X-Ray for distributed tracing
└─ CloudWatch Logs for centralized logging
```

---

## 📦 Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite build tool
- Tailwind CSS
- React Query for state management
- React Router for routing
- Firebase SDK

**Backend:**
- Node.js + Express
- TypeScript
- Firebase Admin SDK
- Joi for validation
- Winston for logging
- Jest for testing

**Infrastructure:**
- Docker for containerization
- Terraform for IaC
- GitHub Actions for CI/CD
- AWS CLI
- gcloud CLI

---

## 🚀 Implementation Steps

### Phase 1: Project Setup (2 hours)

1. **Initialize Monorepo**
```bash
mkdir cloud-task-manager
cd cloud-task-manager

# Create workspace structure
mkdir -p {frontend,backend,infrastructure,scripts}

# Initialize package.json
npm init -y

# Install workspace dependencies
npm install -D typescript @types/node
```

2. **Frontend Setup**
```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install firebase react-query react-router-dom @headlessui/react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Backend Setup**
```bash
cd ../backend
npm init -y
npm install express cors helmet morgan winston
npm install firebase-admin joi dotenv
npm install -D typescript @types/express @types/node ts-node nodemon
npm install -D jest @types/jest ts-jest supertest
```

4. **Create Docker Configuration**

`backend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 8080
CMD ["node", "dist/server.js"]
```

---

### Phase 2: Frontend Development (3 hours)

**Key Features to Implement:**

1. **Authentication System**
```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
```

2. **Task Management with Firestore**
```typescript
// src/hooks/useTasks.ts
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  userId: string;
}

export function useTasks() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery<Task[]>(
    ['tasks', user?.uid],
    async () => {
      const tasksRef = collection(db, 'tasks');
      const q = query(
        tasksRef,
        where('userId', '==', user?.uid),
        orderBy('createdAt', 'desc')
      );

      return new Promise((resolve) => {
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const tasks = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Task[];
          resolve(tasks);
        });
      });
    },
    { enabled: !!user }
  );

  const createTask = useMutation(
    async (task: Omit<Task, 'id'>) => {
      await addDoc(collection(db, 'tasks'), {
        ...task,
        userId: user?.uid,
        createdAt: new Date().toISOString()
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', user?.uid]);
      }
    }
  );

  const updateTask = useMutation(
    async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, updates);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', user?.uid]);
      }
    }
  );

  const deleteTask = useMutation(
    async (id: string) => {
      await deleteDoc(doc(db, 'tasks', id));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', user?.uid]);
      }
    }
  );

  return {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask
  };
}
```

3. **Modern UI Components**
```typescript
// src/components/TaskCard.tsx
import { Task } from '../types';
import { useTask } from '../hooks/useTasks';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { updateTask, deleteTask } = useTasks();

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    'todo': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'done': 'bg-green-100 text-green-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
          {task.status}
        </span>

        <div className="flex space-x-2">
          <button
            onClick={() => updateTask.mutate({
              id: task.id,
              updates: { status: task.status === 'done' ? 'todo' : 'done' }
            })}
            className="text-blue-600 hover:text-blue-800"
          >
            Toggle
          </button>
          <button
            onClick={() => deleteTask.mutate(task.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </div>
    </div>
  );
}
```

---

### Phase 3: Backend API Development (3 hours)

**Create Express API:**

```typescript
// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import taskRoutes from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
});

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/tasks', authMiddleware, taskRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

```typescript
// backend/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    email?: string;
  };
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

---

### Phase 4: Infrastructure as Code (2 hours)

**Terraform Configuration:**

```hcl
# infrastructure/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

# AWS Provider
provider "aws" {
  region = var.aws_region
}

# Google Cloud Provider
provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# AWS S3 Bucket for Frontend
resource "aws_s3_bucket" "frontend" {
  bucket = "${var.project_name}-frontend-${var.environment}"
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "frontend" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${aws_s3_bucket.frontend.id}"
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${aws_s3_bucket.frontend.id}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# Google Cloud Run Service
resource "google_cloud_run_service" "backend" {
  name     = "${var.project_name}-backend"
  location = var.gcp_region

  template {
    spec {
      containers {
        image = "gcr.io/${var.gcp_project_id}/${var.project_name}-backend:latest"

        env {
          name  = "FIREBASE_PROJECT_ID"
          value = var.firebase_project_id
        }

        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Make Cloud Run service public
resource "google_cloud_run_service_iam_member" "public" {
  service  = google_cloud_run_service.backend.name
  location = google_cloud_run_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
```

---

### Phase 5: CI/CD Pipeline (2 hours)

**GitHub Actions Workflow:**

```yaml
# .github/workflows/deploy.yml
name: Deploy Multi-Cloud App

on:
  push:
    branches: [main]

env:
  AWS_REGION: us-east-1
  GCP_REGION: us-central1
  GCP_PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}

jobs:
  # Test frontend
  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
      - name: Run tests
        working-directory: ./frontend
        run: npm test
      - name: Build
        working-directory: ./frontend
        run: npm run build

  # Test backend
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        working-directory: ./backend
        run: npm ci
      - name: Run tests
        working-directory: ./backend
        run: npm test

  # Deploy frontend to AWS
  deploy-frontend:
    needs: test-frontend
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Build frontend
        working-directory: ./frontend
        run: |
          npm ci
          npm run build
      - uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Deploy to S3
        working-directory: ./frontend
        run: |
          aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id ${{ secrets.CF_DISTRIBUTION_ID }} \
            --paths "/*"

  # Deploy backend to Google Cloud Run
  deploy-backend:
    needs: test-backend
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
      - uses: google-github-actions/setup-gcloud@v1
      - name: Build and push Docker image
        working-directory: ./backend
        run: |
          gcloud builds submit \
            --tag gcr.io/${{ env.GCP_PROJECT_ID }}/task-manager-backend:${{ github.sha }}
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy task-manager-backend \
            --image gcr.io/${{ env.GCP_PROJECT_ID }}/task-manager-backend:${{ github.sha }} \
            --platform managed \
            --region ${{ env.GCP_REGION }} \
            --allow-unauthenticated
```

---

## ✅ Acceptance Criteria

### **Functionality**
- [ ] User registration and login works
- [ ] Tasks can be created, read, updated, deleted
- [ ] Real-time updates across devices
- [ ] File attachments work
- [ ] Email notifications sent
- [ ] Analytics dashboard displays metrics

### **Performance**
- [ ] Lighthouse score > 90 for all metrics
- [ ] API response time < 200ms (p95)
- [ ] Frontend loads in < 2s globally
- [ ] Database queries optimized

### **Security**
- [ ] All traffic uses HTTPS
- [ ] Authentication properly implemented
- [ ] Authorization rules enforce per-user data
- [ ] Secrets stored securely
- [ ] CORS configured correctly
- [ ] Rate limiting implemented

### **Infrastructure**
- [ ] Frontend deployed to AWS S3 + CloudFront
- [ ] Backend deployed to Google Cloud Run
- [ ] Database on Firebase Firestore
- [ ] CI/CD pipeline fully automated
- [ ] Infrastructure defined in Terraform
- [ ] Monitoring and logging configured

### **Documentation**
- [ ] README with setup instructions
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Architecture diagram
- [ ] Deployment guide
- [ ] Cost estimation document

---

## 📊 Expected Costs

**Development/Testing:**
- AWS Free Tier: $0
- GCP Free Tier: $0
- Firebase Spark Plan: $0
- **Total: FREE**

**Production (1000 users):**
- AWS (S3 + CloudFront): ~$5/month
- GCP (Cloud Run): ~$10/month
- Firebase (Firestore + Auth): ~$15/month
- **Total: ~$30/month**

---

## 🎓 Learning Outcomes

After completing this project, you will understand:

✅ Multi-cloud architecture design
✅ Infrastructure as Code with Terraform
✅ CI/CD pipeline implementation
✅ Container orchestration
✅ Serverless architecture patterns
✅ Real-time database synchronization
✅ Authentication and authorization
✅ Cost optimization strategies
✅ Monitoring and observability
✅ Production deployment best practices

---

## 📚 Additional Resources

- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Google Cloud Architecture Center](https://cloud.google.com/architecture)
- [Firebase Best Practices](https://firebase.google.com/docs/guides)
- [Terraform Documentation](https://www.terraform.io/docs)

---

**Estimated Completion Time:** 8-12 hours
**Showcase this in your portfolio!** 🎉

This comprehensive project demonstrates professional-level cloud engineering skills valued by employers.

