import Link from "next/link"
import { Home } from "lucide-react"

export default function Register() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 lg:px-8 overflow-hidden">
      <Link
        href="/"
        className="absolute top-4 left-4 p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
      >
        <Home className="h-5 w-5 text-gray-700" />
        <span className="sr-only">Ir al inicio</span>
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img alt="Your Company" src="/logo.png" className="mx-auto h-10 w-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Crea tu cuenta</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900">
              Nombre
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Tu nombre completo"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Correo electrónico
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="ejemplo@correo.com"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-900">
              Fecha de nacimiento
            </label>
            <div className="mt-2">
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                required
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
              Número de teléfono
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+52 686 234 5678"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-900">
                Ciudad
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  placeholder="Tu ciudad"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-900">
                Estado/Provincia
              </label>
              <div className="mt-2">
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  placeholder="Tu estado o provincia"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-900">
              Género
            </label>
            <div className="mt-2">
              <select
                id="gender"
                name="gender"
                required
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              >
                <option value="">Selecciona una opción</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="non-binary">No binario</option>
                <option value="other">Otro</option>
                <option value="prefer-not-to-say">Prefiero no decirlo</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Contraseña
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Crea una contraseña"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900">
              Confirmar contraseña
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="Confirma tu contraseña"
                className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-900">
                Acepto los{" "}
                <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
                  política de privacidad
                </a>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-blue-600 transition transform hover:scale-105"
            >
              Registrarse
            </button>
          </div>
        </form>
        <p className="mt-4 pb-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  )
}

