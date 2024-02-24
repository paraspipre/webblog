import Router from "next/router";
import React, { useState, useEffect } from "react";
import { signin, authenticate, isAuth, forgotPassword } from "../../actions/auth";
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';
import { RotatingLines } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
const SigninComponent = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		message: "",
		showForm: true
	})
	const [showPass, setShowPass] = useState(true);
	const [open, setOpen] = useState(false)

	const { email, password, error, loading, message, showForm } = values

	// useEffect(() => {
	// 	isAuth() && Router.push('/')
	// }, [])


	const handleSubmit = (e) => {
		e.preventDefault();
		//console.table({name,email,password,error,loading,message,showForm});
		setValues({ ...values, loading: true, error: false })
		const user = { email, password }

		signin(user).then(data => {
			if (data?.error) {
				setValues({ ...values, error: data?.error, loading: false })
			} else {
				authenticate(data, () => {
					if (isAuth() && isAuth().role === 1) {
						Router.push('/admin')
					} else {
						Router.push('/user')
					}
				})
			}
		})
	};


	const handleForgot = (e) => {
		e.preventDefault();
		setOpen(false)
		setValues({ ...values, loading: true, error: false })
		const user = { email }
		forgotPassword(user).then(data => {
			if (data?.error) {
				setValues({ ...values, error: data?.error, loading: false })
			} else {
				setValues({ ...values, name: '', email: "", password: '', error: '', loading: false, message: data?.message, showForm: false })
			}
		})
	}


	const handleChange = name => (e) => {
		setValues({ ...values, error: false, [name]: e.target.value });
	};

	const showLoading = () => (
		loading ? <div className="d-flex justify-content-center" style={{ position: "fixed", right: "39vw", top: "37vh" }} >   <RotatingLines width="100" strokeColor="black" strokeWidth="2" /> </div> : ""
	)
	const showError = () => (
		error ? <div className="alert alert-danger">{error}</div> : ""
	);
	const showMessage = () => (
		message ? <div style={{ backgroundColor: "pink" }} className="alert alert-info">{message}</div> : ""
	);

	const signinForm = () => {
		return (
			<form onSubmit={handleSubmit}>
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
				<div className="flex justify-between w-full">

					<button type="submit" className="btn mt-4" >Sign In</button>
					<Link legacyBehavior href="/signup">
						<a style={{ textDecoration: "underline" }} className="text-[#1b0044] text-end mt-2">create new account!</a>
					</Link>
				</div>
			</form>
		);
	};

	return <React.Fragment>
		{showError()}
		{showLoading()}
		{showMessage()}
		{/* <LoginGoogle /> */}
		<br />
		{showForm && signinForm()}
		<br />

		<div onClick={() => setOpen(true)} className=" " legacyBehavior >
			<a className="text-[#1b0044] underline">Forgot password</a>
		</div>

		{open && <div className="w-full h-full fixed top-0 right-0 flex flex-col items-center justify-center backdrop-blur-xl">
			<form className="w-[50%] bg-[#9153f4] p-4 rounded-[12px]" onSubmit={(e) => handleForgot(e)}>
				<div onClick={() => setOpen(false)} className="self-end cursor-pointer"><FaXmark /></div>
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
				<button className="btn self-start mt-4" type="submit">
					Forgot Password
				</button>
			</form>
		</div>}
	</React.Fragment>;
};

export default SigninComponent;