# 🚀 Distributed Task Monitor

A full-stack, distributed task orchestration system demonstrating a **Producer-Consumer architecture**. Built to handle long-running, asynchronous background processes without blocking the main API thread.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | FastAPI (Python 3.11) |
| **Frontend** | Next.js 14 (TypeScript, Tailwind CSS) |
| **Task Queue** | Celery |
| **Message Broker** | Redis |
| **Database** | PostgreSQL 15 |
| **Infrastructure** | Docker & Docker Compose |

---

## 📂 Project Structure

```
task-monitor/
├── app/                    # FastAPI backend, Celery worker logic, PostgreSQL schemas
├── frontend/               # Next.js UI application and dashboard logic
├── docker-compose.yml      # Container orchestration config
└── .env                    # Environment variables (git-ignored)
```

---

## 🏁 Setup Guide

### Prerequisites

Make sure you have the following installed:
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone the Repository

```bash
git clone https://github.com/erikbacsa/task-monitor.git
cd task-monitor
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=taskdb
REDIS_URL=redis://redis:6379/0
```

### 3. Build and Launch

```bash
docker compose up --build
```

> **Note:** The `--build` flag is required on the first run to compile the Next.js app and install Python dependencies.

### 4. Verify the System

Once the terminal logs show `Application startup complete`, the system is live:

| Service | URL |
|---|---|
| **Web Dashboard** | http://localhost:3000 |
| **API Swagger Docs** | http://localhost:8000/docs |
| **Flower (Worker Monitor)** | http://localhost:5555 |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/tasks/` | Retrieve all tasks and their current progress |
| `POST` | `/tasks/` | Create a single new background task |
| `POST` | `/tasks/bulk` | Inject 4 tasks simultaneously to test worker concurrency |
| `DELETE` | `/tasks/` | Wipe all tasks from the PostgreSQL database |

Full interactive documentation is available at [http://localhost:8000/docs](http://localhost:8000/docs) via Swagger UI.

---

## 🛠️ Maintenance & Troubleshooting

### Stop the Stack

Shut down safely without dropping the database volume:

```bash
docker compose stop
```

### Hard Reset (Wipe Database)

Clear the PostgreSQL volume if tasks are stuck or you need a clean slate:

```bash
docker compose down -v
```

### Debug Workers

Stream real-time execution logs from the Celery container:

```bash
docker compose logs -f worker
```
