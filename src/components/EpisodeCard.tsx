import { useEffect, useState } from 'react';
import './EpisodeCard.scss';
import type PodcastCategory from '../types/PodcastCategory';

export interface EpisodeCardProps {
  episodeId?: number;
  episodeSlug?: string;
}

function EpisodeCard(props: EpisodeCardProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [episodeImage] = useState<string>('https://placehold.co/250.jpg');
  const [publishDate, setPublishDate] = useState<string>("");
  const [category, setCategory] = useState<PodcastCategory>();
  const [duration, setDuration] = useState<string>("");
  const [tags, setTags] = useState<Array<string>>([]);

  const episodeId = props.episodeId;
  const searchServiceURL = import.meta.env.VITE_SEARCH_SERVICE_URL;

  useEffect(() => {
    const url = `${searchServiceURL}/api/v1/podcasts/episodes/${episodeId}/`;

    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setTitle(result.title);
      setDescription(result.description);
      setPublishDate(result.published_date);
      setDuration(result.duration);
      setCategory(result.category);
      setTags(result.tags);
    }

    fetchData();
  }, [episodeId]);

  return(
    <div className='episode-card mb-4'>
      <div className='row'>
        <div className='col-4'>
          <img
            className='img-fluid'
            src={episodeImage}
            alt='episode image' />
        </div>
        <div className='col-8'>
          <p className='h5'>{title}</p>
          <div className='episode-description' dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </div>
      <div className='row'>
        <div className='col-4'>
          <p className='h6 text-uppercase'>{category?.title}</p>
        </div>
        <div className='col-8'>
          <div className='d-flex justify-content-between'>
            <span className='text-weight-bold'>{publishDate}</span>
            <span className='text-weight-bold'>{duration}</span>
          </div>
        </div>
      </div>
      <div className='d-flex flex-wrap'>
        {tags && tags.map((tag) => {
          return (
          <span key={tag} className='badge badge-default mr-4'>{tag}</span>
          )
        })}
      </div>
    </div>
  );
}

export default EpisodeCard;
