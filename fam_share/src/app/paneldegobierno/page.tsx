"use client"

import { useState } from "react"
import {
  Search,
  FileText,
  Check,
  X,
  ChevronLeft,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  Home,
  Shield,
  Clock,
  Download,
  Eye,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Tipos de estado para los documentos
const STATUS = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
}

// Definir un tipo para los estados
type StatusType = (typeof STATUS)[keyof typeof STATUS] | "Parcial"

// Datos de ejemplo para los documentos
const mockDocument = {
  id: 1,
  key: "DOC-2023-4872",
  user: {
    name: "María González",
    id: "USR-4872",
    initials: "MG",
    department: "Recursos Humanos",
    documentType: "Solicitud de permiso",
  },
  type: "Archivo PDF",
  status: STATUS.PENDING as StatusType,
  date: "15/03/2023",
  time: "10:45 AM",
  pdfs: [
    {
      id: 1,
      name: "solicitud_permiso.pdf",
      description: "Formulario de solicitud",
      date: "15/03/2023",
      status: STATUS.PENDING as StatusType,
    },
    {
      id: 2,
      name: "justificante_medico.pdf",
      description: "Justificante médico",
      date: "14/03/2023",
      status: STATUS.PENDING as StatusType,
    },
  ],
}

// Función para obtener el color de estado
const getStatusColor = (status: StatusType) => {
  switch (status) {
    case STATUS.APPROVED:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case STATUS.REJECTED:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "Parcial":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    default:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  }
}

// Función para obtener el icono de estado
const getStatusIcon = (status: StatusType) => {
  switch (status) {
    case STATUS.APPROVED:
      return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
    case STATUS.REJECTED:
      return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
    case "Parcial":
      return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
    default:
      return <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
  }
}

