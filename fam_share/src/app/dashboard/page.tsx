"use client"

import { useState, useEffect, useRef } from "react"
import {
  LayoutDashboard,
  FileText,
  Users,
  Share2,
  Menu,
  X,
  LogOut,
  CheckCircle,
  XCircle,
  Plus,
  Download,
  Search,
  Filter,
  Trash2,
} from "lucide-react"
import Link from "next/link"

// CONEXIÓN CON BASE DE DATOS
// Estas funciones deberían ser reemplazadas por llamadas reales a tu API o base de datos
// Por ahora retornan arrays vacíos o valores por defecto

const fetchUserData = async () => {
  // TODO: Implementar llamada real a la API para obtener datos del usuario
  // Ejemplo: const response = await fetch('/api/user');
  // return response.json();

  // Por ahora retornamos un objeto con valores por defecto
  return {
    id: "user-001",
    nombre: "Usuario",
    apellido: "Demo",
    email: "usuario@ejemplo.com",
    telefono: "+52 555 123 4567",
    fechaRegistro: "2023-01-01",
    rol: "usuario",
  }
}

const fetchDocumentos = async () => {
  // TODO: Implementar llamada real a la API para obtener documentos
  // Ejemplo: const response = await fetch('/api/documentos');
  // return response.json();

  // Por ahora retornamos un array vacío
  return []
}

const fetchMisDocumentos = async () => {
  // TODO: Implementar llamada real a la API para obtener documentos personales
  // Ejemplo: const response = await fetch('/api/mis-documentos');
  // return response.json();

  // Por ahora retornamos un array vacío
  return []
}

const fetchFamiliares = async () => {
  // TODO: Implementar llamada real a la API para obtener familiares
  // Ejemplo: const response = await fetch('/api/familiares');
  // return response.json();

  // Por ahora retornamos un array vacío
  return []
}

const fetchDocumentosCompartidos = async () => {
  // TODO: Implementar llamada real a la API para obtener documentos compartidos
  // Ejemplo: const response = await fetch('/api/documentos-compartidos');
  // return response.json();

  // Por ahora retornamos un array vacío
  return []
}

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

// Componente para mostrar cuando no hay datos
const EmptyState = ({ message, icon }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="bg-gray-100 p-4 rounded-full mb-4">{icon}</div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
    <p className="text-sm text-gray-500 max-w-md">{message}</p>
  </div>
)

