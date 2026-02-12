# BotForge – Fase II: Análisis & Diseño Técnico

---

## AGENTE 1: ARQUITECTO DE SISTEMAS

---

### 1.1 Objetivos Técnicos Cuantitativos

| # | Objetivo | Métrica | Justificación |
|---|----------|---------|--------------|
| OT-1 | **Latencia de simulación < 2 s** para el P95 de backtests simples (1 par, 1 año, velas 1 h). | Percentil 95 del tiempo de respuesta del endpoint `POST /api/v1/simulations`. | Un usuario Free debe percibir la simulación como "instantánea" para ejecutar ≥ 2 backtests en su primera semana (KPI activación > 40 %). Latencias > 5 s producen abandono > 60 % (Google UX Research). |
| OT-2 | **Disponibilidad ≥ 99.9 %** del servicio core (API + Dashboard). | Uptime mensual medido por health-checks cada 30 s (UptimeRobot / CloudWatch). | Churn < 10 % exige que el servicio esté disponible cuando el trader tiene tiempo para analizar (horarios impredecibles 24/7). 99.9 % equivale a ≤ 43 min de downtime/mes. |
| OT-3 | **Capacidad de ≥ 1 M simulaciones/mes** con costo de infraestructura < $500 USD/mes en estado estacionario (≤ 5 000 usuarios activos). | Simulaciones completadas / mes; costo AWS CloudWatch + Cost Explorer. | Soportar la conversión Free → Pro > 4 % implica que la capa Free debe ser económicamente viable a escala. El techo de $500 permite margen bruto > 70 % con ~250 suscriptores Pro. |

---

### 1.2 Arquitectura en la Nube (AWS)

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           INTERNET / CDN                                 │
│  CloudFront (CDN) ─── S3 Bucket (SPA estático: React/Vite)              │
└────────────────────────────────────┬──────────────────────────────────────┘
                                     │ HTTPS
                          ┌──────────▼──────────┐
                          │   API Gateway (REST) │  Rate-limiting, Auth JWT
                          └──────────┬──────────┘
                                     │
                  ┌──────────────────▼──────────────────┐
                  │        Application Load Balancer      │
                  └──────────┬──────────────┬────────────┘
                             │              │
                ┌────────────▼──┐    ┌──────▼───────────┐
                │  ECS Fargate  │    │  ECS Fargate     │
                │  API Service  │    │  API Service     │  (Auto-scaling 2-8)
                │  (FastAPI)    │    │  (FastAPI)       │
                └───────┬──────┘    └──────┬───────────┘
                        │                  │
         ┌──────────────┼──────────────────┼────────────────┐
         │              │                  │                │
    ┌────▼────┐   ┌─────▼─────┐    ┌──────▼──────┐   ┌────▼──────┐
    │ RDS     │   │ ElastiCache│    │ SQS Queue   │   │ S3 Data   │
    │ Postgres│   │ (Redis)    │    │ (Sim Jobs)  │   │ (Market   │
    │         │   │ Cache OHLCV│    │             │   │  OHLCV)   │
    └─────────┘   └────────────┘    └──────┬──────┘   └───────────┘
                                           │
                              ┌────────────▼────────────┐
                              │  ECS Fargate Workers     │
                              │  Motor de Simulación     │
                              │  (Python / NumPy)        │
                              │  Auto-scaling 0-20 tasks │
                              └────────────┬─────────────┘
                                           │
                              ┌────────────▼────────────┐
                              │  EventBridge / SNS       │
                              │  Notificaciones          │
                              │  (WebSocket vía API GW)  │
                              └──────────────────────────┘

                  ┌──────────────────────────────────────┐
                  │  Stripe (Billing)                     │
                  │  Webhooks → API Service               │
                  └──────────────────────────────────────┘

                  ┌──────────────────────────────────────┐
                  │  Binance Public API                   │
                  │  Cron Lambda → S3 + Redis (OHLCV)    │
                  └──────────────────────────────────────┘
