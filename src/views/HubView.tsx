import './HubView.scss';

import Header from '../components/Header';
import EpisodeCard from '../components/EpisodeCard';

function Hub() {
  return(
    <>
      <Header headingText='Podcast Hub'>
        <div className='w-100 w-md-75'>
          <p className='text-inverse'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nunc lacus, laoreet id ante eu, pharetra ultricies sem. Cras sed molestie erat. Morbi consequat fringilla sollicitudin. Sed vitae ipsum tristique, tempor magna nec, lobortis lorem. Suspendisse vitae erat risus. Vestibulum vel tincidunt dui.</p>
        </div>
      </Header>
      <main className='site-main'>
        <div className='container'>
          <h2 className='text-uppercase mt-3 mb-4'>Some Episodes</h2>
          <div className='row'>
            <div className='col-6 mb-4'>
              <EpisodeCard episodeId={677} />
            </div>
            <div className='col-6 mb-4'>
              <EpisodeCard episodeId={678} />
            </div>
            <div className='col-6 mb-4'>
              <EpisodeCard episodeId={679} />
            </div>
            <div className='col-6 mb-4'>
              <EpisodeCard episodeId={680} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Hub;
