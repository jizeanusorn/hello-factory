# Deployment Guide - Google Cloud Platform

This guide covers deploying Hello Factory to Google Cloud Platform using Cloud Run.

## Prerequisites

1. Google Cloud Account with billing enabled
2. GCP Project created
3. Cloud SDK (`gcloud`) installed locally or use Cloud Shell

## Option 1: Deploy via Cloud Shell (Recommended)

### Step 1: Clone Repository in Cloud Shell

```bash
# Open Cloud Shell at https://console.cloud.google.com
# Clone the repository
git clone https://github.com/jizeanusorn/hello-factory.git
cd hello-factory
```

### Step 2: Install Dependencies and Build

```bash
# Install pnpm
npm install -g pnpm

# Install dependencies
pnpm install

# Build the application
pnpm build
```

### Step 3: Create Dockerfile

Create a file named `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Install a simple HTTP server
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "8080"]
```

### Step 4: Deploy to Cloud Run

```bash
# Set your GCP project ID
export PROJECT_ID="your-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com

# Build and deploy to Cloud Run
gcloud run deploy hello-factory \
  --source . \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --port 8080

# The command will output a URL like:
# https://hello-factory-xxxxx-as.a.run.app
```

## Option 2: Deploy via Firebase Hosting

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Initialize Firebase

```bash
# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Select:
# - Use an existing project or create new
# - Public directory: dist
# - Configure as single-page app: Yes
# - Set up automatic builds with GitHub: No
```

### Step 3: Build and Deploy

```bash
# Build the application
pnpm build

# Deploy to Firebase
firebase deploy --only hosting

# Your site will be available at:
# https://your-project.web.app
```

## Option 3: Deploy to App Engine

### Step 1: Create app.yaml

Create a file named `app.yaml`:

```yaml
runtime: nodejs20

handlers:
  - url: /.*
    secure: always
    redirect_http_response_code: 301
    script: auto

env_variables:
  NODE_ENV: production
```

### Step 2: Deploy

```bash
# Build the application
pnpm build

# Deploy to App Engine
gcloud app deploy
```

## Testing the Deployment

1. **Access the URL** provided after deployment
2. **Test the clock display** - verify all three clocks are showing
3. **Download the Excel template** from the repository
4. **Upload the Excel file** using the "Upload Config" button
5. **Verify the clocks update** with your configured cities

## Excel Configuration for Testing

Download `hello-factory-config-template.csv` and modify:

```csv
clock1,clock2,clock3
JP,FR,AU
```

Upload this file to test changing clocks to Tokyo, Paris, and Sydney.

## Troubleshooting

### Build fails with memory error
Add to `Dockerfile`:
```dockerfile
ENV NODE_OPTIONS="--max-old-space-size=4096"
```

### Port issues on Cloud Run
Ensure your server listens on the PORT environment variable:
```bash
PORT=${PORT:-8080}
```

### Static files not loading
Check that `dist` directory exists after build:
```bash
ls -la dist/
```

## Cost Optimization

- **Cloud Run**: Free tier includes 2 million requests/month
- **Firebase Hosting**: Free tier includes 10GB storage, 360MB/day transfer
- **App Engine**: Consider using Cloud Run instead for better pricing

## Monitoring

View logs in Cloud Console:
```bash
gcloud run logs read hello-factory --region asia-southeast1
```

## Custom Domain (Optional)

### Cloud Run
```bash
gcloud run domain-mappings create \
  --service hello-factory \
  --domain your-domain.com \
  --region asia-southeast1
```

### Firebase Hosting
```bash
firebase hosting:channel:deploy production
```

---

**Next Steps**: After deployment, test the complete Excel → Display pipeline to validate the AI Software Factory architecture.