```

**Justificación arquitectónica:**

| Componente | Decisión | Razón |
|-----------|---------|-------|
| **ECS Fargate** (no EC2) | Serverless containers | Sin gestión de servidores; pago por uso; auto-scaling granular. Workers de simulación escalan a 0 cuando no hay carga → costo mínimo en off-peak. |
| **SQS** como cola de simulaciones | Desacopla API ↔ Workers | Permite procesar en paralelo sin perder trabajos. Dead-letter queue para reintentos. Soporta ráfagas de simulaciones sin saturar la API. |
| **ElastiCache (Redis)** | Caché de datos OHLCV | Datos de mercado se reutilizan entre usuarios. Cache-hit > 90 % reduce llamadas a S3/Binance y latencia de simulación. TTL de 1 h para velas recientes. |
| **RDS PostgreSQL** (no DynamoDB) | Relacional | Modelo de datos con relaciones fuertes (usuarios ↔ suscripciones ↔ estrategias). JSONB para parámetros flexibles de estrategia. Índices parciales para queries de rendimiento. |
| **CloudFront + S3** | SPA estático | Latencia global < 100 ms para carga del dashboard. Cache invalidation automático en deploy. |
| **Stripe** | Facturación recurrente | SDK maduro, soporte de Freemium/Pro out-of-the-box, webhooks para sincronización de estado de suscripción. PCI DSS compliance delegado. |

---

### 1.3 Stack Tecnológico Detallado

| Capa | Tecnología | Versión Mínima | Justificación |
|------|-----------|----------------|---------------|
| **Frontend** | React + TypeScript | React 18, TS 5 | Ecosistema maduro, tipado estático previene bugs en lógica de UI compleja. Ya inicializado en el proyecto (Vite). |
| **Frontend – UI** | Recharts + React Flow | Latest stable | Recharts: gráficos de equity curves, candlestick. React Flow: editor visual No-Code de estrategias (nodos arrastrables). |
| **Frontend – State** | Zustand | 4.x | Ligero, sin boilerplate vs Redux. Suficiente para estado de estrategias y resultados. |
| **Frontend – Build** | Vite | 5.x | Ya configurado. HMR rápido, tree-shaking óptimo. |
| **Backend – API** | FastAPI (Python) | 0.100+ | Async nativo, validación automática con Pydantic, generación OpenAPI. Python compartido con motor de simulación → un solo lenguaje de backend. |
| **Backend – Auth** | Supabase Auth o Auth0 Free | - | JWT + OAuth (Google/GitHub). Supabase: open-source y gratuito hasta 50 K MAU. Evita implementar auth propio. |
| **Motor de Simulación** | Python + NumPy + Pandas | Python 3.11+ | Vectorización nativa de operaciones sobre series temporales. Rendimiento suficiente para simulaciones de 1 año en < 1 s con datos en memoria. |
| **Base de Datos** | PostgreSQL | 15+ | JSONB, índices GIN, particionamiento nativo. RDS Multi-AZ para HA. |
| **Caché** | Redis (ElastiCache) | 7.x | Sub-ms latencia. Estructuras sortedset ideales para series OHLCV ordenadas por timestamp. |
| **Cola de mensajes** | Amazon SQS | - | Managed, sin servidor. FIFO para orden garantizado por usuario. Visibility timeout configurable para simulaciones largas. |
| **Almacenamiento** | Amazon S3 | - | Datos OHLCV históricos en formato Parquet (columnar, compresión ~10x vs CSV). Lifecycle policies para archivar datos > 5 años a Glacier. |
| **CDN** | CloudFront | - | Edge caching global. Lambda@Edge para headers de seguridad. |
| **CI/CD** | GitHub Actions | - | Integrado al repositorio existente. Deploy automático a ECS vía ECR. |
| **Monitoring** | CloudWatch + Sentry | - | CloudWatch: métricas infra, alarmas. Sentry: error tracking en frontend y backend con trazas de usuario. |
| **IaC** | Terraform | 1.5+ | Estado declarativo, idempotente. Módulos reutilizables por entorno (dev/staging/prod). |

---

### 1.4 Matriz de Correspondencia

| Objetivo de Negocio | Funcionalidad Técnica | Requerimiento de Datos |
|---------------------|----------------------|----------------------|
| **Tasa de activación > 40 %** (≥ 2 backtests semana 1) | Simulación con latencia < 2 s; UI No-Code con templates pre-cargados; onboarding guiado (3 pasos). | Datos OHLCV pre-cacheados en Redis para los 10 pares más populares (BTC/USDT, ETH/USDT, etc). Templates de estrategia en tabla `strategy_templates`. |
| **Churn < 10 % mensual** | Alta disponibilidad 99.9 %; notificaciones de resultados completados (email/push); historial de simulaciones persistente. | Tabla `simulations` con resultados completos indexados por `user_id + created_at`. Logs de errores para re-ejecución automática. |
| **Conversión Free → Pro > 4 %** | Feature-gating visible (métricas avanzadas bloqueadas con overlay); simulaciones paralelas exclusivas Pro; comparador de estrategias Pro-only. | Campo `plan` en tabla `subscriptions` indexado. Tabla `feature_flags` con reglas por plan. Contador `simulations_this_month` en Redis para enforcement de límites. |
| **Optimización paramétrica** | Grid search / Random search paralelo sobre rangos de parámetros. Worker pool escalable via SQS + Fargate. | Matriz de parámetros almacenada en `strategies.params` (JSONB). Resultados parciales en `optimization_runs` vinculados a `simulation_id`. |
| **Alta fidelidad de datos** | Ingestión periódica de datos de Binance (cron Lambda cada 1 h). Validación de integridad (gaps, outliers). | OHLCV en S3 (Parquet) como fuente de verdad. Redis como hot-cache. Tabla `data_quality_logs` para auditoría de gaps detectados. |
| **Facturación recurrente** | Integración Stripe: checkout session, webhooks para pago exitoso/fallido, portal de cliente. | Tabla `subscriptions` sincronizada con Stripe via `stripe_subscription_id`. Eventos de webhook en tabla `billing_events` para auditoría. |

---

## AGENTE 2: INGENIERO DE BASE DE DATOS

---

### 2.1 Diagrama Entidad-Relación (DER)

```
┌─────────────────┐       1:N        ┌──────────────────┐
│     users        │────────────────▶│  subscriptions    │
│─────────────────│                  │──────────────────│
│ id (PK, UUID)   │                  │ id (PK, UUID)    │
│ email           │       1:N        │ user_id (FK)     │
│ display_name    │──────┐           │ plan             │
│ auth_provider   │      │           │ status           │
│ avatar_url      │      │           │ stripe_sub_id    │
│ created_at      │      │           │ current_period_* │
│ updated_at      │      │           │ created_at       │
│ last_login_at   │      │           │ updated_at       │
└─────────────────┘      │           └──────────────────┘
         │               │
         │ 1:N           │ 1:N
         ▼               ▼
