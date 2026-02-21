-- ============================================================
-- BotForge - Database Initialization Script
-- Runs automatically on first docker-compose up
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PLAN
-- ============================================================
CREATE TABLE IF NOT EXISTS plan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    max_strategies INTEGER NOT NULL DEFAULT 1,
    max_simulations_per_day INTEGER NOT NULL DEFAULT 5,
    features JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed Initial Plans
INSERT INTO plan (name, description, price_monthly, max_strategies, max_simulations_per_day) 
VALUES 
('free', 'Basic free plan for beginners', 0.00, 1, 2),
('pro', 'Professional plan with more strategies', 29.99, 10, 50),
('whale', 'Elite plan for heavy traders', 99.99, 50, 500)
ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- CURRENCY PAIR
-- ============================================================
CREATE TABLE IF NOT EXISTS currency_pair (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symbol VARCHAR(20) UNIQUE NOT NULL, -- e.g., 'BTCUSDT'
    base_asset VARCHAR(10) NOT NULL,    -- e.g., 'BTC'
    quote_asset VARCHAR(10) NOT NULL,   -- e.g., 'USDT'
    exchange VARCHAR(50) NOT NULL DEFAULT 'binance',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Seed common pairs
INSERT INTO currency_pair (symbol, base_asset, quote_asset)
VALUES
('BTCUSDT', 'BTC', 'USDT'),
('ETHUSDT', 'ETH', 'USDT'),
('BNBUSDT', 'BNB', 'USDT'),
('SOLUSDT', 'SOL', 'USDT')
ON CONFLICT (symbol) DO NOTHING;

-- ============================================================
-- USER_B
-- ============================================================
CREATE TABLE IF NOT EXISTS user_b (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    plan_id UUID NOT NULL REFERENCES plan(id),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_b_email ON user_b(email);
CREATE INDEX IF NOT EXISTS idx_user_b_plan_id ON user_b(plan_id);


-- ============================================================
-- STRATEGY
-- ============================================================
CREATE TABLE IF NOT EXISTS strategy (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES user_b(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) NOT NULL,  -- 'grid' or 'dca'
    params JSONB NOT NULL DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_strategy_user_id ON strategy(user_id);

-- ============================================================
-- SIMULATION LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS simulation_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES user_b(id) ON DELETE CASCADE,
    strategy_id UUID REFERENCES strategy(id) ON DELETE SET NULL,
    currency_pair_id UUID REFERENCES currency_pair(id) ON DELETE SET NULL,
    pair VARCHAR(20), -- Deprecated
    timeframe VARCHAR(10) NOT NULL,
    date_start TIMESTAMPTZ NOT NULL,
    date_end TIMESTAMPTZ NOT NULL,
    metrics JSONB NOT NULL DEFAULT '{}',
    equity_curve JSONB,
    trades JSONB,
    execution_time_ms INTEGER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_simulation_log_user_id ON simulation_log(user_id);
CREATE INDEX IF NOT EXISTS idx_simulation_log_currency_pair_id ON simulation_log(currency_pair_id);
CREATE INDEX IF NOT EXISTS idx_simulation_log_created_at ON simulation_log(created_at);

-- ============================================================
-- SUBSCRIPTION
-- ============================================================
CREATE TABLE IF NOT EXISTS subscription (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES user_b(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plan(id),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    stripe_customer_id VARCHAR(255),
    start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_date TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_subscription_user_id ON subscription(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_plan_id ON subscription(plan_id);
