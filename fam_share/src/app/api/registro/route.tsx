import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { nombre_completo, correo, fecha_nacimiento, telefono, ciudad, estado, genero, contraseña } = body;
  
      if (!nombre_completo || !correo || !fecha_nacimiento || !telefono || !ciudad || !estado || !genero || !contraseña) {
        return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
      }
  
      const hashedPassword = await bcrypt.hash(contraseña, 10);
  
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
  
      const [result]: any = await connection.execute(
        'INSERT INTO ciudadanos (nombre_completo, correo, fecha_nacimiento, telefono, ciudad, estado, genero, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre_completo, correo, fecha_nacimiento, telefono, ciudad, estado, genero, hashedPassword]
      );
  
      await connection.end();
  
      return NextResponse.json({ message: 'Usuario registrado exitosamente', userId: result.insertId }, { status: 201 });
    } catch (error) {
      console.error('Error en registro:', error);
      return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
  }
  