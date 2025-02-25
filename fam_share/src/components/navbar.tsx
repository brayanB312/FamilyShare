"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white no-underline">
            FamilyShare
          </Link>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="nav-link">
              Inicio
            </Link>
            <Link href="/about" className="nav-link">
              Sobre Nosotros
            </Link>
            <Link href="/services" className="nav-link">
              Servicios
            </Link>
            <Link href="/contact" className="nav-link">
              Contacto
            </Link>
          </div>

          {/* Botón de menú móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable en móvil con animación */}
      <div
        className={`md:hidden bg-green-800 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 py-3 px-4">
          <Link href="/" className="nav-link block">
            Inicio
          </Link>
          <Link href="/about" className="nav-link block">
            Sobre Nosotros
          </Link>
          <Link href="/services" className="nav-link block">
            Servicios
          </Link>
          <Link href="/contact" className="nav-link block">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
