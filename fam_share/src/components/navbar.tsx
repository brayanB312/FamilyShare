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
            <Link
              href="/"
              className="text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Inicio
            </Link>
            <Link
              href="/about"
              className="text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/services"
              className="text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Servicios
            </Link>
            <Link
              href="/contact"
              className="text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
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

      {/* Menú desplegable en móvil */}
      {isOpen && (
        <div className="md:hidden bg-green-800">
          <div className="space-y-2 py-3 px-4">
            <Link
              href="/"
              className="block text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Inicio
            </Link>
            <Link
              href="/about"
              className="block text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Sobre Nosotros
            </Link>
            <Link
              href="/services"
              className="block text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Servicios
            </Link>
            <Link
              href="/contact"
              className="block text-slate-50 no-underline hover:text-gray-400 transition duration-300 ease-in-out"
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
