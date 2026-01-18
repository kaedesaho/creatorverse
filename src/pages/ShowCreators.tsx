import { Link } from "react-router-dom"
import Card from '../components/Card';
import { type Creator } from '../components/Card';
import '../css/ShowCreators.css'

type ShowCreatorsProps = {
  creators: Creator[];
  loading?: boolean;
};

const ShowCreators = ({ creators, loading = false }: ShowCreatorsProps) => {
  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (creators.length === 0) {
    return <p className="loading-text">No content creators added yet</p>;
  }

  return (
    <div className="show">
        <h1>CREATORVERSE</h1>
        <div className="show-buttons">
            <button 
            className="ghost-btn"
            onClick={() => window.location.href = '#show-creators'}
            >
                VIEW ALL CREATORS
            </button>
            <Link to="/add">
                <button className="primary-btn">ADD A CREATOR</button>
            </Link>
        </div>
        <div className="show-creators" id="show-creators">
        {creators.map((creator) => (
            <Card
            key={creator.id}
            id={creator.id}
            name={creator.name}
            url={creator.url}
            description={creator.description}
            imageURL={creator.imageURL}
            />
        ))}
        </div>
    </div>
  );
};

export default ShowCreators;
