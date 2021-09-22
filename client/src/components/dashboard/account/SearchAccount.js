import React, { useRef, useState, useContext } from 'react';
import '../../../css/dashboard/account/search-account.css';
import { searchAccounts } from '../../../js/util';
import { AlertContext } from '../../AlertContext';
import Spinner from '../../Spinner';
import EditAccount from './EditAccount';

export default function SearchAccount({ token }) {
  const [alert, hideAlert, showAlert] = useContext(AlertContext);
  const [data, setData] = useState([]);
  const [account, setAccount] = useState({});
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const nothingFoundRef = useRef(null);

  // Modal edit fields
  const editOriginRef = useRef(null);
  const editUsernameRef = useRef(null);
  const editPasswordRef = useRef(null);
  const updateButtonRef = useRef(null);
  const deleteButtonRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    hideAlert();
    document.body.style.cursor = 'wait';
    nothingFoundRef.current.style.visibility = 'hidden';
    await searchAccounts([
      inputRef.current.value,
      setData,
      token,
      showAlert,
      selectRef,
      nothingFoundRef,
    ]);
  }

  function selectSize() {
    if (data.length === 1) {
      return 2;
    }
    return data.length > 5 ? 5 : data.length;
  }

  function onInputChange() {
    if (inputRef.current.value === '') {
      selectRef.current.style.display = 'none';
    }
  }

  function onOriginSelect(e) {
    const account = data.find((record) => record['origin'] === e.target.value);
    setAccount(account);
    editUsernameRef.current.disabled = false;
    editPasswordRef.current.disabled = false;
    updateButtonRef.current.disabled = false;
    deleteButtonRef.current.disabled = false;

    editOriginRef.current.value = account['origin'];
    editUsernameRef.current.value = account['username'];
    editPasswordRef.current.value = account['password'];
  }

  return (
    <div
      className='search-account p-2'
      onMouseLeave={() => (selectRef.current.style.display = 'none')}>
      <form className='row' onSubmit={handleSubmit}>
        <div className='col-auto'>
          <label>
            <h6>Search here </h6>
          </label>
          <h6 ref={nothingFoundRef} id='nothing-found'>
            ( nothing found . . . )
          </h6>

          <div className='input-group'>
            <input
              onChange={onInputChange}
              ref={inputRef}
              id='origin-search'
              type='text'
              className='form-control'
              placeholder='enter any origin'
              required
            />
            <div className='input-group-append'>
              <div className='btn-group' role='group'>
                <button type='submit' className='btn btn-primary'>
                  <i className='fa fa-search'></i>
                </button>
              </div>
            </div>
          </div>

          <select ref={selectRef} className='custom-select' size={selectSize()}>
            {data.map((record, i) => {
              return (
                <option
                  value={record.origin}
                  key={i}
                  onClick={onOriginSelect}
                  data-toggle='modal'
                  data-target='#account-modal'>
                  {record.origin}
                </option>
              );
            })}
          </select>
        </div>
      </form>

      <EditAccount
        props={{
          token,
          editOriginRef,
          editUsernameRef,
          editPasswordRef,
          updateButtonRef,
          deleteButtonRef,
          account,
          setAccount,
        }}
      />
    </div>
  );
}
