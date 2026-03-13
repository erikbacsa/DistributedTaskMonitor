from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# 1. Get the connection string from your environment variables
# This matches the name put in .env file earlier
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# 2. Create the Engine
# This is the object that talks to Postgres
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 3. Create a Session factory
# Each time there is a database operation, create a new session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 4. Create the Base class
# 'Task' model in models.py will inherit from this
Base = declarative_base()

# 5. Dependency for our routes
# Ensures each request gets its own connection and closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()