import { useState } from 'react';
import axios from 'axios';

export default function AddArtifactForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageSource, setImageSource] = useState<'url' | 'file'>('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Enviando...');

    let finalImageUrl = imageUrl;

    if (imageSource === 'file' && imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const uploadRes = await axios.post(
          'http://localhost:3001/artifacts/upload',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        finalImageUrl = uploadRes.data.imageUrl;
      } catch (err) {
        setStatus('Error al subir la imagen');
        return;
      }
    }

    const artifactData = {
      name,
      description,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      imageUrl: finalImageUrl,
    };

    try {
      await axios.post('http://localhost:3001/artifacts', artifactData);
      setStatus('¡Pieza guardada!');
      setName('');
      setDescription('');
      setLatitude('');
      setLongitude('');
      setImageUrl('');
    //   setImageFile(null); comentado por error en la consola
    } catch (err) {
      setStatus('Error al guardar la pieza');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h4>Agregar nueva pieza</h4>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Latitud</label>
          <input type="number" className="form-control" value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>
        <div className="col">
          <label className="form-label">Longitud</label>
          <input type="number" className="form-control" value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Fuente de imagen</label>
        <div className="form-check">
          <input className="form-check-input" type="radio" checked={imageSource === 'url'} onChange={() => setImageSource('url')} />
          <label className="form-check-label">URL</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" checked={imageSource === 'file'} onChange={() => setImageSource('file')} />
          <label className="form-check-label">Archivo</label>
        </div>
      </div>

      {imageSource === 'url' ? (
        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input type="url" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
      ) : (
        <div className="mb-3">
          <label className="form-label">Imagen (archivo)</label>
          <input type="file" className="form-control" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} required />
        </div>
      )}

      <button type="submit" className="btn btn-primary">Guardar</button>

      {status && <p className="mt-3">{status}</p>}
    </form>
  );
}
