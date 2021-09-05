import React, { useRef, useState } from 'react';
import { passwordVisibility } from '../js/util';

export default function PasswordEye({ input, PasswordEyeHeight }) {
  const eyeRef = useRef(null);
  return (
    <span className='input-group-append'>
      <button
        id='password-eye'
        style={{ height: `${PasswordEyeHeight}` }}
        onClick={(e) => passwordVisibility(input, eyeRef)}
        type='button'
        className='btn btn-light'>
        <i ref={eyeRef} className='fa fa-eye'></i>
      </button>
    </span>
  );
}
