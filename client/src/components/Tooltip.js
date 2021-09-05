export default function Tooltip({ props }) {
  return (
    <div className='tooltip2'>
      <small className='form-text text-muted'>
        {props.text} <i className='fa fa-question-circle'></i>
      </small>
      <span style={{ width: props.width }} className='tooltiptext'>
        {props.tooltipTitle}
      </span>
    </div>
  );
}