┌──────────────────┐   ┌──────────────────────┐
│  api_credentials  │   │    strategies         │
│──────────────────│   │──────────────────────│
│ id (PK, UUID)    │   │ id (PK, UUID)        │
│ user_id (FK)     │   │ user_id (FK)         │
│ exchange         │   │ name                 │
│ api_key_enc      │   │ description          │
│ api_secret_enc   │   │ pair                 │
│ is_active        │   │ timeframe            │
│ created_at       │   │ params (JSONB)       │
│ updated_at       │   │ is_template          │
└──────────────────┘   │ created_at           │
                       │ updated_at           │
                       └──────────┬───────────┘
                                  │ 1:N
                                  ▼
                       ┌──────────────────────┐      1:N     ┌──────────────────┐
                       │    simulations        │────────────▶│  simulation_trades│
                       │──────────────────────│              │──────────────────│
                       │ id (PK, UUID)        │              │ id (PK, UUID)    │
                       │ strategy_id (FK)     │              │ simulation_id(FK)│
                       │ user_id (FK)         │              │ entry_time       │
                       │ status (ENUM)        │              │ exit_time        │
                       │ date_from            │              │ side (BUY/SELL)  │
                       │ date_to              │              │ entry_price      │
                       │ initial_capital      │              │ exit_price       │
                       │ results (JSONB)      │              │ quantity         │
                       │ metrics (JSONB)      │              │ pnl              │
                       │ execution_time_ms    │              │ pnl_pct          │
                       │ error_message        │              │ fee              │
                       │ created_at           │              └──────────────────┘
                       │ completed_at         │
                       └──────────┬───────────┘
                                  │ 1:N
                                  ▼
                       ┌──────────────────────┐
                       │  optimization_runs    │
                       │──────────────────────│
                       │ id (PK, UUID)        │
                       │ simulation_id (FK)   │
                       │ param_combination    │
                       │   (JSONB)            │
                       │ roi                  │
                       │ sharpe_ratio         │
                       │ max_drawdown         │
                       │ total_trades         │
                       │ win_rate             │
                       │ created_at           │
                       └──────────────────────┘
