import React, { useState } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN_HERE'; // Replace with your actual Mapbox token

const MapComponent = () => {
  const [viewState, setViewState] = useState({
    latitude: -3.0892,
    longitude: -59.9672,
    zoom: 11
  });

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Add WMS layer here */}
        <Source
          id="wms-test-source"
          type="raster"
          tiles={[
            'https://your-geoserver-url/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=your-layer&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}'
          ]}
          tileSize={256}
        >
          <Layer
            id="wms-test-layer"
            type="raster"
            source="wms-test-source"
            paint={{}}
          />
        </Source>
      </Map>
    </div>
  );
};

export default MapComponent;