# Diagrama de Entidad Relación (DER) - BotForge

Este archivo está optimizado para ser visualizado con la extensión **Mermaid** de VS Code.

```mermaid
erDiagram
    USER ||--o{ API_CREDENTIAL : "propietario de"
    USER ||--o{ STRATEGY : "configura"
    USER ||--o{ SIMULATION : "ejecuta"
    USER ||--o{ SUBSCRIPTION : "paga"
    STRATEGY ||--o{ SIMULATION : "se prueba en"

    USER {
        uuid id PK "ID Único"
        string email UK "Correo Electrónico"
        string password_hash "Contraseña (Hash)"
        string full_name "Nombre Real"
        string plan "Plan (Free/Pro)"
        datetime created_at "Fecha Registro"
    }

    API_CREDENTIAL {
        uuid id PK "ID Credencial"
        uuid user_id FK "Relación Usuario"
        string exchange "Nombre Exchange (Binance/etc)"
        text api_key_encrypted "Clave API (Cifrada)"
        boolean is_active "Estado"
    }

    STRATEGY {
        uuid id PK "ID Estrategia"
        uuid user_id FK "Creador"
        string name "Nombre"
        string type "Tipo (Grid/DCA)"
        jsonb params "Parámetros JSON"
        datetime updated_at "Última Modificación"
    }

    SIMULATION {
        uuid id PK "ID Backtest"
        uuid user_id FK "Ejecutado por"
        uuid strategy_id FK "Estrategia usada"
        string pair "Símbolo (BTC/USDT)"
        string timeframe "Periodicidad (1h/4h)"
        jsonb metrics "Resultados (ROI, Sharpe)"
        jsonb trades "Historial de Órdenes"
    }

    SUBSCRIPTION {
        uuid id PK "ID Factura"
        uuid user_id FK "Cliente"
        string status "Estado (Active/Canceled)"
        datetime end_date "Vencimiento"
    }
```

> [!TIP]
> **Para ver el gráfico:** Si tienes la extensión de Mermaid instalada, abre este archivo y presiona `Ctrl + Shift + V` (o haz clic en el icono de "Open Preview" arriba a la derecha) para ver la representación gráfica profesional.
