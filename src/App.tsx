import React, { useEffect, useState } from 'react';
import ActivityForm from './components/ActivityForm';

type Registro = {
  id: number;
  placa: string;
  horas: number;
  tarifa: number;
};

const App = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);

  // Cargar registros al iniciar y cuando se guarde uno nuevo
  const cargarRegistros = () => {
    fetch('http://localhost:3000/api/estacionamientos')
      .then((res) => res.json())
      .then((data) => setRegistros(data));
  };

  useEffect(() => {
    cargarRegistros();
  }, []);

  // Eliminar registro
  const eliminarRegistro = async (id: number) => {
    await fetch(`http://localhost:3000/api/estacionamientos/${id}`, {
      method: 'DELETE',
    });
    setRegistros(registros.filter((r) => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/img/image1.jpeg"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-xl font-bold">ESTACIONAMIENTO LA PALMA</h1>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          REINICIAR APP
        </button>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center p-6 relative">
        <img
          src="/img/image2.jpeg"
          alt="Decoración de fondo"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10 -z-10"
        />

        {/* Formulario principal */}
        <ActivityForm onRegistroGuardado={cargarRegistros} />

        {/* Lista de registros */}
        <ul className="w-full max-w-xl bg-white rounded shadow p-4">
          {registros.map((r) => (
            <li key={r.id} className="flex justify-between items-center border-b py-2">
              <span>
                {r.placa} - {r.horas} horas - ${r.tarifa}/hora
              </span>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => eliminarRegistro(r.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
