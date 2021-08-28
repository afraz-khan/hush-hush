import React, { useRef, useState } from 'react';
import { addAccount } from '../../js/util';

export default function AddAccount() {
  const [origin, setOrigin] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const originRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

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
    <div className='p-2'>
      <form class='row' onSubmit={handleSubmit}>
        <div class='col-sm-3'>
          <input
            ref={originRef}
            type='text'
            class='form-control'
            onChange={(e) => setOrigin(e.target.value)}
            placeholder='origin'
          />
        </div>
        <div class='col-sm-3'>
          <input
            ref={usernameRef}
            type='text'
            class='form-control'
            placeholder='username'
          />
        </div>
        <div class='col-sm-3'>
          <input
            ref={passwordRef}
            type='password'
            class='form-control'
            placeholder='password'
          />
        </div>
        <div class='col-auto'>
          <button type='submit' class='btn btn-primary'>
            Add Credentials
          </button>
        </div>
      </form>
    </div>
  );
}
