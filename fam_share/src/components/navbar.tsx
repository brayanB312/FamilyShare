"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-black no-underline">
            FamilyShare
          </Link>

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex space-x-6">
            {["Inicio", "Sobre Nosotros", "Servicios", "Contacto"].map(
              (text, index) => (
                <Link
                  key={index}
                  href={`/${text === "Inicio" ? "" : text.toLowerCase().replace(/\s/g, "")}`}
                  className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                >
                  {text}
                </Link>
              )
            )}
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
      <div id = "dropdown_menu"
        className={`md:hidde overflow-hidden transition-all duration-300 ease-in ${
          isOpen ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 py-3 px-4">
          {["Inicio", "Sobre Nosotros", "Servicios", "Contacto"].map(
            (text, index) => (
              <Link
                key={index}
                href={`/${text === "Inicio" ? "" : text.toLowerCase().replace(/\s/g, "")}`}
                className="block px-4 py-2 rounded-md hover:bg-gray-200"
              >
                {text}
              </Link>
            )
          )}
        </div>
      </div>

          <style jsx>
            {`
              #dropdown_menu{
                background-color:#f6f6f6;
              }
            `}
          </style>

    </nav>
  );
};

export default Navbar;
