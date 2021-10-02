import React from 'react';
import '../css/alert.css';
import { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    displayClass: 'hide',
    colorClass: 'alert-warning',
    message: null,
    icon: 'fa fa-exclamation-triangle',
  });

  const showAlert = (message, type = 'error') => {
    let icon, colorClass;
    if (type === 'message') {
      icon = 'fa fa-info-circle';
      colorClass = 'alert-primary';
    } else {
      icon = 'fa fa-exclamation-triangle';
      colorClass = 'alert-warning';
    }

    setAlert({
      displayClass: 'show',
      colorClass,
      message,
      icon,
    });
    setTimeout(() => {
      hideAlert();
    }, 5000);
  };

  const hideAlert = () => {
    setAlert({
      displayClass: 'hide',
      message: '',
    });
  };

  return (
    <AlertContext.Provider value={[alert, hideAlert, showAlert]}>
      <div
        className={`alert ${alert.colorClass} alert-dismissible fade ${alert.displayClass}`}>
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
