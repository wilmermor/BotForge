"""
Seed script: Inserts sample notifications for the first user in the database.
Run: python seed_notifications.py
"""
import asyncio
import sys
import os
import json
from datetime import datetime, timezone, timedelta

sys.path.insert(0, os.path.dirname(__file__))

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy import select, text
from app.core.config import settings
from app.models.user import User
from app.models.notification import Notification, NotificationType, NotificationCategory

SAMPLE_NOTIFICATIONS = [
    {
        "type": NotificationType.success,
        "category": NotificationCategory.Bots,
        "title": "Bot Grid ETH/USDT finalizado con éxito",
        "message": "El bot completó 234 operaciones en 3 días. Profit total: +$567.80 (8.3%)",
        "is_read": False,
        "tags": [
            {"label": "Bot: Grid Pro", "color": "gray"},
            {"label": "ETH/USDT", "color": "gray"},
            {"label": "+8.3%", "color": "green"}
        ],
        "details": {
            "statusDisplay": "Completado con éxito",
            "duration": "3 días 4 horas",
            "trades": 234,
            "profitStr": "+$567.80 (8.3%)",
            "winRate": "68.4%",
            "buyCount": 112,
            "sellCount": 122,
            "maxWin": "+$45.20",
            "maxLoss": "-$12.30"
        },
        "offset_minutes": -15,
    },
    {
        "type": NotificationType.urgent,
        "category": NotificationCategory.Posiciones,
        "title": "⚠️ Posición liquidada - AXS/USDT",
        "message": "La posición long de 18,200 USDT fue liquidada en $2.815. Pérdida: -$1,245.00",
        "is_read": False,
        "tags": [
            {"label": "Posición", "color": "gray"},
            {"label": "AXS/USDT", "color": "gray"},
            {"label": "-$1,245", "color": "red"}
        ],
        "details": {
            "statusDisplay": "Liquidado",
            "pair": "AXS/USDT",
            "direction": "Long",
            "entry": "$2.627",
            "exit": "$2.815",
            "qty": "18,200 USDT",
            "pnl": "-$1,245.00",
            "margin": "$1,300.0",
            "leverage": "14X"
        },
        "offset_minutes": -32,
    },
    {
        "type": NotificationType.alert,
        "category": NotificationCategory.Sistema,
        "title": "Límite de backtests mensual alcanzado 80%",
        "message": "Has usado 80 de 100 backtests disponibles. Actualiza tu plan para más capacidad.",
        "is_read": False,
        "tags": [
            {"label": "Sistema", "color": "gray"},
            {"label": "Límite", "color": "gray"},
            {"label": "80%", "color": "yellow"}
        ],
        "details": None,
        "offset_minutes": -120,
    },
    {
        "type": NotificationType.info,
        "category": NotificationCategory.Bots,
        "title": "Bot SOL/USDT en pausa por volatilidad",
        "message": "El bot ha detenido operaciones debido a alta volatilidad. Se reanudará automáticamente en 30 min.",
        "is_read": True,
        "tags": [
            {"label": "Bot", "color": "gray"},
            {"label": "SOL/USDT", "color": "gray"},
            {"label": "Pausado", "color": "blue"}
        ],
        "details": None,
        "offset_minutes": -300,
    },
    {
        "type": NotificationType.promo,
        "category": NotificationCategory.Sistema,
        "title": "✨ Nueva función: Trading con apalancamiento",
        "message": "Ahora puedes configurar bots con hasta 20X de apalancamiento en pares seleccionados.",
        "is_read": False,
        "tags": [
            {"label": "Novedad", "color": "yellow"},
            {"label": "Actualización", "color": "yellow"}
        ],
        "details": None,
        "offset_minutes": -1440,
    },
    {
        "type": NotificationType.error,
        "category": NotificationCategory.Bots,
        "title": "Error en ejecución de bot BTC/USDT",
        "message": "El bot experimentó un error de conexión con el exchange. Revisa tu configuración de API.",
        "is_read": True,
        "tags": [
            {"label": "Error", "color": "red"},
            {"label": "API", "color": "gray"},
            {"label": "Crítico", "color": "red"}
        ],
        "details": None,
        "offset_minutes": -1440,
    },
]


async def run():
    engine = create_async_engine(settings.DATABASE_URL, echo=False)
    session_factory = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with session_factory() as session:
        # Get the first active user
        result = await session.execute(select(User).where(User.is_active == True).limit(1))  # noqa: E712
        user = result.scalar_one_or_none()
        if not user:
            print("❌ No active users found. Register a user first.")
            return

        print(f"👤 Seeding notifications for: {user.email}")

        now = datetime.now(timezone.utc)
        for data in SAMPLE_NOTIFICATIONS:
            offset = data.pop("offset_minutes")
            created = now + timedelta(minutes=offset)
            notif = Notification(
                user_id=user.id,
                created_at=created,
                updated_at=created,
                **data,
            )
            session.add(notif)

        await session.commit()
        print(f"✅ {len(SAMPLE_NOTIFICATIONS)} notifications created successfully!")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(run())
