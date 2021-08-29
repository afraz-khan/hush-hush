import cardano from './images/cardano.png';
import './css/app.css';
import './css/login.css';
import './css/account.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import useToken from './components/auth/useToken';
import AddAccount from './components/account/AddAccount';
import GetAccount from './components/account/GetAccount';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  console.log('aya he');
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/'>
            {/* <Dashboard /> */}

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
  );
}

export default App;
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// https://realpython.com/token-based-authentication-with-flask/
