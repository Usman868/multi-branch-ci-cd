dme · MD
# CI/CD Pipeline Demo
 
A simple Node.js Express server deployed automatically to Vercel using GitHub Actions.
 
---
 
## What This Project Does
 
Every time you push code, GitHub Actions automatically:
- Installs dependencies
- Runs tests (if any)
- Deploys to the right environment based on the branch
---
 
## Project Structure
 
```
cicd/
├── index.js                      # Express server
├── package.json                  # Dependencies
├── .gitignore                    # Ignored files
└── .github/
    └── workflows/
        └── multi-branch.yml      # CI/CD pipeline
```
 
---
 
## Server Endpoints
 
| Route | Response |
|-------|----------|
| `GET /` | Pipeline status + deployed timestamp |
 
---
 
## Branch Strategy
 
| Branch | Purpose | Deploys To |
|--------|---------|------------|
| `dev` | development and testing | QA (preview URL) |
| `main` | stable production code | Production (live URL) |
 
---
 
## CI/CD Pipeline Flow
 
```
push to dev
      │
      ▼
install-and-test  (install + run tests)
      │
      ├── failed  →  deploy cancelled ❌
      └── passed  →  deploy-qa ✅ (preview URL)
 
 
push to main
      │
      ▼
install-and-test  (install + run tests)
      │
      ├── failed  →  deploy cancelled ❌
      └── passed  →  deploy-production ✅ (live URL)
 
 
open pull request → main
      │
      ▼
install-and-test only  (no deploy runs)
```
 
---
 
## Pipeline Jobs
 
**install-and-test** — runs on both `main` and `dev`
- Checks out the code
- Sets up Node.js 24
- Installs dependencies
- Runs tests if a test script exists
**deploy-qa** — runs only on `dev` after install-and-test passes
- Pulls Vercel preview environment
- Builds the project
- Deploys to preview URL
**deploy-production** — runs only on `main` after install-and-test passes
- Pulls Vercel production environment
- Builds the project
- Deploys to production URL
---
 
## Setup Guide
 
### 1. Clone the repo
 
```bash
git clone https://github.com/yourusername/cicd.git
cd cicd
npm install
```
 
### 2. Run locally
 
```bash
npm start
# Server running on http://localhost:3000
```
 
### 3. Link to Vercel (one time only)
 
```bash
npm i -g vercel
vercel login
vercel link
```
 
After `vercel link` open `.vercel/project.json` and copy the values:
 
```json
{
  "orgId": "your-org-id",
  "projectId": "your-project-id"
}
```
 
### 4. Add GitHub Secrets
 
Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
 
| Secret | Where to get it |
|--------|----------------|
| `VERCEL_TOKEN` | vercel.com → Profile → Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` → `projectId` |
 
### 5. Push and watch it deploy
 
```bash
git add .
git commit -m "initial commit"
git push origin main
```
 
Go to **Actions** tab in your GitHub repo to watch the pipeline run.
 
---
 
## Tech Stack
 
| Tool | Purpose |
|------|---------|
| Node.js | Runtime |
| Express | Web framework |
| GitHub Actions | CI/CD pipeline |
| Vercel | Hosting and deployment |