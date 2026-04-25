import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Contacto from './components/Contacto'
import Inicio from './components/Inicio'
import Servicios from './components/Servicios'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Proyecto React Router</h1>
        <nav aria-label="Navegacion principal">
          {/* NavLink permite aplicar un estilo distinto a la seccion activa. */}
          <NavLink to="/inicio" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Inicio
          </NavLink>
          <NavLink
            to="/servicios"
            className={({ isActive }) => (isActive ? 'is-active' : '')}
          >
            Servicios
          </NavLink>
          <NavLink to="/contacto" className={({ isActive }) => (isActive ? 'is-active' : '')}>
            Contacto
          </NavLink>
        </nav>
      </header>

      <main className="content">
        {/* Cada ruta renderiza un componente sin recarga completa (SPA). */}
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
