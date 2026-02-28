import asyncio
from sqlalchemy import text
from app.db.session import engine

async def inspect_db():
    async with engine.connect() as conn:
        # PostgreSQL specific query to get columns
        result = await conn.execute(text("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'user_b'
        """))
        columns = result.fetchall()
        print("Columns in 'user_b':")
        for col in columns:
            print(f" - {col[0]} ({col[1]})")
            
        # Check and fix tables
        tables_to_check = {
            'user_b': {
                'country': 'VARCHAR(50)',
                'avatar': 'TEXT',
                'is_active': 'BOOLEAN DEFAULT TRUE'
            },
            'plan': {
                'price_monthly': 'NUMERIC(10, 2) DEFAULT 0.00',
                'max_strategies': 'INTEGER DEFAULT 1',
                'max_simulations_per_day': 'INTEGER DEFAULT 5',
                'features': 'JSONB DEFAULT \'[]\'::jsonb'
            },
            'subscription': {
                'status': 'VARCHAR(20) DEFAULT \'active\'',
                'stripe_customer_id': 'VARCHAR(255)',
                'start_date': 'TIMESTAMP WITH TIME ZONE DEFAULT NOW()',
                'end_date': 'TIMESTAMP WITH TIME ZONE'
            }
        }
        
        for table_name, column_definitions in tables_to_check.items():
            print(f"\nChecking table '{table_name}'...")
            result = await conn.execute(text(f"""
                SELECT column_name FROM information_schema.columns 
                WHERE table_name = '{table_name}'
            """))
            existing_cols = [col[0].lower() for col in result.fetchall()]
            
            for col_name, col_type in column_definitions.items():
                if col_name not in existing_cols:
                    print(f"Adding '{col_name}' column to '{table_name}'...")
                    await conn.execute(text(f"ALTER TABLE {table_name} ADD COLUMN {col_name} {col_type}"))
                    await conn.commit()
                    print(f"Successfully added '{col_name}' to '{table_name}'.")
                else:
                    print(f"Column '{col_name}' in '{table_name}' already exists.")

if __name__ == "__main__":
    asyncio.run(inspect_db())
