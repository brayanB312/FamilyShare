"use client";

import "@/app/globals.css"; 
import "@/app/styles/inicio.css";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <section id="main_section" className="relative bg-white text-black py-20 px-6 flex flex-col items-center text-center">
      </section>

      <section id="main_section" className="relative bg-white text-black py-20 px-6 flex flex-col items-center text-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-black">Bienvenido a FamilyShare</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-800">Almacena, organiza y accede de manera segura a tus documentos oficiales en un solo lugar</p>
          <div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <a href="/register" className="no-underline bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-lg text-lg font-medium transition">Crea un cuenta</a>
            <a href="/login" className="no-underline border border-gray-900 py-2.5 px-5 rounded-lg text-lg font-medium hover:bg-zinc-200 hover:text-gray-900 transition">Iniciar sesion</a>
          </div>
        </div>
      </section>

      <section className="relative bg-white text-black py-20 px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl w-full rounded overflow-hidden shadow-sm flex flex-col md:flex-row">

          <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-2 text-center">Todos tus documentos en un solo lugar!</h2>
            <p className="text-lg md:text-xl text-gray-700 text-center">Almacena tus documentos y accede a ellos desde donde sea.</p>
          </div>
          <div className="w-full md:w-1/2">
            <img className="w-full h-[300px] md:h-full object-fit" src="/docs.avif" alt="Imagen de la Card" />
          </div>

        </div>

      </section>

    </>
  );
}