"use client"

import { useState } from "react"
import { Search, Filter, Share2, ArrowUpDown, Eye, Download, Clock, FileText, Users } from "lucide-react"

// Datos de ejemplo para los documentos compartidos
const documentosCompartidosEjemplo = [
  {
    id: "comp-001",
    nombre: "Identificación oficial",
    tipo: "INE",
    compartidoCon: "María Rodríguez",
    fechaCompartido: "2023-10-15",
    expiracion: "2023-12-15",
    estado: "Activo",
  },
  {
    id: "comp-002",
    nombre: "Certificado de nacimiento",
    tipo: "Acta de nacimiento",
    compartidoCon: "Carlos López",
    fechaCompartido: "2023-09-20",
    expiracion: "2023-11-20",
    estado: "Expirado",
  },
  {
    id: "comp-003",
    nombre: "Clave Única de Registro de Población",
    tipo: "CURP",
    compartidoCon: "Ana López",
    fechaCompartido: "2023-11-05",
    expiracion: "2024-01-05",
    estado: "Activo",
  },
  {
    id: "comp-004",
    nombre: "Comprobante de domicilio",
    tipo: "Recibo CFE",
    compartidoCon: "Roberto Pérez",
    fechaCompartido: "2023-10-30",
    expiracion: "2023-12-30",
    estado: "Activo",
  },
  {
    id: "comp-005",
    nombre: "Pasaporte",
    tipo: "Identificación",
    compartidoCon: "Sofía Martínez",
    fechaCompartido: "2023-11-10",
    expiracion: "2023-12-10",
    estado: "Activo",
  },
]

export default function CompartirDocumentos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("nombre")
  const [sortDirection, setSortDirection] = useState("asc")
  const [filteredDocuments, setFilteredDocuments] = useState(documentosCompartidosEjemplo)

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredDocuments(documentosCompartidosEjemplo)
    } else {
      const filtered = documentosCompartidosEjemplo.filter(
        (doc) =>
          doc.nombre.toLowerCase().includes(term) ||
          doc.tipo.toLowerCase().includes(term) ||
          doc.compartidoCon.toLowerCase().includes(term),
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Compartir Documentos</h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Gestiona los documentos que has compartido con tus familiares
        </p>
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
              placeholder="Buscar documentos compartidos..."
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
              <Share2 className="h-4 w-4 mr-2" />
              Compartir Nuevo
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas de documentos compartidos para móviles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mb-6">
        {filteredDocuments.map((documento) => (
          <div key={documento.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{documento.nombre}</h3>
                  <p className="text-xs text-gray-500">{documento.tipo}</p>
                </div>
              </div>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  documento.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {documento.estado}
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                Compartido con: {documento.compartidoCon}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                Expira: {documento.expiracion}
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button className="p-1 text-primary hover:text-primary/80">
                <Eye className="h-5 w-5" />
              </button>
              <button className="p-1 text-primary hover:text-primary/80">
                <Download className="h-5 w-5" />
              </button>
              <button className="p-1 text-primary hover:text-primary/80">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla de documentos compartidos para escritorio */}
      <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                    Documento
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("compartidoCon")}
                >
                  <div className="flex items-center">
                    Compartido Con
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha Compartido
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{documento.nombre}</div>
                        <div className="text-sm text-gray-500">{documento.tipo}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="ml-3 text-sm text-gray-500">{documento.compartidoCon}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.fechaCompartido}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {documento.expiracion}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        documento.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
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
                        <Share2 className="h-5 w-5" />
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
            <p className="text-gray-500">No se encontraron documentos compartidos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

