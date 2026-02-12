"""
BotForge - Auth Endpoint Tests.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_register_success(client: AsyncClient):
    """Register a new user and receive tokens."""
    response = await client.post(
        "/api/v1/auth/register",
        json={
            "email": "nuevo@botforge.com",
            "password": "securepass123",
            "full_name": "Nuevo Usuario",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    """Registering with an existing email returns 409."""
    payload = {
        "email": "dupe@botforge.com",
        "password": "securepass123",
    }
    await client.post("/api/v1/auth/register", json=payload)
    response = await client.post("/api/v1/auth/register", json=payload)
    assert response.status_code == 409


@pytest.mark.asyncio
async def test_login_success(client: AsyncClient):
    """Login with valid credentials returns tokens."""
    # First register
    await client.post(
        "/api/v1/auth/register",
        json={"email": "login@botforge.com", "password": "securepass123"},
    )
    # Then login
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "login@botforge.com", "password": "securepass123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient):
    """Login with wrong password returns 401."""
    await client.post(
        "/api/v1/auth/register",
        json={"email": "wrong@botforge.com", "password": "securepass123"},
    )
    response = await client.post(
        "/api/v1/auth/login",
        json={"email": "wrong@botforge.com", "password": "badpassword"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_refresh_token(client: AsyncClient):
    """Refresh token returns new token pair."""
    reg = await client.post(
        "/api/v1/auth/register",
        json={"email": "refresh@botforge.com", "password": "securepass123"},
    )
    refresh = reg.json()["refresh_token"]

    response = await client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": refresh},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data


@pytest.mark.asyncio
async def test_protected_endpoint_no_auth(client: AsyncClient):
    """Accessing protected endpoint without auth returns 403."""
    response = await client.get("/api/v1/users/me")
    assert response.status_code == 403
