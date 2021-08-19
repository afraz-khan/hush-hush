
async function auth(credentials) {
	return fetch('/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then(response => response)
		.catch(err => {
			console.error(err);
			throw new Error('Something bad happened while queueing your request 😢.');
		})
 }

 export {auth}