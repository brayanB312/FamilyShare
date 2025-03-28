"use client"

import { useState } from "react"
import { Eye, EyeOff, Home, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      {/* Header - Simplified version */}
      <header className="border-b bg-white dark:bg-slate-800 dark:border-slate-700">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo Panel de Gobierno" width={32} height={32} />
            <h1 className="text-lg md:text-xl font-semibold text-foreground">Panel de Gobierno</h1>
          </div>

          {/* Header right buttons */}
          <div className="flex items-center gap-2">
            {/* Home button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/">
                    <Button variant="ghost" size="icon">
                      <Home className="h-5 w-5" />
                      <span className="sr-only">Regresar a inicio</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Regresar a inicio</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {isDarkMode ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      </svg>
                    )}
                    <span className="sr-only">Cambiar tema</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Main Content - Login Form */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-md dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Image
                  src="/logo.png"
                  alt="Logo Panel de Gobierno"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground dark:text-white">Iniciar Sesión</CardTitle>
            <CardDescription className="text-muted-foreground">
              Ingrese sus credenciales para acceder al panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground dark:text-white">
                Usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Ingrese su nombre de usuario"
                  className="pl-10 text-foreground dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground dark:text-white">
                  Contraseña
                </Label>
                <Button variant="link" className="px-0 h-auto text-xs font-normal text-primary">
                  ¿Olvidó su contraseña?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  className="pl-10 text-foreground dark:text-white dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-400"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm text-muted-foreground">
                Recordar mis credenciales
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full bg-primary hover:bg-primary/90">Iniciar Sesión</Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Al iniciar sesión, acepta los{" "}
              <Button variant="link" className="p-0 h-auto text-primary">
                términos de servicio
              </Button>{" "}
              y{" "}
              <Button variant="link" className="p-0 h-auto text-primary">
                política de privacidad
              </Button>
            </p>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-4 px-6 border-t bg-white dark:bg-slate-800 dark:border-slate-700">
        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Panel de Gobierno. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}

