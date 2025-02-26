import "@/app/globals.css"; 
import "@/app/styles/inicio.css";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="contenedor">
        <section className="hero">
          <div className="hero-text">
            <h1>Comparte archivos de importancia a personas de confianza</h1>
            <p>Guarda y comparte tus documentos de forma segura con quienes realmente importan.</p>
            <a href="#" className="btn-acceder">Acceder</a>
          </div>
        </section>
      </div>
    </>
  );
}
