# BotForge – Backend

API REST de backtesting para traders de criptomonedas.

## Quick Start

### Con Docker (recomendado)

```bash
# Copiar variables de entorno
cp .env.example .env

# Levantar todos los servicios
docker-compose up --build
```

La API estará disponible en: `http://localhost:8000`
Documentación Swagger: `http://localhost:8000/docs`

### Sin Docker (desarrollo local)

```bash
# Crear entorno virtual
python -m venv venv
venv\Scripts\activate     # Windows
# source venv/bin/activate  # Mac/Linux

# Instalar dependencias
pip install -r requirements.txt

# Copiar variables de entorno
cp .env.example .env

# Ejecutar servidor de desarrollo
uvicorn app.main:app --reload --port 8000
```

## Tests

```bash
pytest tests/ -v
```

## API Endpoints

| Método | Ruta                       | Descripción              |
|--------|----------------------------|--------------------------|
| GET    | `/api/v1/health`           | Health check             |
| POST   | `/api/v1/backtest/`        | Ejecutar backtest        |
| GET    | `/api/v1/backtest/{id}`    | Obtener resultado        |
| GET    | `/api/v1/backtest/`        | Listar backtests         |
| GET    | `/api/v1/market-data/symbols` | Listar símbolos       |
| GET    | `/api/v1/market-data/ohlcv/{symbol}` | Obtener OHLCV |

## Stack

- **Python 3.12+** / **FastAPI**
- **PostgreSQL 16** / **SQLAlchemy 2.0**
- **Redis 7**
- **Pandas** + **NumPy**
- **Docker** + **Docker Compose**
