import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css';

const AddCreator = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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
    <div className="creator-form">
      <h1>ADD A NEW CREATOR</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name*</label>
        <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
        />

        <label htmlFor="description">Description*</label>
        <textarea
            id="description"
            placeholder="Provide a description of the creator"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
        />

        <label htmlFor="imageURL">Image URL</label>
        <input
            type="text"
            id="imageURL"
            placeholder="Provide a link to an image of the creator (optional)"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
        />

        <h2>Social Media Link</h2>
        <label htmlFor="url">URL*</label>
        <input
            type="text"
            id="url"
            value={url}
            placeholder='Provide a link to a social media of the creator'
            onChange={(e) => setUrl(e.target.value)}
            required
        />

        <div className="form-buttons">
          <button type="button" className="back-btn" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit">Add Creator</button>
        </div>
        </form>
    </div>
  );
};

export default AddCreator;
