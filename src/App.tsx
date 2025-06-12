import React, { useReducer, useEffect } from 'react';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';

const activityReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      const newState = [...state, action.payload];
      localStorage.setItem('parkingRecords', JSON.stringify(newState));
      return newState;
    case 'EDIT_ACTIVITY':
      const updatedState = state.map((activity, index) =>
        index === action.payload.index ? action.payload.updatedActivity : activity
      );
      localStorage.setItem('parkingRecords', JSON.stringify(updatedState));
      return updatedState;
    case 'DELETE_ACTIVITY':
      const filteredState = state.filter((_, index) => index !== action.payload);
      localStorage.setItem('parkingRecords', JSON.stringify(filteredState));
      return filteredState;
    default:
      return state;
  }
};

const App = () => {
  const [activities, dispatch] = useReducer(activityReducer, [], () => {
    const savedRecords = localStorage.getItem('parkingRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Imagen decorativa en el encabezado */}
          <img
            src="/img/image1.jpeg"
            alt="Logo"
            className="h-10 w-10 rounded-full"
          />
          <h1 className="text-xl font-bold">ESTACIONAMIENTO LA PALMA</h1>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          REINICIAR APP
        </button>
      </header>

      {/* Main content */}
      <main className="flex flex-col items-center p-6 relative">
        {/* Imagen decorativa en el fondo */}
        <img
          src="/img/image2.jpeg"
          alt="Decoración de fondo"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-10 -z-10"
        />
        <ActivityForm dispatch={dispatch} />
        <ActivityList activities={activities} dispatch={dispatch} />
      </main>
    </div>
  );
};

export default App;
