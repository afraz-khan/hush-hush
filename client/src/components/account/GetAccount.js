export default function GetAccount() {
  return (
    <div className='p-2'>
      <form className='row'>
        <div className='col-lg-3 col-sm-4'>
          <input
            type='text'
            className='form-control'
            placeholder='enter origin'
          />
        </div>
        <div className='col-lg-3 col-sm-4'>
          <input type='text' className='form-control' placeholder='username' />
        </div>
        <div className='col-lg-3 col-sm-4'>
          <input
            type='password'
            className='form-control'
            placeholder='password'
          />
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-primary'>
            Add Credentials
          </button>
        </div>
      </form>
    </div>
  );
}
