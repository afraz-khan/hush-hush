import '../../../css/csv/csv-button.css';

export default function CSVButton({ onClick, buttonRef, type }) {
  return (
    <button
      id='csv-btn'
      data-toggle={type === 'upload' ? 'modal' : null}
      data-target={type === 'upload' ? '#file-upload-modal' : null}
      onClick={onClick}
      ref={buttonRef}
      type='button'
      className='btn btn-dark'>
      <i
        className={
          type === 'download' ? 'fa fa-download' : 'fa fa-upload'
        }></i>{' '}
      {type === 'download' ? 'Export Credentials' : 'Import Credentials'}
    </button>
  );
}
