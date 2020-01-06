import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function LandingScreen() {
	const [ email, setEmail ] = useState(' ');
	const [ phone, setPhone ] = useState(' ');

	const inputEmailHandler = () => {
		let params = document.getElementById('email').value;
		setEmail(params);
	};

	const inputPhoneHandler = () => {
		let params = document.getElementById('number').value;
		setPhone(params);
	};

	return (
		// <div className='App'>
		<header className='App-header'>
			{/* <form> */}
			<div className='form-group'>
				<label>Email address</label>
				<input
					type='email'
					className='form-control'
					id='email'
					onChange={inputEmailHandler}
					placeholder='Enter email'
				/>
			</div>
			<div className='form-group'>
				<label>Phone</label>

				<input
					type='text'
					className='form-control'
					id='number'
					onChange={inputPhoneHandler}
					placeholder='Enter Phone No.'
				/>
			</div>

			<Link
				to='/vote'
				className='btn btn-primary'
				onClick={() => {
					console.log(email, phone);
				}}
			>
				Submit
			</Link>
			{/* </form> */}
		</header>
		//</div>
	);
}
