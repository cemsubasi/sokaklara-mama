import { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { axi } from "../../utils/config";
import Header from "../../common/Header";
import styles from "./login.module.css";
import { setLogin, setUser } from "./loginAction";

function LoginPage(props) {
	const passRef = useRef("");
	const emailRef = useRef("");
	//eslint-disable-next-line
	const [state, setState] = useState({});

	const submit = (e) => {
		e.preventDefault();
		axi("post", "/user/login", {
			password: passRef.current.value,
			email: emailRef.current.value,
		})
			.then((res) => {
				if (res.status === "accepted") {
					setState(res);
					props.setUser(res.response.payload.email);
					props.setLogin(true);
					localStorage.removeItem("token");
					localStorage.setItem("token", res.response.token);
					console.log(res.response.token);
				}
			})
			.catch(console.log);
	};

	if (props.isLogin) return <Redirect to="/" />;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.bottomHeader}></div>
			<div className={styles.formContainer}>
				<form className={styles.form}>
					<div className={styles.logo}>
						<h1>Log In</h1>
					</div>
					<div className={styles.inputContainer}>
						<div className={styles.inputGroup}>
							<label htmlFor="email">email: </label>
							<input type="email" id="email" ref={emailRef} />
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor="password">password: </label>
							<input type="password" id="password" ref={passRef} />
						</div>
						<button type="submit" className={styles.btn} onClick={submit}>
							Confirm
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.isLogin,
	};
};

export default connect(mapStateToProps, { setLogin, setUser })(LoginPage);
