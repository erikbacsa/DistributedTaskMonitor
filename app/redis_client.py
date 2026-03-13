import redis
import os

# Connect to the Redis container using the hostname 'redis' (from docker-compose)
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis"), 
    port=6379, 
    db=0, 
    decode_responses=True
)

def get_redis():
    return redis_client