"use client"

import { useState } from "react"
import { Search, Filter, Download, Upload, Eye, ArrowUpDown, Trash2, Edit } from "lucide-react"

// Datos de ejemplo para los documentos
const misDocumentosEjemplo = [
  {
    id: "doc-001",
    nombre: "Identificación oficial",
    tipo: "INE",
    fechaSubida: "2023-10-15",
    fechaExpiracion: "2028-10-15",
    tamaño: "2.4 MB",
    estado: "Validado",
    claveAcceso: "INE-JP-001",
    tieneQR: true,
  },
  {
    id: "doc-002",
    nombre: "Certificado de nacimiento",
    tipo: "Acta de nacimiento",
    fechaSubida: "2023-09-20",
    fechaExpiracion: "N/A",
    tamaño: "1.8 MB",
    estado: "Validado",
    claveAcceso: "ACT-JP-002",
    tieneQR: true,
  },
  {
    id: "doc-003",
    nombre: "Clave Única de Registro de Población",
    tipo: "CURP",
    fechaSubida: "2023-11-05",
    fechaExpiracion: "N/A",
    tamaño: "0.5 MB",
    estado: "No validado",
    claveAcceso: "CURP-JP-003",
    tieneQR: false,
  },
  {
    id: "doc-004",
    nombre: "Comprobante de domicilio",
    tipo: "Recibo CFE",
    fechaSubida: "2023-10-30",
    fechaExpiracion: "2024-01-30",
    tamaño: "1.2 MB",
    estado: "Validado",
    claveAcceso: "CFE-MR-004",
    tieneQR: true,
  },
  {
    id: "doc-005",
    nombre: "Pasaporte",
    tipo: "Identificación",
    fechaSubida: "2023-11-10",
    fechaExpiracion: "2033-11-10",
    tamaño: "3.1 MB",
    estado: "No validado",
    claveAcceso: "PAS-MR-005",
    tieneQR: false,
  },
]

export default function MisDocumentos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("nombre")
  const [sortDirection, setSortDirection] = useState("asc")
  const [filteredDocuments, setFilteredDocuments] = useState(misDocumentosEjemplo)

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredDocuments(misDocumentosEjemplo)
    } else {
      const filtered = misDocumentosEjemplo.filter(
        (doc) =>
          doc.nombre.toLowerCase().includes(term) ||
          doc.tipo.toLowerCase().includes(term) ||
          doc.claveAcceso.toLowerCase().includes(term),
      )
      setFilteredDocuments(filtered)
    }
  }

  // Función para ordenar documentos
  const handleSort = (field) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    const sorted = [...filteredDocuments].sort((a, b) => {
      if (newDirection === "asc") {
        return a[field].localeCompare(b[field])
      } else {
        return b[field].localeCompare(a[field])
      }
    })

    setFilteredDocuments(sorted)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Encabezado de página */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mis Documentos</h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">Gestiona tus documentos personales</p>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <Upload className="h-4 w-4 mr-2" />
              Subir Documento
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de documentos */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("nombre")}
                >
                  <div className="flex items-center">
                    Nombre
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("tipo")}
                >
                  <div className="flex items-center">
                    Tipo
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha de Subida
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Expiración
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("estado")}
                >
                  <div className="flex items-center">
                    Estado
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.map((documento) => (
                <tr key={documento.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{documento.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.tipo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.fechaSubida}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.fechaExpiracion}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        documento.estado === "Validado"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {documento.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary hover:text-primary/80">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-primary hover:text-primary/80">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="text-primary hover:text-primary/80">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDocuments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No se encontraron documentos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

