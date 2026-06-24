import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../actions/user';
import { userLogin } from '../api/users';

const Login = props => {
  const {
    login,
  } = props;
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const localGet = localStorage.getItem('localUser');
  let localUser = { remember: false };
  try {
    const parsed = JSON.parse(localGet);
    if (parsed) {
      localUser = parsed;
    }
  } catch {
    localUser = { remember: false };
  }

  useEffect(() => {
    if (localUser.remember) {
      navigate('/home');
    }
  }, [localUser.remember, navigate]);

  if (localUser.remember) {
    return null;
  }

  const handleChange = event => {
    if (event.target.id === 'input-name') {
      setName(event.target.value);
    } else if (event.target.id === 'input-password') {
      setPassword(event.target.value);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await userLogin({ name, password });

    if (response !== '') {
      const info = JSON.stringify({
        id: response.id,
        name: response.name,
        email: response.email,
        favorite: response.favorite,
        remember: true,
      });

      localStorage.setItem('localUser', info);

      login({ id: response.id, name: response.name, email: response.email });
      navigate('/home');
    }
  };

  return (
    <div className="login">
      <div className="background" />
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="Name">
            Name
            <input id="input-name" type="text" onChange={handleChange} className="form-control input-default" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input id="input-password" type="password" onChange={handleChange} className="form-control input-default" />
          </label>
        </div>
        <button type="submit" className="btn-default">Login</button>
        <Link to="/signup" className="link-default">Signup</Link>
      </form>
    </div>
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    logged: PropTypes.bool,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ user: state.user, userSigned: state.userSigned });

const mapDispatchToProps = dispatch => ({
  login: user => {
    dispatch(login(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
