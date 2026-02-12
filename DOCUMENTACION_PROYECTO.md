# Documentación del Proyecto BotForge

Este documento detalla la estructura actual del proyecto, el propósito de cada componente y el plan de desarrollo para avanzar en la construcción de la plataforma.

## 1. Estructura de Carpetas y Propósito

El proyecto está organizado como una aplicación moderna de microservicios (o modular), separando claramente el **Backend** (lógica y datos) del **Frontend** (interfaz de usuario).

### Raíz del Proyecto
- **`backend/`**: Contiene toda la lógica del servidor, API y gestión de base de datos.
- **`FrontEnd/`**: (En desarrollo/planeación) Contendrá la interfaz de usuario (React/Next.js).
- **`.gitignore`**: Define qué archivos ignorar en el control de versiones (ej. claves, entornos virtuales).

### Dentro de `backend/`
Esta es la parte central desarrollada hasta ahora:

- **`app/`**: El núcleo de la aplicación.
  - **`api/v1/`**: Contiene los "endpoints" o rutas de la API (ej. `/login`, `/strategies`). Es la puerta de entrada para que el Frontend se comunique con el Backend.
  - **`core/`**: Configuraciones generales y lógica de bajo nivel.
    - `config.py`: Variables de entorno y ajustes globales.
    - `security.py`: Autenticación (JWT) y seguridad de contraseñas.
    - `encryption.py`: Cifrado de claves API sensibles.
    - `simulation_engine.py`: El motor que ejecuta los backtests de trading.
  - **`db/`**: Gestión de la base de datos (conexiones y sesiones).
  - **`models/`**: Definiciones de las tablas de la base de datos (Usuarios, Estrategias, Simulaciones).
  - **`schemas/`**: Modelos de validación de datos (Pydantic) para asegurar que la información que entra y sale de la API sea correcta.
  - **`services/`**: Lógica de negocio compleja separada de la API para mantener el código limpio.
  - **`main.py`**: El punto de entrada principal que arranca el servidor.

- **`tests/`**: Pruebas automatizadas para asegurar que el código funcione correctamente antes de desplegarlo.
- **`docker-compose.yml`**: Archivo para orquestar los servicios (Base de datos, API, Redis) y levantarlos todos con un solo comando.
- **`Dockerfile`**: Instrucciones para construir la imagen del contenedor del backend.
- **`requirements.txt`**: Lista de librerías de Python necesarias.

---

## 2. Plan para Seguir Avanzando

El desarrollo sigue un enfoque iterativo. A continuación, el plan sugerido:

### Fase 1: Consolidación del Backend (Actual)
- [x] Estructura base y configuración.
- [x] Autenticación de usuarios (Registro/Login).
- [ ] **Implementar Lógica de Estrategias**: Completar los endpoints para crear, editar y probar estrategias de trading.
- [ ] **Motor de Backtesting**: Refinar `simulation_engine.py` para procesar datos históricos reales y calcular métricas financieras (ROI, Drawdown).
- [ ] **Conexión a Datos de Mercado**: Integrar una fuente de datos (ej. CCXT o API de Exchange) para obtener precios históricos.

### Fase 2: Desarrollo del Frontend
- Iniciar el proyecto en la carpeta `FrontEnd/`.
- Crear las pantallas principales:
  - Dashboard de usuario.
  - Editor de estrategias (No-Code/Visual).
  - Visualizador de resultados de backtesting (Gráficos de velas y rendimiento).

### Fase 3: Integración y Optimización
- Conectar el Frontend con la API del Backend.
- Implementar colas de tareas (Celery/Redis) para simulaciones largas que no bloqueen el servidor.
- Optimizar consultas a la base de datos y caché.

### Fase 4: Despliegue (Production)
- Configurar servidores de producción (AWS/DigitalOcean).
- Configurar CI/CD para despliegue automático.

---
## Prerrequisitos (Importante)

El sistema detectó que **Python** y **Docker** no están instalados o configurados correctamente en este equipo.

### 1. Instalar Python (Recomendado 3.12 o 3.13)
1. Descarga Python 3.12 o 3.13 desde [python.org](https://www.python.org/downloads/).
   > [!IMPORTANT]
   > **Evita la versión 3.14** por ahora, ya que es una versión experimental y muchas librerías (como Pandas y SQLAlchemy) aún no son compatibles.
2. **IMPORTANTE**: Al instalar, marca la casilla **"Add Python to PATH"** en la primera pantalla del instalador.
3. Reinicia tu terminal (o VS Code) y verifica con `python --version`.

### 2. (Opcional) Instalar Docker Desktop
Si prefieres no instalar todo manual, descarga [Docker Desktop](https://www.docker.com/products/docker-desktop/) e instálalo.

---

## Cómo Ejecutar el Proyecto Ahora (Manual)

Sigue estos pasos para levantar el servidor en tu computadora:

### 1. Preparación del Entorno (Solo la primera vez)
Si ya tienes la carpeta `venv` creada, puedes saltar al paso 2. Si no:
```powershell
python -m venv venv
```

### 2. Activar el Entorno Virtual
Abre una terminal y entra en la carpeta del servidor:
```powershell
cd backend
.\venv\Scripts\activate
```
*(Verás que aparece `(venv)` al principio de tu línea de comandos)*.

### 3. Ejecutar el Servidor
Con el entorno activado, lanza este comando:
```powershell
uvicorn app.main:app --reload --port 8000
```
> [!TIP]
> Si prefieres no activar el entorno cada vez, puedes ejecutarlo directamente así:
> `.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000`

### 4. Verificar que funciona
Abre tu navegador en: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)
Deberías ver un mensaje de `"status": "healthy"`.

Para ver toda la documentación de la API y probar los endpoints: [http://localhost:8000/docs](http://localhost:8000/docs)
