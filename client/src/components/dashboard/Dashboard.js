import cardano from '../../images/cardano.png';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddAccount from '../account/AddAccount';
import SearchAccount from '../account/SearchAccount';
import logo from '../../images/logo.svg';

export default function Dashboard({ token, unsetToken }) {
  function anonSays() {
    $('[data-toggle="popover"]').popover();
    setTimeout(() => {
      $('[data-toggle="popover"]').popover('dispose');
    }, 5000);
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <nav className='navbar'>
            <a className='navbar-brand'>
              <img src={logo} />
            </a>
            <h3 style={{ color: '#088f30' }}>
              {' '}
              good to see you back{' '}
              <a
                onMouseUp={anonSays}
                href='#'
                id='anon'
                data-placement='bottom'
                data-toggle='popover'
                data-content='hey, dont worry, your secrets are safe here.'>
                🎃
                <small style={{ color: '#555999', fontStyle: 'italic' }}>
                  <small>anon</small>
                </small>
              </a>{' '}
            </h3>

            <button
              onClick={unsetToken}
              className='btn btn-outline-success my-2 my-sm-0'
              type='button'>
              Logout
            </button>
          </nav>
          <header className='App-header'>
            <img src={cardano} className='App-logo' alt='logo' />
          </header>
          <div className='container account'>
            <div className='d-flex justify-content-between flex-wrap'>
              <AddAccount token={token}></AddAccount>
              <SearchAccount></SearchAccount>
            </div>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
