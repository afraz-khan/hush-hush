import React, { useRef, useState} from 'react';
import logo from '../images/logo64.png';
import Footer from './Footer';
import {login} from '../js/util';

export default function Login({setToken}) {
	const [username, setUsername] = useState();
	const [master_secret, setMasterSecret] = useState();
	const spinnerRef = useRef(null);

	const handleSubmit = async e => {
		spinnerRef.current.style.display = 'block'
		e.preventDefault();

		await login([
			username,
			master_secret,
			spinnerRef,
			setToken
		])
	}
  
	return(
		<div>
			<div className="login-wrapper">
				<header>
					<div className='login-header' >
						<img src={logo} alt="logo" ></img>
						<h1>Your password wallet </h1>
						<hr></hr>
					</div>
				</header>
				<form onSubmit={handleSubmit} >
					<div className="form-group" >
						<label>Authentication</label>
						<input type='text' className="form-control" onChange={e=>setUsername(e.target.value)} id="usernameInput" aria-describedby="usernameHelp" placeholder="username"/>
					</div>
					<div className="form-group">
						<input type="password" className="form-control" onChange={e=>setMasterSecret(e.target.value)} id="masterSecretInput" placeholder="master_secret"/>
					</div>
					<button type="submit" className="btn btn-primary btn-block">Submit</button>
				</form>
				<div ref={spinnerRef} className="spinner-grow text-success" role="status">
					<span className	="sr-only">Loading...</span>
				</div>
			</div>
			<Footer></Footer>
		</div>
  )
}