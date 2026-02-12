"""
BotForge Backend – Health Endpoint Tests
"""


def test_health_check(client):
    """GET /api/v1/health should return 200 with healthy status."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "BotForge API"
    assert "version" in data
