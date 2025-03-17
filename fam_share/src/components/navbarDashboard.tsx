"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Settings, LogOut } from "lucide-react"
import Image from "next/image";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSettingsMenu, setShowSettingsMenu] = useState(false)
  const settingsRef = useRef(null)

  // Cerrar el menú de configuración al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettingsMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-sm z-50 h-16">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo y Título */}
          <Link href="/" className="flex items-center text-xl space-x-4 font-bold text-black no-underline">
            <Image src="/logo.png" alt="Logo" width={40} height={40}/>
            <span>FamilyShare</span>
          </Link>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Inicio
            </Link>

            {/* Icono de engranaje para configuración/cerrar sesión */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-1 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Icono de engranaje para móvil */}
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-1 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable en móvil con animación */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in absolute w-full bg-gray-50 shadow-md ${
          isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 py-3 px-4">
          <Link
            href="/"
            className="block px-4 py-2 rounded-md hover:bg-gray-200 text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </Link>
          <button
            className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 text-red-600 flex items-center"
            onClick={() => {
              // Lógica para cerrar sesión
              console.log("Cerrar sesión")
              setIsOpen(false)
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

