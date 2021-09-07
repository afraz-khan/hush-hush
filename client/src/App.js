import './css/app.css';
import './css/login.css';
import './css/account/account.css';
import Login from './components/auth/Login';
import useToken from './components/auth/useToken';
import { AlertContextProvider } from './components/AlertContext';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const { token, setToken, unsetToken } = useToken();

  return (
    <AlertContextProvider>
      {token ? (
        <div className='App'>
          <Dashboard token={token} unsetToken={unsetToken} />
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </AlertContextProvider>
  );
}

export default App;
