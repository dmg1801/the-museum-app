// ArtifactMapLeaflet corregido (tiles OpenStreetMap)
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Corrige íconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

type Artifact = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
};

type Props = {
  artifacts: Artifact[];
  onEdit: (artifact: Artifact) => void;
};

export default function ArtifactMapLeaflet({ artifacts, onEdit }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [localArtifacts, setLocalArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/artifacts`)
      .then((res) => setLocalArtifacts(res.data))
      .catch((err) => console.error('Error loading artifacts:', err));
  }, [artifacts]);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta pieza?')) return;
    try {
      await axios.delete(`${apiUrl}/artifacts/${id}`);
      setLocalArtifacts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error('Error eliminando artifact:', err);
      alert('Error al eliminar la pieza');
    }
  };

  return (
    <div className="decorated-box" style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        worldCopyJump={false}
        maxBoundsViscosity={1.0}
        maxBounds={[[ -90, -180 ], [ 90, 180 ]]}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />

        {localArtifacts.map((artifact) => (
          <Marker
            key={artifact.id}
            position={[artifact.latitude, artifact.longitude]}
          >
            <Popup minWidth={200}>
              <div>
                <strong>{artifact.name}</strong>
                <br />
                {artifact.imageUrl && (
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    style={{ width: '100px', marginTop: '5px' }}
                  />
                )}
                <p style={{ margin: '0.5rem 0' }}>{artifact.description}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(artifact.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => onEdit(artifact)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
