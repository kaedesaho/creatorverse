import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

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

    // Step 2: Update creator in DB
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
      navigate('/'); // Go back to home page after deletion
    }
  };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
        <h1>Edit Creator</h1>
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
            <button type="submit">Update Creator</button>
        </form>
        <button onClick={handleDelete}>
        Delete Creator
      </button>
        </div>
    );
    };

export default EditCreator;