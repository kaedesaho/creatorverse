import { Link } from "react-router-dom"
import Card from '../components/Card';
import { type Creator } from '../components/Card';
import '../css/ShowCreators.css'

type ShowCreatorsProps = {
  creators: Creator[];
};

const ShowCreators = ({ creators }: ShowCreatorsProps) => {
  if (creators.length === 0) {
    return <p>No content creators added yet.</p>;
  }

  return (
    <div className="show">
        <h1>CREATORVERSE</h1>
        <button onClick={() => window.location.href = '#show-creators'}>
            Go to Creators
        </button>
        <Link to="/add">
            <button>Add New Creator</button>
        </Link>
        <div className="show-creators">
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
