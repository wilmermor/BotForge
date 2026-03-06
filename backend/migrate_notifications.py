"""
Migration script: Creates the notification table in PostgreSQL.
Run once: python migrate_notifications.py
"""

import asyncio
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

STATEMENTS = [
    """
    DO $$ BEGIN
        CREATE TYPE notificationtype AS ENUM ('success','urgent','alert','info','promo','error');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    """,
    """
    DO $$ BEGIN
        CREATE TYPE notificationcategory AS ENUM ('Bots','Posiciones','Sistema','Alertas');
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    """,
    """
    CREATE TABLE IF NOT EXISTS notification (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES user_b(id) ON DELETE CASCADE,
        type notificationtype NOT NULL,
        category notificationcategory NOT NULL,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
        tags JSONB,
        details JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    """,
    "CREATE INDEX IF NOT EXISTS idx_notification_user_id ON notification(user_id);",
    "CREATE INDEX IF NOT EXISTS idx_notification_is_read ON notification(user_id, is_read);",
]


async def run():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    async with engine.begin() as conn:
        for stmt in STATEMENTS:
            await conn.execute(text(stmt))
            print(f"✅ Executed: {stmt.strip()[:60]}...")
    await engine.dispose()
    print("\n🎉 notification table created successfully")


if __name__ == "__main__":
    asyncio.run(run())
