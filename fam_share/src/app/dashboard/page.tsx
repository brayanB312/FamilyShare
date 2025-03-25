"use client"

import { useState, useEffect } from "react"
import {
  LayoutDashboard,
  FileText,
  Users,
  Share2,
  User,
  Menu,
  X,
  LogOut,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Eye,
  Download,
  Edit,
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  QrCode,
  EyeOff,
  Clock,
  Upload,
} from "lucide-react"

export default function Dashboard() {
  // User state
  const [userName, setUserName] = useState("Usuario")

  useEffect(() => {
    const name = localStorage.getItem("user_name")
    if (name) {
      setUserName(name)
    }
  }, [])

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [showLogoutMenu, setShowLogoutMenu] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("nombre")
  const [sortDirection, setSortDirection] = useState("asc")

  // Account settings state
  const [activeTab, setActiveTab] = useState("Perfil")
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  // Menu items
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Mis Documentos", icon: <FileText className="w-5 h-5" /> },
    { name: "Familiares", icon: <Users className="w-5 h-5" /> },
    { name: "Compartir Documentos", icon: <Share2 className="w-5 h-5" /> },
    { name: "Mi Cuenta", icon: <User className="w-5 h-5" /> },
  ]

  // Sample data
  const documentosEjemplo = [
    {
      id: "doc-001",
      nombre: "Identificación oficial",
      tipo: "INE",
      propietario: "Juan Pérez",
      estado: "Validado",
      fechaSubida: "2023-10-15",
      fechaExpiracion: "2028-10-15",
      tamaño: "2.4 MB",
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
      fechaExpiracion: "N/A",
      tamaño: "1.8 MB",
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
      fechaExpiracion: "N/A",
      tamaño: "0.5 MB",
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
      fechaExpiracion: "2024-01-30",
      tamaño: "1.2 MB",
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
      fechaExpiracion: "2033-11-10",
      tamaño: "3.1 MB",
      claveAcceso: "PAS-MR-005",
      tieneQR: false,
    },
  ]

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

  // Filtered data state
  const [filteredDocuments, setFilteredDocuments] = useState(documentosEjemplo)
  const [filteredFamiliares, setFilteredFamiliares] = useState(familiaresEjemplo)
  const [filteredCompartidos, setFilteredCompartidos] = useState(documentosCompartidosEjemplo)

  // Search handlers
  const handleDocumentSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredDocuments(documentosEjemplo)
    } else {
      const filtered = documentosEjemplo.filter(
        (doc) =>
          doc.nombre.toLowerCase().includes(term) ||
          doc.tipo.toLowerCase().includes(term) ||
          doc.propietario?.toLowerCase().includes(term) ||
          doc.claveAcceso?.toLowerCase().includes(term),
      )
      setFilteredDocuments(filtered)
    }
  }

  const handleFamiliaresSearch = (e) => {
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

  const handleCompartidosSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredCompartidos(documentosCompartidosEjemplo)
    } else {
      const filtered = documentosCompartidosEjemplo.filter(
        (doc) =>
          doc.nombre.toLowerCase().includes(term) ||
          doc.tipo.toLowerCase().includes(term) ||
          doc.compartidoCon.toLowerCase().includes(term),
      )
      setFilteredCompartidos(filtered)
    }
  }

  // Sort handlers
  const handleDocumentSort = (field) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    const sorted = [...filteredDocuments].sort((a, b) => {
      if (field === "documentos" && typeof a[field] === "number") {
        return newDirection === "asc" ? a[field] - b[field] : b[field] - a[field]
      } else {
        if (newDirection === "asc") {
          return a[field].localeCompare(b[field])
        } else {
          return b[field].localeCompare(a[field])
        }
      }
    })

    setFilteredDocuments(sorted)
  }

  const handleFamiliaresSort = (field) => {
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

  const handleCompartidosSort = (field) => {
    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    const sorted = [...filteredCompartidos].sort((a, b) => {
      if (newDirection === "asc") {
        return a[field].localeCompare(b[field])
      } else {
        return b[field].localeCompare(a[field])
      }
    })

    setFilteredCompartidos(sorted)
  }

  // Calculate statistics
  const totalDocumentos = documentosEjemplo.length
  const documentosValidados = documentosEjemplo.filter((doc) => doc.estado === "Validado").length
  const documentosPendientes = totalDocumentos - documentosValidados
  const propietariosUnicos = [...new Set(documentosEjemplo.map((doc) => doc.propietario))].length

  // Component for summary cards
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

  // Render content based on active item
  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return (
          <div className="max-w-7xl mx-auto">
            {/* Summary cards */}
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

            {/* Search bar and filters */}
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
                    onChange={handleDocumentSearch}
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

            {/* Documents table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleDocumentSort("nombre")}
                      >
                        <div className="flex items-center">
                          Nombre
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleDocumentSort("tipo")}
                      >
                        <div className="flex items-center">
                          Tipo
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleDocumentSort("propietario")}
                      >
                        <div className="flex items-center">
                          Propietario
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleDocumentSort("estado")}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {documento.nombre}
                        </td>
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

      case "Mis Documentos":
        return (
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Mis Documentos</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Gestiona tus documentos personales</p>
            </div>

            {/* Search bar and filters */}
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
                    onChange={handleDocumentSearch}
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

            {/* Documents table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleDocumentSort("nombre")}
                      >
                        <div className="flex items-center">
                          Nombre
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleDocumentSort("tipo")}
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
                        onClick={() => handleDocumentSort("estado")}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {documento.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.tipo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{documento.fechaSubida}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {documento.fechaExpiracion}
                        </td>
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

      case "Familiares":
        return (
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Familiares</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Gestiona los miembros de tu familia y sus documentos</p>
            </div>

            {/* Search bar and filters */}
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
                    onChange={handleFamiliaresSearch}
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

            {/* Family cards for mobile */}
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

            {/* Family table for desktop */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleFamiliaresSort("nombre")}
                      >
                        <div className="flex items-center">
                          Nombre
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleFamiliaresSort("relacion")}
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
                        onClick={() => handleFamiliaresSort("documentos")}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {familiar.nombre}
                        </td>
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

      case "Compartir Documentos":
        return (
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Compartir Documentos</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                Gestiona los documentos que has compartido con tus familiares
              </p>
            </div>

            {/* Search bar and filters */}
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
                    onChange={handleCompartidosSearch}
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

            {/* Shared documents cards for mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mb-6">
              {filteredCompartidos.map((documento) => (
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

            {/* Shared documents table for desktop */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleCompartidosSort("nombre")}
                      >
                        <div className="flex items-center">
                          Documento
                          <ArrowUpDown className="ml-1 h-4 w-4" />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleCompartidosSort("compartidoCon")}
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
                        onClick={() => handleCompartidosSort("estado")}
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
                    {filteredCompartidos.map((documento) => (
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {documento.fechaCompartido}
                        </td>
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
              {filteredCompartidos.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    No se encontraron documentos compartidos que coincidan con tu búsqueda.
                  </p>
                </div>
              )}
            </div>
          </div>
        )

      case "Mi Cuenta":
        return (
          <div className="max-w-7xl mx-auto">
            {/* Page header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Configuración de Cuenta</h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">
                Administra tu información personal y preferencias de cuenta
              </p>
            </div>

            {/* Account settings content */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Navigation tabs */}
              <div className="flex overflow-x-auto scrollbar-hide border-b">
                <button
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    activeTab === "Perfil"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Perfil")}
                >
                  Perfil
                </button>
                <button
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    activeTab === "Seguridad"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Seguridad")}
                >
                  Seguridad
                </button>
                <button
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    activeTab === "Notificaciones"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Notificaciones")}
                >
                  Notificaciones
                </button>
                <button
                  className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
                    activeTab === "Privacidad"
                      ? "text-primary border-b-2 border-primary"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("Privacidad")}
                >
                  Privacidad
                </button>
              </div>

              {/* Tab content */}
              <div className="p-4 sm:p-6">
                {activeTab === "Perfil" && (
                  <div>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Tu nombre"
                          defaultValue="Juan"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="Tu apellido"
                          defaultValue="Pérez"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="tu@ejemplo.com"
                          defaultValue="juan@ejemplo.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="+1 (555) 000-0000"
                          defaultValue="+52 555 123 4567"
                        />
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                      <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 order-2 sm:order-1">
                        Cancelar
                      </button>
                      <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 order-1 sm:order-2">
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "Seguridad" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar contraseña</h3>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Contraseña actual
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-10"
                            placeholder="Ingresa tu contraseña actual"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Nueva contraseña
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-10"
                            placeholder="Ingresa tu nueva contraseña"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                          Confirmar nueva contraseña
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-10"
                            placeholder="Confirma tu nueva contraseña"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                      <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 order-2 sm:order-1">
                        Cancelar
                      </button>
                      <button className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 order-1 sm:order-2">
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return <div>Selecciona una opción del menú</div>
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-sm z-50 h-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo and Title */}
            <a href="/" className="flex items-center text-xl space-x-4 font-bold text-black no-underline">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="currentColor">
                  <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                </svg>
              </div>
              <span>FamilyShare</span>
            </a>

            {/* Menu for large screens */}
            <div className="flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-primary transition-colors">
                Inicio
              </a>

              {/* Logout icon */}
              <div className="relative">
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

      <div className="flex-grow p-6 mt-16 ml-0 lg:ml-64">
        <h1 className="text-3xl font-bold">Bienvenido, {userName}</h1>
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar for mobile - floating button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed z-40 bottom-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Overlay to close sidebar on mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-[80%] sm:w-64 transition-transform duration-300 transform 
                  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
                  lg:translate-x-0 bg-white border-r border-gray-200 shadow-sm h-[calc(100vh-4rem)] top-16`}
        >
          <div className="flex flex-col h-full">
            {/* Navigation menu */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveItem(item.name)
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false)
                    }
                  }}
                  className={`flex items-center w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg transition-colors ${
                    activeItem === item.name
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          {/* Content area */}
          <main className="h-full overflow-y-auto p-3 sm:p-6 bg-gray-50">{renderContent()}</main>
        </div>
      </div>
    </div>
  )
}

