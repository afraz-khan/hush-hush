import cardano from './images/cardano.png';
import './css/app.css';
import './css/login.css'
import './css/account.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import useToken from './components/useToken';
import AddAccount from './components/account/AddAccount';

function App() {
	const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  return (
    <div className="App">
			<BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            {/* <Dashboard />
						 */}
						 <header className="App-header">
							<img src={cardano} className="App-logo" alt="logo" />
						</header>
						<div className='container account' >
							<div className="d-flex justify-content-between flex-wrap"	 > 
								<AddAccount></AddAccount>
								<AddAccount></AddAccount>
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