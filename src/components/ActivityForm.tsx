import React, { useState } from 'react';

type Props = {
  onRegistroGuardado: () => void; // Para recargar la lista en App
};

const ActivityForm: React.FC<Props> = ({ onRegistroGuardado }) => {
  const [form, setForm] = useState({ placa: '', horas: 1, tarifa: 50 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}/api/estacionamientos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ placa: '', horas: 1, tarifa: 50 });
    onRegistroGuardado(); // Recarga la lista en App
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
    >
      <h2 className="text-xl font-bold mb-4">Registrar Estacionamiento</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Placa del Auto:</label>
        <input
          type="text"
          placeholder="Ej. ABC-1234"
          value={form.placa}
          onChange={(e) => setForm({ ...form, placa: e.target.value })}
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Horas Estacionadas:</label>
        <input
          type="number"
          placeholder="Ej. 2"
          value={form.horas}
          onChange={(e) => setForm({ ...form, horas: Number(e.target.value) })}
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Tarifa por Hora:</label>
        <input
          type="number"
          value={form.tarifa}
          onChange={(e) => setForm({ ...form, tarifa: Number(e.target.value) })}
          className="w-full border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg text-white bg-green-600 hover:bg-green-700"
      >
        GUARDAR REGISTRO
      </button>
    </form>
  );
};

export default ActivityForm;