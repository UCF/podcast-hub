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
  }, [props, searchServiceURL, limit, page])

  const setCurrentPage = (delta: number) => {
    const _page = page || 0;
    let newPageIndex = _page + delta;

    if (newPageIndex < 0) newPageIndex = 0;
    if (newPageIndex > pageCount! - 1) newPageIndex = pageCount - 1;

    setPage(newPageIndex);
  };

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
      { pageCount > 1 && (
        <nav aria-label="Result pagination">
          <ul className='pagination'>
            <li className='page-item'><a className='page-link' href='#' onClick={() => setCurrentPage(-1)}>Previous</a></li>
            {[...Array(pageCount)].map((_, index) => (
              <li key={index} className={`page-item ${index == page ? 'active' : ''}`}>
                <a
                  className='page-link'
                  href='#'
                  onClick={() => setPage(index)}>
                    {index + 1}
                </a>
              </li>
            ))}
            <li className='page-item'><a className='page-link' href='#' onClick={() => setCurrentPage(1)}>Next</a></li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default EpisodeList;
