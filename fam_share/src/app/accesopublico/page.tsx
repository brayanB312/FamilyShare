"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download, FileText, Lock, Home, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DocumentAccess() {
  const [key, setKey] = useState("")
  const [isValidated, setIsValidated] = useState(false)
  const [error, setError] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación de validación de clave
    if (key === "documento123") {
      setIsValidated(true)
      setError("")
    } else {
      setError("La clave ingresada no es válida. Por favor, intente nuevamente.")
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Cambiar tema</span>
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Acceso a Documentos</h1>

        {!isValidated ? (
          <Card className="max-w-md mx-auto border-0 shadow-lg dark:bg-gray-800 dark:text-gray-100">
            <CardHeader className="pb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center text-2xl">Acceso Protegido</CardTitle>
              <CardDescription className="text-center dark:text-gray-400">
                Ingrese la clave única para acceder al documento
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="pt-4">
                {error && (
                  <Alert variant="destructive" className="mb-6 animate-pulse">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-3">
                  <Label htmlFor="key" className="text-sm font-medium">
                    Clave de Acceso
                  </Label>
                  <Input
                    id="key"
                    type="text"
                    placeholder="Ingrese la clave única"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    required
                    className="h-12 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-6">
                <Button type="submit" className="w-full h-12 text-base font-medium">
                  Acceder al Documento
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="max-w-4xl mx-auto border-0 shadow-lg overflow-hidden dark:bg-gray-800 dark:text-gray-100">
            <CardHeader className="bg-primary/5 dark:bg-primary/10 pb-4">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="h-6 w-6 text-primary" />
                Documento Disponible
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Puede visualizar y descargar el documento a continuación
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="border rounded-lg p-6 bg-white dark:bg-gray-700 min-h-[400px] flex items-center justify-center shadow-inner">
                <div className="text-center">
                  <div className="w-24 h-32 mx-auto mb-4 bg-gray-100 dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500 flex items-center justify-center">
                    <FileText className="h-12 w-12 text-primary/70" />
                  </div>
                  <h3 className="text-lg font-medium mb-1 dark:text-gray-200">Documento Confidencial</h3>
                  <p className="text-muted-foreground dark:text-gray-400">Vista previa del documento protegido</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between py-4 bg-primary/5 dark:bg-primary/10">
              <Button
                variant="outline"
                onClick={() => setIsValidated(false)}
                className="dark:bg-gray-700 dark:text-gray-200"
              >
                Volver
              </Button>
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <Download className="h-4 w-4" />
                Descargar Documento
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

