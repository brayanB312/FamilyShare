"use client";

import "@/app/globals.css"; 
import Navbar from "@/components/navbar";
import { useState } from 'react';
import { Upload, FileText, Menu } from 'lucide-react';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`w-64 bg-white p-5 shadow-lg ${sidebarOpen ? 'block' : 'hidden'} md:block`}> 
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4 flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
              <FileText size={20} /> Mis Documentos
            </li>
            <li className="mb-4 flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
              <Upload size={20} /> Subir Documento
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">Bienvenido, Usuario</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Subir un Documento</h2>
            <div 
              className={`border-2 border-dashed p-10 text-center rounded-lg ${dragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p className="text-gray-500 mb-4">Arrastra y suelta un archivo aquí o</p>
              <label className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                Seleccionar Archivo
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
              {selectedFile && <p className="text-gray-700 mt-4">Archivo seleccionado: {selectedFile}</p>}
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}
