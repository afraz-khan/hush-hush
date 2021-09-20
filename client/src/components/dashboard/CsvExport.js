import React, { useRef, useState, useContext } from 'react';
import { CSVLink } from 'react-csv';
import '../../css/csvExportButton.css';
import config from '../../js/config';
import { fetchAllAccounts } from '../../js/util';
import { AlertContext } from '../AlertContext';

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
      <button
        onClick={exportData}
        ref={exportButtonRef}
        type='button'
        className='btn btn-dark'>
        <i className='fa fa-download'></i> Export Credentials
      </button>
    </div>
  );
}
