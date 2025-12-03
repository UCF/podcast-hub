import { useEffect, useState } from 'react';
import './EpisodeCard.scss';

export interface EpisodeCardProps {
  episodeId?: number;
  episodeSlug?: string;
}

function EpisodeCard(props: EpisodeCardProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [episodeImage] = useState<string>('https://placehold.co/250.jpg');

  const episodeId = props.episodeId;

  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/v1/podcasts/episodes/${episodeId}`;
    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setTitle(result.title);
      setDescription(result.description);
    }

    fetchData();
  }, [episodeId]);

  return(
    <div className='episode-card'>
      <div className='row'>
        <div className='col-4'>
          <img
            className='img-fluid'
            src={episodeImage}
            alt='episode image' />
          <p className='episode-category'>Category</p>
        </div>
        <div className='col-8'>
          <p className='h6'>{title}</p>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
    </div>
  );
}

export default EpisodeCard;
