# BotForge – Backend Architecture

## Overview

BotForge Backend es una API REST construida con **FastAPI** que expone servicios de backtesting
para traders de criptomonedas. Procesa datos OHLCV y ejecuta simulaciones de estrategias
mediante un motor vectorizado basado en NumPy.

---

## Technology Stack

| Capa             | Tecnología            | Propósito                          |
|------------------|-----------------------|------------------------------------|
| API Framework    | FastAPI               | REST API, auto-docs, validación    |
| Lenguaje         | Python 3.12+          | Ecosistema de datos, async, tipado |
| ORM              | SQLAlchemy 2.0        | Modelos, migraciones (Alembic)     |
| Base de Datos    | PostgreSQL 16         | Persistencia ACID                  |
| Cache            | Redis 7               | Cache OHLCV, sesiones              |
| Computación      | Pandas + NumPy        | Backtesting vectorizado            |
| Testing          | pytest + httpx        | Unit + integration tests           |
| Contenedores     | Docker + Compose      | Entorno reproducible               |
| Linting          | Ruff + mypy           | Formato y type checking            |

---

## Architecture Layers

```
┌─────────────────────────────────────────────────┐
│                   API Layer                      │
│  api/v1/endpoints/ (health, backtest, market)    │
├─────────────────────────────────────────────────┤
│                Schemas Layer                     │
│  schemas/ (Pydantic request/response models)     │
├─────────────────────────────────────────────────┤
│               Services Layer                     │
│  services/ (business logic orchestration)        │
├─────────────────────────────────────────────────┤
│                 Core Layer                       │
│  core/ (simulation engine, strategies, indicators│
├─────────────────────────────────────────────────┤
│                Models Layer                      │
│  models/ (SQLAlchemy ORM models)                 │
├─────────────────────────────────────────────────┤
│               Database Layer                     │
│  db/ (engine, sessions, migrations)              │
└─────────────────────────────────────────────────┘
```

---

## Folder Structure

```
BackEnd/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Pydantic Settings
│   ├── api/v1/              # Versioned API endpoints
│   ├── core/                # Simulation engine, strategies, indicators
│   ├── models/              # SQLAlchemy ORM models
│   ├── schemas/             # Pydantic validation schemas
│   ├── services/            # Business logic layer
│   └── db/                  # Database session & migrations
├── tests/                   # pytest test suite
├── Dockerfile               # Multi-stage Docker build
├── docker-compose.yml       # API + PostgreSQL + Redis
├── requirements.txt         # Python dependencies
└── .env.example             # Environment variable template
```

---

## Data Flow

```
Client Request
     │
     ▼
  FastAPI Router (api/v1/)
     │
     ▼
  Pydantic Schema (validation)
     │
     ▼
  Service Layer (orchestration)
     │
     ├──▶ SimulationEngine (core/)
     │         │
     │         ├── Strategy.generate_signals()
     │         └── Engine.run() → BacktestResult
     │
     ├──▶ SQLAlchemy Models (persist)
     │
     └──▶ Response Schema → JSON
```

---

## Key Design Decisions

1. **Vectorized backtesting**: NumPy array operations for O(n) performance vs O(n²) loop-based approaches.
2. **Strategy pattern**: Abstract `BaseStrategy` class for easy extension of trading strategies.
3. **Application factory**: `create_app()` pattern for testability and configuration flexibility.
4. **Versioned API**: `/api/v1/` prefix allows non-breaking API evolution.
5. **Docker-first**: All services containerized for reproducible development and deployment.
