import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { createUser } from '../api/users';

const Signup = props => {
  const {
    user,
  } = props;

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });

  const history = useHistory();

  const handleChange = event => {
    const { id, value } = event.target;
    const key = id.split('-')[1];
    setUserInfo({
      ...userInfo,
      [key]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await createUser(userInfo);

    return (
      <div>
        {history.push('/')}
      </div>
    );
  };

  if (user.logged) {
    return (
      <div>
        {history.push('/home')}
      </div>
    );
  }

  return (
    <div className="signup">
      <div className="background" />
      <h3>Signup</h3>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="Name">
            Name
            <input id="input-name" type="text" onChange={handleChange} className="form-control input-default" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input id="input-email" type="email" onChange={handleChange} className="form-control input-default" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input id="input-password" type="password" onChange={handleChange} className="form-control input-default" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password confirmation
            <input id="input-confirmation" type="password" onChange={handleChange} className="form-control input-default" />
          </label>
        </div>
        <button type="submit" className="btn-default"> Submit</button>
        <Link to="/" className="link-default">Login</Link>
      </form>
    </div>
  );
};

Signup.propTypes = {
  user: PropTypes.shape({
    logged: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, null)(Signup);
