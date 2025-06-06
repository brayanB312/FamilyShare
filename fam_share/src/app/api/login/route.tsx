import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Establece la conexión a la base de datos
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Consulta para obtener el id, nombre completo y contraseña del usuario
    const [rows]: any = await connection.execute(
      "SELECT id, nombre_completo, contrasena FROM ciudadanos WHERE correo = ?",
      [email]
    );

    await connection.end();

    // Si no se encuentra el correo en la base de datos
    if (rows.length === 0) {
      return NextResponse.json({ message: "Correo no registrado" }, { status: 401 });
    }

    const user = rows[0];

    // Verifica la contraseña
    const passwordMatch = await bcrypt.compare(password, user.contrasena);
    if (!passwordMatch) {
      return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
    }

    // Responde con los datos del usuario, incluyendo el nombre completo
    return NextResponse.json(
      { message: "Inicio de sesión exitoso", user: { id: user.id, nombre: user.nombre_completo } },
      { status: 200 }
    );
  } catch (error) {
    // Manejo de errores del servidor
    return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
