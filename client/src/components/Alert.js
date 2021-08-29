import React from 'react';
import '../css/alert.css';

export default function Alert({ message }) {
  return (
    <div className='alert alert-warning alert-dismissible fade hide'>
      <strong>
        <i className='fa fa-exclamation-circle'></i>
      </strong>
      {' Error:  '}
      {message}
      <button type='button' className='close' data-dismiss='alert'>
        &times;
      </button>
    </div>
  );
}
