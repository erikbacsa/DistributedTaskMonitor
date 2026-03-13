from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# What the user sends when they CREATE a task
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    is_urgent: bool = False

# What the API sends BACK to the user (includes database fields)
class Task(TaskCreate):
    id: int
    status: str
    progress: float
    created_at: datetime

    class Config:
        from_attributes = True