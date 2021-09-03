import cardano from './images/cardano.png';
import './css/app.css';
import './css/login.css';
import './css/account.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import useToken from './components/auth/useToken';
import AddAccount from './components/account/AddAccount';
import GetAccount from './components/account/GetAccount';
import { AlertContextProvider } from './components/AlertContext';

function App() {
  const { token, setToken } = useToken();

  return (
    <AlertContextProvider>
      {token ? (
        <div className='App'>
          <BrowserRouter>
            <Switch>
              <Route path='/'>
                <header className='App-header'>
                  <img src={cardano} className='App-logo' alt='logo' />
                </header>
                <div className='container account'>
                  <div className='d-flex justify-content-between flex-wrap'>
                    <AddAccount></AddAccount>
                    <GetAccount></GetAccount>
                  </div>
                </div>
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </AlertContextProvider>
  );
}

export default App;
