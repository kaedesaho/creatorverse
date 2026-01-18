import { Link } from 'react-router-dom';
import '../css/Card.css'

export type Creator = {
    id: string;
    name: string;
    url: string;
    description: string;
    imageURL?: string;
};

const Card: React.FC<Creator> = ({ id, name, url, description, imageURL }) => {
    return (
        <article className="card">
            <div className='card-col'>
                <div className='card-left'>
                    <h2>{name}</h2>
                    <div className="card-icons">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <i className="fi fi-sr-link-alt"></i>
                        </a>
                        <Link to={`/creator/${id}`}>
                            <i className="fi fi-sr-info"></i>
                        </Link>
                        <Link to={`/edit/${id}`}>
                            <i className="fi fi-sr-user-pen"></i>
                        </Link>
                    </div>
                </div>
                <div className='card-right'>
                    {imageURL ? (
                    <img src={imageURL} alt={name} />
                ) : (
                <div className="image-placeholder">
                    <i className="fi fi-sr-user"></i>
                </div>
                )}
                </div>
            </div>
            <p>{description}</p>
        </article>
    );
};

export default Card;