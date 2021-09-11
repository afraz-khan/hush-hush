import { useEffect } from 'react';
import PasswordEye from '../PasswordEye';

export default function EditAccount({ props }) {
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
                />
              </div>
              <div className='col-lg-4 col-sm-4'>
                <label>Username</label>
                <input
                  ref={props.editUsernameRef}
                  type='text'
                  className='form-control'
                  placeholder='username'
                />
              </div>
              <div className='col-lg-4 col-sm-4'>
                <label style={{ display: 'flow-root' }}>Password</label>
                <div className='d-flex'>
                  <input
                    ref={props.editPasswordRef}
                    type='password'
                    className='form-control'
                    placeholder='password'
                  />
                  <PasswordEye input={props.editPasswordRef} />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <div className='btn-group' role='group'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'>
                Close
              </button>
              <button type='button' className='btn btn-primary'>
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
