"use client"

import { useState,useEffect } from "react"
import { LayoutDashboard, FileText, Users, Share2, User, Menu, X } from "lucide-react"
import NavbarDashboard from "../components/navbarDashboard"
import DashboardContent from "../components/dashboard-content"
import MisDocumentos from "../components/mis-documentos"
import Familiares from "../components/familiares"
import CompartirDocumentos from "../components/compartir-documentos"
import MiCuenta from "../components/mi-cuenta"


export default function Dashboard() {

  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Obtener el nombre del usuario desde localStorage
    const name = localStorage.getItem("user_name");
    if (name) {
      setUserName(name);
    }
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

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
        return <DashboardContent />
      case "Mis Documentos":
        return <MisDocumentos />
      case "Familiares":
        return <Familiares />
      case "Compartir Documentos":
        return <CompartirDocumentos />
      case "Mi Cuenta":
        return <MiCuenta />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <NavbarDashboard />

      <div className="flex-grow p-6 mt-16 ml-64"> {/* Añadir un margen izquierdo para el espacio de la sidebar */}
        <h1 className="text-3xl font-bold">Bienvenido, {userName}</h1>
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar para móvil - botón flotante */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed z-40 bottom-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Overlay para cerrar sidebar en móvil */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - ÚNICO SIDEBAR EN EL COMPONENTE */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-[80%] sm:w-64 transition-transform duration-300 transform 
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

            {/* NO HAY FOOTER - Eliminado completamente el texto "FamilyShare v1.0" */}
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 overflow-hidden">
          {/* Área de contenido */}
          <main className="h-full overflow-y-auto p-3 sm:p-6 bg-gray-50">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}

