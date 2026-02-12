# BotForge Backend

SaaS Backtesting Platform for Crypto Traders — API Backend.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Python 3.12 |
| Framework | FastAPI (async, Pydantic v2) |
| Database | PostgreSQL 15 + SQLAlchemy 2.0 (async) |
| Cache | Redis 7 |
| Engine | Pandas + NumPy (vectorized backtesting) |
| Auth | JWT (access + refresh tokens) + bcrypt |
| Encryption | AES-256-GCM (API keys at rest) |

## Quick Start (Docker)

```bash
# 1. Copy environment variables
cp .env.example .env

# 2. Start all services (API + PostgreSQL + Redis)
docker-compose up --build

# 3. Open Swagger UI
# http://localhost:8000/docs
```

## Quick Start (Local)

```bash
# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# 2. Install dependencies
pip install -r requirements.txt

# 3. Copy env and configure
cp .env.example .env
# Edit .env with your local PostgreSQL and Redis URLs

# 4. Run the server
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/health` | Health check | ❌ |
| POST | `/api/v1/auth/register` | Register user | ❌ |
| POST | `/api/v1/auth/login` | Login | ❌ |
| POST | `/api/v1/auth/refresh` | Refresh token | ❌ |
| GET | `/api/v1/users/me` | Get profile | ✅ |
| PATCH | `/api/v1/users/me` | Update profile | ✅ |
| POST | `/api/v1/strategies/` | Create strategy | ✅ |
| GET | `/api/v1/strategies/` | List strategies | ✅ |
| GET | `/api/v1/strategies/{id}` | Get strategy | ✅ |
| PUT | `/api/v1/strategies/{id}` | Update strategy | ✅ |
| DELETE | `/api/v1/strategies/{id}` | Delete strategy | ✅ |
| GET | `/api/v1/market/ohlcv` | Get OHLCV data | ✅ |
| POST | `/api/v1/simulations/` | Run simulation | ✅ |
| GET | `/api/v1/simulations/` | List simulations | ✅ |
| GET | `/api/v1/simulations/{id}` | Get simulation | ✅ |

## Running Tests

```bash
pip install aiosqlite  # Required for test DB
pytest tests/ -v
```

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── core/                 # Business logic
│   │   ├── config.py         # Settings
│   │   ├── security.py       # JWT + password hashing
│   │   ├── encryption.py     # AES-256-GCM
│   │   ├── simulation_engine.py
│   │   ├── metrics.py        # ROI, Sharpe, Drawdown, etc.
│   │   └── strategies/       # Grid, DCA
│   ├── api/v1/               # REST endpoints
│   ├── models/               # SQLAlchemy models
│   ├── schemas/              # Pydantic schemas
│   ├── services/             # Business logic layer
│   └── db/                   # Database session + init SQL
├── tests/                    # pytest suite
├── docker-compose.yml        # API + PostgreSQL + Redis
├── Dockerfile
└── requirements.txt
```
