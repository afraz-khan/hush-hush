import '../css/spinner.css';

export default function Spinner({ spinner, style }) {
  return (
    <div
      style={style}
      ref={spinner}
      className='spinner-grow text-success'
      role='status'>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
