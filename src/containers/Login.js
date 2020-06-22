import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { userLogin } from '../api/users';

const Login = props => {
    const { user } = props;
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
        const response = await userLogin({ name });
        console.log(response)
        if (response === false) {
          return (
            <div>
              Erro
            </div>
          );
        }
    }

    return (
        <div className="login">
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="Name">
              Name:
              <input id="input-name" type="text" onChange={handleChange} className="form-control" />
            </label>
            <label htmlFor="password">
              Password:
              <input id="input-password" type="password" onChange={handleChange} className="form-control" />
            </label>
            <input type="submit" value="Submit" className="btn btn-primary form-control" />
          </form>
        </div>
      );
    };


    export default Login;