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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);


  const fetchArtifacts = async () => {
    const res = await axios.get(`${apiUrl}/artifacts`);
    setArtifacts(res.data);
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const handleLogin = (password: string) => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);

    } else {
      alert('Contraseña incorrecta');
    }
  };



  return (
    <div className="container-fluid p-0 m-0" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* Título aventurero */}
      <header className="bg-dark text-warning text-center py-2 shadow-sm adventure-header">
        <h3 className="m-0 fw-bold">🗺️ Mapa de Tesoros Arqueológicos</h3>
        <small className="text-light">Explora y descubre piezas del pasado alrededor del mundo</small>
        {!isAdmin && (
      <button
        className="btn btn-outline-light position-absolute"
        style={{ top: '1rem', right: '1rem', zIndex: 1050 }}
        data-bs-toggle="modal"
        data-bs-target="#adminLoginModal"
      >
        🔐 admin
      </button>
)}

{/* Modal de Login */}
<div
  className="modal fade"
  id="adminLoginModal"
  tabIndex={-1}
  aria-labelledby="adminLoginLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="adminLoginLabel">Acceso de administrador</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div className="modal-body">
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const input = e.target as HTMLInputElement;
              handleLogin(input.value);
              (document.getElementById('adminLoginModal') as any)?.classList.remove('show');
            }
          }}
        />
        <button
          className="btn btn-primary w-100"
          onClick={() => {
            const input = document.querySelector('#adminLoginModal input[type="password"]') as HTMLInputElement;
            handleLogin(input.value);
            // cerrar modal (Bootstrap lo hace automáticamente si el botón tiene data-bs-dismiss, pero si quieres forzarlo)
            const modalEl = document.getElementById('adminLoginModal');
            if (modalEl) {
              // @ts-ignore
              const modalInstance = window.bootstrap?.Modal.getInstance(modalEl);
              modalInstance?.hide();
            }
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  </div>
</div>

      </header>


     <div className="d-flex flex-column flex-md-row vh-100 position-relative">
  {/* Mapa siempre visible */}
  <div className="order-1 order-md-2 flex-fill p-0 decorated-box position-relative">
    <ArtifactMapLeaflet
      artifacts={artifacts}
      onEdit={isAdmin ? setSelectedArtifact : () => {}}
      isAdmin={isAdmin}
    />

    {/* Botón flotante solo para admin */}
    {isAdmin && (
      <>
        <button
          className="btn btn-warning rounded-circle shadow d-md-none position-absolute"
          style={{ bottom: '1rem', right: '1rem', zIndex: 1000 }}
          data-bs-toggle="modal"
          data-bs-target="#artifactModal"
        >
          ✏️
        </button>

        {/* Modal Bootstrap para móviles */}
        <div
          className="modal fade"
          id="artifactModal"
          tabIndex={-1}
          aria-labelledby="artifactModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-fullscreen-sm-down modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="artifactModalLabel">Gestionar Pieza</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <AddArtifactForm
                  selectedArtifact={selectedArtifact}
                  onClear={() => setSelectedArtifact(null)}
                  onRefresh={fetchArtifacts}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    )}
  </div>

  {/* Formulario visible solo en desktop si eres admin */}
  {isAdmin && (
    <div
      className="order-2 order-md-1 d-none d-md-block p-3 decorated-box overflow-auto"
      style={{ flexBasis: '400px', maxHeight: '100vh' }}
    >
      <AddArtifactForm
        selectedArtifact={selectedArtifact}
        onClear={() => setSelectedArtifact(null)}
        onRefresh={fetchArtifacts}
      />
    </div>
  )}
</div>

    </div>
  );
}

export default App;
