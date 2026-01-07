import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './CategoryView.scss';
import EpisodeList from '../components/EpisodeList';
import { useEffect, useState } from 'react';

function CategoryView() {
  const { category } = useParams();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    const url = `${import.meta.env.VITE_SEARCH_SERVICE_URL}/api/v1/podcasts/categories/${category}/`;

    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setTitle(result.title);
      setDescription(result.description);
    };

    fetchData();

  }, [category])

  return (
    <>
      <Header headingText={title!}>
        <div className='w-100 w-md-75'>
          <p className='text-inverse'>{ description }</p>
        </div>
      </Header>
      <main className='site-main'>
        <div className='container'>
          <h2 className='text-uppercase mt-3 mb-4'>Some Episodes</h2>
          <EpisodeList category={category} />
        </div>
      </main>
    </>
  )
}

export default CategoryView;
