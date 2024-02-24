import React, { useState, useEffect } from "react";
import { signup, isAuth, preSignup } from "../../actions/auth";
import Router from "next/router";
import Link from "next/link"
import LoginGoogle from './LoginGoogle';
import { RotatingLines } from "react-loader-spinner"
import { FaEye, FaEyeSlash } from "react-icons/fa";
const SignupComponent = () => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		loading: false,
		message: "",
		showForm: true
	})
	const [showPass, setShowPass] = useState(true);

	const { name, email, password, error, loading, message, showForm } = values

	// useEffect(() => {
	// 	isAuth() && Router.push('/')
	// }, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		console.table({ name, email, password, error, loading, message, showForm });
		setValues({ ...values, loading: true, error: false })
		const user = { name, email, password }

		preSignup(user).then(data => {
			if (data?.error) {
				setValues({ ...values, error: data?.error, loading: false })
			} else {
				setValues({ ...values, name: '', email: "", password: '', error: '', loading: false, message: data?.message, showForm: false })
			}
		})
	};

	const handleChange = name => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const showLoading = () => (
		loading ? <div className="d-flex justify-content-center mt-4" style={{ position: "fixed", right: "39vw", top: "33vh" }} >   <RotatingLines width="100" strokeColor="black" strokeWidth="2" /> </div> : ""
	)
	const showError = () => (
		error
			&&
			<div id="alert-border-2" class="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
				<svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
				</svg>
				<div class="ms-3 text-sm font-medium">
					{error}
				</div>
				<button type="button" onClick={() => setValues({ ...values, error: null })} class="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-border-2" aria-label="Close">
					<span class="sr-only">Dismiss</span>
					<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
					</svg>
				</button>
			</div>
			// ? <div className="alert alert-danger">{error}</div> : ""
	);
	const showMessage = () => (
		message ?
			<div style={{ backgroundColor: "silver" }} className="p-4">{message}</div> : ""
	);

	const signupForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label className="lead sub-head">Name</label>
					<input
						value={name}
						onChange={handleChange('name')}
						type="text"
						className="form-control"
						placeholder="Enter your name"
					/>
				</div>
				<div className="form-group">
					<label className="lead sub-head">Email</label>
					<input
						value={email}
						onChange={handleChange('email')}
						type="email"
						className="form-control"
						placeholder="Enter your email"
					/>
				</div>
				<div className="form-group relative">
					<label className="lead sub-head">Password</label>
					<input
						value={password}
						onChange={handleChange('password')}
						type={showPass ? "password" : "text"}
						className="form-control"
						placeholder="Enter password"
					/>
					<div onClick={() => setShowPass(!showPass)} className="text-[#1b0044] text-[24px] absolute top-9 right-2 cursor-pointer"  >{showPass ? <FaEyeSlash /> : <FaEye />}</div>
				</div>
				<button className="btn self-start mt-4" type="submit">
					Sign Up
				</button>
			</form>
		);
	};

	return <React.Fragment>
		{showError()}
		{showLoading()}
		{showMessage()}
		{showForm && signupForm()}
	</React.Fragment>;
};

export default SignupComponent;
