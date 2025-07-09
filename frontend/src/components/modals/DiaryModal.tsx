// DiaryModal.tsx
import { Modal, Button } from 'react-bootstrap';
import './ArtifactModal.css';
import { useState } from 'react';

interface ArtifactModalProps {
  show: boolean;
  onClose: () => void;
  artifact: {
    title: string;
    imageUrl: string;
    civilization: string;
    age: string;
    origin: string;
    description: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DiaryModal({ show, onClose, artifact }: ArtifactModalProps) {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <Modal show={show} onHide={onClose} size="lg" centered dialogClassName="artifact-modal">
        <div className="diary-container">
          <div className="top-fixed">
            <img
              src={artifact.imageUrl}
              alt={artifact.title}
              className="artifact-img"
              onClick={() => setShowImageModal(true)}
            />
            <h5>{artifact.title}</h5>
          </div>

          <div className="scrollable-info">
            <p><strong>Civilización:</strong> {artifact.civilization}</p>
            <p><strong>Antigüedad:</strong> {artifact.age}</p>
            <p><strong>Lugar de origen:</strong> {artifact.origin}</p>
            <div className="description-scroll">
              <p>{artifact.description}</p>
            </div>
          </div>

          <div className="button-bar">
            <Button variant="secondary" onClick={onClose}>Cerrar</Button>
          </div>
        </div>
      </Modal>

      {/* Modal para imagen ampliada */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="xl" centered>
        <Modal.Body className="p-0">
          <img
            src={artifact.imageUrl}
            alt={artifact.title}
            style={{ width: '100%', height: 'auto' }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
