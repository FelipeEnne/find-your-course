import React from 'react';
import PropTypes from 'prop-types';

const Home = props => {
  const { user } = props;
  // eslint-disable-next-line no-console
  console.log(user);
  return (
    <div className="home">
      app
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    logged: PropTypes.bool,
  }).isRequired,
};

export default Home;
