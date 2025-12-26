import { supabase } from "../client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card, { type Creator } from "../components/Card";

const ViewCreator = () => {
  const { id } = useParams<{ id: string }>();
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

  if (loading) return <p>Loading...</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <div>
      <Card
        id={creator.id}
        name={creator.name}
        url={creator.url}
        description={creator.description}
        imageURL={creator.imageURL}
      />
    </div>
  );
};

export default ViewCreator;