import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { userLogin } from '../api/users';

import { login, currentUser } from '../actions/user';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = props => {
    const { user, loginInfo, userSigned, currentUser } = props;
    console.log(user)
    const [name, setName] = useState();
    const [password, setPassword] = useState();

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
        console.log(response)
       
        if (response === false) {
          
          return (
            <div>
              {toast.error('Error: Not a user')}
              <ToastContainer />
            </div>
          );
        }

        if (response === '') {
          return (
            <div>
              {toast.warn('Password incorrect')}
              <ToastContainer />
            </div>
          );
        }

        loginInfo({
          id: response.id, 
          name: response.name, 
          email: response.email,
          favorite: response.favorite,
        })


        const info = JSON.stringify({
          id: response.id, 
          name: response.name, 
          email: response.email,
          favorite: response.favorite,
          remember: true,
        });

        localStorage.setItem('localUser', info);

        const tempUser = userSigned.filter(usr => usr.id === response.id);
        if (tempUser.length === 0) currentUser({ id: response.id, name: response.name });

        return (
          <div>
            {toast.success('Login successfull')}
            <ToastContainer />
            <Redirect to="/home" />
          </div>
        );

    }

    return (
        <div className="login">
          {user.logged ? <Redirect to="/home" /> : null}
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
              <button type="submit" className="btn btn-primary" > Submit</button>
          </form>
        </div>
      );
};



const mapStateToProps = state => ({ user: state.user, userSigned: state.userSigned });

const mapDispatchToProps = dispatch => ({
  loginInfo: user => {
    dispatch(login(user));
  },
  currentUser: user => {
    dispatch(currentUser(user));
  },
});
    
export default connect(mapStateToProps, mapDispatchToProps)(Login);