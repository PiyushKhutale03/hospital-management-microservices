# 🏥 Hospital Management Microservices — Complete Deployment & Operations Guide

Welcome to the production deployment and operations guide for the **Hospital Management Microservices Architecture**. This document covers local development, Docker multi-container orchestration, and cloud deployments (AWS, Render, Railway, Kubernetes).

---

## 🏗 System Architecture & Topology

| Service Name | Port | Database / Dependency | Purpose |
| :--- | :--- | :--- | :--- |
| **Service Registry (Eureka)** | 8761 | Standalone | Service discovery & heartbeat monitor |
| **API Gateway** | 8089 | Eureka | Single entry point, routing, global CORS, JWT forwarding |
| **Patient Service** | 8084 | PostgreSQL (patient_db: 5432) | Auth, Patient management, Appointments, User profiles |
| **Doctor Service** | 8082 | PostgreSQL (doctor_db: 5433) | Doctor onboarding, specializations, doctor schedules |
| **AI Service** | 8083 | Ollama (11434) | Spring AI LLM assistant, symptom triage, drug check, diet planner |
| **Ollama LLM** | 11434 | Volume storage | Local LLM inference engine (Mistral / Llama3) |
| **Hospital Frontend** | 3000 / 5173 | API Gateway (8089) | Modern React 19 + Tailwind CSS Web Application |

---

## 🚀 1. Quick Start: Local Multi-Container Docker Deployment

### Prerequisites:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Docker Engine 24+ & Docker Compose v2)

### Start All Services:
Run the following command from the root directory:
`ash
docker compose up -d --build
`

### Pull Ollama Model (for AI Service):
`ash
docker exec -it hospital-ollama ollama pull llama3
# or lightweight:
docker exec -it hospital-ollama ollama pull mistral
`

### Accessing the Applications:
- 🌐 **React Frontend Portal**: [http://localhost:3000](http://localhost:3000)
- 🧭 **API Gateway**: [http://localhost:8089](http://localhost:8089)
- 📊 **Eureka Service Registry**: [http://localhost:8761](http://localhost:8761)
- 🗄 **Patient Database (Postgres)**: localhost:5432 (patient_db)
- 🗄 **Doctor Database (Postgres)**: localhost:5433 (doctor_db)

### Stop All Services:
`ash
docker compose down
`

---

## 💻 2. Local Manual Development (Running Without Docker)

If you prefer running individual services from terminal or IntelliJ IDEA / VS Code:

### Step 1: Start PostgreSQL
Ensure PostgreSQL is running locally with databases created:
`sql
CREATE DATABASE patient_db;
CREATE DATABASE doctor_db;
`

### Step 2: Start Services in Order:
1. **Service Registry**:
   `ash
   cd service-registry
   .\mvnw.cmd spring-boot:run
   `
2. **Patient Service**:
   `ash
   cd patient-service
   .\mvnw.cmd spring-boot:run
   `
3. **Doctor Service**:
   `ash
   cd doctor-service
   .\mvnw.cmd spring-boot:run
   `
4. **AI Service** (Requires local Ollama running):
   `ash
   cd ai-service
   .\mvnw.cmd spring-boot:run
   `
5. **API Gateway**:
   `ash
   cd api-gateway
   .\mvnw.cmd spring-boot:run
   `
6. **Frontend App**:
   `ash
   cd hospital-frontend
   npm install
   npm run dev
   `

---

## ☁️ 3. Cloud Deployment Options

### Option A: Cloud VPS (AWS EC2 / DigitalOcean Droplet / Hetzner)
1. Provision an Ubuntu 24.04 LTS instance (t3.xlarge or 8GB RAM recommended for microservices + Ollama).
2. Install Docker & Docker Compose:
   `ash
   sudo apt-get update
   sudo apt-get install -y docker.io docker-compose-v2
   sudo systemctl enable --now docker
   `
3. Clone repository and launch:
   `ash
   git clone https://github.com/PiyushKhutale03/hospital-management-microservices.git
   cd hospital-management-microservices
   docker compose up -d --build
   `
4. Configure Nginx reverse proxy or SSL via Let's Encrypt Certbot.

### Option B: Managed PaaS (Render / Railway)
- Deploy PostgreSQL Managed instances for patient_db and doctor_db.
- Deploy each service as a Docker service on Render or Railway, passing:
  - SPRING_DATASOURCE_URL
  - SPRING_DATASOURCE_USERNAME
  - SPRING_DATASOURCE_PASSWORD
  - EUREKA_CLIENT_SERVICEURL_DEFAULTZONE
  - JWT_SECRET_KEY
- Deploy hospital-frontend to Vercel, Netlify, or AWS Amplify with VITE_API_BASE_URL pointing to your API Gateway URL.

---

## 🔐 4. Production Security & Environment Variables

| Variable | Default (Dev) | Production Recommendation |
| :--- | :--- | :--- |
| POSTGRES_PASSWORD | Piyush@03 | Generate 32+ char random alphanumeric string |
| JWT_SECRET_KEY | hospitalManagementSecretKey... | 256-bit secure secret key |
| EUREKA_CLIENT_SERVICEURL_DEFAULTZONE | http://service-registry:8761/eureka/ | Internal private VPC address |
| VITE_API_BASE_URL | http://localhost:8089 | https://api.yourhospitaldomain.com |
