import { useEffect } from "react";
import { connect } from "react-redux";

import Routes from "./components/Routes";
import { axi } from "./utils/config";
import { setLogin, setUser } from "./components/loginpage/loginAction";

function App(props) {
	const token = localStorage.getItem("token") || "token";
	useEffect(
		() => {
			axi("post", "/user/isLogin", { token: token })
				.then((res) => {
					if (res.status === "accepted") {
						props.setLogin(true);
						props.setUser(res.response.email);
					}
				})
				.catch(console.log);
		},
		//eslint-disable-next-line
		[]
	);
	return <Routes />;
}

export default connect(null, { setLogin, setUser })(App);
