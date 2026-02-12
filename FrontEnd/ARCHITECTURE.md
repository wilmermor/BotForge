# BotForge - FrontEnd Architecture

Plataforma SaaS de backtesting No-Code para traders de criptomonedas.

## Stack Tecnológico
- **Core**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (Recomendado)
- **Charts**: Recharts
- **State Management**: Zustand (Pendiente)

## Estructura de Carpetas

```bash
src/
├── assets/         # Imágenes, logos, fuentes
├── components/     # Componentes atómicos y moleculares reutilizables
├── hooks/          # Custom react hooks (ej: useBacktest, useAuth)
├── pages/          # Pantallas principales (Dashboard, Editor, Profile)
├── services/       # Clientes de API (Axios/Fetch) 
├── store/          # Estado global (Zustand stores)
├── styles/         # Estilos globales y tokens adicionales
├── types/          # Interfaces y tipos TypeScript
└── utils/          # Funciones de ayuda (formato de moneda, fechas, etc)
```

## Guía de Estilo (Tailwind)
Colores personalizados definidos en `tailwind.config.js`:
- `bg-dark`: Fondo principal (#0f172a)
- `bg-dark-lighter`: Fondo de tarjetas/paneles (#1e293b)
- `bg-primary`: Azul principal de acción
