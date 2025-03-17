"use client"

import { useState } from "react"
import { Shield, Eye, EyeOff } from "lucide-react"

export default function MiCuenta() {
  const [activeTab, setActiveTab] = useState("Perfil")
  const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Encabezado de página */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Configuración de Cuenta</h1>

          {/* Breadcrumb - solo visible en pantallas medianas y grandes */}
          <nav className="hidden sm:flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
            <a href="#" className="hover:text-primary">
              Inicio
            </a>
            <span className="mx-2">/</span>
            <a href="#" className="hover:text-primary">
              Mi Cuenta
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-700 font-medium">Configuración</span>
          </nav>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">Administra tu información personal y preferencias de cuenta</p>

        {/* Breadcrumb para móviles */}
        <nav className="flex sm:hidden items-center text-xs text-gray-500 mt-2 overflow-x-auto pb-1">
          <a href="#" className="hover:text-primary whitespace-nowrap">
            Inicio
          </a>
          <span className="mx-1">/</span>
          <a href="#" className="hover:text-primary whitespace-nowrap">
            Mi Cuenta
          </a>
          <span className="mx-1">/</span>
          <span className="text-gray-700 font-medium whitespace-nowrap">Configuración</span>
        </nav>
      </div>

      {/* Contenido de configuración */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Pestañas de navegación */}
        <div className="flex overflow-x-auto scrollbar-hide border-b">
          <button
            className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
              activeTab === "Perfil" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Perfil")}
          >
            Perfil
          </button>
          <button
            className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap ${
              activeTab === "Seguridad" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700"
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

        {/* Contenido de la pestaña */}
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
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
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

              <div className="mt-6 sm:mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto de perfil</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6 space-y-4 sm:space-y-0">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-2xl font-medium">
                        J
                      </div>
                      <button className="absolute bottom-0 right-0 p-1 rounded-full bg-white border border-gray-300 shadow-sm">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50">
                      Cambiar foto
                    </button>
                    <p className="mt-1 text-xs text-gray-500">JPG, GIF o PNG. Máximo 1MB.</p>
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

          {activeTab === "Seguridad" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cambiar contraseña</h3>
              <div className="grid grid-cols-1 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
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
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
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
                  <p className="mt-1 text-xs text-gray-500">
                    La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un carácter
                    especial.
                  </p>
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

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Autenticación de dos factores</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">
                        Protege tu cuenta con autenticación de dos factores
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">
                        Añade una capa adicional de seguridad a tu cuenta requiriendo más que solo una contraseña para
                        iniciar sesión.
                      </p>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50">
                    Activar
                  </button>
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

          {activeTab === "Notificaciones" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preferencias de notificaciones</h3>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email-notifications"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        Notificaciones por correo electrónico
                      </label>
                      <p className="text-gray-500">
                        Recibe notificaciones sobre tus documentos y actividad de la cuenta por correo electrónico.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="document-expiry"
                        name="document-expiry"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="document-expiry" className="font-medium text-gray-700">
                        Alertas de expiración de documentos
                      </label>
                      <p className="text-gray-500">
                        Recibe notificaciones cuando tus documentos estén próximos a expirar.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="document-shared"
                        name="document-shared"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="document-shared" className="font-medium text-gray-700">
                        Documentos compartidos
                      </label>
                      <p className="text-gray-500">
                        Recibe notificaciones cuando alguien comparta un documento contigo.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="security-alerts"
                        name="security-alerts"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="security-alerts" className="font-medium text-gray-700">
                        Alertas de seguridad
                      </label>
                      <p className="text-gray-500">
                        Recibe notificaciones sobre actividades sospechosas o inicios de sesión desde nuevos
                        dispositivos.
                      </p>
                    </div>
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

          {activeTab === "Privacidad" && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de privacidad</h3>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="profile-visibility"
                        name="profile-visibility"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="profile-visibility" className="font-medium text-gray-700">
                        Visibilidad del perfil
                      </label>
                      <p className="text-gray-500">
                        Permite que otros miembros de la familia vean tu perfil y documentos compartidos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="document-access"
                        name="document-access"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="document-access" className="font-medium text-gray-700">
                        Acceso a documentos
                      </label>
                      <p className="text-gray-500">
                        Requiere tu aprobación antes de que alguien pueda acceder a tus documentos compartidos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="data-usage"
                        name="data-usage"
                        type="checkbox"
                        className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="data-usage" className="font-medium text-gray-700">
                        Uso de datos
                      </label>
                      <p className="text-gray-500">
                        Permite que FamilyShare utilice tus datos para mejorar el servicio y personalizar tu
                        experiencia.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Exportar datos</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Puedes solicitar una copia de todos tus datos personales y documentos almacenados en FamilyShare.
                </p>
                <button className="px-4 py-2 text-sm font-medium text-primary bg-white border border-primary rounded-md hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  Solicitar mis datos
                </button>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-red-600 mb-4">Eliminar cuenta</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Una vez que elimines tu cuenta, todos tus datos y documentos serán eliminados permanentemente.
                </p>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                  Eliminar mi cuenta
                </button>
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
}

