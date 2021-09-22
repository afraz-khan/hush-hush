import React, { useRef, useState, useContext } from 'react';
import { CSVLink } from 'react-csv';
import '../../../css/csv/csv-export.css';
import config from '../../../js/config';
import { fetchAllAccounts } from '../../../js/util';
import { AlertContext } from '../../AlertContext';
import CsvButton from './CsvButton';

export default function CsvExport({ token }) {
  const [alert, hideAlert, showAlert] = useContext(AlertContext);
  const [data, setData] = useState([]);
  const exportButtonRef = useRef(null);
  const csvLinkRef = useRef(null);

  async function exportData() {
    hideAlert();
    document.body.style.cursor = 'wait';
    const result = await fetchAllAccounts([token, setData, showAlert]);
    if (result) {
      csvLinkRef.current.link.click();
    }
  }

  return (
    <div id='csv-export' className='p-2'>
      <CSVLink
        ref={csvLinkRef}
        filename={config.csvExport.fileName}
        headers={config.csvExport.headers}
        data={data}
      />
      <CsvButton
        onClick={exportData}
        buttonRef={exportButtonRef}
        type='download'
      />
      {/* <button
        onClick={exportData}
        ref={exportButtonRef}
        type='button'
        className='btn btn-dark'>
        <i className='fa fa-download'></i> Export Credentials
      </button> */}
    </div>
  );
}
