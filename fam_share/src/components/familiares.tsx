"use client"

import { useState } from "react"
import { Search, Filter, Plus, ArrowUpDown, Edit, Trash2, Mail, Phone } from "lucide-react"

// Datos de ejemplo para los familiares
const familiaresEjemplo = [
  {
    id: "fam-001",
    nombre: "María Rodríguez",
    relacion: "Esposa",
    email: "maria@ejemplo.com",
    telefono: "+52 555 123 4567",
    documentos: 4,
    fechaRegistro: "2023-01-15",
  },
  {
    id: "fam-002",
    nombre: "Carlos López",
    relacion: "Hijo",
    email: "carlos@ejemplo.com",
    telefono: "+52 555 987 6543",
    documentos: 2,
    fechaRegistro: "2023-02-20",
  },
  {
    id: "fam-003",
    nombre: "Ana López",
    relacion: "Hija",
    email: "ana@ejemplo.com",
    telefono: "+52 555 456 7890",
    documentos: 3,
    fechaRegistro: "2023-02-20",
  },
  {
    id: "fam-004",
    nombre: "Roberto Pérez",
    relacion: "Padre",
    email: "roberto@ejemplo.com",
    telefono: "+52 555 234 5678",
    documentos: 5,
    fechaRegistro: "2023-03-10",
  },
  {
    id: "fam-005",
    nombre: "Sofía Martínez",
    relacion: "Madre",
    email: "sofia@ejemplo.com",
    telefono: "+52 555 876 5432",
    documentos: 4,
    fechaRegistro: "2023-03-10",
  },
]

export default function Familiares() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("nombre")
  const [sortDirection, setSortDirection] = useState("asc")
  const [filteredFamiliares, setFilteredFamiliares] = useState(familiaresEjemplo)

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredFamiliares(familiaresEjemplo)
    } else {
      const filtered = familiaresEjemplo.filter(
        (familiar) =>
          familiar.nombre.toLowerCase().includes(term) ||
          familiar.relacion.toLowerCase().includes(term) ||
          familiar.email.toLowerCase().includes(term) ||
          familiar.telefono.includes(term),
      )
      setFilteredFamiliares(filtered)
    }
  }

  // Función para ordenar familiares
  const handleSort = (field) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    const sorted = [...filteredFamiliares].sort((a, b) => {
      if (field === "documentos") {
        return newDirection === "asc" ? a[field] - b[field] : b[field] - a[field]
      } else {
        if (newDirection === "asc") {
          return a[field].localeCompare(b[field])
        } else {
          return b[field].localeCompare(a[field])
        }
      }
    })

    setFilteredFamiliares(sorted)
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Encabezado de página */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Familiares</h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">Gestiona los miembros de tu familia y sus documentos</p>
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
              placeholder="Buscar familiares..."
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
              <Plus className="h-4 w-4 mr-2" />
              Añadir Familiar
            </button>
          </div>
        </div>
      </div>

      {/* Tarjetas de familiares para móviles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mb-6">
        {filteredFamiliares.map((familiar) => (
          <div key={familiar.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{familiar.nombre}</h3>
                <p className="text-sm text-gray-500">{familiar.relacion}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-primary hover:text-primary/80">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Mail className="h-4 w-4 mr-2" />
                {familiar.email}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Phone className="h-4 w-4 mr-2" />
                {familiar.telefono}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Documentos:</span>
                <span className="font-medium">{familiar.documentos}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla de familiares para escritorio */}
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
                    Nombre
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("relacion")}
                >
                  <div className="flex items-center">
                    Relación
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Teléfono
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("documentos")}
                >
                  <div className="flex items-center">
                    Documentos
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
              {filteredFamiliares.map((familiar) => (
                <tr key={familiar.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{familiar.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{familiar.relacion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{familiar.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{familiar.telefono}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{familiar.documentos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
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
        {filteredFamiliares.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No se encontraron familiares que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}

