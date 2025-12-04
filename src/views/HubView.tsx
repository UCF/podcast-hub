import './HubView.scss';

import Header from '../components/Header';
import EpisodeList from '../components/EpisodeList';

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
          <EpisodeList showId={1} />
        </div>
      </main>
    </>
  );
}

export default Hub;
