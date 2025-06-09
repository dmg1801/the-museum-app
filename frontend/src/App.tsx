import { useState, useEffect } from 'react';
import AddArtifactForm from './components/AddArtifactForm';
import ArtifactMapLeaflet from './components/ArtifactMapLeaflet';
import axios from 'axios';
import './styles/parchment-theme.css';


export type Artifact = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
};

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  const fetchArtifacts = async () => {
    const res = await axios.get(`${apiUrl}/artifacts`);
    setArtifacts(res.data);
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  return (
  <div style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
    <div className="d-flex flex-column flex-md-row vh-100">
      <div className="p-3 decorated-box overflow-auto" style={{ flex: '0 0 400px' }}>
        <AddArtifactForm
          selectedArtifact={selectedArtifact}
          onClear={() => setSelectedArtifact(null)}
          onRefresh={fetchArtifacts}
        />
      </div>
      <div className="flex-fill p-0 decorated-box">
        <ArtifactMapLeaflet artifacts={artifacts} onEdit={setSelectedArtifact} />
      </div>
    </div>
  </div>
);

}

export default App;
