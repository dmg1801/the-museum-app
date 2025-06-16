import { useState, useEffect } from 'react';
import AddArtifactForm from './components/AddArtifactForm';
import ArtifactMapLeaflet from './components/ArtifactMapLeaflet';
import axios from 'axios';
import './styles/parchment-theme.css';
import AdminLoginModal from './components/modals/AdminModal';


export type Artifact = {
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

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const fetchArtifacts = async () => {
    const res = await axios.get(`${apiUrl}/artifacts`);
    setArtifacts(res.data);
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  return (
  <div style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
    <div className="bg-dark text-light p-2 d-flex justify-content-between align-items-center">
      <h5 className="mb-0">🗺️ The Museum Map</h5>
      {!isAdmin ? (
        <button className="btn btn-outline-light btn-sm" onClick={() => setShowLoginModal(true)}>
          Entrar como Administrador
        </button>
      ) : (
        <button className="btn btn-outline-warning btn-sm" onClick={() => setIsAdmin(false)}>
          Salir del Modo Admin
        </button>
      )}
    </div>

    <div className="d-flex flex-column flex-md-row vh-100">
      {isAdmin && (
        <div className="p-3 decorated-box overflow-auto" style={{ flex: '0 0 400px' }}>
          <AddArtifactForm
            selectedArtifact={selectedArtifact}
            onClear={() => setSelectedArtifact(null)}
            onRefresh={fetchArtifacts}
          />
        </div>
      )}
      <div className="flex-fill p-0 decorated-box">
        <ArtifactMapLeaflet
          artifacts={artifacts}
          onEdit={isAdmin ? setSelectedArtifact : () => {}}
          isAdmin={isAdmin}
        />
      </div>
    </div>

    <AdminLoginModal
      show={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      onSuccess={() => {
        setIsAdmin(true);
        setShowLoginModal(false);
      }}
    />

  </div>
);

}

export default App;