export default function FamilyShare() {
  // Estados para datos que vendrían de la base de datos
  const [userData, setUserData] = useState(null)
  const [documentos, setDocumentos] = useState([])
  const [misDocumentos, setMisDocumentos] = useState([])
  const [familiares, setFamiliares] = useState([])
  const [documentosCompartidos, setDocumentosCompartidos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Estados para la UI
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [showLogoutMenu, setShowLogoutMenu] = useState(false)

  // Estados para el Dashboard
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("nombre")
  const [sortDirection, setSortDirection] = useState("asc")
  const [filteredDocuments, setFilteredDocuments] = useState([])

  // Estados para modales
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showActionModal, setShowActionModal] = useState(false)
  const [currentAction, setCurrentAction] = useState("")
  const [currentItem, setCurrentItem] = useState(null)

  // Función para manejar el filtrado
  const handleFilter = () => {
    setShowFilterModal(true)
  }

  // Función para manejar la adición de nuevos elementos
  const handleAdd = (type) => {
    setShowAddModal(true)
    setCurrentAction(type)
  }

  // Función para manejar acciones en elementos (ver, descargar, editar, eliminar)
  const handleAction = (action, item) => {
    setShowActionModal(true)
    setCurrentAction(action)
    setCurrentItem(item)
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    alert("Cerrando sesión...")
    // Aquí iría la lógica real de cierre de sesión
  }

  // Función para cerrar modales
  const closeModals = () => {
    setShowFilterModal(false)
    setShowAddModal(false)
    setShowActionModal(false)
    setCurrentAction("")
    setCurrentItem(null)
  }

  // Componente Modal simple
  const Modal = ({ title, children, onClose }) => {
    const modalRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [onClose])

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div ref={modalRef} className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium">{title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">{children}</div>
          <div className="p-4 border-t flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Simulación de carga de datos desde una API
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)

        // Cargar datos del usuario
        const user = await fetchUserData()
        setUserData(user)

        // Cargar documentos
        const docs = await fetchDocumentos()
        setDocumentos(docs)
        setFilteredDocuments(docs)

        // Cargar mis documentos
        const misDocs = await fetchMisDocumentos()
        setMisDocumentos(misDocs)

        // Cargar familiares
        const fams = await fetchFamiliares()
        setFamiliares(fams)

        // Cargar documentos compartidos
        const docsComp = await fetchDocumentosCompartidos()
        setDocumentosCompartidos(docsComp)
      } catch (error) {
        console.error("Error cargando datos:", error)
      } finally {
        // Simulamos un pequeño retraso para mostrar el loading
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }

    loadData()
  }, [])

  // Menú de navegación sin la opción "Mi Cuenta"
  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Mis Documentos", icon: <FileText className="w-5 h-5" /> },
    { name: "Familiares", icon: <Users className="w-5 h-5" /> },
    { name: "Compartir Documentos", icon: <Share2 className="w-5 h-5" /> },
  ]

  // Función para manejar la búsqueda en Dashboard
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setFilteredDocuments(documentos)
    } else {
      const filtered = documentos.filter(
        (doc) =>
          (doc.nombre && doc.nombre.toLowerCase().includes(term)) ||
          (doc.tipo && doc.tipo.toLowerCase().includes(term)) ||
          (doc.propietario && doc.propietario.toLowerCase().includes(term)) ||
          (doc.claveAcceso && doc.claveAcceso.toLowerCase().includes(term)),
      )
      setFilteredDocuments(filtered)
    }
  }

  // Función para ordenar documentos
  const handleSort = (field) => {
    if (filteredDocuments.length === 0) return

    const newDirection = field === sortField && sortDirection === "asc" ? "desc" : "asc"
    setSortField(field)
    setSortDirection(newDirection)

    const sorted = [...filteredDocuments].sort((a, b) => {
      if (!a[field] || !b[field]) return 0

      if (newDirection === "asc") {
        return a[field].localeCompare(b[field])
      } else {
        return b[field].localeCompare(a[field])
      }
    })

    setFilteredDocuments(sorted)
  }

  // Calcular estadísticas para el Dashboard
  const totalDocumentos = documentos.length
  const documentosValidados = documentos.filter((doc) => doc.estado === "Validado").length
  const documentosPendientes = totalDocumentos - documentosValidados
  const propietariosUnicos =
    documentos.length > 0 ? [...new Set(documentos.map((doc) => doc.propietario).filter(Boolean))].length : 0

  // Función para renderizar el contenido según el ítem activo
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )
    }

    switch (activeItem) {
      case "Dashboard":
        return (
          <div className="max-w-7xl mx-auto">
            {/* Encabezado de página con bienvenida */}
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Bienvenido, {userData?.nombre || "Usuario"}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Gestiona y visualiza todos tus documentos y archivos familiares
                  </p>
                </div>
              </div>
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
                  <button
                    onClick={handleFilter}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </button>
                  <button
                    onClick={() => handleAdd("documento")}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Nuevo Documento
                  </button>
                </div>
              </div>
            </div>

            {/* Tabla de documentos */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <EmptyState
                message="No hay documentos disponibles. Agrega documentos para verlos aquí."
                icon={<FileText className="h-8 w-8 text-gray-400" />}
              />
            </div>
          </div>
        )

      case "Mis Documentos":
        return (
          <div className="max-w-7xl mx-auto">
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
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </button>
                  <button
                    onClick={() => handleAdd("documento")}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Subir Documento
                  </button>
                </div>
              </div>
            </div>

            {/* Tabla de documentos */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
                <p className="text-sm text-gray-500 max-w-md mb-4">
                  No tienes documentos personales. Sube documentos para verlos aquí.
                </p>
                <button
                  onClick={() => handleAdd("documento")}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2 inline-block" />
                  Subir Documento
                </button>
              </div>
            </div>
          </div>
        )

      case "Familiares":
        return (
          <div className="max-w-7xl mx-auto">
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
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </button>
                  <button
                    onClick={() => handleAdd("familiar")}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Familiar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
                <p className="text-sm text-gray-500 max-w-md mb-4">
                  No tienes familiares registrados. Añade familiares para verlos aquí.
                </p>
                <button
                  onClick={() => handleAdd("familiar")}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2 inline-block" />
                  Añadir Familiar
                </button>
              </div>
            </div>
          </div>
        )

      case "Compartir Documentos":
        return (
          <div className="max-w-7xl mx-auto">
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
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </button>
                  <button
                    onClick={() => handleAdd("compartir")}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir Nuevo
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="bg-gray-100 p-4 rounded-full mb-4">
                  <Share2 className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos disponibles</h3>
                <p className="text-sm text-gray-500 max-w-md mb-4">
                  No has compartido documentos. Comparte documentos para verlos aquí.
                </p>
                <button
                  onClick={() => handleAdd("compartir")}
                  className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90"
                >
                  <Share2 className="h-4 w-4 mr-2 inline-block" />
                  Compartir Documento
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return <div>Página no encontrada</div>
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-sm z-50 h-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo y Título */}
            <Link href="/" className="flex items-center text-xl space-x-4 font-bold text-black no-underline">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="currentColor">
                  <path d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                </svg>
              </div>
              <span>FamilyShare</span>
            </Link>

            {/* Menú para pantallas grandes */}
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Inicio
              </Link>

              {/* Nombre del usuario */}
              {userData && (
                <div className="hidden md:flex items-center text-gray-700">
                  <span className="mr-2">Hola,</span>
                  <span className="font-medium">{userData.nombre || "Usuario"}</span>
                </div>
              )}

              {/* Icono de logout */}
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
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
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

      <div className="flex flex-1 pt-16">
        {/* Sidebar para móvil - botón flotante */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="fixed z-40 bottom-4 right-4 p-3 rounded-full bg-primary text-white shadow-lg"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Overlay para cerrar sidebar en móvil */}
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
            {/* Menú de navegación */}
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

        {/* Contenido principal */}
        <div className="flex-1 overflow-hidden">
          {/* Área de contenido */}
          <main className="h-full overflow-y-auto p-3 sm:p-6 bg-gray-50">{renderContent()}</main>
        </div>
      </div>

      {/* Modales */}
      {showFilterModal && (
        <Modal title="Filtrar" onClose={closeModals}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                <option value="">Todos</option>
                <option value="INE">INE</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="CURP">CURP</option>
                <option value="Acta de nacimiento">Acta de nacimiento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                <option value="">Todos</option>
                <option value="Validado">Validado</option>
                <option value="No validado">No validado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de subida</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Desde</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Hasta</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {showAddModal && (
        <Modal
          title={
            currentAction === "documento"
              ? "Nuevo Documento"
              : currentAction === "familiar"
                ? "Añadir Familiar"
                : "Compartir Documento"
          }
          onClose={closeModals}
        >
          {currentAction === "documento" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del documento</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Ej: Identificación oficial"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Seleccionar tipo</option>
                  <option value="INE">INE</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CURP">CURP</option>
                  <option value="Acta de nacimiento">Acta de nacimiento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Archivo</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                      >
                        <span>Subir un archivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">o arrastrar y soltar</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF hasta 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentAction === "familiar" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Ej: María Rodríguez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relación</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Seleccionar relación</option>
                  <option value="Esposo/a">Esposo/a</option>
                  <option value="Hijo/a">Hijo/a</option>
                  <option value="Padre/Madre">Padre/Madre</option>
                  <option value="Hermano/a">Hermano/a</option>
                  <option value="Abuelo/a">Abuelo/a</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Ej: familiar@ejemplo.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Ej: +52 555 123 4567"
                />
              </div>
            </div>
          )}

          {currentAction === "compartir" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Documento a compartir</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Seleccionar documento</option>
                  <option value="doc-001">Identificación oficial</option>
                  <option value="doc-002">Certificado de nacimiento</option>
                  <option value="doc-003">CURP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Compartir con</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                  <option value="">Seleccionar familiar</option>
                  <option value="fam-001">María Rodríguez</option>
                  <option value="fam-002">Carlos López</option>
                  <option value="fam-003">Ana López</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="ml-2 text-sm text-gray-600">Permitir descarga</span>
                </label>
              </div>
            </div>
          )}
        </Modal>
      )}

      {showActionModal && (
        <Modal
          title={
            currentAction === "view"
              ? "Ver Documento"
              : currentAction === "download"
                ? "Descargar Documento"
                : currentAction === "edit"
                  ? "Editar Documento"
                  : "Eliminar Documento"
          }
          onClose={closeModals}
        >
          {currentAction === "view" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="bg-gray-100 p-8 rounded-lg mb-4 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">Vista previa no disponible</h3>
                <p className="text-sm text-gray-500 mt-1">
                  La vista previa del documento no está disponible en este momento.
                </p>
              </div>
              <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90">
                Abrir documento
              </button>
            </div>
          )}

          {currentAction === "download" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="bg-gray-100 p-8 rounded-lg mb-4 flex items-center justify-center">
                  <Download className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium">Descargar documento</h3>
                <p className="text-sm text-gray-500 mt-1">El documento se descargará a tu dispositivo.</p>
              </div>
              <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-primary/90">
                Iniciar descarga
              </button>
            </div>
          )}

          {currentAction === "edit" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del documento</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  defaultValue="Identificación oficial"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de documento</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  defaultValue="INE"
                >
                  <option value="INE">INE</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="CURP">CURP</option>
                  <option value="Acta de nacimiento">Acta de nacimiento</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de expiración</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  defaultValue="2028-10-15"
                />
              </div>
            </div>
          )}

          {currentAction === "delete" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="bg-red-100 p-4 rounded-full mb-4 inline-flex">
                  <Trash2 className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-lg font-medium">¿Eliminar documento?</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Esta acción no se puede deshacer. El documento será eliminado permanentemente.
                </p>
              </div>
              <div className="flex justify-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Cancelar
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                  Eliminar
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

