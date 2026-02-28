import sys
import os

# Add the parent directory to sys.path to import app
sys.path.append(os.getcwd())

from app.core.config import settings

print(f"CORS_ORIGINS raw: {settings.CORS_ORIGINS}")
print(f"cors_origins_list: {settings.cors_origins_list}")
