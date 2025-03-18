"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  QrCode,
  Plus,
  ArrowUpDown,
  FileText,
  Users,
} from "lucide-react"

// Datos de ejemplo para los documentos
const documentosEjemplo = [
  {
    id: "doc-001",
    nombre: "Identificación oficial",
    tipo: "INE",
    propietario: "Juan Pérez",
    estado: "Validado",
    fechaSubida: "2023-10-15",
    claveAcceso: "INE-JP-001",
    tieneQR: true,
  },
  {
    id: "doc-002",
    nombre: "Certificado de nacimiento",
    tipo: "Acta de nacimiento",
    propietario: "Juan Pérez",
    estado: "Validado",
    fechaSubida: "2023-09-20",
    claveAcceso: "ACT-JP-002",
    tieneQR: true,
  },
  {
    id: "doc-003",
    nombre: "Clave Única de Registro de Población",
    tipo: "CURP",
    propietario: "Juan Pérez",
    estado: "No validado",
    fechaSubida: "2023-11-05",
    claveAcceso: "CURP-JP-003",
    tieneQR: false,
  },
  {
    id: "doc-004",
    nombre: "Comprobante de domicilio",
    tipo: "Recibo CFE",
    propietario: "María Rodríguez",
    estado: "Validado",
    fechaSubida: "2023-10-30",
    claveAcceso: "CFE-MR-004",
    tieneQR: true,
  },
  {
    id: "doc-005",
    nombre: "Pasaporte",
    tipo: "Identificación",
    propietario: "María Rodríguez",
    estado: "No validado",
    fechaSubida: "2023-11-10",
    claveAcceso: "PAS-MR-005",
    tieneQR: false,
  },
  {
    id: "doc-006",
    nombre: "Licencia de conducir",
    tipo: "Identificación",
    propietario: "Carlos López",
    estado: "Validado",
    fechaSubida: "2023-09-15",
    claveAcceso: "LIC-CL-006",
    tieneQR: true,
  },
  {
    id: "doc-007",
    nombre: "Título profesional",
    tipo: "Documento académico",
    propietario: "Carlos López",
    estado: "No validado",
    fechaSubida: "2023-10-25",
    claveAcceso: "TIT-CL-007",
    tieneQR: false,
  },
]

// Componente para las tarjetas de resumen
const ResumenCard = ({ titulo, valor, icono, color }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div className="flex items-center">
      <div className={`p-3 rounded-full ${color} text-white mr-4`}>{icono}</div>
      <div>
        <p className="text-sm text-gray-500">{titulo}</p>
        <p className="text-2xl font-bold">{valor}</p>
      </div>
    </div>
  </div>
)

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("nombre")
  const [sortDirection, setSortDirection] = useState("asc")
  const [filteredDocuments, setFilteredDocuments] = useState(documentosEjemplo)

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredDocuments(documentosEjemplo)
    } else {
      const filtered = documentosEjemplo.filter(
        (doc) =>
          doc.nombre.toLowerCase().includes(term) ||
          doc.tipo.toLowerCase().includes(term) ||
          doc.propietario.toLowerCase().includes(term) ||
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

  // Calcular estadísticas
  const totalDocumentos = documentosEjemplo.length
  const documentosValidados = documentosEjemplo.filter((doc) => doc.estado === "Validado").length
  const documentosPendientes = totalDocumentos - documentosValidados
  const propietariosUnicos = [...new Set(documentosEjemplo.map((doc) => doc.propietario))].length

  return (
    <div className="max-w-7xl mx-auto">
      {/* Encabezado de página */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Gestiona y visualiza todos tus documentos y archivos familiares
        </p>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <ResumenCard
          titulo="Total Documentos"
          valor={totalDocumentos}
          icono={<FileText className="w-5 h-5" />}
          color="bg-blue-500"
        />
        <ResumenCard
          titulo="Documentos Validados"
          valor={documentosValidados}
          icono={<CheckCircle className="w-5 h-5" />}
          color="bg-green-500"
        />
        <ResumenCard
          titulo="Pendientes de Validación"
          valor={documentosPendientes}
          icono={<XCircle className="w-5 h-5" />}
          color="bg-orange-500"
        />
        <ResumenCard
          titulo="Miembros Familiares"
          valor={propietariosUnicos}
          icono={<Users className="w-5 h-5" />}
          color="bg-purple-500"
        />
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
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Documento
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("propietario")}
                >
                  <div className="flex items-center">
                    Propietario
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
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
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  QR
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Clave de Acceso
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.propietario}</td>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {documento.tieneQR ? (
                      <QrCode className="h-5 w-5 text-primary" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.claveAcceso}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary hover:text-primary/80">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-primary hover:text-primary/80">
                        <Download className="h-5 w-5" />
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

