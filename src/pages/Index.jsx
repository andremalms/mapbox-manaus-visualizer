import React, { useState } from 'react';
import MapComponent from '../components/MapComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Index = () => {
  const [wmsUrl, setWmsUrl] = useState('');
  const [wmsLayers, setWmsLayers] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wmsUrl || !wmsLayers) {
      toast.error('Please provide both WMS URL and Layers');
      return;
    }
    setShowMap(true);
    toast.success('Map loaded successfully');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">UFAM - Mapa Interativo</h1>
      </header>
      <main className="flex-grow p-4">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex flex-col space-y-2">
            <Input
              type="text"
              placeholder="WMS URL"
              value={wmsUrl}
              onChange={(e) => setWmsUrl(e.target.value)}
              className="w-full"
            />
            <Input
              type="text"
              placeholder="WMS Layers"
              value={wmsLayers}
              onChange={(e) => setWmsLayers(e.target.value)}
              className="w-full"
            />
            <Button type="submit">Carregar Mapa</Button>
          </div>
        </form>
        {showMap && <MapComponent wmsUrl={wmsUrl} wmsLayers={wmsLayers} />}
      </main>
    </div>
  );
};

export default Index;