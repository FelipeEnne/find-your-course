import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { login } from '../actions/user';
import { userLogin } from '../api/users';

const Login = props => {
  const {
    login,
  } = props;
  const [name, setName] = useState();
  const [password, setPassword] = useState();

  // console.log(props);

  const history = useHistory();

  const localGet = localStorage.getItem('localUser');
  const localUser = JSON.parse(localGet);

  if (localUser.remember) {
    return (
      <div>
        {history.push('/home')}
      </div>
    );
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
    // console.log(response);

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
      return (
        <div>
          {history.push('/home')}
        </div>
      );
    }

    return (
      <div>
        {history.push('/')}
      </div>
    );
  };

  return (
    <div className="login">
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="Name">
            Name
            <input id="input-name" type="text" onChange={handleChange} className="form-control" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input id="input-password" type="password" onChange={handleChange} className="form-control" />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <a href="./signup" className="signup-link">Signup</a>
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
