// Modal.tsx
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ArtifactModal.css';

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

export function DiaryModal({ show, onClose, artifact, onEdit, onDelete }: ArtifactModalProps) {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered dialogClassName="artifact-modal">
      <div className="diary-container">
        <div className="diary-page">
          <div className="left-page">
            <img src={artifact.imageUrl} alt={artifact.title} className="artifact-img" />
            <h3>{artifact.title}</h3>
            <p><strong>Civilización:</strong> {artifact.civilization}</p>
            <p><strong>Antigüedad:</strong> {artifact.age}</p>
            <p><strong>Lugar de origen:</strong> {artifact.origin}</p>
          </div>
          <div className="right-page">
            <div className="description-scroll">
              <p>{artifact.description}</p>
            </div>
          </div>
        </div>
        <div className="button-bar">
          {/* {onEdit && <Button variant="warning" onClick={onEdit}>Editar</Button>}
          {onDelete && <Button variant="danger" onClick={onDelete}>Eliminar</Button>} */}
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </Modal>
  );
}
