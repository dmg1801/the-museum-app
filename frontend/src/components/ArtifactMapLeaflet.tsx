import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DiaryModal } from './modals/DiaryModal';


// ... (íconos Leaflet como ya tienes)

type Artifact = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  civilization?: string;
  age?: string;
  origin?: string;
};

type Props = {
  artifacts: Artifact[];
  onEdit: (artifact: Artifact) => void;
  isAdmin: boolean;
};

export default function ArtifactMapLeaflet({ artifacts, onEdit, isAdmin }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [localArtifacts, setLocalArtifacts] = useState<Artifact[]>([]);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showModal, setShowModal] = useState(false);
  

  const compassIcon = new L.Icon({
    iconUrl: '/marker-compass.png',
    iconSize: [40, 40], // Ajusta según el tamaño real del ícono
    popupAnchor: [0, -10], // Dónde se posiciona el popup relativo al ícono
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/artifacts`)
      .then((res) => {
        console.log('🚀 Respuesta del backend:', res.data);
        setLocalArtifacts(res.data);
      })
      .catch((err) => console.error('Error loading artifacts:', err));
  }, [artifacts]);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta pieza?')) return;
    try {
      await axios.delete(`${apiUrl}/artifacts/${id}`);
      setLocalArtifacts((prev) => prev.filter((a) => a.id !== id));
      setShowModal(false);
    } catch (err) {
      console.error('Error eliminando artifact:', err);
      alert('Error al eliminar la pieza');
    }
  };

  const openModal = (artifact: Artifact) => {
    setSelectedArtifact(artifact);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedArtifact(null);
    setShowModal(false);
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
            icon={compassIcon}
          >
            <Popup minWidth={100} className="popup-pergamino">
              <div className="popup-pergamino">
                <strong className="cinzel-text">{artifact.name}</strong>
                <br />
                {artifact.imageUrl && (
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    style={{ width: '100px', marginTop: '5px' }}
                  />
                )}
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openModal(artifact)}
                  >
                    Historia
                  </button>
                  {isAdmin && (
                    <>
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
                    </>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {selectedArtifact && (
        <DiaryModal
          show={showModal}
          onClose={closeModal}
          artifact={{
            title: selectedArtifact.name,
            imageUrl: selectedArtifact.imageUrl,
            civilization: selectedArtifact.civilization || 'Desconocida',
            age: selectedArtifact.age || 'N/A',
            origin: selectedArtifact.origin || 'Desconocido',
            description: selectedArtifact.description,
          }}
          onEdit={() => {
            onEdit(selectedArtifact);
            closeModal();
          }}
          onDelete={() => handleDelete(selectedArtifact.id)}
        />
      )}
    </div>
  );
}
