import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

import { currentUser } from '../actions/user';

const Home = props => {
  const { currentUser, userSigned } = props;
  const history = useHistory();

  const info = JSON.parse(localStorage.localUser);

  useEffect(() =>{
    currentUser({
      id: info.id,
      name: info.name,
      favorite: info.favorite,
    });
  }, [currentUser]);

  console.log(localStorage.localUser);
  console.log(userSigned);

  if (!info.remember) {
    return (
      <div>
        {history.push('/')}
      </div>
    );
  }

  return (
    <div className="home">
      <div className="header">
        <Navbar bg="light" expand="lg">
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Favorite</NavDropdown.Item>
          </NavDropdown>

          <Nav href="#home">Home</Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
            <Button type="submit" variant="dark">Submit</Button>
          </Form>
        </Navbar>
      </div>

      <div className="body">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    logged: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({ user: state.user, userSigned: state.userSigned });


const mapDispatchToProps = dispatch => ({
  currentUser: user => {
    dispatch(currentUser(user));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
