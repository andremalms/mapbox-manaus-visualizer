import React, { useState, useCallback } from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN_HERE'; // Replace with your actual Mapbox token

const MapComponent = ({ wmsUrl, wmsLayers }) => {
  const [viewState, setViewState] = useState({
    latitude: -3.0892,
    longitude: -59.9672,
    zoom: 11
  });

  const [wmsSource, setWmsSource] = useState(null);

  const onMapLoad = useCallback(() => {
    if (wmsUrl && wmsLayers) {
      const newWmsSource = {
        type: 'raster',
        tiles: [
          `${wmsUrl}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&LAYERS=${wmsLayers}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}`
        ],
        tileSize: 256
      };
      setWmsSource(newWmsSource);
    }
  }, [wmsUrl, wmsLayers]);

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onLoad={onMapLoad}
      >
        {wmsSource && (
          <Source id="wms-source" {...wmsSource}>
            <Layer
              id="wms-layer"
              type="raster"
              source="wms-source"
              paint={{}}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;