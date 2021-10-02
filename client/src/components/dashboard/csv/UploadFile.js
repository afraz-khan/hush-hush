import React, { useRef, useState, useEffect } from 'react';
import '../../../css/csv/upload-file.css';
import config from '../../../js/config';
import { validateStrings, bulkImport } from '../../../js/util';

export default function UploadFile({ token }) {
  const [importData, setImportData] = useState();
  const messageRef = useRef(null);
  const filenameRef = useRef(null);

  function showMessage(message, color = '#575757') {
    messageRef.current.innerText = message;
    messageRef.current.style.color = color;
    messageRef.current.style.opacity = 1;
    setTimeout(() => {
      messageRef.current.style.opacity = 0;
    }, 2000);
  }

  function showStaticMessage(message) {
    messageRef.current.innerText = message;
    messageRef.current.style.color = '#575757';
    messageRef.current.style.opacity = 1;
  }

  function validateFileType(file) {
    if (config.csvImport.fileTypesAllowed.includes(file.type)) {
      return true;
    }
    return false;
  }

  function handleTrailingLines(lines) {
    const lastLine = lines[lines.length - 1];

    for (let i = lines.length - 1; i > 0; i--) {
      // removing empty trailing lines
      if (lines[i] === '' || lines[i] === '\n') {
        lines.pop();
        continue;
      }
      return lines;
    }
  }

  function validateData(data) {
    let lines = data.split('\n');

    if (lines.length < 2) {
      return false;
    }
    lines = handleTrailingLines(lines);
    if (lines.length === 1) {
      return false;
    }

    for (let i = 1; i < lines.length; i++) {
      let currentLine = lines[i].split(',');
      if (!validateStrings(currentLine) || currentLine.length !== 3) {
        return false;
      }
    }

    return lines;
  }

  function convertCSVToJSON(lines) {
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');

      for (var j = 0; j < headers.length; j++) {
        let key = headers[j].replace(/\n|\r/g, ''); // remove trailing carriage return and newlines
        const val = currentline[j].replace(/\n|\r/g, '');
        key = key.toLowerCase();

        obj[key] = val;
      }
      result.push(obj);
    }

    return JSON.stringify(result);
  }

  async function readFile(e) {
    e.preventDefault();
    const file = e.target.files[0];

    if (validateFileType(file)) {
      filenameRef.current = file.name;
      const reader = new FileReader();

      reader.onloadend = (e) => {
        try {
          const lines = validateData(e.target.result);

          if (lines) {
            const data = JSON.parse(convertCSVToJSON(lines));
            showStaticMessage(`📋 ${filenameRef.current}`);
            setImportData(data);
            return;
          }
          throw new Error('invalid data');
        } catch (error) {
          filenameRef.current = '';
          showMessage(`⛔️ ${error.message}`, 'red');
          return;
        }
      };
      reader.readAsText(file);
      return;
    }
    showMessage(`⛔️ invalid file format`, 'red');
  }

  async function importCredentials(e) {
    document.body.style.cursor = 'wait';
    showStaticMessage('uploading...');

    console.log(importData);
    if (importData) {
      await bulkImport([importData, showMessage, token]);
      setImportData();
      return;
    }
    document.body.style.cursor = 'default';
    showMessage('ℹ️ Select file please...', 'blue');
  }

  return (
    <div
      className='modal fade'
      id='file-upload-modal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='file-upload-modal'
      aria-hidden='true'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>Upload CSV File</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <div className='mb-3'>
              <div className='custom-file'>
                <input
                  onChange={(e) => readFile(e)}
                  onClick={(e) => (e.target.value = null)}
                  type='file'
                  className='custom-file-input'
                  id='input-file'
                  required
                />
                <label className='custom-file-label'>Choose file</label>
              </div>
            </div>
            <div className='modal-footer'>
              <div className='btn-group' role='group'>
                <label ref={messageRef}></label>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                <button
                  onClick={importCredentials}
                  type='button'
                  className='btn btn-primary'>
                  <i className='fa fa-upload'></i> Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
