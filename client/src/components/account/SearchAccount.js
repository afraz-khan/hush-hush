import '../../css/account/searchAccount.css';

export default function SearchAccount() {
  return (
    <div className='search-account p-2'>
      <form className='row'>
        <div className='col-auto'>
          <label for='origin-search'>
            <h6>Search here 🔎 </h6>
          </label>
          <input
            id='origin-search'
            type='text'
            className='form-control'
            placeholder='enter any origin'
          />
        </div>
        {/* <div className='col-auto'>
          <button type='submit' className='btn btn-primary'>
            Search Credentials
          </button>
        </div> */}
      </form>
    </div>
  );
}
