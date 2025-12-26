import { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.from('creators').insert([
    {
      name,
      url,
      description,
      imageURL: imageURL || null,
    },
  ]);

  if (error) {
    console.error(error);
    alert('Error adding creator');
  } else {
    navigate('/');
  }
};

  return (
    <div>
      <h1>Add a New Creator</h1>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />

        <input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
        />

        <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />

        <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
        />

        <button type="submit">Add Creator</button>
        </form>
    </div>
  );
};

export default AddCreator;
