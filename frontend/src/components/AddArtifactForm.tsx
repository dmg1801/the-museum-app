// Adaptación parchment-theme de AddArtifactForm
import { useEffect, useState } from 'react';
import axios from 'axios';

import './AddArtifactForm.css';
import type { Artifact } from '../App';

import { Form, Button, Row, Col } from 'react-bootstrap';

type FormArtifact = Omit<Artifact, 'id'> & { id?: number };

type Props = {
  selectedArtifact: Artifact | null;
  onClear: () => void;
  onRefresh: () => void;
};

export default function AddArtifactForm({ selectedArtifact, onClear, onRefresh }: Props) {
  const apiUrl = import.meta.env.VITE_API_URL;
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
        const res = await axios.post( `${apiUrl}/artifacts/upload`, upload, {
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
      civilization: formData.civilization,
      age: formData.age,
      origin: formData.origin,
    };

    try {
      if (selectedArtifact?.id) {
        await axios.put(`${apiUrl}/artifacts/${selectedArtifact.id}`, payload);
        setStatus('Pieza actualizada');
      } else {
        await axios.post(`${apiUrl}/artifacts`, payload);
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

  function dmsToDecimal(deg: number, min: number, sec: number, dir: string): number {
  let decimal = deg + min / 60 + sec / 3600;
  if (['S', 'W'].includes(dir.toUpperCase())) decimal *= -1;
  return decimal;
}

function handleCombinedInput(input: string) {
  const dmsRegex = /(\d+)[°:\s](\d+)[′'](\d+)[″"]?\s*([NSEW])/gi;
  const decimalRegex = /-?\d+(\.\d+)?/g;

  const matches = input.match(dmsRegex);
  const decimals = input.match(decimalRegex)?.map(Number);

  if (matches && matches.length >= 2) {
    const latMatch = dmsRegex.exec(input);
    const lngMatch = dmsRegex.exec(input);

    if (latMatch && lngMatch) {
      const lat = dmsToDecimal(+latMatch[1], +latMatch[2], +latMatch[3], latMatch[4]);
      const lng = dmsToDecimal(+lngMatch[1], +lngMatch[2], +lngMatch[3], lngMatch[4]);
      setFormData({ ...formData, latitude: lat, longitude: lng });
    }
  } else if (decimals && decimals.length >= 2) {
    setFormData({ ...formData, latitude: decimals[0], longitude: decimals[1] });
  }
}


  return (
    <Form onSubmit={handleSubmit} className="decorated-box">
      <Form.Group className="mb-2">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Civilización</Form.Label>
        <Form.Control
          type="text"
          value={formData.civilization || ''}
          onChange={(e) => setFormData({ ...formData, civilization: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Antigüedad (siglos / años)</Form.Label>
        <Form.Control
          type="text"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Lugar de origen</Form.Label>
        <Form.Control
          type="text"
          value={formData.origin || ''}
          onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Coordenadas combinadas (DMS o decimal)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: 29°58′45″N 31°08′03″E o 29.979167, 31.134167"
          onChange={(e) => handleCombinedInput(e.target.value)}
        />
      </Form.Group>

      <Row className="mb-2">
        <Col>
          <Form.Label>Latitud (N)</Form.Label>
          <Form.Control
            type="number"
            value={formData.latitude}
            onChange={(e) =>
              setFormData({ ...formData, latitude: parseFloat(e.target.value) })
            }
          />
        </Col>
        <Col>
          <Form.Label>Longitud (O)</Form.Label>
          <Form.Control
            type="number"
            value={formData.longitude}
            onChange={(e) =>
              setFormData({ ...formData, longitude: parseFloat(e.target.value) })
            }
          />
        </Col>
      </Row>


      <Form.Group className="mb-2">
        <Form.Check
          inline
          label="URL"
          name="imageSource"
          type="radio"
          checked={imageSource === 'url'}
          onChange={() => setImageSource('url')}
        />
        <Form.Check
          inline
          label="Archivo"
          name="imageSource"
          type="radio"
          checked={imageSource === 'file'}
          onChange={() => setImageSource('file')}
        />
      </Form.Group>

      {imageSource === 'url' ? (
        <Form.Group className="mb-2">
          <Form.Control
            type="url"
            placeholder="Imagen (URL)"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </Form.Group>
      ) : (
        <Form.Group className="mb-2">
          <Form.Control
            type="file"
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              if (target.files?.length) {
                setImageFile(target.files[0]);
              }
            }}
          />
        </Form.Group>
      )}

      <Button type="submit" variant="primary" className="w-100">
        {selectedArtifact?.id ? 'Actualizar' : 'Guardar'}
      </Button>

      {selectedArtifact && (
        <Button type="button" variant="secondary" className="w-100 mt-2" onClick={onClear}>
          Cancelar
        </Button>
      )}

    {status && <p className="mt-2 status-text">{status}</p>}
  </Form>

  );
}
