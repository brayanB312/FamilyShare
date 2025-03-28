import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const user = formData.get("user") as string;

    if (!file) {
      return NextResponse.json({ message: "No se ha enviado ningún archivo" }, { status: 400 });
    }

    // Validar tamaño del archivo (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ message: "El archivo excede el límite de 10MB" }, { status: 400 });
    }

    // Crear carpeta de destino si no existe
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generar un nombre único para el archivo
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    // Guardar el archivo en el servidor
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    return NextResponse.json({ message: "Archivo subido con éxito", filePath: `/uploads/${uniqueFileName}` }, { status: 200 });
  } catch (error) {
    console.error("Error en la subida:", error);
    return NextResponse.json({ message: "Error al subir el archivo" }, { status: 500 });
  }
}
