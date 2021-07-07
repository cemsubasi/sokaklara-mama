import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setLogin, setUser } from "../loginpage/loginAction";

function LogoutPage(props) {
	useEffect(
		() => {
			props.setLogin(false);
			return () => {
				localStorage.removeItem("token");
				props.setUser("");
			};
		},
		//eslint-disable-next-line
		[]
	);
	console.log(props.isLogin);
	if (!props.isLogin) return <Redirect to="/login" />;
	return <></>;
}

const mapStateToProps = (state) => {
	return {
		isLogin: state.isLogin,
	};
};

export default connect(mapStateToProps, { setLogin, setUser })(LogoutPage);
