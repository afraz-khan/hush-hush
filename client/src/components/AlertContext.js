import React from 'react';
import '../css/alert.css';
import { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    className: 'hide',
    message: null,
    icon: 'fa fa-exclamation-triangle',
  });

  const showAlert = (message, type = 'error') => {
    let icon = alert.icon;
    if (type === 'message') {
      icon = 'fa fa-info-circle';
    } else {
      icon = 'fa fa-exclamation-triangle';
    }

    setAlert({
      className: 'show',
      message,
      icon,
    });
    setTimeout(() => {
      hideAlert();
    }, 5000);
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
          <i className={alert.icon}></i>
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
