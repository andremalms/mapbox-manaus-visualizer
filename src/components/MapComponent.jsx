import React, { useState, useEffect } from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN_HERE'; // Replace with your actual Mapbox token

const MapComponent = ({ wmsUrl, wmsLayers }) => {
  const [viewState, setViewState] = useState({
    latitude: -3.0892,
    longitude: -59.9672,
    zoom: 11
  });

  useEffect(() => {
    if (wmsUrl && wmsLayers && map.current) {
      const wmsLayer = {
        id: 'wms-layer',
        type: 'raster',
        source: {
          type: 'raster',
          tiles: [
            `${wmsUrl}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=${wmsLayers}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}`
          ],
          tileSize: 256
        },
        paint: {}
      };

      if (map.current.getLayer('wms-layer')) {
        map.current.removeLayer('wms-layer');
      }
      if (map.current.getSource('wms-source')) {
        map.current.removeSource('wms-source');
      }

      map.current.addLayer(wmsLayer);
    }
  }, [wmsUrl, wmsLayers]);

  const map = React.useRef(null);

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <Map
        ref={map}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      />
    </div>
  );
};

export default MapComponent;