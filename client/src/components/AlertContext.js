import React from 'react';
import '../css/alert.css';
import { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    className: 'hide',
    message: null,
  });

  const showAlert = (message) => {
    setAlert({
      className: 'show',
      message,
    });
  };

  const hideAlert = () => {
    setAlert({
      className: 'hide',
      message: '',
    });
  };

  return (
    <AlertContext.Provider value={[alert, hideAlert, showAlert]}>
      <div
        className={`alert alert-warning alert-dismissible fade ${alert.className}`}>
        <strong>
          <i className='fa fa-exclamation-triangle'></i>
        </strong>
        {'   '}
        {alert.message}
        <button onClick={hideAlert} type='button' className='close'>
          &times;
        </button>
      </div>
      {children}
    </AlertContext.Provider>
  );
};
