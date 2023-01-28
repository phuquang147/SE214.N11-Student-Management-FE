import { Helmet } from 'react-helmet';

function HelmetContainer({ children, title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
}

export default HelmetContainer;
