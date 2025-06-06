import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
    let connection;
    try {
        const body = await req.json();
        console.log("Datos recibidos:", body);

        const { nombre_completo, correo, fecha_nacimiento, telefono, ciudad, estado, genero, contrasena } = body;

        if (!nombre_completo || !correo || !fecha_nacimiento || !telefono || !ciudad || !estado || !genero || !contrasena) {
            return NextResponse.json({ error: 'Todos los campos son obligatorios' }, { status: 400 });
        }

        // Validar formato de fecha
        if (isNaN(Date.parse(fecha_nacimiento))) {
            return NextResponse.json({ error: 'Fecha de nacimiento inválida' }, { status: 400 });
        }

        // Limpiar número de teléfono
        const telefonoLimpio = telefono.replace(/\D/g, '');

        // Validar género con ENUM
        const generosValidos = ["Masculino", "Femenino", "Otro", "Prefiero no decirlo"];
        if (!generosValidos.includes(genero)) {
            return NextResponse.json({ error: 'Género no válido' }, { status: 400 });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Conectar a MySQL
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Insertar usuario
        const [result] = await connection.execute(
            'INSERT INTO ciudadanos (nombre_completo, correo, fecha_nacimiento, telefono, ciudad, estado, genero, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre_completo, correo, fecha_nacimiento, telefonoLimpio, ciudad, estado, genero, hashedPassword]
        );

        return NextResponse.json({ message: 'Usuario registrado exitosamente'}, { status: 201 });
    } catch (error) {
        console.error('Error en registro:', error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    } finally {
        if (connection) await connection.end();
    }
}
