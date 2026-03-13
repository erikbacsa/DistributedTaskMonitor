# 🚀 Distributed Task Monitor

A production-grade distributed system designed to handle asynchronous tasks. This project showcases a modern full-stack architecture using **FastAPI** for the API layer and **Celery** for background processing.

## 🛠 Features
- **Real-time Dashboard**: Built with Next.js and Tailwind CSS for a sleek, dark-mode experience.
- **Background Workers**: Tasks are offloaded to Celery workers via Redis to keep the API responsive.
- **Bulk Operations**: "Bulk Injector" feature to stress-test worker concurrency.
- **Full Monitoring**: Health checks via Flower and persistent storage via PostgreSQL.

## 🏗 System Architecture
The system follows a standard distributed pattern:
1. **Frontend** (Next.js) sends a POST request to the **API**.
2. **API** (FastAPI) saves the task metadata to **PostgreSQL**.
3. **API** pushes the Task ID to the **Redis** message broker.
4. **Worker** (Celery) picks up the task and simulates work, updating the DB progress.
5. **Frontend** polls the API every 2 seconds to reflect the live status.

## 🚦 Getting Started

### Prerequisites
- Docker & Docker Compose installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/erikbacsa/DistrubtedTaskMonitor.git
   cd task-monitor
