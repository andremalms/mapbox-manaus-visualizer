import React from 'react';
import MapComponent from '../components/MapComponent';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">UFAM - Mapa Interativo</h1>
      </header>
      <main className="flex-grow">
        <MapComponent />
      </main>
    </div>
  );
};

export default Index;