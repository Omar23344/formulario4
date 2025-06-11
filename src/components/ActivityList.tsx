import React, { useState } from 'react';

type Activity = {
  plateNumber: string;
  hours: number;
  rate: number;
  totalCost: number;
  // otros campos si existen
};

interface ActivityListProps {
  activities: Activity[];
  dispatch: React.Dispatch<any>;
}

export function ActivityList({ activities, dispatch }: ActivityListProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedActivity, setEditedActivity] = useState<Activity>({} as Activity);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedActivity(activities[index]);
  };

  const handleSave = () => {
    dispatch({
      type: 'EDIT_ACTIVITY',
      payload: { index: editingIndex, updatedActivity: editedActivity },
    });
    setEditingIndex(null);
  };

  const handleDelete = (index: number) => {
    dispatch({ type: 'DELETE_ACTIVITY', payload: index });
  };

  return (
    <div className="mt-6 w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Registros de Estacionamiento</h2>
      <ul className="bg-white p-4 rounded-lg shadow-md">
        {activities.length === 0 ? (
          <li className="text-gray-500">No hay registros.</li>
        ) : (
          activities.map((activity, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 p-2 border-b border-gray-200 last:border-b-0"
            >
              {editingIndex === index ? (
                <div className="flex-1">
                  <input
                    type="text"
                    value={editedActivity.plateNumber}
                    onChange={(e) =>
                      setEditedActivity({ ...editedActivity, plateNumber: e.target.value })
                    }
                    className="border-gray-300 rounded-lg shadow-sm w-full mb-2"
                  />
                  <input
                    type="number"
                    value={editedActivity.hours}
                    onChange={(e) => {
                      const value = e.target.value;
                      setEditedActivity({ ...editedActivity, hours: Number(value) });
                    }}
                    className="border-gray-300 rounded-lg shadow-sm w-full"
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <p className="font-semibold">Placa: {activity.plateNumber}</p>
                  <p>Horas: {activity.hours}</p>
                  <p>Tarifa: ${activity.rate}/hora</p>
                  <p className="text-green-600 font-bold">Total: ${activity.totalCost}</p>
                </div>
              )}
              <div className="flex space-x-2">
                {editingIndex === index ? (
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-2 rounded"
                  >
                    ✏️
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                >
                  ❌
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}