from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from datetime import datetime
from .database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    status = Column(String, default="pending")  # pending, processing, completed
    is_urgent = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    progress = Column(Float, default = 0.0) #0.0 to 100.0