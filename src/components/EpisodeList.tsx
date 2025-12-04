import { useEffect, useState } from 'react';
import type PodcastEpisode from '../types/PodcastEpisode';
import './EpisodeList.scss'
import EpisodeCard from './EpisodeCard';

export interface EpisodeListProps {
  showId?: number;
}

function EpisodeList(props: EpisodeListProps) {
  const [episodes, setEpisodes] = useState<Array<PodcastEpisode>>();

  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/v1/podcasts/${props.showId}/episodes/`;
    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setEpisodes(result.results);
    };

    fetchData();
  }, [props.showId])

  return (
    <div className='row'>
      {episodes && ( episodes.map((episode) => {
        return (
          <div key={episode.id} className='col-md-6'>
            <EpisodeCard episodeId={episode.id} />
          </div>
        )
      }))}
    </div>
  );
}

export default EpisodeList;
