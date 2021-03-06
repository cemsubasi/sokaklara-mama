import { useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { axi } from "../../utils/config";
import Header from "../../common/Header";
import { setDimmer } from "../../common/dimmerActions";
import styles from "./signup.module.css";

function SignupPage(props) {
	const [state, setState] = useState(false);
	const nameRef = useRef("");
	const passRef = useRef("");
	const emailRef = useRef("");

	useEffect(() => {
		return () => setState(false);
	}, []);

	const submit = (e) => {
		e.preventDefault();
		axi("post", "/user/isValid", {
			id: Date.now(),
			name: nameRef.current.value,
			password: passRef.current.value,
			email: emailRef.current.value,
		})
			.then((res) => {
				if (res.status === "accepted") {
					setState(true);
					props.setDimmer({
						visibility: true,
						payload: {
							type: "success",
							message: { head: "Success!", body: res.info },
						},
					});
				} else if (res.status === "rejected") {
					props.setDimmer({
						visibility: true,
						payload: {
							type: "error",
							message: { head: "Reject!", body: res.info },
						},
					});
				}
			})
			.catch(console.log);
	};

	if (state) return <Redirect to="/login" />;
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.formContainer}>
				<form className={styles.form}>
					<div className={styles.logo}>
						<h1>Sign Up</h1>
					</div>
					<div className={styles.inputContainer}>
						<div className={styles.inputGroup}>
							<label htmlFor="name">name: </label>
							<input type="text" id="name" ref={nameRef} />
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor="email">email: </label>
							<input type="email" id="email" ref={emailRef} />
						</div>
						<div className={styles.inputGroup}>
							<label htmlFor="password">password: </label>
							<input type="password" id="password" ref={passRef} />
						</div>
						<button
							type="submit"
							className={styles.btn}
							onClick={(e) => submit(e)}
						>
							Confirm
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default connect(null, { setDimmer })(SignupPage);
