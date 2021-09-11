import { useContext, useEffect, useRef, useState } from 'react';
import PasswordEye from '../PasswordEye';
import Spinner from '../Spinner';
import '../../css/account/editAccount.css';
import config from '../../js/config';
import { AlertContext } from '../AlertContext';

export default function EditAccount({ props }) {
  const [alert, hideAlert, showAlert] = useContext(AlertContext);
  const spinnerRef = useRef(null);
  const buttonGroupRef = useRef(null);

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        if (window.innerWidth < 350) {
          buttonGroupRef.current.classList.add('btn-group-sm');
          buttonGroupRef.current.classList.add('btn-group-vertical');
        } else {
          buttonGroupRef.current.classList.remove('btn-group-sm');
          buttonGroupRef.current.classList.remove('btn-group-vertical');
        }
      },
      false
    );
  }, []);

  async function handleUpdate() {
    const data = {};
    if (
      props.editUsernameRef.current.value === props.account.username &&
      props.editPasswordRef.current.value === props.account.password
    ) {
      showAlert('updted.');
    }
  }

  return (
    <div
      className='modal fade'
      id='accountModal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='accountModal'
      aria-hidden='true'>
      <div className='modal-dialog modal-lg' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>
              Account Details
            </h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-lg-4 col-sm-4'>
                <label>Origin</label>
                <input
                  ref={props.editOriginRef}
                  type='text'
                  className='form-control'
                  placeholder='origin'
                  disabled
                />
              </div>
              <div className='col-lg-4 col-sm-4'>
                <label>Username</label>
                <input
                  ref={props.editUsernameRef}
                  onChange={(e) =>
                    setUsername(props.editUsernameRef.current.value)
                  }
                  type='text'
                  className='form-control'
                  placeholder='username'
                  required
                />
              </div>
              <div className='col-lg-4 col-sm-4'>
                <label style={{ display: 'flow-root' }}>Password</label>
                <div className='d-flex'>
                  <input
                    ref={props.editPasswordRef}
                    onChange={(e) =>
                      setPassword(props.editPasswordRef.current.value)
                    }
                    type='password'
                    className='form-control'
                    placeholder='password'
                    required
                  />
                  <PasswordEye input={props.editPasswordRef} />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <Spinner spinner={spinnerRef} style={config.editAccount.spinner} />

            <div ref={buttonGroupRef} className='btn-group' role='group'>
              <label>asdasda</label>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'>
                Close
              </button>
              <button
                onClick={handleUpdate}
                type='button'
                className='btn btn-primary'>
                Save changes
              </button>
              <button type='button' className='btn btn-danger'>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
