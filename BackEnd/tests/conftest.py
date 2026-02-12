"""
BotForge Backend – Test Fixtures

Shared pytest fixtures for API and unit tests.
"""

import pytest
from fastapi.testclient import TestClient

from app.main import app


@pytest.fixture
def client():
    """FastAPI test client."""
    with TestClient(app) as c:
        yield c
