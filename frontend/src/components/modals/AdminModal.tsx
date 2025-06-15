// src/components/AdminLoginModal.tsx
import React, { useEffect } from 'react';

type Props = {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const AdminLoginModal: React.FC<Props> = ({ show, onClose, onSuccess }) => {
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    document.body.classList.toggle('modal-open', show);
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [show]);

  const handleLogin = () => {
    if (password === 'museo123') {
      onSuccess();
      setPassword('');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!show) return null;

  return (
    <div className="modal show fade d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content decorated-box">
            <div className="modal-header border-0">
                <h5 className="modal-title">Modo Administrador</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
                <p>Introduce la contraseña para acceder al modo administrador:</p>
                <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                />
            </div>
            <div className="modal-footer border-0">
                <button className="btn btn-secondary" onClick={onClose}>
                Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleLogin}>
                Entrar
                </button>
            </div>
            </div>
        </div>
    </div>

  );
};

export default AdminLoginModal;
