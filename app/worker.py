from celery import Celery
from .database import SessionLocal
from .models import Task
import os
import time

celery_app = Celery(
    "worker",
    broker=os.getenv("REDIS_URL", "redis://redis:6379/0"),
    backend=os.getenv("REDIS_URL", "redis://redis:6379/0")
)

@celery_app.task(name="process_task")
def process_task_background(task_id: int):
    # 1. Open a direct connection to Postgres
    db = SessionLocal()
    try:
        # 2. Find the task
        task = db.query(Task).filter(Task.id == task_id).first()
        if task:
            task.status = "processing"
            
            #3. simulate work
            for i in range(1, 6):
                time.sleep(1) #2 seconds per step
                task.progress = i * 20.0
                db.commit()
                print(f"Task {task_id} progress: {task.progress}%")
            
            # 4. Update the status
            task.status = "completed"
            db.commit()
            print(f"Task {task_id} marked as COMPLETED in database.")
    finally:
        db.close()