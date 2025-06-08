import { useState, useEffect } from 'react';
import AddArtifactForm from './components/AddArtifactForm';
import ArtifactMapLeaflet from './components/ArtifactMapLeaflet';
import axios from 'axios';

export type Artifact = {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
};

function App() {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  const fetchArtifacts = async () => {
    const res = await axios.get('http://localhost:3001/artifacts');
    setArtifacts(res.data);
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  return (
    <div style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden', padding: '2rem' }}>
      <ArtifactMapLeaflet artifacts={artifacts} onEdit={setSelectedArtifact} />
      <AddArtifactForm
        selectedArtifact={selectedArtifact}
        onClear={() => setSelectedArtifact(null)}
        onRefresh={fetchArtifacts}
      />
    </div>
  );
}

export default App;
