import './HubView.scss';

import Header from '../components/Header';

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
          <p className='my-4'>Ut eu velit et erat aliquam venenatis. Sed eu sem ut felis scelerisque tincidunt id eu eros. Praesent id blandit tortor, in molestie velit. Integer mollis massa sed sem venenatis, a pharetra ligula sollicitudin. Donec blandit consectetur nulla, non pulvinar quam. In ut velit a leo maximus ultricies. Suspendisse condimentum, orci nec placerat dictum, quam nisl fermentum mi, non elementum quam orci quis massa. Quisque congue ligula sapien, eget faucibus ex aliquet ac. Maecenas varius euismod scelerisque. Phasellus elementum enim nisl, non aliquet nunc egestas nec. Nullam nulla orci, tristique sagittis pellentesque non, mattis at odio. Nam quis turpis vel turpis pulvinar congue id in velit. Nullam viverra ante et erat finibus, sit amet varius sapien sagittis. In egestas bibendum facilisis. </p>
        </div>
      </main>
    </>
  );
}

export default Hub;