export default function PanelGobierno() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState("documento")
  const [showPdfDialog, setShowPdfDialog] = useState(false)
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0)

  // Función para cambiar tema claro/oscuro
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // Aplicar clase dark al elemento html
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  // Obtener el PDF actual
  const currentPdf = mockDocument.pdfs[selectedPdfIndex] || null

  // Función para cambiar al PDF anterior
  const prevPdf = () => {
    setSelectedPdfIndex((prev) => (prev > 0 ? prev - 1 : mockDocument.pdfs.length - 1))
  }

  // Función para cambiar al PDF siguiente
  const nextPdf = () => {
    setSelectedPdfIndex((prev) => (prev < mockDocument.pdfs.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header with enhanced navbar */}
      <header className="sticky top-0 z-10 border-b bg-white dark:bg-slate-800 dark:border-slate-700">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Volver</span>
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Panel de Gobierno</h1>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Home className="h-4 w-4 mr-1" />
                    Inicio
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Página principal</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    <span className="sr-only">Cambiar tema</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Profile Dropdown - Enhanced */}
            <Separator orientation="vertical" className="h-8 mx-1" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Usuario" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start text-sm">
                    <span className="font-medium">Admin</span>
                    <span className="text-xs text-muted-foreground">Administrador</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="container mx-auto p-4 md:p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl grid gap-6">
          {/* Search Section */}
          <section className="space-y-4">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
                Buscar Documento por Clave
              </h2>
              <p className="text-muted-foreground">Ingrese la clave única del documento para realizar la búsqueda</p>
            </div>
            <form className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Ingrese clave del documento"
                className="flex-1 text-foreground dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-400"
                value="DOC-2023-4872"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </form>
          </section>

          {/* Results Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-semibold text-center text-foreground dark:text-white">
              Resultados de búsqueda
            </h3>

            <Tabs defaultValue="documento" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="documento">Documento</TabsTrigger>
                <TabsTrigger value="pdf">PDF</TabsTrigger>
              </TabsList>

              <TabsContent value="documento">
                <Card className="dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-foreground dark:text-white">
                        Documento Clave: {mockDocument.key}
                      </CardTitle>
                      <Badge className={getStatusColor(mockDocument.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(mockDocument.status)}
                          {mockDocument.status}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        <span>{mockDocument.type}</span>
                      </div>
                      <div className="text-muted-foreground">Fecha: {mockDocument.date}</div>
                    </div>

                    {/* PDF Files List */}
                    <div className="mt-4 border rounded-md p-3 dark:border-slate-700">
                      <h4 className="text-sm font-medium mb-2 text-foreground dark:text-slate-200">
                        Archivos adjuntos:
                      </h4>
                      <div className="space-y-2">
                        {mockDocument.pdfs.map((pdf, index) => (
                          <div
                            key={pdf.id}
                            className={`flex flex-col p-3 rounded-md border dark:border-slate-700 ${
                              index === selectedPdfIndex
                                ? "bg-primary/5 border-primary/30 dark:bg-primary/10"
                                : "hover:bg-muted/50 dark:hover:bg-slate-700/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <FileText className={`h-4 w-4 ${index === selectedPdfIndex ? "text-primary" : ""}`} />
                                <div>
                                  <p className="text-sm font-medium text-foreground dark:text-white">{pdf.name}</p>
                                  <p className="text-xs text-muted-foreground">{pdf.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(pdf.status)}>
                                  <span className="flex items-center gap-1">
                                    {getStatusIcon(pdf.status)}
                                    {pdf.status}
                                  </span>
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => {
                                    setSelectedPdfIndex(index)
                                    setActiveTab("pdf")
                                  }}
                                >
                                  <Eye className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Botones de validación por documento */}
                            <div className="flex justify-end mt-2 gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950 dark:border-green-800"
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Validar
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:border-red-800"
                              >
                                <X className="mr-1 h-3 w-3" />
                                Denegar
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 border rounded-md p-3 bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
                      <h4 className="text-sm font-medium mb-2 text-foreground dark:text-slate-200">
                        Datos del usuario que solicitó la validación:
                      </h4>
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {mockDocument.user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-medium text-foreground dark:text-white">{mockDocument.user.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {mockDocument.user.id}</div>
                          <div className="text-sm text-foreground dark:text-slate-300">
                            Departamento: {mockDocument.user.department}
                          </div>
                          <div className="text-sm text-foreground dark:text-slate-300">
                            Tipo de documento: {mockDocument.user.documentType}
                          </div>
                          <div className="text-sm text-muted-foreground">Fecha de solicitud: {mockDocument.date}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col pt-2 gap-3">
                    <div className="flex justify-between w-full">
                      <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Shield className="mr-1 h-4 w-4" />
                        Enviar decisiones
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950 dark:border-green-800"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Validar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:border-red-800"
                        >
                          <X className="mr-1 h-4 w-4" />
                          Denegar
                        </Button>
                      </div>
                    </div>

                    {/* Botones para validar o denegar todos los documentos */}
                    <div className="w-full border-t pt-3 dark:border-slate-700">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground dark:text-white">Validación masiva:</span>
                        <div className="flex gap-2">
                          <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Validar todos
                          </Button>
                          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                            <XCircle className="mr-1 h-4 w-4" />
                            Denegar todos
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="pdf">
                <Card className="dark:bg-slate-800 dark:border-slate-700">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center text-foreground dark:text-white">
                          {currentPdf?.name || "Sin archivo"}
                          <Badge variant="outline" className="ml-2 dark:border-slate-600">
                            {selectedPdfIndex + 1} de {mockDocument.pdfs.length}
                          </Badge>
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">{currentPdf?.description}</p>
                          <Badge className={getStatusColor(currentPdf.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(currentPdf.status)}
                              {currentPdf.status}
                            </span>
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPdfDialog(true)}
                        className="dark:border-slate-600 dark:text-slate-200"
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Vista completa
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden bg-white dark:border-slate-700">
                      <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        {/* PDF Preview */}
                        <iframe
                          src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(currentPdf?.name || "Sin PDF")}`}
                          className="w-full h-[400px]"
                          title="Vista previa del PDF"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("documento")}
                        className="dark:border-slate-600 dark:text-slate-200"
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Volver
                      </Button>

                      <div className="flex items-center gap-1 ml-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 dark:border-slate-600"
                          onClick={prevPdf}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 dark:border-slate-600"
                          onClick={nextPdf}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-950 dark:border-green-800"
                      >
                        <Check className="mr-1 h-4 w-4" />
                        Validar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-950 dark:border-red-800"
                      >
                        <X className="mr-1 h-4 w-4" />
                        Denegar
                      </Button>
                      <Button variant="outline" size="sm" className="dark:border-slate-600 dark:text-slate-200">
                        <Download className="mr-1 h-4 w-4" />
                        Descargar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>

      {/* PDF Viewer Dialog */}
      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="max-w-4xl h-[80vh] dark:bg-slate-800 dark:border-slate-700">
          <DialogHeader>
            <DialogTitle className="dark:text-white">{currentPdf?.name || "Sin archivo"}</DialogTitle>
            <DialogDescription>
              <div className="flex justify-between">
                <span className="dark:text-slate-300">Documento: {mockDocument.key}</span>
                {currentPdf?.description && <span className="text-muted-foreground">{currentPdf.description}</span>}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden rounded-md border dark:border-slate-700">
            <iframe
              src={`/placeholder.svg?height=600&width=800&text=${encodeURIComponent(currentPdf?.name || "Sin PDF")}`}
              className="w-full h-[calc(80vh-120px)]"
              title="Vista completa del PDF"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

