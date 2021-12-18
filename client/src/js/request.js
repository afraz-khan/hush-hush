// import params from '../params.json';

function createQueryString(queryParams = {}) {
  const searchParams = new URLSearchParams(queryParams);
  const queryString = params.toString();
  return queryString ? `?${queryString}`: '';
}

async function ajaxRequest(
  method,
  url,
  data = {},
  headers = {},
  queryParams = {}
) {
  Object.assign(headers, {
    'Content-Type': 'application/json', // additional headers
  });

  let finalUrl = url + createQueryString(queryParams);
  const reqObj = { method, headers };
  if (Object.keys(data).length) {
    reqObj['body'] = JSON.stringify(data);
  }

  // finalUrl = params['server-url'] + finalUrl;
  return fetch(finalUrl, reqObj)
    .then((response) => response)
    .catch((err) => {
      console.error(err);
      throw new Error('Something bad happened while queueing your request 😢.');
    });
}

export { ajaxRequest };
