import React from 'react';
import '../css/alert.css';

export default function Alert({ data, hideAlert }) {
  return (
    <div
      className={`alert alert-warning alert-dismissible fade ${data.className}`}>
      <strong>
        <i className='fa fa-exclamation-triangle'></i>
      </strong>
      {'   '}
      {data.message}
      <button onClick={hideAlert} type='button' className='close'>
        &times;
      </button>
    </div>
  );
}
