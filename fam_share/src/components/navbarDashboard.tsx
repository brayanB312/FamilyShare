"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { LogOut } from "lucide-react"

const NavbarDashboard = () => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false)
  const logoutRef = useRef(null)

  // Cerrar el menú de logout al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogoutMenu(false)
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
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="currentColor">
                <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
              </svg>
            </div>
            <span>FamilyShare</span>
          </Link>

          {/* Menú para pantallas grandes */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Inicio
            </Link>

            {/* Icono de logout */}
            <div className="relative" ref={logoutRef}>
              <button
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="p-1 text-gray-500 hover:text-primary rounded-full hover:bg-gray-100"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>

              {showLogoutMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarDashboard

