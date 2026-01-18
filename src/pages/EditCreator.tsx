import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';
import '../css/Form.css';

const EditCreator = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCreator = async () => {
        if (!id) return;

        const { data, error } = await supabase
            .from('creators')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(error);
            alert('Creator not found');
        } else if (data) {
            setName(data.name);
            setUrl(data.url);
            setDescription(data.description);
            setImageURL(data.imageURL || '');
        }

        setLoading(false);
        };

        fetchCreator();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase
        .from('creators')
        .update({ name, url, description, imageURL: imageURL || null })
        .eq('id', id);

        if (error) {
        console.error(error);
        alert('Error updating creator');
        } else {
        navigate('/');
        }
    };

    const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this creator?');
    if (!confirmed) return;

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
      alert('Error deleting creator');
    } else {
      navigate('/');
    }
  };

    if (loading) return <p className="loading-text">Loading...</p>;

    return (
        <div className="creator-form">
          <h1>EDIT CREATOR</h1>
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
              <button type="submit">Update Creator</button>
            </div>
            
            <button className="delete-btn" onClick={handleDelete}>
            Delete Creator
          </button>
          </form>
        </div>
      );
    };

export default EditCreator;