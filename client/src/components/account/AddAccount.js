import React, { useRef, useState, useContext } from 'react';
import { addAccount } from '../../js/util';
import { AlertContext } from '../AlertContext';
import PasswordEye from '../PasswordEye';
import '../../css/account/addAccount.css';

export default function AddAccount() {
  const [alert, hideAlert, showAlert] = useContext(AlertContext);
  const [origin, setOrigin] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const originRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const PasswordEyeHeight = '57%';

  async function handleSubmit(e) {
    e.preventDefault();

    await addAccount({
      origin,
      username,
      password,
      originRef,
      usernameRef,
      passwordRef,
    });
  }

  return (
    <div className='add-account p-2'>
      <form className='row' onSubmit={handleSubmit}>
        <div className='col-lg-3 col-sm-4'>
          <input
            id='origin'
            ref={originRef}
            type='text'
            className='form-control'
            onChange={(e) => setOrigin(e.target.value)}
            placeholder='origin'
            required
          />
          <label for='origin'>asdasdd</label>
        </div>
        <div className='col-lg-3 col-sm-4'>
          <input
            ref={usernameRef}
            type='text'
            className='form-control'
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username'
            required
          />
        </div>
        <div className='col-lg-3 col-sm-4 d-flex'>
          <input
            ref={passwordRef}
            type='password'
            className='form-control'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            required
          />
          <PasswordEye
            input={passwordRef}
            PasswordEyeHeight={PasswordEyeHeight}
          />
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-primary'>
            Add New Credentials
          </button>
        </div>
      </form>
    </div>
  );
}