```

**Cardinalidades:**
- `users` 1:N `subscriptions` — Un usuario puede tener múltiples suscripciones históricas (upgrade, downgrade, cancelación y re-suscripción). Solo una activa a la vez (constraint: `UNIQUE(user_id) WHERE status = 'active'`).
- `users` 1:N `strategies` — Límite Free: 1 estrategia activa (enforcement en API, no en DB, para flexibilidad).
- `users` 1:N `api_credentials` — Múltiples exchanges (futuro: Bybit, Coinbase). Solo Binance en MVP.
- `strategies` 1:N `simulations` — Misma estrategia con diferentes rangos de fechas o capital inicial.
- `simulations` 1:N `simulation_trades` — Log granular de cada trade para graficación y auditoría.
- `simulations` 1:N `optimization_runs` — Cada combinación de parámetros genera un resultado parcial.

---

### 2.2 Descripción de Campos, Tipos e Índices

#### Tabla `users`

| Campo | Tipo | Constraints | Notas |
|-------|------|-------------|-------|
| `id` | `UUID` | PK, DEFAULT `gen_random_uuid()` | Identificador universal. |
| `email` | `VARCHAR(255)` | UNIQUE, NOT NULL | Login principal. Normalizado a lowercase. |
| `display_name` | `VARCHAR(100)` | NOT NULL | Nombre visible en dashboard. |
| `auth_provider` | `VARCHAR(20)` | NOT NULL, DEFAULT `'email'` | `email`, `google`, `github`. |
| `avatar_url` | `TEXT` | NULLABLE | URL de avatar de OAuth o generado. |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | Registro. |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | Trigger `ON UPDATE`. |
| `last_login_at` | `TIMESTAMPTZ` | NULLABLE | Para métricas de retención. |

**Índices:** `idx_users_email` (UNIQUE), `idx_users_created_at` (para cohortes).

---

#### Tabla `subscriptions`

| Campo | Tipo | Constraints | Notas |
|-------|------|-------------|-------|
| `id` | `UUID` | PK | |
| `user_id` | `UUID` | FK → `users.id` ON DELETE CASCADE | |
| `plan` | `VARCHAR(20)` | NOT NULL, CHECK `IN ('free', 'pro')` | Tipo de plan. |
| `status` | `VARCHAR(20)` | NOT NULL, CHECK `IN ('active', 'canceled', 'past_due', 'trialing')` | Estado actual de suscripción. |
| `stripe_subscription_id` | `VARCHAR(255)` | NULLABLE, UNIQUE | NULL para plan Free. |
| `stripe_customer_id` | `VARCHAR(255)` | NULLABLE | Referencia para portal de cliente. |
| `current_period_start` | `TIMESTAMPTZ` | NULLABLE | Inicio del ciclo de facturación actual. |
| `current_period_end` | `TIMESTAMPTZ` | NULLABLE | Fin del ciclo. Usado para verificar vigencia. |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |

**Índices:** `idx_sub_user_active` → `UNIQUE(user_id) WHERE status = 'active'` (índice parcial).  
`idx_sub_stripe_id` → para lookups de webhook.

---

#### Tabla `strategies`

| Campo | Tipo | Constraints | Notas |
|-------|------|-------------|-------|
| `id` | `UUID` | PK | |
| `user_id` | `UUID` | FK → `users.id` ON DELETE CASCADE | |
| `name` | `VARCHAR(100)` | NOT NULL | Nombre descriptivo asignado por el usuario. |
| `description` | `TEXT` | NULLABLE | Descripción libre. |
| `pair` | `VARCHAR(20)` | NOT NULL | Par de trading. Ej: `BTCUSDT`. |
| `timeframe` | `VARCHAR(5)` | NOT NULL, CHECK `IN ('1m','5m','15m','1h','4h','1d')` | Frecuencia de velas. `1m` solo Pro. |
| `params` | `JSONB` | NOT NULL, DEFAULT `'{}'` | Grid range, stop_loss, take_profit, indicadores, condiciones de entrada/salida. Esquema validado en API con Pydantic. |
| `is_template` | `BOOLEAN` | NOT NULL, DEFAULT `false` | `true` para templates del sistema (onboarding). |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |

**Índices:** `idx_strat_user` → `(user_id, created_at DESC)` para listar estrategias del usuario ordenadas.  
`idx_strat_params` → GIN index sobre `params` para queries sobre indicadores específicos (analytics futuro).

**Ejemplo de `params` JSONB:**
```json
{
  "entry_conditions": [
    {"indicator": "RSI", "period": 14, "operator": "<", "value": 30}
  ],
  "exit_conditions": [
    {"indicator": "RSI", "period": 14, "operator": ">", "value": 70}
  ],
  "stop_loss_pct": 2.0,
  "take_profit_pct": 5.0,
  "position_size_pct": 10.0
}
```

---

#### Tabla `simulations`

| Campo | Tipo | Constraints | Notas |
|-------|------|-------------|-------|
| `id` | `UUID` | PK | |
| `strategy_id` | `UUID` | FK → `strategies.id` ON DELETE CASCADE | |
| `user_id` | `UUID` | FK → `users.id` | Desnormalizado para queries rápidas sin JOIN. |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT `'pending'`, CHECK `IN ('pending','running','completed','failed')` | Estado del job. |
| `date_from` | `DATE` | NOT NULL | Inicio del rango de backtest. |
| `date_to` | `DATE` | NOT NULL | Fin del rango de backtest. |
| `initial_capital` | `NUMERIC(16,2)` | NOT NULL, DEFAULT `10000` | Capital inicial en USDT. |
| `results` | `JSONB` | NULLABLE | Resumen: ROI, PnL total, # trades, etc. Poblado al completar. |
| `metrics` | `JSONB` | NULLABLE | Métricas avanzadas: Sharpe, Sortino, max drawdown, equity curve (array). |
| `execution_time_ms` | `INTEGER` | NULLABLE | Tiempo real de ejecución para monitoreo de SLA. |
| `error_message` | `TEXT` | NULLABLE | Detalle de error si status = `failed`. |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |
| `completed_at` | `TIMESTAMPTZ` | NULLABLE | |

**Índices:**  
- `idx_sim_user_created` → `(user_id, created_at DESC)` — Historial del usuario.  
- `idx_sim_status` → `(status) WHERE status IN ('pending','running')` — Workers buscan jobs pendientes.

**Ejemplo de `results` JSONB:**
```json
{
  "total_pnl": 1523.47,
  "total_pnl_pct": 15.23,
  "total_trades": 42,
  "winning_trades": 28,
  "losing_trades": 14,
  "win_rate": 66.67,
  "avg_trade_pnl": 36.27
}
```

**Ejemplo de `metrics` JSONB:**
```json
{
  "sharpe_ratio": 1.82,
  "sortino_ratio": 2.15,
  "max_drawdown_pct": 8.4,
  "calmar_ratio": 1.81,
  "profit_factor": 2.35,
  "equity_curve": [10000, 10120, 10340, ...]
}
```

---

#### Tabla `simulation_trades`

| Campo | Tipo | Constraints | Notas |
|-------|------|-------------|-------|
| `id` | `UUID` | PK | |
| `simulation_id` | `UUID` | FK → `simulations.id` ON DELETE CASCADE | |
| `entry_time` | `TIMESTAMPTZ` | NOT NULL | Timestamp de apertura. |
| `exit_time` | `TIMESTAMPTZ` | NULLABLE | NULL si trade aún abierto al final de la simulación. |
| `side` | `VARCHAR(4)` | NOT NULL, CHECK `IN ('BUY','SELL')` | Dirección del trade. |
| `entry_price` | `NUMERIC(20,8)` | NOT NULL | Precio de entrada (8 decimales para cripto). |
| `exit_price` | `NUMERIC(20,8)` | NULLABLE | |
| `quantity` | `NUMERIC(20,8)` | NOT NULL | Cantidad del activo. |
| `pnl` | `NUMERIC(16,2)` | NULLABLE | Ganancia/pérdida en USDT. |
| `pnl_pct` | `NUMERIC(8,4)` | NULLABLE | Porcentaje PnL del trade. |
| `fee` | `NUMERIC(16,8)` | NOT NULL, DEFAULT `0` | Comisión simulada (Binance 0.1 % por defecto). |

**Índices:** `idx_trades_sim` → `(simulation_id, entry_time)` para reconstruir timeline.

---

#### Tabla `api_credentials`

| Campo | Tipo | Constraints | Notas |
|-------|------|-------------|-------|
| `id` | `UUID` | PK | |
| `user_id` | `UUID` | FK → `users.id` ON DELETE CASCADE | |
| `exchange` | `VARCHAR(20)` | NOT NULL, DEFAULT `'binance'` | Exchange asociado. |
| `api_key_enc` | `BYTEA` | NOT NULL | Cifrado con AES-256-GCM. Key management via AWS KMS. |
| `api_secret_enc` | `BYTEA` | NOT NULL | Cifrado con AES-256-GCM. |
| `is_active` | `BOOLEAN` | NOT NULL, DEFAULT `true` | Soft-delete. |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |

**Índices:** `idx_cred_user` → `(user_id, exchange) WHERE is_active = true`.

**Nota de seguridad:** Las API keys se cifran en la capa de aplicación antes de persistir. La clave de cifrado reside en AWS KMS (nunca en código ni en variables de entorno directamente). El API secret nunca se retorna al frontend; solo se usa server-side para futuras funcionalidades (paper trading).

---

#### Tabla `billing_events` (Auditoría)

| Campo | Tipo | Constraints | Notas |
|-------|------|-------------|-------|
| `id` | `UUID` | PK | |
| `user_id` | `UUID` | FK → `users.id` | |
| `event_type` | `VARCHAR(50)` | NOT NULL | `payment_succeeded`, `payment_failed`, `subscription_updated`, etc. |
| `stripe_event_id` | `VARCHAR(255)` | UNIQUE | Idempotencia de webhooks. |
| `payload` | `JSONB` | NOT NULL | Evento completo de Stripe para auditoría. |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT `NOW()` | |

---

### 2.3 DFD Nivel 1 – Proceso Crítico: Simulación de Backtest

```
┌──────────┐    1. Crear/editar       ┌──────────────┐
│  Usuario  │───estrategia (UI)──────▶│  Frontend    │
│  (Actor)  │                         │  (React SPA) │
└──────────┘                          └──────┬───────┘
                                             │
                                    2. POST /api/v1/simulations
                                     {strategy_id, date_from,
                                      date_to, initial_capital}
                                             │
                                      ┌──────▼───────┐
                                      │   API Service │
                                      │   (FastAPI)   │
                                      └──────┬───────┘
                                             │
                              3. Validaciones:
                              │  a) Auth JWT → user_id
                              │  b) Verificar plan (Free: ≤ 5 sim/mes, no paralelas)
                              │  c) Validar params de estrategia (Pydantic)
                              │  d) Crear registro en DB: simulations(status='pending')
                                             │
                              4. Encolar job  │
                              ───────────────▼───────────────
                              │         SQS Queue           │
                              │  {simulation_id, user_id,   │
                              │   strategy_params, dates,   │
                              │   capital}                  │
                              ───────────────┬───────────────
                                             │
                              5. Worker consume job
                                             │
                              ┌──────────────▼──────────────┐
                              │   Simulation Worker          │
                              │   (ECS Fargate Task)         │
                              │                              │
                              │  5a. Obtener OHLCV:          │
                              │      Redis cache → hit? →    │
                              │      usar datos              │
                              │      miss? → S3 Parquet →    │
                              │      cargar a Redis + usar   │
                              │                              │
                              │  5b. Ejecutar backtest:      │
                              │      Loop vectorizado sobre  │
                              │      candles → aplicar       │
                              │      condiciones entry/exit  │
                              │      → calcular PnL          │
                              │                              │
                              │  5c. Calcular métricas:      │
                              │      ROI, Sharpe, Drawdown,  │
                              │      equity curve            │
                              │                              │
                              │  5d. Persistir resultados:   │
                              │      UPDATE simulations      │
                              │        SET results=...,      │
                              │        metrics=...,          │
                              │        status='completed'    │
                              │      INSERT simulation_trades│
                              └──────────────┬──────────────┘
                                             │
                              6. Notificar completado
                                             │
                              ┌──────────────▼──────────────┐
                              │  EventBridge → WebSocket     │
                              │  (API Gateway WS)            │
                              └──────────────┬──────────────┘
                                             │
                              7. Frontend recibe notificación
                              ┌──────────────▼──────────────┐
                              │  Frontend actualiza UI:      │
                              │  GET /api/v1/simulations/{id}│
                              │  → Renderiza gráficos,       │
                              │    tabla de trades, métricas  │
                              └─────────────────────────────┘
