import { useRoutes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './client'
import { type Creator } from './components/Card'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'


function App() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase 
        .from('creators')
        .select('*');
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data);
      }
    };
    fetchCreators();
  }, [location]);

  const routes = useRoutes([
    { path: '/', element: <ShowCreators creators={creators} /> },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/add', element: <AddCreator /> },
    { path: '/edit/:id', element: <EditCreator /> },
  ]);

  return routes;
}

export default App
