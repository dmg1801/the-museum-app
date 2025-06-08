// AddArtifactForm.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';


import './AddArtifactForm.css'; // Asegúrate de tener este CSS
import type { Artifact } from '../App';

type FormArtifact = Omit<Artifact, 'id'> & { id?: number };

type Props = {
  selectedArtifact: Artifact | null;
  onClear: () => void;
  onRefresh: () => void;
};

export default function AddArtifactForm({ selectedArtifact, onClear, onRefresh }: Props) {
  const [formData, setFormData] = useState<FormArtifact>({
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
    imageUrl: '',
  });
  const [imageSource, setImageSource] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (selectedArtifact) {
      setFormData(selectedArtifact);
      setImageSource('url');
      setImageFile(null);
      setStatus('Editando pieza...');
    } else {
      setFormData({ name: '', description: '', latitude: 0, longitude: 0, imageUrl: '' });
      setImageFile(null);
      setStatus('');
    }
  }, [selectedArtifact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Guardando...');

    let finalImageUrl = formData.imageUrl;

    if (imageSource === 'file' && imageFile) {
      const upload = new FormData();
      upload.append('file', imageFile);

      try {
        const res = await axios.post('http://localhost:3001/artifacts/upload', upload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        finalImageUrl = res.data.imageUrl;
      } catch (err) {
        setStatus('Error al subir imagen');
        return;
      }
    }

    const payload: Artifact = {
      id: selectedArtifact?.id ?? 0,
      name: formData.name,
      description: formData.description,
      latitude: formData.latitude,
      longitude: formData.longitude,
      imageUrl: finalImageUrl,
    };

    try {
      if (selectedArtifact?.id) {
        await axios.put(`http://localhost:3001/artifacts/${selectedArtifact.id}`, payload);
        setStatus('Pieza actualizada');
      } else {
        await axios.post('http://localhost:3001/artifacts', payload);
        setStatus('Pieza creada');
      }
      setFormData({ name: '', description: '', latitude: 0, longitude: 0, imageUrl: '' });
      setImageFile(null);
      setStatus('');
      onClear();
      onRefresh();
    } catch (err) {
      setStatus('Error al guardar la pieza');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="artifact-form">
      <input type="text" placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      <input type="text" placeholder="Descripción" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
      <input type="number" placeholder="Latitud" value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })} required />
      <input type="number" placeholder="Longitud" value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })} required />
      <div className="radio-group">
        <label><input type="radio" checked={imageSource === 'url'} onChange={() => setImageSource('url')} /> URL</label>
        <label><input type="radio" checked={imageSource === 'file'} onChange={() => setImageSource('file')} /> Archivo</label>
      </div>
      {imageSource === 'url' ? (
        <input type="url" placeholder="Imagen (URL)" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} />
      ) : (
        <input type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} />
      )}
      <button type="submit">{selectedArtifact?.id ? 'Actualizar' : 'Guardar'}</button>
      {selectedArtifact && <button type="button" onClick={onClear}>Cancelar</button>}
      {status && <p className="status-text">{status}</p>}
    </form>
  );
}
