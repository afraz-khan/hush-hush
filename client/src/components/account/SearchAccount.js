import React, { useEffect, useRef, useState, useContext } from 'react';
import '../../css/account/searchAccount.css';
import { searchAccounts } from '../../js/util';
import { AlertContext } from '../AlertContext';

export default function SearchAccount({ token }) {
  const [alert, hideAlert, showAlert] = useContext(AlertContext);
  const [data, setData] = useState([]);
  const selectRef = useRef(null);
  // cosnt [text, setText]

  async function onSearchChange(e) {
    e.preventDefault();
    document.body.style.cursor = 'wait';
    await searchAccounts([
      e.target.value,
      setData,
      token,
      showAlert,
      selectRef,
    ]);
    // if (result) {
    //   if (selectRef.current.style.display === 'none') {
    //     selectRef.current.style.display = 'block';
    //   }
    //   setData(data);
    // }
    // selectRef.current.style.display = 'none';
  }

  return (
    <div className='search-account p-2'>
      <form className='row'>
        <div className='col-auto'>
          <label>
            <h6>Search here 🔎 </h6>
          </label>
          <input
            onChange={(e) => onSearchChange(e)}
            id='origin-search'
            type='text'
            className='form-control'
            placeholder='enter any origin'
          />
          <select
            ref={selectRef}
            style={{ position: 'absolute', display: 'none' }}
            className='custom-select'
            size='5'>
            {data.map((origin, i) => {
              return (
                <option value={i + 1} key={i}>
                  {data[i]}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    </div>
  );
}
