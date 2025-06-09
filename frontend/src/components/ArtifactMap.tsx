import { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import axios from 'axios';

// const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


type Artifact = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
};

export default function ArtifactMap() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    axios.get(`${apiUrl}/artifacts`)
      .then(res => setArtifacts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="mt-4">
      <h4>Mapa de piezas arqueológicas</h4>
      <div className="mb-4" style={{ width: '100%' }}>
 
      <ComposableMap
        projection="geoEqualEarth"
        style={{
            width: '100%',
            height: 'auto',
            minHeight: '400px',
        }}
        >
        <Geographies geography={geoUrl}>
            {(geoData: any) =>
            geoData.geographies.map((geo: any) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#999" />
            ))
        }
        </Geographies>

        {artifacts.map((artifact) => (
            <Marker
            key={artifact.id}
            coordinates={[artifact.longitude, artifact.latitude]}
            >
            <circle r={5} fill="#F00" stroke="#000" strokeWidth={1} />
            <text textAnchor="middle" y={-10} style={{ fontSize: 10 }}>
                {artifact.name}
            </text>
            </Marker>
        ))}
    </ComposableMap>
    </div>

    </div>
  );
}
