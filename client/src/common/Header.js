import { useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./header.module.css";
import menu from "../images/hamburger-menu.svg";

function Header(props) {
	const navRef = useRef(null);

	function closeNav() {
		if (navRef.current.style.display === "inline-block")
			navRef.current.style.display = "none";
	}
	function openNav() {
		if (
			navRef.current.style.display === "" ||
			navRef.current.style.display === "none"
		)
			return (navRef.current.style.display = "inline-block");
		return (navRef.current.style.display = "none");
	}
	return (
		<div className={styles.container}>
			<div className={styles.navbar}>
				<div className={styles.mobile}>
					<div className={styles.logo}>
						<Link to="/">Sokaklara Mama</Link>
					</div>
					<div className={styles.menu} onClick={openNav}>
						<img src={menu} alt="" />
					</div>
				</div>
				<div ref={navRef} className={styles.nav}>
					{props.isLogin ? (
						<>
							<Link to="/" onClick={closeNav}>
								Home
							</Link>
							<Link to="/logout" onClick={closeNav}>
								Logout
							</Link>
						</>
					) : (
						<>
							<Link to="/" onClick={closeNav}>
								Home
							</Link>
							<Link to="/login" onClick={closeNav}>
								Login
							</Link>
							<Link to="/signup" onClick={closeNav}>
								Signup
							</Link>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.isLogin,
	};
};

export default connect(mapStateToProps)(Header);
