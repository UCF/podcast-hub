import { useEffect, useState } from 'react';
import './EpisodeList.scss'
import EpisodeCard from './EpisodeCard';

import type PodcastEpisode from '../types/PodcastEpisode';
import Paginator from './Paginator';

export interface EpisodeListProps {
  search?: string;
  showId?: number;
  category?: string;
  tags?: Array<number>;
  limit?: number;
  perPage?: number;
  page?: number;
}

function EpisodeList(props: EpisodeListProps) {
  const [episodes, setEpisodes] = useState<Array<PodcastEpisode>>();
  const searchServiceURL = import.meta.env.VITE_SEARCH_SERVICE_URL;

  const perPage = props.perPage || 10;
  const limit = props.limit || Number.MAX_SAFE_INTEGER;
  const [page, setPage] = useState(props.page || 0);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const baseUrl = `${searchServiceURL}/api/v1/podcasts/episodes/`;
    const params: Record<string, string> = {};
    const _page = page || 0;

    if (props.showId) params['show'] = props.showId.toString();
    if (props.category) params['category'] = props.category;
    if (props.search) params['search'] = props.search;
    if (props.tags) params['tags'] = props.tags.join(',');

    params['limit'] = Math.min(limit, perPage).toString();
    params['offset'] = (perPage * _page).toString();

    params['fields'] = 'id';

    const url = `${baseUrl}?${new URLSearchParams(params)}`

    const fetchData = async() => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Get Page count
      const c = Math.min(limit, result.count);
      const pageCount = Math.ceil(c / perPage);
      setPageCount(pageCount);
      setEpisodes(result.results);
    };

    fetchData();
  }, [props, searchServiceURL, limit, page, perPage])

  return (
    <>
      <div className='row'>
        {episodes && ( episodes.map((episode) => {
          return (
            <div key={episode.id} className='col-md-6'>
              <EpisodeCard episodeId={episode.id} />
            </div>
          )
        }))}
      </div>
      <Paginator
        currentPage={page}
        pageCount={pageCount}
        onPageChange={setPage} />
    </>
  );
}

export default EpisodeList;
