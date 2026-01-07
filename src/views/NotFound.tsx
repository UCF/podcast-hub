import Header from "../components/Header";

function NotFoundView() {
  return (
    <>
      <Header headingText="Not Found">
        <div className='w-100 w-md-75'>
          <p className='text-inverse'>The page you requested cannot be found.</p>
        </div>
      </Header>
    </>
  )
}

export default NotFoundView;
