import React from 'react';
import '../../../css/csv/csv-import.css';
import config from '../../../js/config';
import Tooltip from '../../Tooltip';
import CsvButton from './CsvButton';
import UploadFile from './UploadFile';

export default function CsvImport({ token }) {
  return (
    <div id='csv-import' className='p-2'>
      <CsvButton
        data-toggle='modal'
        data-target='#file-upload-modal'
        type='upload'
      />
      <UploadFile token={token} />
      <a href='https://google.com'>
        <Tooltip props={config.csvImport.tooltip} />
      </a>
    </div>
  );
}
