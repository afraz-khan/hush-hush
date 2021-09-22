import '../../../css/csv/upload-file.css';
import config from '../../../js/config';

export default function UploadFile(props) {
  function validateFileType(file) {
    if (config.csvImport.fileTypesAllowed.includes(file.type)) {
      return true;
    }
    return false;
  }

  async function readFile(e) {
    e.preventDefault();
    const file = e.target.files[0];

    if (validateFileType(file)) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        console.log(e.target.result.toString());
      };
      reader.readAsArrayBuffer(file);
    }
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
            <div className='input-group mb-3'>
              <div className='custom-file'>
                <input
                  onChange={(e) => readFile(e)}
                  onClick={(e) => (e.target.value = '')}
                  type='file'
                  className='custom-file-input'
                  id='input-file'
                />
                <label className='custom-file-label'>Choose file</label>
              </div>
              {/* <div className='input-group-append'>
                <span className='input-group-text' id=''>
                  Upload
                </span>
              </div> */}
            </div>
            <div className='modal-footer'>
              <div className='btn-group' role='group'>
                <label id='edit-message'></label>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                <button type='button' className='btn btn-primary'>
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
