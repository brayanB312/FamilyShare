'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setStatus('Por favor selecciona un archivo');
      return;
    }

    setLoading(true);
    setStatus('Subiendo archivo...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus('Archivo subido correctamente');
        setFile(null);
        // Reset the file input
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      setStatus('Error al subir el archivo');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Subir Archivo</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="fileInput" className="block mb-2">
            Seleccionar archivo:
          </label>
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            className="border p-2 w-full"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!file || loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {loading ? 'Subiendo...' : 'Subir Archivo'}
        </button>
      </form>
      
      {status && (
        <div className={`p-4 rounded ${status.includes('Error') ? 'bg-red-100' : 'bg-green-100'}`}>
          {status}
        </div>
      )}
    </div>
  );
}