```

**Flujo de errores:**
- Step 3b falla (límite de plan) → HTTP 402 con mensaje claro + CTA upgrade.
- Step 5 falla (error de cálculo, datos inválidos) → Worker marca `status='failed'`, escribe `error_message`. Notifica al usuario via WebSocket. Auto-reintento: 1 vez (dead-letter queue tras 2 fallos).

---

## AGENTE 3: DISEÑADOR UX/UI & FRONTEND LEAD

---

### 3.1 Mapa del Sitio Jerárquico

```
BotForge (/)
├── Landing Page (/)
│   ├── Hero + CTA "Empieza gratis"
│   ├── Features (No-Code, Alta fidelidad, Optimización)
│   ├── Pricing (Free vs Pro)
│   └── Footer (Legal, Social)
│
├── Auth (/auth)
│   ├── Login (/auth/login)
│   ├── Register (/auth/register)
│   └── Forgot Password (/auth/forgot)
│
├── Dashboard (/dashboard) [Protected]
│   ├── Overview (/dashboard)
│   │   ├── KPI Cards (Total backtests, Win rate promedio, Mejor ROI)
│   │   ├── Actividad reciente (últimas 5 simulaciones)
│   │   └── Quick Start (template de 1 click)
│   │
│   ├── Estrategias (/dashboard/strategies)
│   │   ├── Lista de estrategias (/dashboard/strategies)
│   │   ├── Editor No-Code (/dashboard/strategies/:id/edit)
│   │   │   ├── Panel de indicadores (drag & drop)
│   │   │   ├── Configuración de condiciones (entry/exit)
│   │   │   └── Parámetros (SL, TP, position size)
│   │   └── Nueva estrategia (/dashboard/strategies/new)
│   │
│   ├── Simulaciones (/dashboard/simulations)
│   │   ├── Lista de simulaciones (/dashboard/simulations)
│   │   └── Detalle de simulación (/dashboard/simulations/:id)
│   │       ├── Métricas principales (ROI, Sharpe, Drawdown)
│   │       ├── Equity Curve (gráfico de línea)
│   │       ├── Tabla de trades (paginada)
│   │       └── Distribución de PnL (histograma)
│   │
│   ├── Optimización (/dashboard/optimize) [Pro]
│   │   ├── Selección de estrategia y rangos de parámetros
│   │   ├── Progreso de optimización (live)
│   │   └── Resultados (heatmap, tabla ranked)
│   │
│   ├── Configuración (/dashboard/settings)
│   │   ├── Perfil (/dashboard/settings/profile)
│   │   ├── API Keys (/dashboard/settings/api-keys)
│   │   ├── Suscripción (/dashboard/settings/billing)
│   │   └── Notificaciones (/dashboard/settings/notifications)
│   │
│   └── Upgrade (/dashboard/upgrade)
│       └── Comparación de planes + Checkout Stripe
│
└── Docs (/docs) [Público]
    ├── Getting Started
    ├── Indicadores soportados
    └── FAQ
