"""
BotForge - Strategy Endpoint Tests.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_strategy(client: AsyncClient, auth_headers: dict):
    """Create a grid strategy."""
    response = await client.post(
        "/api/v1/strategies/",
        json={
            "name": "Mi Grid BTC",
            "type": "grid",
            "params": {
                "upper_price": 70000,
                "lower_price": 60000,
                "grid_count": 10,
                "investment_amount": 1000,
            },
        },
        headers=auth_headers,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Mi Grid BTC"
    assert data["type"] == "grid"


@pytest.mark.asyncio
async def test_list_strategies(client: AsyncClient, auth_headers: dict):
    """List user's strategies."""
    # Create two strategies
    for name in ["Grid 1", "Grid 2"]:
        await client.post(
            "/api/v1/strategies/",
            json={"name": name, "type": "grid", "params": {}},
            headers=auth_headers,
        )

    response = await client.get("/api/v1/strategies/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2


@pytest.mark.asyncio
async def test_get_strategy_not_found(client: AsyncClient, auth_headers: dict):
    """Get a non-existent strategy returns 404."""
    response = await client.get(
        "/api/v1/strategies/00000000-0000-0000-0000-000000000001",
        headers=auth_headers,
    )
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_delete_strategy(client: AsyncClient, auth_headers: dict):
    """Delete a strategy."""
    # Create
    create_resp = await client.post(
        "/api/v1/strategies/",
        json={"name": "To Delete", "type": "dca", "params": {}},
        headers=auth_headers,
    )
    strategy_id = create_resp.json()["id"]

    # Delete
    response = await client.delete(
        f"/api/v1/strategies/{strategy_id}",
        headers=auth_headers,
    )
    assert response.status_code == 204

    # Verify gone
    response = await client.get(
        f"/api/v1/strategies/{strategy_id}",
        headers=auth_headers,
    )
    assert response.status_code == 404
