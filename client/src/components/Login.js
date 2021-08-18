import React, { useState} from 'react';
import logo from '../images/logo64.png';

async function auth(credentials) {
	return fetch('/auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	})
		.then(data => data.json())
 }

export default function Login({setToken}) {
	const [username, setUsername] = useState();
	const [master_secret, setMasterSecret] = useState();
	
	const handleSubmit = async e => {
		e.preventDefault();

		if(username && master_secret){
			const data = await auth({
				username,
				master_secret
			});
	
			if(data.status_code === 200){
				setToken(data.message);
				return
			}
			alert(data.message)
			return
		}
		alert('Please provide me with complete info 🙂.')
	}
  
	return(
		<div className="login-wrapper">
			<header>
				<div className='login-header' >
					<img src={logo} alt="logo" ></img>
					<h1>Your password wallet </h1>
					<hr></hr>
				</div>
			</header>
		{/* <h3>Authentication</h3> */}
		<form onSubmit={handleSubmit} >
			<div className="form-group" >
				<label>Authentication</label>
				<input type='text' class="form-control" onChange={e=>setUsername(e.target.value)} id="usernameInput" aria-describedby="usernameHelp" placeholder="username"/>
				{/* <small id="usernameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
			</div>
			<div className="form-group">
				{/* <label for="masterSecretInput">Master Secret	</label> */}
				<input type="password" class="form-control" onChange={e=>setMasterSecret(e.target.value)} id="masterSecretInput" placeholder="master_secret"/>
			</div>
			<button type="submit" class="btn btn-primary btn-block">Submit</button>
		</form>
		</div>
  )
}
