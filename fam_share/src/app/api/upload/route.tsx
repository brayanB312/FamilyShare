import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import mysql from 'mysql2/promise';

// Importa la configuración de la conexión
import conn from '@/app/conn.json';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Create a unique filename
    const filename = `${Date.now()}_${file.name}`;
    
    // Define upload directory
    const uploadDir = '/root/uploads';
    
    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // File path where the file will be saved
    const filePath = join(uploadDir, filename);
    
    // Convert file to buffer and save it
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    
    // Save to database
    try {
      // Create connection
      const connection = await mysql.createConnection(conn);
      
      // Save file info to database
      const query = 'INSERT INTO archivos(nombre, ruta) VALUES(?, ?)';
      const values = [filename, `/uploads/${filename}`]; // Store the public path
      
      await connection.execute(query, values);
      await connection.end();
      
      return NextResponse.json({ 
        message: 'Archivo subido y guardado en la base de datos',
        filename,
        path: `/uploads/${filename}`
      });
    } catch (dbError) {
      console.error('Error de base de datos:', dbError);
      return NextResponse.json(
        { error: 'Error al guardar en la base de datos' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    return NextResponse.json(
      { error: 'Error al procesar el archivo' },
      { status: 500 }
    );
  }
}