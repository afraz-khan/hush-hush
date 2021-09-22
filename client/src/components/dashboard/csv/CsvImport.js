import React, { useRef, useState, useContext } from 'react';
import { CSVLink } from 'react-csv';
import '../../../css/csv/csv-import.css';
import config from '../../../js/config';
import { fetchAllAccounts } from '../../../js/util';
import { AlertContext } from '../../AlertContext';
import Tooltip from '../../Tooltip';
import CsvButton from './CsvButton';
import UploadFile from './UploadFile';

export default function CsvImport({ token }) {
  const [alert, hideAlert, showAlert] = useContext(AlertContext);
  const [data, setData] = useState([]);
  const exportButtonRef = useRef(null);
  const csvLinkRef = useRef(null);

  async function importData() {
    hideAlert();
  }

  return (
    <div id='csv-import' className='p-2'>
      <CSVLink
        ref={csvLinkRef}
        filename={config.csvExport.fileName}
        headers={config.csvExport.headers}
        data={data}
      />
      <CsvButton
        data-toggle='modal'
        data-target='#file-upload-modal'
        type='upload'
      />
      <UploadFile />
      {/* <button
        data-toggle='modal'
        data-target='#file-upload-modal'
        onClick={importData}
        ref={exportButtonRef}
        type='button'
        className='btn btn-dark'>
        <i className='fa fa-upload'></i> Import Credentials
      </button> */}
      <a href='https://google.com'>
        <Tooltip props={config.csvImport.tooltip} />
      </a>
    </div>
  );
}
