import AddArtifactForm from './components/AddArtifactForm';
import ArtifactMap from './components/ArtifactMap';

function App() {
  return (
     <div style={{ width: '100vw', maxWidth: '100vw', overflowX: 'hidden', padding: '2rem' }}>
      <ArtifactMap />
      <AddArtifactForm />
    </div>
  );
}

export default App;
