import { supabase } from "../client";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { type Creator } from "../components/Card";
import '../css/ViewCreator.css'

const ViewCreator = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        console.error(error);
      } else if (data) {
        setCreators(data);
      }

      setLoading(false);
    };

    fetchCreators();
  }, []);

  const creator = creators.filter(
    (creator) => creator.id === id
  )[0];

   const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this creator?")) return;

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) console.error(error);
    else navigate("/"); 
  };

  let label = '';
  let handle = '';

if (creator?.url) {
  try {
    const fullUrl = creator.url.startsWith('http') ? creator.url : `https://${creator.url}`;
    const url = new URL(fullUrl);

    label = url.hostname.replace('www.', '');
    if (url.pathname.startsWith('/@')) {
      handle = url.pathname.replace('/', '');
    }
  } catch (e) {
    console.warn('Invalid URL:', creator.url);
  }
}

  if (loading) return <p className="loading-text">Loading...</p>;
  if (!creator) return <p className="loading-text">Creator not found.</p>;

  return (
    <div className="view-creator">
      <div className="view-creator-frame">
        {creator.imageURL ? (
            <img src={creator.imageURL} alt={creator.name} />
        ) : (
        <div className="creator-image-placeholder">
          <i className="fi fi-sr-user"></i>
        </div>
        )}
      <div className="creator-details">
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer" className="creator-url">
            <i className="fi fi-sr-link-alt"></i>
            <span>{label}</span>
            {handle && <span>- {handle}</span>}
          </a>
       </div>
      </div>
      
      <div className="creator-buttons">
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
        <Link to={`/edit/${id}`}>
          <button className="edit-btn">Edit</button>
        </Link>
      </div> 
    </div>
  );
};

export default ViewCreator;