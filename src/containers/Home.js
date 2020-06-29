/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { getCourses } from '../api/courses';
import { logout } from '../actions/user';
import Loading from '../components/Loading';
import {
  getProductsLoading,
  getProducts,
  makeid,
} from '../helper/index';
import Navbarheader from '../components/Navbar';

const Home = props => {
  const {
    resps,
    loading,
    getCourses,
    logout,
  } = props;
  const history = useHistory();

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const info = JSON.parse(localStorage.localUser);

  if (!info.remember) {
    return (
      <div>
        {history.push('/')}
      </div>
    );
  }

  // console.log(props);

  const shouldComponentRender = () => {
    if (resps === undefined) return false;
    if (loading === true || resps.length === 0) return false;
    return true;
  };

  if (!shouldComponentRender()) {
    return <Loading />;
  }

  const handleLogout = () => {
    logout();
    const info = JSON.stringify({
      id: 0,
      name: '',
      email: '',
      favorite: '',
      remember: false,
    });

    localStorage.setItem('localUser', info);

    return (
      <div>
        {history.push('/')}
      </div>
    );
  };

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 999,
      },
      items: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 1,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 999,
        min: 464,
      },
      items: 1,
      partialVisibilityGutter: 100,
    },
  };

  return (
    <div className="home">
      <Navbarheader handleLogout={handleLogout} />

      <div className="body">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={30000}
          centerMode={false}
          className=""
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          partialVisible
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {resps.map(res => (
            <div key={makeid(5)} className="carrosel-div">
              <img
                className="d-block w-100"
                src={res.image}
                alt={res.name}
              />
              <Link to={`/info/${res.id}`}>
                <div className="carrosel-content">
                  <div className="display-flex">
                    <div><h5>{res.name}</h5></div>
                    <div className="money-value">
                      <h6>
                        $
                        {' '}
                        {res.value}
                      </h6>
                    </div>
                  </div>
                  <div className="display-flex">
                    <div>
                      <Rater
                        total={5}
                        rating={res.starts}
                        interactive={false}
                      />
                    </div>
                    <div className="money-date">
                      <p>
                        per Mounth
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="carrosel-id">
                {res.id}
                /
                {resps.length}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

Home.propTypes = {
  getCourses: PropTypes.instanceOf(Function).isRequired,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  loading: getProductsLoading(state.courses),
  resps: getProducts(state.courses),
});

const mapDispatchToProps = {
  getCourses,
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
