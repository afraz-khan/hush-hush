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
    showAlert(error.message);
    spinnerRef.current.style.display = 'none';
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
    spinnerRef,
    originRef,
    usernameRef,
    passwordRef,
    showAlert,
    token,
  ] = params;

  try {
    const data = await ajaxRequest(
      'POST',
      '/accounts',
      [
        {
          origin,
          username,
          password,
        },
      ],
      { Authorization: token }
    );
    const respObj = await data.json();

    if (respObj.status_code === 200) {
      spinnerRef.current.style.display = 'none';
      document.body.style.cursor = 'default';
      showAlert('Credentials saved successfully.', 'message');
      originRef.current.value = null;
      usernameRef.current.value = null;
      passwordRef.current.value = null;
      return;
    }
    throw new Error(respObj.message);
  } catch (error) {
    spinnerRef.current.style.display = 'none';
    document.body.style.cursor = 'default';
    showAlert(error.message);
  }
}

async function bulkImport(params) {
  const [importData, showMessage, token] = params;

  try {
    const data = await ajaxRequest('POST', '/accounts', importData, {
      Authorization: token,
    });
    const respObj = await data.json();

    if (respObj.status_code === 200) {
      document.body.style.cursor = 'default';
      showMessage('credentials imported successfully.', '#088f30');
      return true;
    }
    throw new Error(respObj.message);
  } catch (error) {
    document.body.style.cursor = 'default';
    showMessage(`⛔️ ${error.message}`, 'red');
    return false;
  }
}

async function searchAccounts(params) {
  const [text, setData, token, showAlert, selectRef, nothingFoundRef] = params;

  try {
    const data = await ajaxRequest(
      'GET',
      '/accounts',
      {},
      { Authorization: token },
      {
        origin: text,
      }
    );
    const respObj = await data.json();

    if (respObj.status_code === 200) {
      if (respObj.data.length > 0) {
        selectRef.current.style.display = 'inline-block';
      } else {
        selectRef.current.style.display = 'none';
        nothingFoundRef.current.style.visibility = 'visible';
        setTimeout(() => {
          nothingFoundRef.current.style.visibility = 'hidden';
        }, 2000);
      }
      document.body.style.cursor = 'default';
      setData(respObj.data);
      return;
    }
    throw new Error(respObj.message);
  } catch (error) {
    showAlert(error.message);
    document.body.style.cursor = 'default';
    selectRef.current.style.display = 'none';
    nothingFoundRef.current.style.visibility = 'hidden';
  }
}

async function fetchAllAccounts(params) {
  const [token, setData, showAlert] = params;

  try {
    const data = await ajaxRequest(
      'GET',
      '/accounts',
      {},
      { Authorization: token }
    );
    const respObj = await data.json();

    if (respObj.status_code === 200) {
      setData(respObj.data);
      document.body.style.cursor = 'default';
      return true;
    }
    throw new Error(respObj.message);
  } catch (error) {
    console.error(error);
    document.body.style.cursor = 'default';
    showAlert(error.message);
    return false;
  }
}

async function updateAccount(params) {
  const [props, body, showEditMessage] = params;
  try {
    const data = await ajaxRequest(
      'PUT',
      `/accounts/${props.account['origin']}`,
      body,
      {
        Authorization: props.token,
      }
    );
    const respObj = await data.json();

    if (respObj.status_code === 200) {
      document.body.style.cursor = 'default';
      showEditMessage('Updated successfully!');
      return true;
    }
    throw new Error(respObj.message);
  } catch (error) {
    console.error(error);
    document.body.style.cursor = 'default';
    showEditMessage(error.message, '#ff6f6f');
    return false;
  }
}

async function deleteAccount(params) {
  const [props, showEditMessage] = params;
  try {
    const data = await ajaxRequest(
      'DELETE',
      `/accounts/${props.account['origin']}`,
      {},
      {
        Authorization: props.token,
      }
    );
    const respObj = await data.json();
    if (respObj.status_code === 200) {
      document.body.style.cursor = 'default';
      props.editUsernameRef.current.disabled = true;
      props.editPasswordRef.current.disabled = true;
      props.updateButtonRef.current.disabled = true;
      props.deleteButtonRef.current.disabled = true;
      showEditMessage('Record deleted successfully!');
      return true;
    }
    throw new Error(respObj.message);
  } catch (error) {
    console.error(error);
    document.body.style.cursor = 'default';
    showEditMessage(error.message, '#ff6f6f');
    return false;
  }
}

// validate empty strings & strings with only space chars in it
function validateStrings(values) {
  let isValid = true;
  for (let i = 0; i < values.length; i++) {
    if (/^\s*$/.test(values[i])) {
      isValid = false;
      break;
    }
  }
  return isValid;
}

export {
  login,
  addAccount,
  bulkImport,
  searchAccounts,
  updateAccount,
  deleteAccount,
  fetchAllAccounts,
  passwordVisibility,
  validateStrings,
};