```

---

### 3.2 Wireframe Estructurado – Dashboard Principal

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ┌───────┐                                           [🔔] [Avatar ▼]  │
│  │ LOGO  │  Dashboard  Estrategias  Simulaciones  Optimizar  Config   │
│  └───────┘                                                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐        │
│  │ 📊 Total Backtests│ │ 🎯 Win Rate Prom │ │ 💰 Mejor ROI     │        │
│  │     14           │ │    67.3%         │ │    +23.5%        │        │
│  │  ▲ +3 esta sem   │ │  ▲ vs 62% prev  │ │  BTC/USDT RSI    │        │
│  └──────────────────┘ └──────────────────┘ └──────────────────┘        │
│                                                                         │
│  ┌─────────────────────────────────────────────────┐  ┌──────────────┐ │
│  │  EQUITY CURVE                                    │  │ QUICK START  │ │
│  │  ┌─ Estrategia: [RSI Reversal ▼]               │  │              │ │
│  │  │                                               │  │ 🚀 Template  │ │
│  │  │    📈 [Gráfico de línea interactivo]          │  │    RSI basic │ │
│  │  │                                               │  │  [Ejecutar]  │ │
│  │  │  Rango: [01/01/2025] → [31/12/2025]          │  │              │ │
│  │  └───────────────────────────────────────────────│  │ 📋 Template  │ │
│  │  Métricas:                                       │  │    MACD cross│ │
│  │  ROI: +15.2%  |  Sharpe: 1.82  |  MDD: -8.4%   │  │  [Ejecutar]  │ │
│  └─────────────────────────────────────────────────┘  └──────────────┘ │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  SIMULACIONES RECIENTES                           [Ver todas →]    ││
│  │ ┌────────┬──────────┬────────┬────────┬─────────┬────────┐        ││
│  │ │ Nombre │ Par      │ ROI    │ Sharpe │ Estado  │ Fecha  │        ││
│  │ ├────────┼──────────┼────────┼────────┼─────────┼────────┤        ││
│  │ │ RSI v2 │ BTC/USDT │ +15.2% │ 1.82   │ ✅ Done │ Hoy    │        ││
│  │ │ MACD   │ ETH/USDT │ +8.7%  │ 1.24   │ ✅ Done │ Ayer   │        ││
│  │ │ Grid   │ SOL/USDT │ -2.1%  │ -0.15  │ ✅ Done │ 10 Feb │        ││
│  │ └────────┴──────────┴────────┴────────┴─────────┴────────┘        ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │  ⭐ DESBLOQUEA BOTFORGE PRO                                        ││
│  │  Simulaciones ilimitadas · Optimización paramétrica · Datos 1min   ││
│  │                    [ Upgrade a Pro – $19.99/mes ]                   ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

**Componentes del Dashboard:**

| Zona | Componente | Datos mostrados | Interacción |
|------|-----------|----------------|-------------|
| **Top** | Navbar | Logo, navegación principal, notificaciones, avatar con menú. | Click → navegar. Avatar → dropdown (perfil, billing, logout). |
| **KPI Cards** | 3 tarjetas métricas | Total backtests (período), win rate promedio, mejor ROI con nombre de estrategia. | Hover → tooltip con desglose. Click → filtrar simulaciones. |
| **Equity Curve** | Gráfico interactivo (Recharts) | Línea de equity sobre tiempo + benchmark (buy-and-hold). | Dropdown: seleccionar estrategia. Date picker: rango. Hover: tooltip con valor exacto. Zoom: scroll. |
| **Quick Start** | Cards de templates | 2-3 templates pre-configurados. | 1-click → crea estrategia + ejecuta simulación. Reduce fricción para activación. |
| **Simulaciones** | Tabla paginada | Nombre, par, ROI (rojo/verde), Sharpe, estado (badge), fecha. | Click fila → detalle. Ordenar por columna. |
| **CTA Pro** | Banner persistente (solo Free) | Propuesta de valor en 1 línea + precio. | Click → checkout Stripe. Dismiss → reaparece en 7 días. |

---

### 3.3 Principios de UI para Accesibilidad Cognitiva

| # | Principio | Implementación en BotForge | Justificación |
|---|-----------|---------------------------|---------------|
| 1 | **Divulgación progresiva** | El editor de estrategias muestra solo 3 campos esenciales inicialmente (par, indicador, SL/TP). Opciones avanzadas en panel expandible "Configuración avanzada". | Usuarios no técnicos se paralizan ante > 7 opciones simultáneas (Ley de Hick). |
| 2 | **Vocabulario del dominio, no técnico** | "Ganancia máxima por trade" en vez de "Take Profit". Tooltips con definiciones breves. Iconos acompañando cada término. | El 60 % del target son traders principiantes sin jerga técnica. |
| 3 | **Feedback inmediato** | Spinner con porcentaje durante simulación. Animación de éxito (confetti sutil) al completar. Colores semánticos: verde = ganancia, rojo = pérdida. | Reduce ansiedad de espera. Refuerzo positivo incrementa re-uso (Loop de engagement). |
| 4 | **Valores por defecto inteligentes** | Capital inicial: $10,000. Par: BTC/USDT. Timeframe: 1h. Rango: últimos 6 meses. | El usuario puede ejecutar su primer backtest con 0 configuración → maximiza activación. |
| 5 | **Guía contextual (onboarding)** | Tour guiado de 3 pasos en primer login: 1) Seleccionar template, 2) Click "Simular", 3) Interpretar resultados. No bloquea el UI; tooltips flotantes con "Siguiente/Saltar". | Reduce time-to-first-value a < 2 minutos. |
| 6 | **Consistencia visual** | Design tokens: 4 colores primarios, 1 tipografía (Inter), espaciado en múltiplos de 4px. Componentes reutilizables: Button, Card, Badge, Input. | Reduce carga cognitiva de aprender el UI. Patrón mental transferible entre pantallas. |
| 7 | **Error prevention** | Validación inline (no submit-and-fail). Campos numéricos con sliders + input. Rangos de fechas con calendario visual (no typing). Confirmación antes de eliminar estrategia. | Evita frustración por errores de input, principal causa de abandono en herramientas No-Code. |
| 8 | **Accesibilidad WCAG 2.1 AA** | Contraste mínimo 4.5:1. Navegación completa por teclado. `aria-labels` en elementos interactivos. Texto responsive (rem, no px fijo). | Compliance legal en mercados EU/US. Mejora UX para todos los usuarios, no solo con discapacidad. |

---

## AGENTE 4: PM TÉCNICO – RESUMEN EJECUTIVO & VALIDACIÓN

---

### 4.1 Resumen Ejecutivo Técnico

**BotForge** es una plataforma SaaS de backtesting No-Code para criptomonedas, con arquitectura event-driven sobre AWS.

**Stack core:** Frontend React/TypeScript (Vite) → API FastAPI (Python) → Motor de simulación vectorizado (NumPy/Pandas) orquestado via SQS + Fargate Workers. Datos OHLCV de Binance almacenados en S3 (Parquet) con hot-cache en Redis. Base de datos PostgreSQL (RDS Multi-AZ) con modelo relacional normalizado + JSONB para flexibilidad de parámetros de estrategia.

**Modelo de datos:** 7 tablas core (users, subscriptions, strategies, simulations, simulation_trades, optimization_runs, api_credentials) + 1 tabla de auditoría (billing_events). Cardinalidades diseñadas para soportar historial completo de cada usuario sin purga. Cifrado de credenciales con AES-256-GCM + AWS KMS.

**UX crítica:** Editor No-Code con divulgación progresiva, templates de 1-click para activación inmediata, dashboard con KPIs prominentes y CTA de upgrade persistente. Onboarding de 3 pasos, valores por defecto inteligentes, vocabulario no técnico con tooltips. WCAG 2.1 AA.

**Facturación:** Stripe Checkout + Customer Portal. Webhooks sincronizan estado de suscripción. Feature-gating implementado en middleware de API (no en frontend, para evitar bypass).

#### Riesgos Técnicos y Mitigaciones

| # | Riesgo | Probabilidad | Impacto | Mitigación |
|---|--------|-------------|---------|------------|
| R1 | **Datos OHLCV de Binance incompletos** (gaps, mantenimientos) | Media | Alto (resultados incorrectos) | Validación de integridad post-ingestión. Interpolación lineal para gaps < 3 velas. Alerta al usuario si gap > 3 velas en su rango. |
| R2 | **Costo de Fargate escala no-linealmente** con usuarios Free abusivos | Media | Medio | Rate-limiting por plan (Free: 5 sim/mes, 1 concurrente). Auto-scaling `minCapacity=0` → $0 cuando no hay carga. Alerta CloudWatch si costo > $400/mes. |
| R3 | **Latencia de simulación > 2 s** para pares con mucho volumen (1 min, 5 años) | Baja | Medio | Limitar rango Free a 1 año. Datos en Redis precalentados. Numpy vectorizado procesa 1M candles en < 500 ms. Pre-computar métricas incrementalmente. |
| R4 | **Vendor lock-in con AWS** | Baja | Bajo (a largo plazo) | FastAPI y PostgreSQL son cloud-agnostic. Containerización via Docker permite migración. S3 compatible con MinIO en caso de exit. |
| R5 | **Stripe downtime afecta cobros** | Muy baja | Alto | Webhook retry automático (Stripe reintenta 3 días). Tabla `billing_events` con idempotencia. Plan Free funciona sin Stripe. |

---

### 4.2 Checklist de Validación Cruzada

| # | Pregunta de Validación | Estado | Evidencia |
|---|----------------------|--------|-----------|
| 1 | ¿Cada KPI de negocio tiene soporte técnico explícito? | ✅ Sí | **Activación > 40 %** → Templates 1-click + latencia < 2 s + onboarding 3 pasos. **Churn < 10 %** → Disponibilidad 99.9 % + historial persistente + notificaciones. **Conversión > 4 %** → Feature-gating visible + CTA Pro + métricas avanzadas bloqueadas. Ver Matriz §1.4. |
| 2 | ¿El modelo de datos soporta los reportes requeridos? | ✅ Sí | `simulations.results` (JSONB) contiene ROI, PnL, win rate. `simulations.metrics` contiene Sharpe, Drawdown, equity curve. `simulation_trades` permite tabla granular de trades. `optimization_runs` soporta heatmap de combinaciones. Todos indexados para queries eficientes por usuario. |
| 3 | ¿La arquitectura puede escalar a 1 M simulaciones/mes? | ✅ Sí | SQS throughput: ilimitado (standard queue). Fargate auto-scaling 0→20 workers. A 2 s/simulación, 20 workers procesan ~864 K sim/día (muy por encima de 1 M/mes). Redis cache-hit > 90 % reduce I/O. RDS read replicas si queries de lectura saturan primary. |
| 4 | ¿El feature-gating está implementado server-side? | ✅ Sí | Middleware FastAPI valida `subscription.plan` en cada request a endpoints protegidos. Frontend muestra overlays, pero enforcement real es en API → no bypasseable. |
| 5 | ¿Los datos sensibles están protegidos? | ✅ Sí | API keys cifradas con AES-256-GCM + KMS. JWT con expiración de 15 min + refresh token. HTTPS obligatorio (CloudFront + ALB). No se retornan secrets al frontend. CORS restringido al dominio de producción. |
| 6 | ¿La UX soporta usuarios no técnicos? | ✅ Sí | Vocabulario no técnico + tooltips. Divulgación progresiva. Valores por defecto inteligentes (0 config para primer backtest). Templates pre-cargados. Feedback visual inmediato. WCAG 2.1 AA. |
| 7 | ¿El costo es viable en early-stage? | ✅ Sí | Fargate spot para workers (hasta -70 %). Workers escalan a 0 sin carga. Free tier de RDS (db.t3.micro). ElastiCache cache.t3.micro. Estimado: ~$150/mes con < 1 000 usuarios. Crece linealmente, no exponencialmente. |
| 8 | ¿Existe plan de monitoreo y alertas? | ✅ Sí | CloudWatch: métricas de latencia, error rate, queue depth. Sentry: error tracking con traces. Alarmas: latencia P95 > 3 s, error rate > 5 %, queue depth > 100, costo > 80 % presupuesto. |

---

### 4.3 Priorización de Implementación (MVP → v1.0)

| Fase | Alcance | Duración Estimada |
|------|---------|-------------------|
| **MVP (v0.1)** | Auth + 1 estrategia hardcoded (RSI) + simulación sincrónica + resultado básico (ROI, # trades). Sin Stripe, sin optimización. | 3-4 semanas |
| **v0.5** | Editor No-Code (3 indicadores: RSI, MACD, SMA) + simulación async (SQS + 1 worker) + dashboard con equity curve + Stripe Free/Pro. | 4-5 semanas |
| **v1.0** | Optimización paramétrica + 10+ indicadores + simulaciones paralelas Pro + historial completo + onboarding tour. | 4-6 semanas |

**Totales estimados:** 11-15 semanas para un equipo de 2 desarrolladores full-stack + 1 diseñador part-time.
