import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-dark text-white p-8 flex flex-col items-center justify-center">
      <div className="bg-dark-lighter p-10 rounded-2xl shadow-2xl border border-white/10 max-w-md w-full text-center slide-in">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          BotForge
        </h1>
        <p className="text-gray-400 mb-8">
          Bienvenido a la Fase III. El Frontend está listo con Vite, React, TypeScript y Tailwind CSS.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-primary hover:bg-primary-dark transition-all duration-300 py-3 px-6 rounded-lg font-semibold shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Contador: {count}
          </button>

          <div className="mt-4 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
            <div className="text-sm p-3 bg-white/5 rounded-lg">
              <span className="block text-emerald-400 font-bold">Vite + React</span>
              Ready
            </div>
            <div className="text-sm p-3 bg-white/5 rounded-lg">
              <span className="block text-blue-400 font-bold">Tailwind</span>
              Ready
            </div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-white/40 text-sm">
        Arquitectura de carpetas inicializada. Próximo paso: Dashboard Core.
      </p>
    </div>
  )
}

export default App
