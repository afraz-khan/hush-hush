import { ajaxRequest } from './request';

async function login(params) {
  const [username, master_secret, spinnerRef, setToken, showAlert] = params;

  try {
    if (username && master_secret) {
      const data = await ajaxRequest('POST', '/auth', {
        username,
        master_secret,
      });
      const respObj = await data.json();

      if (respObj.status_code === 200) {
        setToken({
          token: data.headers.get('Authorization'),
        });
        return;
      }
      throw new Error(respObj.message);
    }
    throw new Error('Please provide me with complete info 🙂.');
  } catch (error) {
    setTimeout(() => {
      showAlert(error.message);
      spinnerRef.current.style.display = 'none';
    }, 1000);
  }
}

function passwordVisibility(input, eye) {
  if (input.current.type === 'password') {
    input.current.type = 'text';
    eye.current.className = 'fa fa-eye-slash';
  } else {
    input.current.type = 'password';
    eye.current.className = 'fa fa-eye';
  }
}

async function addAccount(params) {
  const [
    origin,
    username,
    password,
    originRef,
    usernameRef,
    passwordRef,
    showAlert,
    token,
  ] = params;

  try {
    const data = await ajaxRequest(
      'POST',
      'accounts',
      {
        origin,
        username,
        password,
      },
      { Authorization: token }
    );
    const respObj = await data.json();

    if (respObj.status_code === 200) {
      showAlert('Credentials saved successfully.');
      return;
    }
    throw new Error(respObj.message);
  } catch (error) {
    setTimeout(() => {
      showAlert(error.message);
    }, 1000);
  }
}

export { login, addAccount, passwordVisibility };
