# Distributed Task Monitor

A high-performance, full-stack distributed system designed to handle asynchronous background processing. This project demonstrates a production-ready architecture using **FastAPI**, **Next.js**, and **Celery** to manage long-running tasks without blocking the main application thread.

## The Stack
- **Backend:** FastAPI (Python 3.11)
- **Frontend:** Next.js 14+ (TypeScript, Tailwind CSS)
- **Task Queue:** Celery + Redis
- **Database:** PostgreSQL 15
- **Infrastructure:** Docker & Docker Compose
- **Monitoring:** Flower (Celery Monitoring Tool)

## Key Features
- **Asynchronous Task Execution:** Offloads heavy processing to background workers.
- **Bulk Injector:** Trigger multiple concurrent tasks with a single click to test system throughput.
- **Real-time Progress Tracking:** Live feedback loop showing task percentage and status.
- **Microservices Orchestration:** Fully containerized environment with dedicated networks for DB, Cache, and API.

## 🏁 Installation & Running

Follow these steps to get the entire system running on your local machine using Docker.

### 1. Prerequisites
Ensure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### 2. Clone the Repository
```bash
git clone [https://github.com/erikbacsa/task-monitor.git](https://github.com/erikbacsa/task-monitor.git)
cd task-monitor
docker compose up --build
