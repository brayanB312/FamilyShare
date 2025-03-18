"use client"

import { useState } from "react"
import { LayoutDashboard, FileText, Users, Share2, User, Menu, X, Bell } from "lucide-react"
import Dashboard from "../../components/dashboard"
import MisDocumentos from "../../components/mis-documentos"
import Familiares from "../../components/familiares"
import CompartirDocumentos from "../../components/compartir-documentos"
import MiCuenta from "../../components/mi-cuenta"
import Navbar from "../../components/navbarDashboard"

export default function FamilyShareLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [showNotifications, setShowNotifications] = useState(false)

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Mis Documentos", icon: <FileText className="w-5 h-5" /> },
    { name: "Familiares", icon: <Users className="w-5 h-5" /> },
    { name: "Compartir Documentos", icon: <Share2 className="w-5 h-5" /> },
    { name: "Mi Cuenta", icon: <User className="w-5 h-5" /> },
  ]

  // Función para renderizar el contenido según el ítem activo
  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />
      case "Mis Documentos":
        return <MisDocumentos />
      case "Familiares":
        return <Familiares />
      case "Compartir Documentos":
        return <CompartirDocumentos />
      case "Mi Cuenta":
        return <MiCuenta />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar para móvil */}
        <div className="lg:hidden">
          {isSidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsSidebarOpen(false)} />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed z-40 bottom-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-20 w-[80%] sm:w-64 transition-transform duration-300 transform 
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                    lg:translate-x-0 bg-white border-r border-gray-200 shadow-sm h-[calc(100vh-4rem)] top-16`}
        >
          <div className="flex flex-col h-full">
            {/* Menú de navegación */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveItem(item.name)
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false)
                    }
                  }}
                  className={`flex items-center w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg transition-colors ${
                    activeItem === item.name
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Información de la aplicación */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-center">
                <p className="text-xs text-gray-500">FamilyShare v1.0</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 overflow-hidden">
          {/* Área de contenido */}
          <main className="h-full overflow-y-auto p-3 sm:p-6 bg-gray-50">{renderContent()}</main>
        </div>
      </div>

      {/* Notificaciones flotantes para móviles */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end">
          <div
            className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto border border-gray-200 overflow-hidden"
            onClick={() => setShowNotifications(false)}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Notificaciones</p>
                  <p className="mt-1 text-sm text-gray-500">No tienes notificaciones nuevas.</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none">
                    <span className="sr-only">Cerrar</span>
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

