import React, { useRef, useState, useContext } from 'react';
import logo from '../../images/logo64.png';
import Footer from '../Footer';
import { login } from '../../js/util';
import PasswordEye from '../PasswordEye';
import { AlertContext } from '../AlertContext';
import Spinner from '../Spinner';

export default function Login({ setToken }) {
  const [alert, hideAlert, showAlert] = useContext(AlertContext);
  const [username, setUsername] = useState();
  const [master_secret, setMasterSecret] = useState();
  const spinnerRef = useRef(null);
  const masterSecretRef = useRef(null);

  const handleSubmit = async (e) => {
    spinnerRef.current.style.display = 'inline-block';
    hideAlert();
    e.preventDefault();

    await login([username, master_secret, spinnerRef, setToken, showAlert]);
  };

  return (
    <div>
      <div className='login-wrapper'>
        <header>
          <div className='login-header'>
            <img src={logo} alt='logo'></img>
            <h1>Your password wallet </h1>
            <hr></hr>
          </div>
        </header>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Authentication</label>
            <input
              type='text'
              className='form-control'
              onChange={(e) => setUsername(e.target.value)}
              id='usernameInput'
              aria-describedby='usernameHelp'
              placeholder='username'
              required
            />
          </div>
          <div className='input-group mb-3'>
            <input
              ref={masterSecretRef}
              type='password'
              className='form-control'
              onChange={(e) => setMasterSecret(e.target.value)}
              id='masterSecretInput'
              placeholder='master_secret'
              required
            />
            <PasswordEye input={masterSecretRef} />
          </div>
          <button type='submit' className='btn btn-primary btn-block'>
            Submit
          </button>
        </form>
        <Spinner spinner={spinnerRef} />
      </div>
      <Footer></Footer>
    </div>
  );
}
