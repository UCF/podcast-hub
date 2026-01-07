import { useEffect, useState } from 'react';
import type PodcastEpisode from '../types/PodcastEpisode';
import './EpisodeList.scss'
import EpisodeCard from './EpisodeCard';

export interface EpisodeListProps {
  search?: string;
  showId?: number;
  category?: string;
  tags?: Array<number>;
  limit?: number;
  page?: number;
}

function EpisodeList(props: EpisodeListProps) {
  const [episodes, setEpisodes] = useState<Array<PodcastEpisode>>();
  const searchServiceURL = import.meta.env.VITE_SEARCH_SERVICE_URL;

  useEffect(() => {
    const baseUrl = `${searchServiceURL}/api/v1/podcasts/episodes/`;
    const params: Record<string, string> = {};

    if (props.showId) params['show'] = props.showId.toString();
    if (props.category) params['category'] = props.category;
    if (props.search) params['search'] = props.search;
    if (props.tags) params['tags'] = props.tags.join(',');

    params['fields'] = 'id';

    const url = `${baseUrl}?${new URLSearchParams(params)}`

    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setEpisodes(result.results);
    };

    fetchData();
  }, [props, searchServiceURL])

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
