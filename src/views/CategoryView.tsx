import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import './CategoryView.scss';
import EpisodeList from '../components/EpisodeList';
import { useEffect, useState } from 'react';
import NotFoundView from './NotFound';

function CategoryView() {
  const { category } = useParams();
  const [title, setTitle] = useState<string>();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    const url = `${import.meta.env.VITE_SEARCH_SERVICE_URL}/api/v1/podcasts/categories/${category}/`;

    const fetchData = async() => {
      const response = await fetch(url);
      if (response.status === 404) {
        setNotFound(true);
        return;
      }

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
    { notFound ? (
      <NotFoundView />
    ) : (
      <>
        <Header headingText={title!}>
          <div className='w-100 w-md-75'>
            <p className='text-inverse'>{ description }</p>
          </div>
        </Header>
        <main className='site-main pt-5'>
          <div className='container'>
            <EpisodeList category={category} />
          </div>
        </main>
      </>
    )}
    </>
  )
}

export default CategoryView;
