import { useEffect, useRef } from 'react';
import PasswordEye from '../../PasswordEye';
import '../../../css/dashboard/account/edit-account.css';
import {
  updateAccount,
  deleteAccount,
  validateStrings,
} from '../../../js/util';

export default function EditAccount({ props }) {
  const buttonGroupRef = useRef(null);
  const editMessageRef = useRef(null);

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

  function showEditMessage(message, color = '#088f30') {
    editMessageRef.current.innerText = message;
    editMessageRef.current.style.color = color;
    editMessageRef.current.style.opacity = 1;
    setTimeout(() => {
      editMessageRef.current.style.opacity = 0;
    }, 1000);
  }

  async function handleUpdate() {
    const username = props.editUsernameRef.current.value;
    const password = props.editPasswordRef.current.value;
    if (!validateStrings([username, password])) {
      showEditMessage('invalid values.', '#ff6f6f');
      return;
    }

    document.body.style.cursor = 'wait';
    if (
      username === props.account['username'] &&
      password === props.account['password']
    ) {
      document.body.style.cursor = 'default';
      showEditMessage('Updated successfully!');
      return;
    }

    const result = await updateAccount([
      props,
      {
        username,
        password,
      },
      showEditMessage,
    ]);

    if (result) {
      props.account['username'] = username;
      props.account['password'] = password;
      props.setAccount(props.account);
    }
  }

  async function handleDelete() {
    document.body.style.cursor = 'wait';
    await deleteAccount([props, showEditMessage]);
  }

  return (
    <div
      className='modal fade'
      id='account-modal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='account-modal'
      aria-hidden='true'>
      <div className='modal-dialog modal-lg' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Account Details</h5>
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
            <div ref={buttonGroupRef} className='btn-group' role='group'>
              <label ref={editMessageRef} id='edit-message'></label>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'>
                Close
              </button>
              <button
                ref={props.updateButtonRef}
                onClick={handleUpdate}
                type='button'
                className='btn btn-primary'>
                Save changes
              </button>
              <button
                ref={props.deleteButtonRef}
                onClick={handleDelete}
                type='button'
                className='btn btn-danger'>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
